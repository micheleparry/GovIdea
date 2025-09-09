"""
User models for the Civic Ideas platform.
"""
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    Custom User model with extended fields for Civic Ideas platform.
    """
    email = models.EmailField(_('email address'), unique=True)
    bio = models.TextField(_('bio'), max_length=500, blank=True)
    avatar = models.ImageField(_('avatar'), upload_to='avatars/', blank=True, null=True)
    location = models.CharField(_('location'), max_length=100, blank=True)
    website = models.URLField(_('website'), blank=True)
    is_verified = models.BooleanField(_('verified'), default=False)
    date_of_birth = models.DateField(_('date of birth'), null=True, blank=True)
    
    # User preferences
    email_notifications = models.BooleanField(_('email notifications'), default=True)
    push_notifications = models.BooleanField(_('push notifications'), default=True)
    
    # Timestamps
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        ordering = ['-date_joined']
    
    def __str__(self):
        return self.email
    
    @property
    def full_name(self):
        """Return the user's full name."""
        return f"{self.first_name} {self.last_name}".strip() or self.username
    
    @property
    def ideas_count(self):
        """Return the number of ideas submitted by the user."""
        return self.ideas.count()
    
    @property
    def votes_count(self):
        """Return the number of votes cast by the user."""
        return self.votes.count()


class UserProfile(models.Model):
    """
    Extended user profile with additional information.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Professional information
    organization = models.CharField(_('organization'), max_length=200, blank=True)
    job_title = models.CharField(_('job title'), max_length=100, blank=True)
    expertise_areas = models.JSONField(_('expertise areas'), default=list, blank=True)
    
    # Social media
    twitter_handle = models.CharField(_('twitter handle'), max_length=50, blank=True)
    linkedin_profile = models.URLField(_('linkedin profile'), blank=True)
    
    # Privacy settings
    profile_public = models.BooleanField(_('public profile'), default=True)
    show_email = models.BooleanField(_('show email'), default=False)
    
    # Timestamps
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('user profile')
        verbose_name_plural = _('user profiles')
    
    def __str__(self):
        return f"{self.user.username}'s profile" 