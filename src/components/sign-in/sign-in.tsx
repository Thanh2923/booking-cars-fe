"use client";
import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form"; // Import react-hook-form
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignIn = ({
  setSignIn,
  setSignUp,
  handleSignIn
}: {
  setSignIn: () => void;
  setSignUp: () => void;
  handleSignIn: () => void;
}) => {
  // Sử dụng useForm hook từ react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async (data: any) => {
    const { phone, fullName, email, password } = data;
    try {
      // Gửi yêu cầu POST tới server
      const response = await axios.post(`${baseURL}/auth/register`, {
        fullName,
        email,
        password,
        phone
      });

      toast.success("Đăng ký thành công");
      setTimeout(() => {
        setSignIn();
        setSignUp();
      }, 2000);
    } catch (error) {
      // Kiểm tra xem lỗi có phải là từ server hay không và lấy thông báo từ backend
      if (error.response && error.response.data) {
        toast.error(`${error.response.data.message}`);
      } else {
        // Nếu không có lỗi rõ ràng từ server
        alert("Đã xảy ra lỗi, vui lòng thử lại!");
      }
    }
  };

  const handleRemoveSignIn = () => {
    handleSignIn();
  };

  // Lấy giá trị password để kiểm tra khớp
  const password = watch("password");

  return (
    <div className="opacity-95 fixed top-0 left-0 w-full h-full z-[1000]  bg-black/50">
      <ToastContainer />
      <div className="w-[95%] mt-1 mx-auto  lg:mt-0 lg:w-[513px] lg:mx-auto  bg-white rounded-xl pt-[16px] px-[24px] pb-[32px] motion-preset-pop motion-duration-700">
        <CiCircleRemove
          onClick={handleRemoveSignIn}
          className="ml-auto font-bold text-[1.25rem] cursor-pointer"
        />
        <div className="header-title">
          <h5 className="text-center font-bold text-[1.2rem]">Đăng ký</h5>
        </div>
        {/* Sử dụng handleSubmit với onSubmit */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3"
        >
          {/* Trường số điện thoại */}
          <div className="flex flex-col gap-2">
            <label className="text-[#767676] font-semibold" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              {...register("phone", { required: "Số điện thoại là bắt buộc" })}
              type="text"
              className="px-2 text-slate-600 py-[5px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="phone"
              id="phone"
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Trường tên hiển thị */}
          <div className="flex flex-col gap-2">
            <label className="text-[#767676] font-semibold" htmlFor="fullName">
              Tên hiển thị
            </label>
            <input
              {...register("fullName", {
                required: "Tên hiển thị là bắt buộc"
              })}
              type="text"
              className="px-2 text-slate-600 py-[5px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="fullName"
              id="fullName"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Trường email */}
          <div className="flex flex-col gap-2">
            <label className="text-[#767676] font-semibold" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email không hợp lệ"
                }
              })}
              type="email"
              className="px-2 text-slate-600 py-[5px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="email"
              id="email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Trường mật khẩu */}
          <div className="flex flex-col gap-2">
            <label className="text-[#767676] font-semibold" htmlFor="password">
              Mật khẩu
            </label>
            <input
              {...register("password", { required: "Mật khẩu là bắt buộc" })}
              type="password"
              className="px-2 text-[#767676] font-semibold py-[5px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="password"
              id="password"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Trường nhập lại mật khẩu */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[#767676] font-semibold"
              htmlFor="confirmPassword"
            >
              Nhập lại mật khẩu
            </label>
            <input
              {...register("confirmPassword", {
                required: "Vui lòng nhập lại mật khẩu",
                validate: (value) => value === password || "Mật khẩu không khớp"
              })}
              type="password"
              className="px-2 text-[#767676] font-semibold py-[5px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="confirmPassword"
              id="confirmPassword"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="submit-rental mt-3">
            <button className="bg-blue-300 w-full hover:bg-blue-500/80 hover:text-white  transition-all text-blue-600 font-bold rounded-xl p-[12px] cursor-pointer">
              Đăng ký
            </button>
          </div>

          <div className="flex items-center mt-4 gap-3">
            <button className="border-slate-300 flex items-center w-full border justify-evenly  hover:border-blue-500/90 duration-300 transition-all text-black opacity-95  hover:opacity-100 font-bold rounded-xl p-[12px] cursor-pointer">
              <FaFacebookF className="text-blue-500" />
              <span>Facebook</span>
            </button>
            <button className="border-slate-300 border w-full flex items-center justify-evenly  hover:border-blue-500/90 duration-300 transition-all text-black opacity-95  hover:opacity-100 font-bold rounded-xl p-[12px] cursor-pointer">
              <FcGoogle />
              <span>Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
