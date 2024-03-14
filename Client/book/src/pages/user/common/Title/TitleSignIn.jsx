import { Link } from "react-router-dom";

export default function TitleLogin() {
  return (
    <>
      <section className="mt-5">
        <div className="w-full h-auto bg-them-gray z-10">
          <div className="w-full md:w-[1280px] h-full m-auto flex flex-col md:flex-row justify-between items-center py-8 px-4 text-center md:text-left text-textDark">
            <div className="z-10 mb-4 md:mb-0">
              <h2 className="font-bold text-[19px] sm:text-[18px] md:text-[19px] lg:text-[21px] xl:text-[22px]">
                Đăng Ký
              </h2>
            </div>

            <ol className="flex flex-col md:flex-row gap-x-2 font-medium text-sm md:text-base lg:text-lg xl:text-xl text-text7777">
              <li>
                <Link to="/">
                  <i className="fa-solid fa-house text-sm md:text-base lg:text-lg xl:text-xl"></i>
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <h4 className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Đăng Ký
                </h4>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
