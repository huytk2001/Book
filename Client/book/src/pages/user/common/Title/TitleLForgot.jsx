import { Link } from "react-router-dom"Quên mật khẩu
export default function TitleLForgot() {
    return (<>
         <section className="mt-5">
        <div className=" w-[100%] h-auto bg-them-gray z-10">
          <div className="w-[1280px] h-full m-auto flex justify-between items-center py-[32px] text-textDark">
            <div className="z-10 ">
              <h2 className="font-bold text-[24px]">Quên mật khẩu</h2>
            </div>

            <ol className="flex gap-x-[8px] font-medium text-[14px] text-text7777 ">
              <li>
                <Link to="/">
                  <i className="fa-solid fa-house text-[14px]"></i>
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right "></i>
              </li>
              <li>
                <h4 className="">Quên mật khẩu</h4>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>)
}