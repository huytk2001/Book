import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Product() {
  const [activeCategory, setActiveCategory] = useState("newProducts");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  const fetchProducts = (category) => {
    setLoading(true);
    let url = "http://localhost:4000/api/product";

    if (category === "featuredProducts") {
      url += "?type=featured";
      fetchRandomFeaturedProducts(url);
    } else {
      fetchNewProducts(url);
    }
  };

  const fetchNewProducts = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const sortedProducts = data.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setProducts(sortedProducts.slice(0, 5));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching new products:", error);
        setLoading(false);
      });
  };

  const fetchRandomFeaturedProducts = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const randomFeaturedProducts = getRandomProducts(data.data, 5);
        setProducts(randomFeaturedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching random featured products:", error);
        setLoading(false);
      });
  };

  const getRandomProducts = (products, count) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <section className="py-[30px] product-selection relative">
      <div className="w-[1280px] h-auto relative m-auto flex items-center justify-between bg-white py-3">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="title-product">
            <h4 className="text-theme-color text-[18px] uppercase font-[400] pb-[10px] text-center">
              SẢN PHẨM ĐỘC QUYỀN
            </h4>
            <h2 className="text-text2222 font-[700] text-[36px] uppercase px-1 text-center leading-none tracking-wide border-b-[4px] border-theme-color mb-[50px]">
              SẢN PHẨM ĐẶC BIỆT
            </h2>
          </div>
          <div>
            <ul className="flex flex-wrap gap-5">
              <li
                className={`text-${
                  activeCategory === "newProducts" ? "theme-color" : "black"
                } text-[18px] uppercase font-[500] pb-[10px] cursor-pointer`}
                onClick={() => handleCategoryClick("newProducts")}
              >
                Sản phẩm mới
              </li>
              <li
                className={`text-${
                  activeCategory === "featuredProducts"
                    ? "theme-color"
                    : "black"
                } text-[18px] uppercase font-[500] pb-[10px] cursor-pointer`}
                onClick={() => handleCategoryClick("featuredProducts")}
              >
                Sản phẩm tiêu biểu
              </li>
            </ul>
          </div>
          <div className="container mx-auto px-[15px] pb-[20px] ">
            <div className="grid grid-cols-5 w-full gap-2 pt-10">
              {loading ? (
                <p>Loading...</p>
              ) : products.length ? (
                products.map((product) => (
                  <NavLink
                    to={`/product-detail/${product.id}`}
                    key={product.id}
                  >
                    <div className="grid justify-center items-center w-full group transition-transform duration-300 transform hover:border border-gray-300 p-4">
                      <img
                        className="max-h-[190px] max-w-full rounded-md overflow-hidden"
                        src={`http://localhost:4000/uploads/${product.image}`}
                        alt={product.title}
                      />
                      <h6 className="leading-6 mt-4 text-[14px] text-center text-text2222 le">
                        {product.name}
                      </h6>
                      <p className="text-[16px] font-[600] text-center text-textred">
                        {product.price}đ
                      </p>
                    </div>
                  </NavLink>
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
