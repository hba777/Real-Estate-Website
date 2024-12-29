import UpdatePropertyList from "@/components/AdminComps/UpdatePropertyList";
import PropertySearchForm from "@/components/AdminComps/PropertySearchForm";
import { useState } from "react";

const AdminDashBoard = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  const handleSubmit = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="pt-20"> {/* Add padding to prevent overlap */}
      {/* Add spacing above the form */}
      <div className="mt-8">
        <PropertySearchForm onSubmit={handleSubmit} />
      </div>
      <UpdatePropertyList searchQuery={searchQuery} />
    </div>
  );
};

export default AdminDashBoard;
