import React, { useState, useEffect } from "react";

export default function ProductHot() {
  const [activeCategory, setActiveCategory] = useState("newProducts");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/product")
      .then((response) => response.json())
      .then((data) => {
        // Lấy dữ liệu sản phẩm từ API
        console.log(data);
        setProducts(data.data);
      })
      .catch((error) => console.error("Lỗi khi gọi API:", error));
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const formatPrice = (price) => {
    // Format giá thành chuỗi với định dạng tiền tệ
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <section className="py-[30px] bg-textbg relative ">
      <div className="w-[1280px] h-auto m-auto flex items-center  bg-white  rounded-xl">
        <div className="w-full flex flex-col  ">
          <div className="title-product flex  items-center py-3 pl-4 bg-texthot  rounded-tr-[8px] rounded-tl-lg ">
            <span className="text-[18px] uppercase font-[600] ">
              {activeCategory === "newProducts"
                ? "Sản phẩm mới"
                : "Sản phẩm giảm sốc"}
            </span>
          </div>
          <div>
            <ul className="flex flex-wrap gap-5 pl-4 border-b">
              <li
                className={`text-${
                  activeCategory === "newProducts" ? "theme-color" : "black"
                } mr-10 text-[14px] uppercase font-[500] py-[10px] cursor-pointer ${
                  activeCategory === "newProducts"
                    ? "border-b-2 border-theme-color"
                    : ""
                } `}
                onClick={() => handleCategoryClick("newProducts")}
              >
                Sản phẩm mới
              </li>
              <li
                className={`text-${
                  activeCategory === "featuredProducts"
                    ? "theme-color"
                    : "black"
                } mr-10 text-[14px] uppercase font-[500] py-[10px] cursor-pointer ${
                  activeCategory === "featuredProducts"
                    ? "border-b-2 border-theme-color"
                    : ""
                }`}
                onClick={() => handleCategoryClick("featuredProducts")}
              >
                Sản phẩm giảm sốc
              </li>
            </ul>
          </div>
          <div className="container mx-auto px-[15px] pb-[20px] ">
            <div className="grid grid-cols-5 w-full gap-2 pt-10">
              {products
                .filter((product) =>
                  activeCategory === "featuredProducts"
                    ? // Lọc ra sản phẩm giảm sốc và giảm giá 10%
                      product.price && product.price > 0 && product.price * 0.9
                    : // Lấy toàn bộ sản phẩm mới
                      true
                )
                .map((product, index) => (
                  <div
                    key={index}
                    className="grid justify-center items-center w-full group transition-transform duration-300 transform hover:border border-gray-300 p-4"
                  >
                    <img
                      className="max-h-[190px] max-w-full rounded-md overflow-hidden"
                      src={`http://localhost:4000/uploads/${product.image}`}
                      alt={product.title}
                    />
                    <h6 className="leading-6 mt-4 text-[14px] text-center text-text2222 le">
                      {product.name}
                    </h6>
                    <p className="text-[16px] font-[600] text-center text-textred">
                      {activeCategory === "featuredProducts" ? (
                        // Hiển thị phạm vi giá giảm
                        <>
                          {formatPrice(product.price * 0.9)}
                          <br />
                          <span className="line-through">
                            {formatPrice(product.price)}
                          </span>{" "}
                        </>
                      ) : (
                        // Hiển thị giá gốc
                        formatPrice(product.price)
                      )}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
