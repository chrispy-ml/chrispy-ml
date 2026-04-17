import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Fragrance
from .forms import SubscriberForm


def home(request):
    featured = Fragrance.objects.filter(is_featured=True)[:3]
    form = SubscriberForm()
    return render(request, "core/home.html", {
        "featured_fragrances": featured,
        "form": form,
    })


@require_POST
def subscribe(request):
    form = SubscriberForm(request.POST)
    if form.is_valid():
        form.save()
        return JsonResponse({"ok": True, "message": "Thank you. You will hear from us soon."})

    errors = form.errors.get("email", [])
    if any("already exists" in e for e in errors):
        return JsonResponse({"ok": False, "message": "You're already on the list."})

    return JsonResponse({"ok": False, "message": "Please enter a valid email address."}, status=400)
