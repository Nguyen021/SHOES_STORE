import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <section className="border text-center mb-4">
      <h3 className="mb-5">Liên Hệ Với Chúng Tôi</h3>
      <div className="row">
        <div className="col-lg-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9250508686355!2d106.67491891447703!3d10.817047661401224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e1f241211f%3A0xc9ef195798144b1f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBN4bufIFRQLkhDTSAtIEPGoSBz4bufIDM!5e0!3m2!1svi!2s!4v1667533584866!5m2!1svi!2s"
            className="h-100 w-100"
            style={{ border: "0" }}
            loading="lazy"
          ></iframe>
        </div>
        <div className="col-lg-7">
          <form>
            <div className="row">
              <div className="col-md-8">
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="First name"
                      id="fn"
                      placeholder="First name"
                    />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      label="Last name"
                      id="ln"
                      placeholder="Last name"
                    />
                  </MDBCol>
                </MDBRow>
                <MDBInput
                  type="text"
                  label="Email của bạn"
                  id="email"
                  placeholder="Nhập email của bạn tại đây"
                  v-model="form3Subject"
                  wrapperClass="mb-4"
                />
                <MDBTextArea label="Nội dung" id="nd" wrapperClass="mb-4" />
                <MDBBtn color="primary" className="mb-4">
                  {" "}
                  Gửi{" "}
                </MDBBtn>
              </div>
              <div className="col-md-3">
                <ul className="list-unstyled">
                  <li>
                    <i className="fas fa-map-marker-alt fa-2x text-primary"></i>
                    <p>
                      <small>Gò Vấp, TP HCM, VIET NAM</small>
                    </p>
                  </li>
                  <li>
                    <i className="fas fa-phone fa-2x text-primary"></i>
                    <p>
                      <small>SĐT: 0377 888 457</small>
                    </p>
                  </li>
                  <li>
                    <i className="fas fa-envelope fa-2x text-primary"></i>
                    <p>
                      <small>1951052132nguyen@ou.edu.vn</small>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="text-center p-4 fw-bol"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05);" }}
      >
        © 2022 Copyright:
        <a className="text-reset fw-bold" href="http://127.0.0.1:8000/admin/">
          Dương Trung Nguyên
        </a>
      </div>
    </section>
  );
}
