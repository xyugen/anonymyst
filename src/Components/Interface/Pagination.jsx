import React, { useState } from 'react'

const Pagination = ({ totalItems }) => {
    const [page, setPage] = useState(1);
    const items = 3;

    const totalPages = Math.ceil(totalItems / items);
    const pages = [...Array(totalPages).keys()].map((i) => i + 1);
    
    const goToPage = (newPage) => {
        setPage(newPage);
    };

    return (
        <nav>
            <ul className="pagination">
            {pages.map((pageNumber) => (
                <li key={pageNumber} className="page-item">
                <button
                    className="page-link"
                    onClick={() => goToPage(pageNumber)} >
                    {pageNumber}
                </button>
                </li>
            ))}
            </ul>
        </nav>
    );
}

export default Pagination