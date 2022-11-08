import axios from "axios";
export let endpoints = {
  categories: "/DanhMuc/",
  products: "/SanPham/",

  images: (productId) => `/SanPham/${productId}/images/`,
  product_detail: (productId) => `/SanPham/${productId}/`,
  "oauth2-info": "/oauth2-info/",
  login: "/o/token/",
  "current-user": "/User/current-user/",
  register: "/User/",
  comments: (productId) => `/SanPham/${productId}/get-comment/`,
  "add-comment": (productId) => `/SanPham/${productId}/them-binhluan/`,
};

export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
});
