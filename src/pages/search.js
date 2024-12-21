import PropertySearchForm from "@/components/PropertySearchForm";
import PropertySearchList from "@/components/propertySearchList";

const SearchPage = () => {
  return (
    <>
      {/* dark:bg-bgDark for dark mode */}
      <div className="flex flex-col px-4 py-6 bg-[#fafafa]">
        <div className="mt-10">
          <h1
            className="text-3xl font-bold text-black leading-tight text-center"
            style={{ fontFamily: "Trirong, sans-serif" }}
          >
            Discover Your Dream Home
          </h1>
          <h2
            className="text-lg font-medium text-black italic text-center mt-2"
            style={{ fontFamily: "Trirong, sans-serif" }}
          >
            Where Elegance Meets Comfort
          </h2>
        </div>
        <div className="mt-8">
          <PropertySearchForm />
        </div>
        <div className="mt-12">
          <PropertySearchList />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
