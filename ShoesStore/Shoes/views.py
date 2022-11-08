from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from .models import DanhMuc, SanPham, DanhGia
from .serializer import *
from .pagination import StandardResultsSetPagination, SmallResultsSetPagination
from rest_framework.parsers import MultiPartParser


class AnhSPViewSet(viewsets.ModelViewSet):
    queryset = AnhSanPham.objects.all()
    serializer_class = AnhSPSerializer


class DanhMucViewSet(viewsets.ViewSet,
                     generics.ListAPIView):

    queryset = DanhMuc.objects.all()
    serializer_class = DanhMucSerializer

    @action(methods=['get'], detail=True, url_path="san-pham")
    def get_product(self, request, pk):
        category = DanhMuc.objects.get(pk=pk)
        products = category.product_category.filter(trang_thai=True)

        q = self.request.query_params.get('q')
        if q is not None:
            products = products.filter(ten__icontains=q)
        return Response(SanPhamSerializer(products, many=True).data,
                        status=status.HTTP_200_OK)


class SanPhamViewSet(viewsets.ViewSet, generics.ListAPIView,
                     generics.RetrieveAPIView):
    serializer_class = ChiTietSPSerializer
    pagination_class = SmallResultsSetPagination

    @action(methods=['get'], detail=True, url_path='images')
    def images(self, request, pk):
        product = SanPham.objects.get(pk=pk)
        images = product.product_images.all()

        q = self.request.query_params.get('a')
        if q is not None:
            images = images.filter(anh__icontains=q)
        return Response(AnhSPSerializer(images, context={'request': request}, many=True).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='get-comment')
    def get_comment(self, request, pk):
        product = SanPham.objects.get(pk=pk)
        comment = product.comment_product.all()

        return Response(BinhLuanSerializer(comment, context={'request': request}, many=True).data,
                        status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.action in ["them-binhluan"]:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        products = SanPham.objects.filter(trang_thai=True)

        q = self.request.query_params.get('q')
        if q is not None:
            products = products.filter(ten__icontains=q)

        category_id = self.request.query_params.get('category_id')
        if category_id is not None:
            products = products.filter(danh_muc_id=category_id)

        return products

    @action(methods=['post'], detail=True, url_path='them-binhluan')
    def add_comment(self, request, pk):
        content = request.data.get('noi_dung')
        if content:
            c = BinhLuan.objects.create(noi_dung=content,
                                        san_pham=self.get_object(),
                                        nguoi_tao=request.user)
            return Response(BinhLuanSerializer(c).data,
                            status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True, url_path='danh-gia')
    def rating(self, request, pk):
        try:
            rate = int(request.data['rate'])
        except IndexError | ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            res = DanhGia.objects.create(gia_tri=rate)
            return Response(DanhGiaSerializer(res).data,status=status.HTTP_200_OK)


class BinhLuanViewSet(viewsets.ViewSet, generics.DestroyAPIView,
                      generics.UpdateAPIView):
    queryset = BinhLuan.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BinhLuanSerializer

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().nguoi_tao:
            return super().destroy(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().nguoi_tao:
            return super().partial_update(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]
    #
    # def get(self, request, *args, **kwargs):
    #     queryset = User.objects.all()
    #
    #     serializer = UserSerializer(queryset, many=True, context={"request": request})
    #
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user).data, status=status.HTTP_200_OK)


class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2, status=status.HTTP_200_OK)


# class ChangePasswordUser(generics.UpdateAPIView):
#     serializer_class = ChangePasswordSerializer
#     permission_classes = [permissions.IsAuthenticated()]
