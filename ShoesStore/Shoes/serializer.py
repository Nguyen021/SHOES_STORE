from .models import DanhMuc, SanPham, AnhSanPham, KichCo, User, BinhLuan, DanhGia
from rest_framework.serializers import ModelSerializer, SerializerMethodField, Serializer, CharField, Field


class AnhSPSerializer(ModelSerializer):
    class Meta:
        model = AnhSanPham
        fields = ["anh", "san_pham"]

    anh = SerializerMethodField()

    def get_anh(self, obj):
        request = self.context['request']
        name = obj.anh.name
        if name.startswith("static/"):
            path = "/%s" % name
        else:
            path = "/static/%s" % name
        return request.build_absolute_uri(path)


class DanhMucSerializer(ModelSerializer):
    class Meta:
        model = DanhMuc
        fields = "__all__"


class SanPhamSerializer(ModelSerializer):
    danh_muc = DanhMucSerializer()

    class Meta:
        model = SanPham
        fields = ["id", "ten", "ngay_tao", "gia", "danh_muc"]


class KichCoSerializer(ModelSerializer):
    class Meta:
        model = KichCo
        fields = "__all__"


def relative_to_absolute(url):
    return 'http://127.0.0.1:8000' + url


class FileFieldSerializer(Field):
    def to_representation(self, value):
        src = value.src
        if src and src.startswith('/'):
            src = relative_to_absolute(src)
        return src


class ChiTietSPSerializer(SanPhamSerializer):
    kich_co = KichCoSerializer(many=True)
    images = AnhSPSerializer(source='product_images', many=True)

    # mo_ta = FileFieldSerializer()
    class Meta:
        model = SanPhamSerializer.Meta.model
        fields = SanPhamSerializer.Meta.fields + ["mo_ta", "kich_co", "images"]


class UserSerializer(ModelSerializer):
    # avatar = SerializerMethodField()
    #
    # def get_avatar(self, user):
    #     request = self.context['request']
    #     if user.avatar:
    #         name = user.avatar.name
    #         if name.startswith("static/"):
    #             path = '/%s' % name
    #         else:
    #             path = '/static/%s' % name
    #
    #         return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "avatar", "username", "password", "date_joined"]

        extra_kwargs = {
            "password": {"write_only": "true"}
        }

    # def get_avatar_url(self, obj):
    #     request = self.context.get('request')
    #     avatar_url = obj.avatar.url
    #     return request.build_absolute_uri(avatar_url)

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user


class BinhLuanSerializer(ModelSerializer):
    nguoi_tao = SerializerMethodField()

    def get_nguoi_tao(self, comment):
        return UserSerializer(comment.nguoi_tao, context={"request": self.context.get('request')}).data

    class Meta:
        model = BinhLuan
        fields = ['id', 'noi_dung', 'ngay_tao', 'ngay_sua', 'nguoi_tao']


class DanhGiaSerializer(ModelSerializer):
    class Meta:
        model = DanhGia
        fields = ['id', 'gia_tri', 'ngay_tao', 'ngay_sua']


# class ChangePasswordSerializer(Serializer):
#     class Meta:
#         model = User
#         old_pass = CharField(required=True)
#         new_pass = CharField(required=True)
