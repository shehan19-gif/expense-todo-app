import React from 'react';
import ReactPaginate from "react-paginate";

import '../../assets/styles/App.css';

function ReactPaginateComponent({pagination, onPageChange, showPageInfo = true, showLimitSelector = true}) {
  const {page, total, totalPages} = pagination;
  const limit = 10

  const handlePageClick = (e) => {
    onPageChange(e.selected + 1);
  };

  if(total === 0 || totalPages === 0) return null;

  return (
    <div className="reactPaginate">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    </div>
  );
};

export default ReactPaginateComponent;