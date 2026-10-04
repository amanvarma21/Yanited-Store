import ProductList from "../Components/ProductList";
import { useSearch } from "../Context/SearchContext";

export default function Home() {
  // Search text now comes from the navbar via SearchContext.
  const { search } = useSearch();

  return (
    <div className="page">
      <div className="container">
        <h2 className="PageContent">Jerseys</h2>
        {/* ProductList is a class component that fetches and renders products */}
        <ProductList search={search} />
      </div>
    </div>
  );
}
