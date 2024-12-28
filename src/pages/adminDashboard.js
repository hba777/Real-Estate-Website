"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UpdatePropertyList from "@/components/AdminComps/UpdatePropertyList";
import PropertySearchForm from "@/components/AdminComps/PropertySearchForm";
import AddPropertyForm from "@/components/AdminComps/AddPropertyForm";
import { PlusCircle, X, Search, RefreshCw } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

const AdminDashboard = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    toast.success(`Searching for: ${query}`);
  };

  const handleAddPropertyClick = () => {
    setShowAddPropertyForm((prev) => !prev);
  };

  const handleAddPropertySuccess = () => {
    setShowAddPropertyForm(false);
    toast.success("Property added successfully!");
    refreshProperties();
  };

  const refreshProperties = () => {
    setIsRefreshing(true);
    // Simulating a refresh action
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Properties refreshed");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <PropertySearchForm onSubmit={handleSearchSubmit} />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleAddPropertyClick}
            className={`flex items-center justify-center px-6 py-3 rounded-md transition-colors ${
              showAddPropertyForm
                ? "bg-red-500 hover:bg-red-600"
                : "bg-black hover:bg-gray-800"
            } text-white text-lg`}
          >
            {showAddPropertyForm ? (
              <>
                <X size={20} className="mr-2" />
                Cancel
              </>
            ) : (
              <>
                <PlusCircle size={20} className="mr-2" />
                Add Property
              </>
            )}
          </button>
          <button
            onClick={refreshProperties}
            className="flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-800 text-white text-lg rounded-md transition-colors"
            disabled={isRefreshing}
          >
            <RefreshCw
              size={20}
              className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {showAddPropertyForm && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Add New Property</h2>
          <AddPropertyForm onSuccess={handleAddPropertySuccess} />
        </div>
      )}

      {searchQuery && (
        <p className="text-sm text-gray-600 mt-2">
          Showing results for: &quot;{searchQuery}&quot;
        </p>
      )}
      <UpdatePropertyList searchQuery={searchQuery} />
    </div>
  );
};

export default AdminDashboard;
