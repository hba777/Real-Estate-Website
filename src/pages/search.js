import PropertySearchForm from "@/components/PropertySearchForm";
import PropertySearchList from "@/components/propertySearchList";

const SearchPage = () => {
  return (
    <>
      {/* dark:bg-bgDark for dark mode */}
      <div className="flex px-10 bg-[#fafafa]">
        <div className="flex flex-col w-2/3 mt-28 lg:w-1/2">
          <h1
            className="text-4xl font-bold text-black leading-tight"
            style={{ fontFamily: "Trirong, sans-serif" }}
          >
            Discover Your Dream Home
          </h1>
          <h2
            className="text-1xl font-medium text-black italic"
            style={{ fontFamily: "Trirong, sans-serif" }}
          >
            Where Elegance Meets Comfort
          </h2>
          <div className="mt-10">
            <PropertySearchForm />
          </div>
        </div>
        <div className=" lg:w-1/2  mt-24">
          <PropertySearchList />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
