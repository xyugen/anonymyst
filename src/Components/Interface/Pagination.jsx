import React from 'react'
import '../../Assets/Styles/pagination.css'

const Pagination = ({ goToPage, page, items, totalItems }) => {
  const totalPages = Math.ceil(totalItems / items);
  const pageLinks = [];

  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(
      <li key={i} className={i === page ? "active" : ""}>
        <button onClick={() => goToPage(i)}>{i}</button>
      </li>
    );
  }

  return <ul className="pagination">{pageLinks}</ul>;
};

export default Pagination