"""
Models for the notifications app.
"""
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

User = get_user_model()


class Notification(models.Model):
    """
    Model for user notifications.
    """
    NOTIFICATION_TYPES = [
        ('idea_created', _('Idea Created')),
        ('idea_updated', _('Idea Updated')),
        ('idea_approved', _('Idea Approved')),
        ('idea_rejected', _('Idea Rejected')),
        ('idea_implemented', _('Idea Implemented')),
        ('comment_added', _('Comment Added')),
        ('vote_received', _('Vote Received')),
        ('collaboration_invite', _('Collaboration Invite')),
        ('mention', _('Mention')),
        ('system', _('System Notification')),
    ]
    
    recipient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='notifications', 
        verbose_name=_('recipient')
    )
    notification_type = models.CharField(
        _('notification type'), max_length=50, choices=NOTIFICATION_TYPES
    )
    title = models.CharField(_('title'), max_length=200)
    message = models.TextField(_('message'))
    
    # Related object (optional)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')
    
    # Sender (optional)
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, 
        related_name='sent_notifications', verbose_name=_('sender')
    )
    
    # Notification state
    is_read = models.BooleanField(_('read'), default=False)
    is_email_sent = models.BooleanField(_('email sent'), default=False)
    is_push_sent = models.BooleanField(_('push sent'), default=False)
    
    # Additional data
    data = models.JSONField(_('data'), default=dict, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    read_at = models.DateTimeField(_('read at'), null=True, blank=True)
    
    class Meta:
        verbose_name = _('notification')
        verbose_name_plural = _('notifications')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['recipient', 'is_read']),
            models.Index(fields=['notification_type', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.notification_type} for {self.recipient.username}"
    
    def mark_as_read(self):
        """Mark notification as read."""
        if not self.is_read:
            self.is_read = True
            from django.utils import timezone
            self.read_at = timezone.now()
            self.save(update_fields=['is_read', 'read_at'])
    
    @classmethod
    def create_notification(cls, recipient, notification_type, title, message, 
                          sender=None, content_object=None, data=None):
        """Create a new notification."""
        content_type = None
        object_id = None
        
        if content_object:
            content_type = ContentType.objects.get_for_model(content_object)
            object_id = content_object.pk
        
        return cls.objects.create(
            recipient=recipient,
            notification_type=notification_type,
            title=title,
            message=message,
            sender=sender,
            content_type=content_type,
            object_id=object_id,
            data=data or {}
        )


class NotificationPreference(models.Model):
    """
    Model for user notification preferences.
    """
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='notification_preferences',
        verbose_name=_('user')
    )
    
    # Email preferences
    email_notifications = models.BooleanField(_('email notifications'), default=True)
    email_idea_updates = models.BooleanField(_('idea updates'), default=True)
    email_comments = models.BooleanField(_('comments'), default=True)
    email_votes = models.BooleanField(_('votes'), default=True)
    email_collaboration = models.BooleanField(_('collaboration'), default=True)
    email_system = models.BooleanField(_('system notifications'), default=True)
    
    # Push notification preferences
    push_notifications = models.BooleanField(_('push notifications'), default=True)
    push_idea_updates = models.BooleanField(_('idea updates'), default=True)
    push_comments = models.BooleanField(_('comments'), default=True)
    push_votes = models.BooleanField(_('votes'), default=True)
    push_collaboration = models.BooleanField(_('collaboration'), default=True)
    push_system = models.BooleanField(_('system notifications'), default=True)
    
    # Frequency preferences
    digest_frequency = models.CharField(
        _('digest frequency'), max_length=20,
        choices=[
            ('immediate', _('Immediate')),
            ('daily', _('Daily')),
            ('weekly', _('Weekly')),
            ('never', _('Never')),
        ],
        default='immediate'
    )
    
    # Timestamps
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('notification preference')
        verbose_name_plural = _('notification preferences')
    
    def __str__(self):
        return f"Notification preferences for {self.user.username}" 