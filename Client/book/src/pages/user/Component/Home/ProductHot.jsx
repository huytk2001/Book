import { useState } from "react";
import BgBook from "../../../../assets/images/dragon.jpg";
import BgBook2 from "../../../../assets/images/NoelDay.jpg";
import BgBook3 from "../../../../assets/images/nxbtr.jpg";
import BgBook4 from "../../../../assets/images/nglbn.jpg";
import BgBook5 from "../../../../assets/images/damnghi.jpg";
import BgLogo from "../../../../assets/images/icon_dealhot_new.png";
export default function ProductHot() {
  const [activeCategory, setActiveCategory] = useState("newProducts");

  const products = {
    newProducts: [
      { title: "Dragon Ball", image: BgBook, price: "40.000đ" },
      { title: "Dragon Ball5", image: BgBook5, price: "40.000đ" },
      // Add more new products as needed
    ],
    featuredProducts: [
      { title: "Featured Book 1", image: BgBook2, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook3, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook4, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook3, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook, price: "40.000đ" },
      // Add more featured products as needed
    ],
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  return (
    <section className="py-[30px] bg-textbg relative ">
      <div className="w-[1280px] h-auto m-auto flex items-center  bg-white  rounded-xl">
        <div className="w-full flex flex-col  ">
          <div className="title-product flex  items-center py-3 pl-4 bg-texthot  rounded-tr-[8px] rounded-tl-lg ">
            <img className="w-8 h-8 mr-4 " src={BgLogo} />
            <span className="text-[18px] uppercase font-[600] ">
              xu hướng mua sắm
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
                sách hôt giảm sốc
              </li>
            </ul>
          </div>
          <div className="container mx-auto px-[15px] pb-[20px] ">
            <div className="grid grid-cols-5 w-full gap-2 pt-10">
              {products[activeCategory].map((product, index) => (
                <div
                  key={index}
                  className="grid justify-center items-center w-full group transition-transform duration-300 transform hover:border border-gray-300 p-4"
                >
                  <img
                    className="max-h-[190px] max-w-full rounded-md overflow-hidden"
                    src={product.image}
                    alt={product.title}
                  />
                  <h6 className="leading-6 mt-4 text-[14px] text-center text-text2222 le">
                    {product.title}
                  </h6>
                  <p className="text-[16px] font-[600] text-center text-textred">
                    {product.price}
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
