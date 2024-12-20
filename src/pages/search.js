// import PropertySearchForm from "@/components/PropertySearchForm";
// import PropertySearchList from "@/components/propertySearchList";

// const SearchPage = () => {
//   return (
//     <>
//     {/* dark:bg-bgDark for dark mode */}
//       <div className="h-20"></div>
//       <PropertySearchForm />

//       <PropertySearchList />

//     </>
//   );
// };

// export default SearchPage;

// import PropertySearchForm from "@/components/PropertySearchForm";
// import PropertySearchList from "@/components/propertySearchList";

// const SearchPage = () => {
//   return (
//     <>
//       {/* dark:bg-bgDark for dark mode */}
//       <div className="flex mt-20 px-10">
//         <div className="w-2/3 mt-11">
//           <PropertySearchForm />
//         </div>
//         <div className="w-2/3">
//           <PropertySearchList />
//         </div>
//       </div>
//     </>
//   );
// };

// export default SearchPage;

import { useState } from "react";
import PropertySearchForm from "@/components/PropertySearchForm";
import PropertySearchList from "@/components/propertySearchList";

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex px-10 bg-[#fafafa]">
        {/* Search Form */}
        <div className="flex flex-col w-2/3 mt-32 lg:w-1/2">
          <PropertySearchForm />

          {/* Pagination*/}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg shadow-md ${
                    currentPage === index + 1
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Property List */}
        <div className=" lg:w-1/2  mt-24">
          <PropertySearchList
            currentPage={currentPage}
            resultsPerPage={resultsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
