import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { MDBSpinner, MDBBtn, MDBRadio, MDBBtnGroup } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
const Detail = () => {
  const [product, setProduct] = useState(null);
  let { productId } = useParams();

  useEffect(() => {
    let loadProduct = async () => {
      try {
        let response = await Apis.get(endpoints["product_detail"](productId));
        console.log(response);
        await setProduct(response.data);
        console.log(product);
      } catch (err) {
        console.error(err);
      }
    };
    loadProduct();
  }, []);

  if (product === null)
    return (
      <div
        style={{
          marginTop: "70px",
          marginBottom: "600px",
        }}
      >
        <MDBBtn disabled>
          <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
          Waiting...
        </MDBBtn>
      </div>
    );
  return (
    <>
      <Container style={{ border: "2px solid green", marginTop: "100px" }}>
        <Row style={{ border: "2px solid red", width: "100%", height: "auto" }}>
          <Col style={{ border: "2px solid gray" }} md={4} xs={12}>
            <Image src={product.images[0].anh} rounded fluid />
          </Col>

          <Col style={{ border: "2px solid green" }} md={8} xs={12}>
            <h2>{product.ten}</h2>
            <p>Ngay tao: {product.ngay_tao}</p>
            <MDBBtnGroup>
              {product.kich_co.map((size) => {
                <MDBBtn color="info">{size.gia_tri}</MDBBtn>;
              })}
            </MDBBtnGroup>
          </Col>
        </Row>
        <hr />
        {/* <div>{product.mo_ta}</div> */}
      </Container>
    </>
  );
};
export default Detail;
