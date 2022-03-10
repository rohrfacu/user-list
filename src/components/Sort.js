const React = require("react");
const { useState, useEffect } = React;
const {
  FaSortAlphaDown,
} = require("@react-icons/all-files/fa/FaSortAlphaDown");
const { FaSortAlphaUp } = require("@react-icons/all-files/fa/FaSortAlphaUp");

const Sort = ({ sortByName }) => {
  const [sortType, setSortType] = useState(false);

  // When we change the sort type, we call the sortByName function
  // in our parent component
  useEffect(() => {
    sortByName(sortType);
  }, [sortType]);

  return (
    <div className="sort-container tooltip">
      <div className="tooltip-text-right">Sort list by first name!</div>
      {/* 
        Conditionally render each icon according to the sortType 
      */}
      {sortType ? (
        <FaSortAlphaUp
          className="sort"
          onClick={() => setSortType(!sortType)}
        />
      ) : (
        <FaSortAlphaDown
          className="sort"
          onClick={() => setSortType(!sortType)}
        />
      )}
    </div>
  );
};

module.exports = Sort;
