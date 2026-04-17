from django.contrib import admin
from django.http import HttpResponse
import csv
from .models import Subscriber, Fragrance


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ["email", "joined_at"]
    search_fields = ["email"]
    readonly_fields = ["joined_at"]
    actions = ["export_csv"]

    @admin.action(description="Export selected subscribers as CSV")
    def export_csv(self, request, queryset):
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="subscribers.csv"'
        writer = csv.writer(response)
        writer.writerow(["Email", "Joined"])
        for sub in queryset:
            writer.writerow([sub.email, sub.joined_at.strftime("%Y-%m-%d %H:%M")])
        return response


@admin.register(Fragrance)
class FragranceAdmin(admin.ModelAdmin):
    list_display = ["name", "collection", "concentration", "is_featured", "order"]
    list_editable = ["is_featured", "order"]
    list_filter = ["collection", "concentration", "is_featured"]
    search_fields = ["name", "description"]
