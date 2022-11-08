import React from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

export default function Paginate() {
  return (
    <nav aria-label="Page navigation example">
      <MDBPagination center className="mb-0">
        <MDBPaginationItem disabled>
          <MDBPaginationLink href="#" tabIndex={-1} aria-disabled="true">
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink href="#">1</MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink href="#">2</MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink href="#">3</MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink href="#">Next</MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </nav>
  );
}
