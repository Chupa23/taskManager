from dataclasses import fields
from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .serializers import TaskSerializer
from .models import Task
from rest_framework import viewsets
import datetime

# Create your views here.


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    def get_queryset(self):
        queryset = self.queryset
        state = self.request.query_params.get("created_at", None)
        if state:
            queryset = queryset.filter(created_at =state)
            return queryset
        return super().get_queryset()
    
    
