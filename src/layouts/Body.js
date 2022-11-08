import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";
import Footer from "./Footer";
import Header from "./Header";
export default function Body() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/product/:productId" element={<ProductDetail />} />

          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
