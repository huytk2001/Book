import React, { useState } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import { useSpring, animated } from "react-spring";
// Import your slider images here
import Slider1 from "../../assets/images/home-life-1.png";
import Slider2 from "../../assets/images/home-life-2.png";
import Product from "./Component/Home/Product";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [Slider1, Slider2];
  const [isAnimating, setAnimating] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${images[currentImageIndex]})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    zIndex: -1,
  };
  const fadeInUpH4Props = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    onRest: () => setAnimating(false), // Đặt isAnimating về false khi animasion hoàn thành
  });

  const fadeInUpH1Props = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    onRest: () => setAnimating(false), // Đặt isAnimating về false khi animasion hoàn thành
  });

  return (
    <>
      <Header />
      <section className="home-selection relative group overflow-hidden">
        <div
          className="w-[1280px] h-[300px] m-auto flex items-center flex-wrap"
          style={backgroundImageStyle}
        >
          <div className="w-full flex relative">
            <div className="w-[500px] h-[300px] flex flex-col justify-center">
              <animated.div style={fadeInUpH4Props}>
                <h4 className="text-[18px] font-[700] tracking-[0.1em] text-center capitalize fadeInUp">
                  chào mừng bạn đến với
                </h4>
              </animated.div>
              <animated.div style={fadeInUpH1Props}>
                <h1 className="text-[60px] uppercase text-center font-[700] mt-3 fadeInUp">
                  book havens
                </h1>
              </animated.div>
            </div>
            <div className=" opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <button
                className="prev-button absolute left-[1px] top-1/2 bg-white bg-opacity-50 h-[60px] w-[60px]    z-1 rounded-full flex items-center justify-center "
                onClick={prevImage}
              >
                <i className="fa-solid fa-chevron-left"></i>{" "}
              </button>

              <button
                className="prev-button absolute right-[1px] top-1/2 bg-white bg-opacity-50 h-[60px] w-[60px]    z-1 rounded-full flex items-center justify-center "
                onClick={nextImage}
              >
                <i className="fa-solid fa-chevron-right"></i>{" "}
              </button>
            </div>
          </div>
        </div>
      </section>
      <Product />
      <Footer />
    </>
  );
}
