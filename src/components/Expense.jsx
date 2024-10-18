/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { sortByAmount } from "../utils/sortData";
import DataRow from "./DataRow";

const Expense = ({ expenses, onEdit, onDelete }) => {
  const [sortShow, setSortShow] = useState(false);
  const [sortedExpense, setSortedExpenses] = useState(expenses);
  const [isFilterShow, setISFilterShow] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [categories, setCategories] = useState([]);
  const handleSort = (order) => {
    const sortedData = sortByAmount([...expenses], order);
    setSortedExpenses(sortedData);
    setSortShow(!sortShow);
  };

  //  unique categories extract from data
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(expenses.map((item) => item.category)),
    ];
    setCategories(uniqueCategories);
  }, [expenses]);
  // Function to handle filter changes
  const handleFilterChange = (category) => {
    if (selectedFilters.includes(category)) {
      // If category is already selected, remove it
      setSelectedFilters(selectedFilters.filter((item) => item !== category));
    } else {
      // Otherwise, add the category
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  // Update sortedExpense when filters change
  useEffect(() => {
    const filterData = () => {
      if (selectedFilters.length === 0) {
        // If no filters are selected, show all data
        return expenses;
      }
      // Filter data based on selected categories
      return expenses.filter((item) => selectedFilters.includes(item.category));
    };
    setSortedExpenses(filterData());
  }, [selectedFilters, expenses]);

  return (
    <div className="border rounded-md">
      {/* <!-- Header --> */}
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          {/* <!-- Icon --> */}
          <div className="h-10 w-10 bg-pink-600 text-white rounded-md text-center object-center place-content-center text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17 8v-3a1 1 0 0 0 -1 -1h-8m-3.413 .584a2 2 0 0 0 1.413 3.416h2m4 0h6a1 1 0 0 1 1 1v3" />
              <path d="M19 19a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
              <path d="M16 12h4v4m-4 0a2 2 0 0 1 -2 -2" />
              <path d="M3 3l18 18" />
            </svg>
          </div>
          {/* <!-- Text --> */}
          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              Expense
            </h3>
          </div>
        </div>

        {/* <!-- Sorting and Filtering Column --> */}
        <div>
          {/* <!-- Sorting --> */}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setSortShow(!sortShow)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-sort-descending"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 6l9 0" />
                  <path d="M4 12l7 0" />
                  <path d="M4 18l7 0" />
                  <path d="M15 15l3 3l3 -3" />
                  <path d="M18 6l0 12" />
                </svg>
              </button>
            </div>
            {sortShow && (
              <div
                className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <button
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                    onClick={() => handleSort("asc")}
                  >
                    Low to High
                  </button>
                  <button
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                    onClick={() => handleSort("desc")}
                  >
                    High to Low
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* <!-- Filtering --> */}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="filter-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setISFilterShow(!isFilterShow)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-alt"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 8h4v4h-4z" />
                  <path d="M6 4l0 4" />
                  <path d="M6 12l0 8" />
                  <path d="M10 14h4v4h-4z" />
                  <path d="M12 4l0 10" />
                  <path d="M12 18l0 2" />
                  <path d="M16 5h4v4h-4z" />
                  <path d="M18 4l0 1" />
                  <path d="M18 9l0 11" />
                </svg>
              </button>
            </div>
            {isFilterShow && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="filter-button"
                tabIndex="-1"
                id="filter-dropdown"
              >
                <div className="py-1" role="none">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                        id="filter-option-1"
                        onChange={() => handleFilterChange(category)}
                      />
                      <span className="ml-2">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <!-- Sorting and Filtering Column Ends --> */}
      </div>

      <div className="p-4 divide-y">
        {/* <!-- Expense Row 1 --> */}
        {sortedExpense.map((data) => (
          <DataRow
            key={data.id}
            data={data}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Expense;
