import AddPropertyForm from "@/components/AdminComps/AddPropertyForm";
import UpdatePropertyList from "@/components/AdminComps/UpdatePropertyList";
import PropertySearchForm from "@/components/AdminComps/PropertySearchForm";
import { useState } from "react";

const AdminDashBoard = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  // Function to handle form submission and update the search query
  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <AddPropertyForm />
      <PropertySearchForm onSubmit={handleSearchSubmit} />
      <UpdatePropertyList searchQuery={searchQuery} />
    </>
  );
};

export default AdminDashBoard;
