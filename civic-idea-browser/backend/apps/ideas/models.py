"""
Models for the ideas app.
"""
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()


class Idea(models.Model):
    """
    Model for civic ideas and proposals.
    """
    STATUS_CHOICES = [
        ('draft', _('Draft')),
        ('submitted', _('Submitted')),
        ('under_review', _('Under Review')),
        ('approved', _('Approved')),
        ('rejected', _('Rejected')),
        ('implemented', _('Implemented')),
        ('archived', _('Archived')),
    ]
    
    PRIORITY_CHOICES = [
        ('low', _('Low')),
        ('medium', _('Medium')),
        ('high', _('High')),
        ('critical', _('Critical')),
    ]
    
    # Basic information
    title = models.CharField(_('title'), max_length=200)
    description = models.TextField(_('description'))
    summary = models.TextField(_('summary'), max_length=500, blank=True)
    
    # Author and ownership
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='ideas', verbose_name=_('author')
    )
    collaborators = models.ManyToManyField(
        User, through='IdeaCollaborator', related_name='collaborated_ideas', blank=True
    )
    
    # Status and priority
    status = models.CharField(
        _('status'), max_length=20, choices=STATUS_CHOICES, default='draft'
    )
    priority = models.CharField(
        _('priority'), max_length=20, choices=PRIORITY_CHOICES, default='medium'
    )
    
    # Categories and tags
    categories = models.ManyToManyField('categories.Category', related_name='ideas', blank=True)
    tags = models.ManyToManyField('categories.Tag', related_name='ideas', blank=True)
    
    # Location and scope
    location = models.CharField(_('location'), max_length=200, blank=True)
    scope = models.CharField(_('scope'), max_length=100, blank=True)  # local, regional, national, etc.
    
    # Implementation details
    estimated_cost = models.DecimalField(
        _('estimated cost'), max_digits=15, decimal_places=2, null=True, blank=True
    )
    estimated_timeline = models.CharField(_('estimated timeline'), max_length=100, blank=True)
    implementation_plan = models.TextField(_('implementation plan'), blank=True)
    
    # Media and attachments
    image = models.ImageField(_('image'), upload_to='ideas/images/', blank=True, null=True)
    attachments = models.ManyToManyField('IdeaAttachment', blank=True)
    
    # Engagement metrics
    views_count = models.PositiveIntegerField(_('views count'), default=0)
    votes_count = models.PositiveIntegerField(_('votes count'), default=0)
    comments_count = models.PositiveIntegerField(_('comments count'), default=0)
    
    # Timestamps
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    published_at = models.DateTimeField(_('published at'), null=True, blank=True)
    
    class Meta:
        verbose_name = _('idea')
        verbose_name_plural = _('ideas')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['author', 'created_at']),
            models.Index(fields=['priority', 'status']),
        ]
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Update published_at when status changes to submitted
        if self.pk:
            old_instance = Idea.objects.get(pk=self.pk)
            if old_instance.status != 'submitted' and self.status == 'submitted':
                from django.utils import timezone
                self.published_at = timezone.now()
        super().save(*args, **kwargs)


class IdeaCollaborator(models.Model):
    """
    Model for managing idea collaborators.
    """
    ROLE_CHOICES = [
        ('contributor', _('Contributor')),
        ('reviewer', _('Reviewer')),
        ('implementer', _('Implementer')),
    ]
    
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name='collaborator_relations')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='idea_collaborations')
    role = models.CharField(_('role'), max_length=20, choices=ROLE_CHOICES, default='contributor')
    joined_at = models.DateTimeField(_('joined at'), auto_now_add=True)
    
    class Meta:
        unique_together = ['idea', 'user']
        verbose_name = _('idea collaborator')
        verbose_name_plural = _('idea collaborators')
    
    def __str__(self):
        return f"{self.user.username} - {self.idea.title} ({self.role})"


class IdeaAttachment(models.Model):
    """
    Model for idea attachments.
    """
    ATTACHMENT_TYPE_CHOICES = [
        ('document', _('Document')),
        ('image', _('Image')),
        ('video', _('Video')),
        ('audio', _('Audio')),
        ('other', _('Other')),
    ]
    
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name='idea_attachments')
    file = models.FileField(_('file'), upload_to='ideas/attachments/')
    title = models.CharField(_('title'), max_length=200)
    description = models.TextField(_('description'), blank=True)
    attachment_type = models.CharField(
        _('attachment type'), max_length=20, choices=ATTACHMENT_TYPE_CHOICES, default='document'
    )
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_attachments')
    uploaded_at = models.DateTimeField(_('uploaded at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('idea attachment')
        verbose_name_plural = _('idea attachments')
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return self.title


class Vote(models.Model):
    """
    Model for idea votes.
    """
    VOTE_TYPE_CHOICES = [
        ('up', _('Upvote')),
        ('down', _('Downvote')),
    ]
    
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name='votes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='votes')
    vote_type = models.CharField(_('vote type'), max_length=10, choices=VOTE_TYPE_CHOICES)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        unique_together = ['idea', 'user']
        verbose_name = _('vote')
        verbose_name_plural = _('votes')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} {self.vote_type} on {self.idea.title}"


class Comment(models.Model):
    """
    Model for idea comments.
    """
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    content = models.TextField(_('content'))
    is_public = models.BooleanField(_('is public'), default=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('comment')
        verbose_name_plural = _('comments')
        ordering = ['created_at']
    
    def __str__(self):
        return f"Comment by {self.author.username} on {self.idea.title}"


class IdeaView(models.Model):
    """
    Model for tracking idea views.
    """
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name='idea_views')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='viewed_ideas', null=True, blank=True)
    ip_address = models.GenericIPAddressField(_('IP address'), null=True, blank=True)
    user_agent = models.TextField(_('user agent'), blank=True)
    viewed_at = models.DateTimeField(_('viewed at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('idea view')
        verbose_name_plural = _('idea views')
        ordering = ['-viewed_at']
    
    def __str__(self):
        return f"View of {self.idea.title} at {self.viewed_at}" 