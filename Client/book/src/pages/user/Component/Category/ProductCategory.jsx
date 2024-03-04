import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/actions/cartActions";

export default function ProductCategory({ selectedItem }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Lấy ID từ tham số định tuyến
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.items);

  // const removeDuplicates = (arr) => {
  //   const uniqueProducts = [];
  //   const productIds = new Set();

  //   arr.forEach((product) => {
  //     if (!productIds.has(product.product_id)) {
  //       uniqueProducts.push(product);
  //       productIds.add(product.product_id);
  //     }
  //   });

  //   return uniqueProducts;
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/category/${id}` // Sử dụng ID từ useParams
        );
        console.log("Dữ liệu sản phẩm đã được fetch:", response.data);
        setProducts(response.data.data); // Lấy dữ liệu từ response.data.data
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]); // Thêm id vào mảng dependency để fetch lại dữ liệu khi id thay đổi

  const filteredAndSortedProducts = () => {
    let sortedProducts = [...products];

    switch (selectedItem) {
      case "Tất cả":
        // Không cần sắp xếp, trả về mảng sản phẩm nguyên thủy
        break;
      case "Thứ tự theo giá: từ thấp đến cao":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "Thứ tự theo giá: cao thấp đến thấp":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      // Thêm các trường hợp khác nếu cần thiết
      default:
        // Mặc định, không cần sắp xếp
        break;
    }

    return sortedProducts;
  };

  const handleAddToCart = async (productId) => {
    try {
      // Lấy thông tin sản phẩm từ danh sách sản phẩm
      const selectedProduct = products.find(
        (product) => product.id === productId
      );

      // Kiểm tra nếu sản phẩm được chọn có hình ảnh
      if (
        selectedProduct &&
        selectedProduct.image &&
        selectedProduct.image !== ""
      ) {
        // Lấy URL của hình ảnh
        const selectedImage = getImageUrl(selectedProduct.image);

        // Gửi action addToCart với thông tin sản phẩm và URL hình ảnh
        dispatch(addToCart({ ...selectedProduct, image_url: selectedImage }));
      }

      // Log trạng thái hiện tại của danh sách sản phẩm
      console.log("====================================");
      console.log(products);
      console.log("====================================");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
  };

  // Hàm lấy URL của hình ảnh
  const getImageUrl = (image) => {
    if (image && typeof image === "object" && image.image_url) {
      return `http://localhost:4000/${image.image_url}`;
    } else if (typeof image === "string") {
      return `http://localhost:4000/${image}`;
    }
    return ""; // Trả về URL mặc định hoặc chuỗi trống tùy thuộc vào yêu cầu
  };

  const formatPrice = (price) => {
    const formattedPrice = Number(price).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedPrice;
  };

  const handleProductClick = (productId) => {
    console.log("ID sản phẩm:", productId);
    // Các hành động bổ sung có thể được thêm vào đây
    window.scrollTo(0, 0);
  };

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : (
        <>
          {products && products.length > 0 ? (
            filteredAndSortedProducts().map((product) => (
              <div
                key={product.id}
                className="px-3 py-3 bg-them-gray group hover:group"
              >
                <div className="relative flex justify-center items-center">
                  <NavLink
                    to={`/product-detail/${product.id}`}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="w-[170px] h-[140px]">
                      {product && product.image && product.image !== "" && (
                        <img
                          className="w-full h-full object-contain border"
                          src={`http://localhost:4000/uploads/${product.image}`}
                        />
                      )}
                    </div>
                  </NavLink>
                </div>
                <div className="flex flex-col">
                  {product && product.category && product.category !== "" && (
                    <span className="mb-2 text-[13px]">{product.category}</span>
                  )}
                  <h5 className="text-[16px] text-text2222 font-normal text-center">
                    {product && product.name && product.name.length > 18
                      ? `${product.name.slice(0, 18)}...`
                      : product.name}{" "}
                  </h5>
                  <div className="w-full flex mb-2 gap-1 items-center justify-center">
                    <div className="flex gap-1 ">
                      {product &&
                        product.rating &&
                        [...Array(product.rating)].map((_, index) => (
                          <i
                            key={index}
                            className="fa-solid fa-star text-yellow text-[11px]"
                          ></i>
                        ))}
                    </div>
                  </div>
                  <div className="flex gap-2 text-center items-center justify-center">
                    <h5 className="">
                      <span className="text-[15px] text-primaryGreen font-[600]">
                        {product && product.price && formatPrice(product.price)}
                      </span>
                    </h5>
                  </div>

                  <div className="flex justify-center items-center gap-2 mb-1">
                    <h6
                      className={`text-[15px] text-center font-[600] ${
                        product && product.status === "1"
                          ? "text-primaryGreen"
                          : "text-red-500"
                      }`}
                      style={{ flex: 1 }}
                    >
                      {/* {product && product.status === "1"
                        ? `Còn hàng (${product.quantity} ${product.unit})`
                        : "Hết hàng"} */}
                    </h6>
                  </div>

                  <div className="flex items-center">
                    <button
                      className={`relative w-full bg-lineGray hover:bg-them-gray rounded-[50px] p-[8px] flex justify-center items-center gap-2 text-[16px] font-[400] hover:text-text2222 transition ${
                        product && product.status === "Hết hàng"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product && product.status === "Hết hàng"}
                    >
                      Thêm
                      <div className="absolute right-1 rounded-[50px] p-[7px] bg-white">
                        <Plus size={18} color="#0DA487" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </>
      )}
    </div>
  );
}
