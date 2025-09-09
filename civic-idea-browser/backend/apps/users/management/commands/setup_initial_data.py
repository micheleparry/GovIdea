"""
Django management command to set up initial data for the Civic Ideas platform.
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.sites.models import Site
from apps.categories.models import Category, Tag
from apps.users.models import UserProfile
from apps.notifications.models import NotificationPreference

User = get_user_model()


class Command(BaseCommand):
    help = 'Set up initial data for the Civic Ideas platform'

    def handle(self, *args, **options):
        self.stdout.write('Setting up initial data...')
        
        # Create default site
        site, created = Site.objects.get_or_create(
            id=1,
            defaults={
                'domain': 'localhost:8000',
                'name': 'Civic Ideas Platform'
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS('Created default site'))
        
        # Create superuser if none exists
        if not User.objects.filter(is_superuser=True).exists():
            user = User.objects.create_superuser(
                username='admin',
                email='admin@civicideas.com',
                password='admin123',
                first_name='Admin',
                last_name='User'
            )
            self.stdout.write(self.style.SUCCESS(f'Created superuser: {user.username}'))
        
        # Create default categories
        categories_data = [
            {
                'name': 'Transportation',
                'slug': 'transportation',
                'description': 'Ideas related to public transportation, roads, and mobility',
                'color': '#3B82F6',
                'icon': 'car'
            },
            {
                'name': 'Environment',
                'slug': 'environment',
                'description': 'Environmental initiatives and sustainability projects',
                'color': '#10B981',
                'icon': 'leaf'
            },
            {
                'name': 'Education',
                'slug': 'education',
                'description': 'Educational programs and learning initiatives',
                'color': '#F59E0B',
                'icon': 'graduation-cap'
            },
            {
                'name': 'Public Safety',
                'slug': 'public-safety',
                'description': 'Safety and security related proposals',
                'color': '#EF4444',
                'icon': 'shield'
            },
            {
                'name': 'Parks & Recreation',
                'slug': 'parks-recreation',
                'description': 'Parks, sports facilities, and recreational activities',
                'color': '#8B5CF6',
                'icon': 'tree'
            },
            {
                'name': 'Infrastructure',
                'slug': 'infrastructure',
                'description': 'Public infrastructure and utilities',
                'color': '#6B7280',
                'icon': 'wrench'
            },
            {
                'name': 'Community Services',
                'slug': 'community-services',
                'description': 'Social services and community programs',
                'color': '#EC4899',
                'icon': 'heart'
            },
            {
                'name': 'Technology',
                'slug': 'technology',
                'description': 'Digital services and technology initiatives',
                'color': '#6366F1',
                'icon': 'smartphone'
            }
        ]
        
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            if created:
                self.stdout.write(f'Created category: {category.name}')
        
        # Create default tags
        tags_data = [
            {'name': 'urgent', 'slug': 'urgent', 'color': '#EF4444'},
            {'name': 'low-cost', 'slug': 'low-cost', 'color': '#10B981'},
            {'name': 'high-impact', 'slug': 'high-impact', 'color': '#F59E0B'},
            {'name': 'youth-focused', 'slug': 'youth-focused', 'color': '#8B5CF6'},
            {'name': 'senior-friendly', 'slug': 'senior-friendly', 'color': '#6B7280'},
            {'name': 'accessible', 'slug': 'accessible', 'color': '#3B82F6'},
            {'name': 'sustainable', 'slug': 'sustainable', 'color': '#10B981'},
            {'name': 'innovative', 'slug': 'innovative', 'color': '#EC4899'},
        ]
        
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(
                slug=tag_data['slug'],
                defaults=tag_data
            )
            if created:
                self.stdout.write(f'Created tag: {tag.name}')
        
        # Create user profiles and notification preferences for existing users
        for user in User.objects.all():
            # Create user profile
            profile, created = UserProfile.objects.get_or_create(user=user)
            if created:
                self.stdout.write(f'Created profile for user: {user.username}')
            
            # Create notification preferences
            prefs, created = NotificationPreference.objects.get_or_create(user=user)
            if created:
                self.stdout.write(f'Created notification preferences for user: {user.username}')
        
        self.stdout.write(self.style.SUCCESS('Initial data setup completed successfully!')) 