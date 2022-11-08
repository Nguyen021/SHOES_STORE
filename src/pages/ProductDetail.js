import { useEffect, useState } from "react";
import { BsCheck2All } from "react-icons/bs";
import {
  Button,
  Col,
  Row,
  Container,
  Image,
  Spinner,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";

import "./ProductDetail.scss";

import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import Moment from "react-moment";
import { useSelector } from "react-redux";

import cookies from "react-cookies";
const ProductDetail = () => {
  const [product, setProduct] = useState(null);

  const [comments, setComments] = useState([]);
  const [currentImg, setCurrentImg] = useState([]);
  const [img, setImg] = useState([]);

  const [quantity, setQuantity] = useState(1);
  let { productId } = useParams();

  const [openImg, setOpenImg] = useState(false);

  const [icon, setIcon] = useState(false);
  const getImages = async () => {
    let res = await Apis.get(endpoints["images"](productId)).then((re) => {
      let data = re.data;
      setImg(data);

      return data;
    });
  };

  const user = useSelector((state) => state.user.user);

  const [commentContent, setCommentContent] = useState(null);
  let [changeComment, setChangeComment] = useState(0);
  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        let response = await Apis.get(endpoints["product_detail"](productId));
        setProduct(response.data);
        setCurrentImg(response.data.images["0"].anh);
        getImages();
      } catch (error) {
        console.error(error);
      }
    };
    const loadComments = async () => {
      try {
        let res = await Apis.get(endpoints["comments"](productId));
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProductDetail();
    loadComments();
  }, [changeComment]);

  const handleClick = (event) => {
    event.preventDefault();
    setCurrentImg(event.target.src);
  };

  const increQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const reduQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (product === null) {
    return (
      <Button variant="secondary" disabled style={{ marginTop: "90px" }}>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    );
  }
  if (!img) {
    return (
      <Button variant="secondary" disabled style={{ marginTop: "90px" }}>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading images...
      </Button>
    );
  }
  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      let r = await Apis.post(
        endpoints["add-comment"](productId),
        {
          noi_dung: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        }
      );
      console.info(r.data);
      comments.push(r.data);
      setComments(comments);
      setChangeComment(comments.length);
    } catch (e) {
      console.error(e);
    }
  };
  let btncomment = (
    <em>
      {" "}
      <Link to="/login">Đăng Nhập</Link> để post Bình Luận
    </em>
  );
  if (user != null && user != undefined) {
    btncomment = (
      <Button type="submit" variant="outline-info">
        Thêm Bình Luận
      </Button>
    );
  }
  const handleClickPreviewImg = () => {
    setOpenImg(true);
  };
  return (
    <>
      <Container style={{ marginTop: "90px" }} className="product-container">
        <Row>
          <Col xs={12} md={4}>
            <div className="content-left">
              <div style={{ height: "440px " }}>
                <Image
                  src={currentImg}
                  rounded
                  fluid
                  onClick={() => {
                    handleClickPreviewImg();
                  }}
                />
              </div>

              <div className="img-preview">
                {img.map((image, index) => {
                  // setAllImg(image.anh);
                  return (
                    <>
                      <div>
                        <Image
                          key={image.id}
                          src={image.anh}
                          className="img-small"
                          onClick={(img) => handleClick(img)}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </Col>

          <Col xs={12} md={8}>
            <div className="content-right">
              <h2>{product.ten}</h2>

              <h3>{product.gia} đ</h3>
              <p>Ngày Tạo: {product.ngay_tao.substring(0, 10)}</p>
              <div className="size-color">
                <span>
                  {product.kich_co.map((size) => (
                    <>
                      <span></span>

                      <button
                        className="btn-size-select"
                        onClick={(event) => {
                          setIcon(true);
                        }}
                      >
                        {size.gia_tri}
                        {icon ? (
                          <BsCheck2All
                            style={{
                              top: "-14px",
                              right: "-21px",
                              position: "relative",
                              color: "#F76631",
                            }}
                          />
                        ) : (
                          <BsCheck2All
                            style={{
                              opacity: 0,
                            }}
                          />
                        )}
                      </button>
                    </>
                  ))}
                </span>
              </div>
              <div className="quantity">
                <button
                  className="btn-size"
                  onClick={(event) => reduQuantity(event)}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="5"
                  maxLength="12"
                  value={quantity}
                  className="input"
                />
                <button
                  className="btn-size"
                  onClick={(event) => increQuantity(event)}
                >
                  +
                </button>
              </div>
              <div className="row-btn">
                <button className="btn btn-add">Thêm vào giỏ</button>
                <button className="btn btn-buy">Mua ngay</button>
              </div>
            </div>
          </Col>
          <div className="description">
            {ReactHtmlParser(
              product.mo_ta.replaceAll(`src=\"`, `src=\"http://127.0.0.1:8000`)
            )}
          </div>
        </Row>
        <hr />
      </Container>
      <hr />
      <Container
        style={{ marginTop: "10px", width: "100%", marginBottom: "20px" }}
        className="product-container"
      >
        <Form
          onSubmit={handlePostComment}
          style={{ marginTop: "10px", width: "100%" }}
        >
          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Khu Vực Bình Luận</Form.Label>
            <Form.Control
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Comments"
              as="textarea"
              rows={3}
            />
          </Form.Group>
          {btncomment}
        </Form>
      </Container>

      <hr />
      {comments.map((c) => (
        <Row className="container-row-comment">
          <Col md={1} className="col"></Col>
          <Col md={1} xs={3} className="col col-image">
            <Image
              src={c.nguoi_tao.avatar.replace("/User", "/static/User")}
              circle
              fluid
            />
          </Col>

          <Col md={9} xs={9} className="col col-text">
            <p className="fw-bold mb-1">
              {c.nguoi_tao.first_name} {c.nguoi_tao.last_name}
            </p>

            <p className="col-text-date">
              <Moment fromNow>{c.ngay_tao}</Moment>{" "}
            </p>
            <p className="col-text-content">{c.noi_dung}</p>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default ProductDetail;
