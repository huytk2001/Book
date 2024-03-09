import Header from "../../pages/user/common/Header";
import Product from "./Component/Category/Product";

import SideBar from "./Component/Category/SideBar";
import Footer from "../../pages/user/common/Footer";
import TitleCategory from "../user/common/Title/PriceFilter";
export default function SellerDetail() {
  return (
    <>
      <Header />

      <section className="categories-selection bg-them-gray relative group overflow-hidden mt-5 mb-5">
        <div className="w-[1280px] h-[auto] bg-them-gray m-auto flex items-center flex-wrap ">
          <div className="w-full flex relative  bg-them-gray px-3 py-4">
            <SideBar />

            <Product />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
