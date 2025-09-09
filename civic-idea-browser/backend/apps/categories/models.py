"""
Models for the categories app.
"""
from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    """
    Model for organizing ideas into categories.
    """
    name = models.CharField(_('name'), max_length=100, unique=True)
    slug = models.SlugField(_('slug'), max_length=100, unique=True)
    description = models.TextField(_('description'), blank=True)
    color = models.CharField(_('color'), max_length=7, default='#3B82F6')  # Hex color
    icon = models.CharField(_('icon'), max_length=50, blank=True)  # Icon class name
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, 
        related_name='children', verbose_name=_('parent category')
    )
    is_active = models.BooleanField(_('active'), default=True)
    order = models.PositiveIntegerField(_('order'), default=0)
    
    # Timestamps
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name
    
    @property
    def ideas_count(self):
        """Return the number of ideas in this category."""
        return self.ideas.count()
    
    @property
    def full_path(self):
        """Return the full category path including parents."""
        if self.parent:
            return f"{self.parent.full_path} > {self.name}"
        return self.name


class Tag(models.Model):
    """
    Model for tagging ideas with keywords.
    """
    name = models.CharField(_('name'), max_length=50, unique=True)
    slug = models.SlugField(_('slug'), max_length=50, unique=True)
    description = models.TextField(_('description'), blank=True)
    color = models.CharField(_('color'), max_length=7, default='#6B7280')  # Hex color
    is_active = models.BooleanField(_('active'), default=True)
    
    # Timestamps
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('tag')
        verbose_name_plural = _('tags')
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    @property
    def ideas_count(self):
        """Return the number of ideas with this tag."""
        return self.ideas.count() 