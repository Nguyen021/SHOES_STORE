from rest_framework.pagination import PageNumberPagination


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 32
    page_size_query_param = 'page_size'


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 24
    page_size_query_param = 'page_size'


class SmallResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
