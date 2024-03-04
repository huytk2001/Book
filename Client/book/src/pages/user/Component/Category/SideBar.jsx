import React, { useState, useEffect } from "react";

import PriceFilter from "./PriceFilter";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (categoryId) => {
    // Kiểm tra xem categoryId đã được chọn hay chưa
    if (selectedCategories.includes(categoryId)) {
      // Nếu đã chọn, loại bỏ khỏi danh sách
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((id) => id !== categoryId)
      );
    } else {
      // Nếu chưa chọn, thêm vào danh sách
      setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
    }
  };
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const toggleAccordion1 = () => {
    setIsOpen1(!isOpen1);
  };
  const toggleAccordion2 = () => {
    setIsOpen2(!isOpen2);
  };
  useEffect(() => {
    fetch("http://localhost:4000/category")
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error("Lỗi khi gọi API:", error));
  }, []);
  return (
    <>
      <div>
        <div className="profile-content w-[300px] h-auto  bg-white z-20  px-3  ">
          <div className="pr-[24px] py-4 ">
            <div className="mb-2">
              <div className="flex justify-between">
                <h4 className="text-[18px] mb-2">Danh mục</h4>
                <button
                  className="accordion-button w-"
                  type="button"
                  onClick={toggleAccordion}
                >
                  <i
                    className={`fa-solid ${
                      isOpen ? "fa-angle-up" : "fa-angle-down"
                    } text-[15px]`}
                  ></i>
                </button>
              </div>

              {isOpen && (
                <ul className="grid grid-cols-1 gap-2 overflow-hidden">
                  {categories.map((category) => (
                    <li key={category.id} className="flex items-center">
                      <NavLink to={`/filter-product/${category.id}`}>
                        <input
                          className="mr-4 w-[21px] h-[21px]  cursor-pointer"
                          type="checkbox"
                          onClick={handleCheckboxChange}
                        />
                      </NavLink>
                      <label className="w-full flex justify-between">
                        <span className="text-[16px] text-text2222">
                          {category.name}
                        </span>
                        <span className="text-[16px] text-text7777">
                          {category.quantity}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <PriceFilter />

            <div className="mb-2">
              <div className="flex justify-between">
                <h4 className="text-[18px] mb-2">Đánh giá</h4>
                <button
                  className="accordion-button w-"
                  type="button"
                  onClick={toggleAccordion1}
                >
                  <i
                    className={`fa-solid ${
                      isOpen ? "fa-angle-up" : "fa-angle-down"
                    } text-[15px]`}
                  ></i>
                </button>
              </div>

              {isOpen1 && (
                <ul className="grid grid-cols-1 gap-2 overflow-hidden">
                  <li className="flex items-center">
                    <input
                      className=" mr-4 w-[21px] h-[21px]  bg-white cursor-pointer"
                      type="checkbox"
                    ></input>
                    <div className="w-full flex justify-between">
                      <div>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px]"></i>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-solid fa-star text-yellow-400 text-[14px] ml-0.5"></i>
                      </div>
                      <span className="text-[16px] text-text7777 ">
                        (5 Sao)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <input
                      className=" mr-4 w-[21px] h-[21px]  bg-white cursor-pointer"
                      type="checkbox"
                    ></input>
                    <div className="w-full flex justify-between">
                      <div>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px]"></i>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-regular fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                      </div>
                      <span className="text-[16px] text-text7777 ">
                        (4 Sao)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <input
                      className=" mr-4 w-[21px] h-[21px]  bg-white cursor-pointer"
                      type="checkbox"
                    ></input>
                    <div className="w-full flex justify-between">
                      <div>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px]"></i>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-regular fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-regular fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                      </div>
                      <span className="text-[16px] text-text7777 ">
                        (3 Sao)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <input
                      className=" mr-4 w-[21px] h-[21px]  bg-white cursor-pointer"
                      type="checkbox"
                    ></input>
                    <div className="w-full flex justify-between">
                      <div>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px]"></i>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-regular fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-regular fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-regular fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                      </div>
                      <span className="text-[16px] text-text7777 ">
                        (2 Sao)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <input
                      className=" mr-4 w-[21px] h-[21px]  bg-white cursor-pointer"
                      type="checkbox"
                    ></input>
                    <div className="w-full flex justify-between">
                      <div>
                        <i className="fa-solid fa-star  text-yellow-400 text-[14px]"></i>
                        <i className="fa-regular fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-regular fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-regular fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                        <i className="fa-regular fa-star  text-yellow-400 text-[14px] ml-0.5"></i>
                      </div>
                      <span className="text-[16px] text-text7777 ">
                        (1 Sao)
                      </span>
                    </div>
                  </li>
                </ul>
              )}
            </div>
            <div className="mb-2">
              <div className="flex justify-between">
                <h4 className="text-[18px] mb-2">Giảm Giá</h4>
                <button
                  className="accordion-button w-"
                  type="button"
                  onClick={toggleAccordion2}
                >
                  <i
                    className={`fa-solid ${
                      isOpen ? "fa-angle-up" : "fa-angle-down"
                    } text-[15px]`}
                  ></i>
                </button>
              </div>

              {isOpen2 && (
                <ul className="grid grid-cols-1 gap-2 overflow-hidden">
                  <li className="flex items-center">
                    <input
                      className=" mr-4 w-[21px] h-[21px]  bg-white cursor-pointer"
                      type="checkbox"
                    ></input>
                    <label className="w-full flex justify-between">
                      <span className="text-[16px] text-gray-800 ">
                        Giảm 5%
                      </span>
                      <span className="text-[16px] text-text7777 ">(06)</span>
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      className=" mr-4 w-[21px] h-[21px]  bg-white cursor-pointer"
                      type="checkbox"
                    ></input>
                    <label className="w-full flex justify-between">
                      <span className="text-[16px] text-gray-800 ">5%-10%</span>
                      <span className="text-[16px] text-text7777  ">(03)</span>
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      className=" mr-4 w-[21px] h-[21px]  bg-white cursor-pointer"
                      type="checkbox"
                    ></input>
                    <label className="w-full flex justify-between">
                      <span className="text-[16px] text-gray-800 ">
                        10%-15%
                      </span>
                      <span className="text-[16px] text-text7777  ">(9)</span>
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      className=" mr-4 w-[21px] h-[21px]  bg-white cursor-pointer"
                      type="checkbox"
                    ></input>
                    <label className="w-full flex justify-between">
                      <span className="text-[16px] text-gray-800 ">
                        15%-25%
                      </span>
                      <span className="text-[16px] text-text7777  ">(10)</span>
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      className=" mr-4 w-[21px] h-[21px]  bg-white cursor-pointer"
                      type="checkbox"
                    ></input>
                    <label className="w-full flex justify-between">
                      <span className="text-[16px] text-gray-800 ">
                        Hơn 25%
                      </span>
                      <span className="text-[16px] text-text7777  ">(12)</span>
                    </label>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
