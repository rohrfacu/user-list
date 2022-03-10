const React = require("react");
const { useState, useEffect } = React;
const { FaArrowRight } = require("@react-icons/all-files/fa/FaArrowRight");
const { FaArrowLeft } = require("@react-icons/all-files/fa/FaArrowLeft");

const Pagination = ({ onPageChange }) => {
  const [page, setPage] = useState(1);
  // First render boolean
  const [firstRender, setFirstRender] = useState(true);

  // When the page is changed and it's not the first render, we call
  // onPageChange function on App component, also, we check if the page
  // is less or equal than 0 and set it to 1 in that case to prevent
  // searching with this values
  useEffect(() => {
    if (!firstRender) {
      if (page <= 0) {
        setPage(1);
      } else {
        onPageChange(page);
      }
    }
  }, [page]);

  // first render bool, to prevent calling onChangeUser when we first
  // load the component
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
  }, []);

  return (
    <div className="paginator-wrapper">
      <div className="paginator-container align-left tooltip">
        <div className="tooltip-text-right">Previous page</div>
        {/* When we click this icon, we decrease the page */}
        <FaArrowLeft onClick={() => setPage(page - 1)} />
      </div>
      <div className="paginator-container align-right tooltip">
        <div className="tooltip-text-left">Next page</div>
        {/* When we click this icon, we increase the page */}
        <FaArrowRight onClick={() => setPage(page + 1)} />
      </div>
    </div>
  );
};

module.exports = Pagination;
