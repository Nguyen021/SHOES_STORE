import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./Cards.scss";
export default function Cards(props) {
  return (
    <Col md={3} xs={12} className="mb-4 " style={{ width: "25%" }}>
      <Card className="card">
        <Link to={`/product/${props.obj.id}`}>
          <Card.Img
            className="card-img"
            variant="top"
            src={props.obj.images["0"].anh}
          />
        </Link>
        <Card.Body className="card-body">
          <Card.Title className="card-name">{props.obj.ten}</Card.Title>
          <Card.Text>{props.obj.gia}</Card.Text>
          <Card.Text>{props.obj.danh_muc.ten}</Card.Text>
          <Link to={`/product/${props.obj.id}`}>
            <Button variant="outline-secondary">Detail</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
