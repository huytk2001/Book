import { useState, useRef, useEffect } from "react";
import { Upload } from "react-feather";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import AddressForm from "./Component/AddressForm";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";

const ProfileUser = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [errors, setErrors] = useState({});

  const { userId } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    status: "",
    image: "",
    role: "",
    phone: "",
  });

  const [image, setImage] = useState(null);
  const imageInputRef = useRef();

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login/user");
          return;
        }
        console.log("UserId:", userId);
        const response = await axios.get(
          `http://localhost:4000/api/account/${userId}`
        );
        const { name, email, image, role, status, shipping_address, phone } =
          response.data.result.result;

        console.log("Role:", role); // Log tên vai trò ở đây
        console.log(response.data);
        setUser({ name, email, image, role, status, shipping_address, phone });
        setSelectedImage(image);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin danh mục:", error);
      }
    };

    fetchUser();
  }, [userId]);

  //   const handleClose = async () => {
  //     window.history.back();
  //   };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Assuming you're using FileReader to read the selected file
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      setPreviewImage(imageDataUrl);
      setImage(file); // Set the image file
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setUser({ ...user, status });
  };

  const handleAddAddress = () => {
    setIsFormVisible(true);
  };

  const onHideForm = () => {
    setIsFormVisible(false);
  };

  const handleSaveAddress = async (newAddress) => {
    try {
      // Xử lý lưu địa chỉ vào cơ sở dữ liệu
      console.log("Saved address:", newAddress);

      // Sau khi lưu xong, ẩn form
      setIsFormVisible(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu người dùng:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-auto">
        <div className="w-[1280px] h-auto m-auto">
          <div className="bg-white w-full h-auto p-6">
            <h2 className="text-xl font-bold mb-4">Hồ sơ cá nhân</h2>
            <form>
              <div className="image-text h-auto pb-5 grid grid-cols-2 gap-9">
                <div className="image w-full h-auto flex flex-col gap-6">
                  {/* Hình ảnh */}
                  <div className="">
                    <h2 className="text-[18px] font-bold text-left">
                      Hình ảnh
                    </h2>

                    <label htmlFor="" className="flex flex-col items-center">
                      <div className="relative w-[125px] h-[125px] border mb-4 rounded-[4px]">
                        <img
                          src={
                            previewImage ||
                            `http://localhost:4000/${selectedImage}`
                          }
                          alt="Hình ảnh đã được thêm"
                          className="w-full h-full object-cover rounded-[4px]"
                        />

                        <div className="rounded-[4px] absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                          <label htmlFor="fileInput" className="cursor-pointer">
                            <Upload className="text-white w-6 h-6" />
                          </label>
                        </div>
                      </div>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                        className="mb-4 hidden"
                      />
                      {errors.image && (
                        <div className="text-red-500 text-[12px]">
                          {errors.image}
                        </div>
                      )}
                    </label>
                    <p className="text-[12px] text-center">
                      Đặt hình ảnh thu nhỏ danh mục. Chỉ chấp nhận các tệp hình
                      ảnh *.png, *.jpg và *.jpeg
                    </p>
                  </div>

                  {/* Phương thức thanh toán */}
                  <div className="payment-method w-full h-auto flex flex-col gap-3">
                    <h3 className="text-[18px] text-textBlack font-bold">
                      Phương thức thanh toán
                    </h3>
                    <div className="list-method flex flex-col gap-2">
                      <div className="method-detail border-b border-b-textBlack border-dashed py-2 flex justify-start items-center gap-4">
                        <input type="checkbox" defaultChecked name="" id="" />
                        <div className="">
                          <h4 className="text-[14px] text-textBlack font-medium">
                            Thanh toán khi nhận hàng
                          </h4>
                          <p className="text-[12px] text-textGray font-normal">
                            Thanh toán an toàn và thuận lợi khi nhận hàng tại
                            địa chỉ mong muốn. Chỉ thanh toán khi bạn hài lòng
                            với sản phẩm.{" "}
                          </p>
                        </div>
                      </div>

                      <div className="method-detail border-b border-b-textBlack border-dashed py-2 flex justify-start items-center gap-4">
                        <input disabled type="checkbox" name="" id="" />
                        <div className="">
                          <h4 className="text-[14px] text-textBlack font-medium">
                            Thanh toán qua ví điện tử
                          </h4>
                          <p className="text-[12px] text-textGray font-normal">
                            Thanh toán nhanh chóng và tiện lợi với ví điện tử.
                            Sử dụng ứng dụng ví để thanh toán mà không cần mang
                            theo tiền mặt.{" "}
                          </p>
                        </div>
                      </div>

                      <div className="method-detail py-2 flex justify-start items-center gap-4">
                        <input disabled type="checkbox" name="" id="" />
                        <div className="">
                          <h4 className="text-[14px] text-textBlack font-medium">
                            Thanh toán qua ngân hàng
                          </h4>
                          <p className="text-[12px] text-textGray font-normal">
                            Thanh toán an toàn và minh bạch thông qua chuyển
                            khoản ngân hàng. Nhận thông tin tài khoản ngân hàng
                            để chuyển khoản sau khi đặt hàng.{" "}
                          </p>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                  </div>

                  {/* Phương thức thanh toán */}
                  <div className="address w-full h-auto flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[18px] text-textBlack font-bold">
                        Địa chỉ giao hàng
                      </h3>

                      <button
                        type="button"
                        onClick={handleAddAddress}
                        className={`py-2 px-4 rounded ${
                          user.shipping_address
                            ? "bg-yellow"
                            : "bg-primaryGreen"
                        } text-white`}
                      >
                        {user.shipping_address
                          ? "Sửa địa chỉ"
                          : "Thêm địa chỉ mới"}
                      </button>
                    </div>
                    {isFormVisible ? (
                      <AddressForm
                        onAddAddress={handleSaveAddress}
                        onHideForm={onHideForm}
                      />
                    ) : (
                      user.shipping_address && (
                        <div className="flex flex-col gap-3">
                          <div>
                            <span className="bg-primaryGreen text-[12px] text-white font-semibold rounded-[5px] p-2">
                              Mặc định
                            </span>
                          </div>
                          <div>
                            <p className="text-[14px] font-normal">
                              Địa chỉ: {user.shipping_address}
                            </p>
                            <p className="text-[14px] font-normal">
                              Số điện thoại: {user.phone}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="text  w-full flex flex-col gap-5">
                  <h2 className="text-[18px] font-bold text-left">Thông tin</h2>

                  <label htmlFor="" className="flex flex-col gap-2 text-[14px]">
                    <div className="flex gap-1">
                      <h3 className=""> Tên người dùng</h3>
                      <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nhập tên người dùng..."
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      readOnly
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
                    />
                    {errors.name && (
                      <div className="text-red-500 text-[12px]">
                        {errors.name}
                      </div>
                    )}
                  </label>

                  <label htmlFor="" className="flex flex-col gap-2 text-[14px]">
                    <div className="flex gap-1">
                      <h3 className="">Địa chỉ email</h3>
                      <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Nhập địa chỉ email..."
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      readOnly
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
                    />
                    {errors.email && (
                      <div className="text-red-500 text-[12px]">
                        {errors.email}
                      </div>
                    )}
                  </label>

                  <label htmlFor="" className="flex flex-col gap-2 text-[14px]">
                    <div className="flex gap-1">
                      <h3 className="">Trạng thái</h3>
                      <span className="text-red-500">*</span>
                    </div>
                    <select
                      name="status"
                      value={user.status}
                      onChange={handleStatusChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
                    >
                      <option value={user.status}>{user.status}</option>
                    </select>
                    {errors.status && (
                      <div className="text-red-500 text-[12px]">
                        {errors.status}
                      </div>
                    )}
                  </label>

                  <label htmlFor="" className="flex flex-col gap-2 text-[14px]">
                    <div className="flex gap-1">
                      <h3 className="">Vai trò</h3>
                      <span className="text-red-500">*</span>
                    </div>
                    <select
                      name="role"
                      value={user.role}
                      onChange={(e) =>
                        setUser({ ...user, role: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
                    >
                      {" "}
                      <option value={user.role}>{user.role}</option>
                    </select>
                    {errors.role && (
                      <div className="text-red-500 text-[12px]">
                        {errors.role}
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileUser;
