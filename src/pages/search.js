import PropertySearchCard from "@/components/PropertySearchCard";
import PropertySearchList from "@/components/propertySearchList";
const SearchPage = () => {
  return (
    <>
    {/* dark:bg-bgDark for dark mode */}
      <div className="h-20"></div>
      <PropertySearchCard />

      <PropertySearchList />
    </>
  );
};

export default SearchPage;
