import PropertySearchForm from "@/components/PropertySearchForm";
import PropertySearchList from "@/components/propertySearchList";

const SearchPage = () => {
  return (
    <>
    {/* dark:bg-bgDark for dark mode */}
      <div className="h-20"></div>
      <PropertySearchForm />

      <PropertySearchList />

    </>
  );
};

export default SearchPage;
