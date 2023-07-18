import styles from "./Tour.module.scss";
import classNames from "classnames/bind";
import Filter from "./Filter";
import ProductList from "./Product";
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import ProductLoading from "./Product/ProductLoading";
import { paginationApi, searchApi } from "~/GlobalFunction/Api";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function Tour() {
  // const [products, setProduct] = useState([]);
  const [nameTour, setNameTour] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [priceValue, setPriceValue] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id_location = queryParams.get("nameTour");
  console.log(id_location);

  const handleInput = (e) => {
    setNameTour(e.target.value);
  };
  const handleSliderChange = (event, newValue) => {
    setPriceValue(newValue);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setShouldSearch(true);
    } else {
      setShouldSearch(false);
    }
  };
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await paginationApi(currentPage);
      setTours(result.data);
      setTotalPages(result.last_page);
      
    };
    fetchData();
  }, [currentPage]);
  console.log(tours);
  const handleSearch = useEffect(() => {
    async function Search() {
      const res = await searchApi(nameTour,priceValue,id_location);
      setTours(res.tours);
    }
    Search();
  }, [shouldSearch, nameTour , priceValue,id_location]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, []);
  return (
    <div className={cx("tour-container")}>
      <form className={cx("tour-main")}>
        <div className={cx("filter-container")}>
          <Filter
            handleInput={handleInput}
            nameTour={nameTour}
            handleSearch={handleSearch}
            handleKeyPress={handleKeyPress}
            priceTour={priceValue}
            handleSliderChange={handleSliderChange}
          />
        </div>
        <div className={cx("product-container")}>
          <div className={cx("title-container")}>
            <span>
              <h1>Các tour du lịch</h1>
            </span>
          </div>
          <div className={cx("list-tour-container")}>
            {loading &&
              tours.map((product, index) => (
                <ProductList
                  key={index}
                  img={product.img_tour}
                  name={product.name_tour}
                  location="Phú quốc"
                  price={product.adult_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  des={product.content_tour}
                  id={product.id_tour}
                />
              ))}
            {!loading && tours.map(() => <ProductLoading />)}
            <Pagination
              count={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              color="primary"
              onChange={(e, page) => {
                setCurrentPage(page);
                window.scrollTo(0, 0);
              }}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Tour;
