from django.db import models


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-joined_at"]

    def __str__(self):
        return self.email


class Fragrance(models.Model):
    COLLECTION_CHOICES = [
        ("core", "Core Signature"),
        ("niche", "Ultra Niche"),
        ("elemental", "Elemental"),
    ]
    CONCENTRATION_CHOICES = [
        ("extrait", "Extrait de Parfum"),
        ("edp", "Eau de Parfum"),
        ("edt", "Eau de Toilette"),
    ]

    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=100)
    description = models.TextField()
    collection = models.CharField(max_length=20, choices=COLLECTION_CHOICES)
    concentration = models.CharField(max_length=10, choices=CONCENTRATION_CHOICES)
    note_1 = models.CharField(max_length=50, blank=True)
    note_2 = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to="fragrances/", blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class FounderProfile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100, default="Founder & Creative Director")
    bio_1 = models.TextField(help_text="First paragraph")
    bio_2 = models.TextField(blank=True, help_text="Second paragraph (optional)")
    photo = models.ImageField(upload_to="founder/")

    class Meta:
        verbose_name = "Founder Profile"
        verbose_name_plural = "Founder Profile"

    def __str__(self):
        return self.name
