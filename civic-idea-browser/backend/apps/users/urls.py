"""
URL patterns for the users app.
"""
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView, TokenVerifyView
)
from . import views

app_name = 'users'

urlpatterns = [
    # Authentication
    path('auth/register/', views.UserRegistrationView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('auth/password/reset/', views.PasswordResetView.as_view(), name='password_reset'),
    path('auth/password/reset/confirm/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('auth/password/change/', views.ChangePasswordView.as_view(), name='change_password'),
    path('auth/email/verify/', views.verify_email_view, name='verify_email'),
    
    # User profiles
    path('users/me/', views.current_user_view, name='current_user'),
    path('users/profile/', views.UserProfileView.as_view(), name='profile'),
    path('users/profile/extended/', views.ExtendedProfileView.as_view(), name='extended_profile'),
    path('users/<str:username>/', views.UserProfileDetailView.as_view(), name='user_detail'),
    
    # Admin only
    path('users/', views.UserListView.as_view(), name='user_list'),
] 