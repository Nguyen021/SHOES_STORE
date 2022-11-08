from django.contrib.auth.models import AbstractUser
from django.db import models
from ckeditor.fields import RichTextField

from django.utils.safestring import mark_safe


class User(AbstractUser):
    class Meta:
        db_table = 'User'

    avatar = models.ImageField(upload_to='User/%Y/%m')
    address = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class DanhMuc(models.Model):
    ten = models.CharField(null=False, unique=True, max_length=100)
    ngay_tao = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'DanhMuc'

    def __str__(self):
        return self.ten


class Date(models.Model):
    class Meta:
        abstract = True

    ngay_tao = models.DateTimeField(auto_now_add=True)
    ngay_sua = models.DateTimeField(auto_now=True)


class AnhSanPham(models.Model):
    class Meta:
        db_table = 'AnhSanPham'

    anh = models.ImageField(upload_to='product_images/')
    san_pham = models.ForeignKey('SanPham', on_delete=models.CASCADE, blank=None, null=True,
                                 related_name='product_images')

    def __str__(self):
        return self.anh.name

    def image_preview(self):
        if self.anh:
            return mark_safe('<img src="/static/{0}" width="150" height="150" />'.format(self.anh.name))
        else:
            return '(No image)'


class KichCo(models.Model):
    class Meta:
        db_table = 'KichCo'

    gia_tri = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.gia_tri


class SanPham(Date):
    class Meta:
        db_table = 'SanPham'
        unique_together = ('ten', 'danh_muc')

    def __str__(self):
        return self.ten

    ten = models.CharField(max_length=150, null=False, unique=True)
    mo_ta = RichTextField(null=True, blank=True)
    gia = models.CharField(max_length=20)
    trang_thai = models.BooleanField(default=True)
    danh_muc = models.ForeignKey(DanhMuc, related_name='product_category', on_delete=models.SET_NULL, null=True)
    kich_co = models.ManyToManyField(KichCo, through='KichCoSanPham')


class KichCoSanPham(models.Model):
    class Meta:
        db_table = 'KichCoSanPham'

    kich_co = models.ForeignKey(KichCo, on_delete=models.CASCADE)
    san_pham = models.ForeignKey(SanPham, on_delete=models.CASCADE)
    so_luong = models.IntegerField(default=1)


class BinhLuan(Date):
    class Meta:
        db_table = 'BinhLuan'

    noi_dung = models.TextField()
    san_pham = models.ForeignKey(SanPham, on_delete=models.CASCADE, related_name='comment_product')
    nguoi_tao = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment_user')

    def __str__(self):
        return self.noi_dung


class DonHang(Date):
    class Meta:
        db_table = 'DonHang'

    nguoi_tao = models.ForeignKey(User, on_delete=models.CASCADE)
    thanh_toan = models.ForeignKey('ThanhToan', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nguoi_tao.username


class ChiTietDonHang(models.Model):
    class Meta:
        db_table = 'ChiTietDonHang'

    san_pham = models.ForeignKey(SanPham, on_delete=models.CASCADE, blank=True, null=True)
    don_hang = models.ForeignKey(DonHang, on_delete=models.CASCADE, blank=True, null=True)
    so_luong = models.IntegerField(default=0)
    gia = models.CharField(max_length=20)


class ThanhToan(models.Model):
    class Meta:
        db_table = 'ThanhToan'

    cong_thanh_toan = models.CharField(max_length=50)
    nguoi_tao = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    ngay = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nguoi_tao.username


class CommonAction(Date):
    class Meta:
        abstract = True

    san_pham = models.ForeignKey(SanPham, on_delete=models.CASCADE, blank=True, null=True)
    nguoi_tao = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    trang_thai = models.BooleanField(default=True)


class DanhGia(CommonAction):
    class Meta:
        db_table = 'DanhGia'
    gia_tri = models.PositiveSmallIntegerField(default=0)
