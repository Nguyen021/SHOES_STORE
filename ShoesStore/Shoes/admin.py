from django.contrib import admin
from .models import *
from django.utils.html import mark_safe
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms
from django.contrib.auth.models import Permission


class SanPhamInline(admin.StackedInline):
    model = SanPham
    fk_name = 'danh_muc'


class DanhMucAdmin(admin.ModelAdmin):
    list_display = ['id', 'ten', 'ngay_tao']
    ordering = ['id']
    inlines = (SanPhamInline,)


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'username', 'password', 'email']
    ordering = ['id']

    readonly_fields = ['image']

    def image(self, obj):
        if obj:
            return mark_safe(
                "<img src='/static/{img_url}' alt={alt} width='120px'/>".format(img_url=
                                                                                obj.avatar.name,
                                                                                alt=obj.username)
            )


class FormSanPham(forms.ModelForm):
    mo_ta = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = SanPham
        fields = '__all__'


class AnhSPInline(admin.StackedInline):
    model = AnhSanPham
    fk_name = 'san_pham'
    readonly_fields = ('image_preview',)


class SanPhamKichCoInline(admin.TabularInline):
    model = SanPham.kich_co.through


class SanPhamAdmin(admin.ModelAdmin):
    list_display = ['id', 'ten', 'gia', 'trang_thai', 'danh_muc', 'ngay_tao', 'ngay_sua']
    search_fields = ['ten']
    list_filter = ['ten', 'ngay_tao']

    form = FormSanPham
    inlines = (AnhSPInline, SanPhamKichCoInline)


class KichCoSPAdmin(admin.ModelAdmin):
    list_display = ['id', 'kich_co', 'san_pham', 'so_luong']


class AnhSPAdmin(admin.ModelAdmin):
    list_display = ['id', 'anh', 'san_pham']
    readonly_fields = ['images']

    def images(self, obj):
        if obj:
            return (
                mark_safe("<img src='/static/{img_url}' width='120px'/>".format(img_url=obj.anh.name)
                          ))


class BinhLuanAdmin(admin.ModelAdmin):
    list_display = ['id', 'noi_dung', 'ngay_tao', 'ngay_sua', 'nguoi_tao', 'san_pham']


admin.site.register(User, UserAdmin)
admin.site.register(DanhMuc, DanhMucAdmin)
admin.site.register(AnhSanPham, AnhSPAdmin)
admin.site.register(KichCo)
admin.site.register(SanPham, SanPhamAdmin)
admin.site.register(KichCoSanPham, KichCoSPAdmin)
admin.site.register(Permission)
admin.site.register(BinhLuan,BinhLuanAdmin)
