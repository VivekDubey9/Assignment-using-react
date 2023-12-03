import React from "react";

import "./Pagination.css"; //some css to look good

//writing pagination logic here as react arrow function component.......

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination justify-content-end">
        <div className="page-info mr-4">
          Page {currentPage} of {Math.ceil(totalPosts / postsPerPage)} selected
        </div>
        <button
          className="btn btn-outline-secondary first-page"
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="btn btn-outline-secondary previous-page"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`btn btn-outline-secondary ml-2 ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}

        <button
          className="btn btn-outline-secondary next-page"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
        >
          Next
        </button>
        <button
          className="btn btn-outline-secondary last-page"
          onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))}
          disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
        >
          Last
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
