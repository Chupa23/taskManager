from django.urls import path, include
from tasks import views
from rest_framework import routers
router = routers.DefaultRouter()
router.register(r'taskss', views.TaskViewSet)
urlpatterns = [
        path('api-auth/', include('rest_framework.urls')),
        path('', include(router.urls)),
]
