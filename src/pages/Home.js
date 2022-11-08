import { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";
import { Button, ButtonGroup, Container, Pagination } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";

import Cards from "../layouts/Cards";
import Paginate from "./Paginate";

export default function Home() {
  const [product, setProduct] = useState([]);

  const location = useLocation();

  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      let query = location.search;

      if (query === "") query = `?page=${page}`;
      else query += `&page=${page}`;
      try {
        let response = await Apis.get(`${endpoints["products"]}${query}`);
        //console.log("RESPONSE DATA", response.data);
        // console.log(" IMAGES: ", response.data.results["0"].images["0"]);
        setProduct(response.data.results);

        setNext(response.data.next !== null);
        setPrev(response.data.previous !== null);
      } catch (error) {
        console.error(error);
      }
    };
    loadProduct();
  }, [location.search, page]);

  const pagination = (increase) => {
    setPage(page + increase);
  };

  return (
    <>
      <Container style={{ height: "auto", marginTop: "100px" }}>
        <Row>
          {product.map((p) => (
            <Cards obj={p} />
          ))}
        </Row>
        <Row></Row>
      </Container>
      <ButtonGroup
        aria-label="Basic example"
        style={{ width: "6rem", marginTop: "auto", marginLeft: "50px" }}
      >
        <Button
          variant="secondary"
          disabled={!prev}
          onClick={() => pagination(-1)}
        >
          Prev
        </Button>
        <Button
          style={{ marginLeft: "1px" }}
          variant="secondary"
          disabled={!next}
          onClick={() => pagination(1)}
        >
          Next
        </Button>
      </ButtonGroup>
      {/* <div>{<Paginate />}</div> */}
    </>
  );
}
