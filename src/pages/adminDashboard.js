import AddPropertyForm from "@/components/AdminComps/AddPropertyForm";
import UpdatePropertyList from "@/components/AdminComps/UpdatePropertyList";
import PropertySearchForm from "@/components/AdminComps/PropertySearchForm";
import { useState } from "react";

const AdminDashBoard = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  const handleSubmit = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <AddPropertyForm />
      <PropertySearchForm onSubmit={handleSubmit} />
      <UpdatePropertyList searchQuery={searchQuery} />
    </>
  );
};

export default AdminDashBoard;
