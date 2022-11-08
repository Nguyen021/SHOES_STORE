from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("DanhMuc", views.DanhMucViewSet, 'DanhMuc')
router.register("SanPham", views.SanPhamViewSet, 'SanPham')
router.register("AnhSanPham", views.AnhSPViewSet, 'AnhSanPham')
router.register("User", views.UserViewSet, 'User')
router.register("BinhLuan", views.BinhLuanViewSet, 'BinhLuan')
urlpatterns = [
    path('', include(router.urls)),
    path('oauth2-info/', views.AuthInfo.as_view()),
]
