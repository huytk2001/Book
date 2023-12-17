import Footer from "./Footer";
import Header from "./Header";
import Slider1 from "../../../assets/images/home-life-1.png";
import Slider2 from "../../../assets/images/home-life-2.png";

export default function Home() {
  return (
    <>
      <Header />
      <section>
        <button>
          <i class="fa-solid fa-angle-left"></i>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className=" w-full h-auto m-auto flex items-center">
          <img src={Slider1} alt="" className="w-full" />
          <img src={Slider2} alt="" className="w-full" />

          <div className="absolute top-1/2 left-60 transform -translate-x-1/2 -translate-y-1/2 text-center text-text2222">
            <h4>Chào mừng bạn đến với thiên đường Sách</h4>
            <h1>NHỮNG CUỐN SÁCH TUYỆT VỜI</h1>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
