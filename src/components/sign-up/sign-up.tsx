"use client";
import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form"; // Import react-hook-form
import { signIn, useSession } from "next-auth/react"; // Import signIn and useSession from next-auth
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({
  handleSignUp,
  handleShowSignIn,
  handleForgetPass,
}: {
  handleSignUp: () => void;
  handleShowSignIn: () => void;
  handleForgetPass: () => void;
}) => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Use session hook to get session info
  
  const [loading, setLoading] = useState(false); // For loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRemoveSignIn = () => {
    handleSignUp();
  };

  const handleSignIn = () => {
    handleSignUp();
    handleShowSignIn();
  };

  const forgetPassword = () => {
    handleSignUp();
    handleForgetPass();
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { email, password } = data;
  
    const res = await signIn("credentials", {
      redirect: false, // Không chuyển hướng tự động, tự điều khiển luồng
      email,
      password,
    });
  
    if (res?.error) {
      toast.error("Đăng nhập thất bại!");
      setLoading(false);
      return;
    }
    toast.success("Đăng nhập thành công!");
    setLoading(false);
    setTimeout(()=>{
      handleSignUp();
    },2000)
  };
  

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (session.user?.role_id === "admin" || session.user?.role_id === "ownerCar"  ) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [session, status]);

  return (
    <div className="opacity-95 fixed top-0 left-0 w-full h-full z-[1000] bg-black/50">
      <ToastContainer />
      <div className="w-[95%] mt-3 mx-auto lg:mt-10 lg:w-[513px] lg:mx-auto bg-white rounded-xl pt-[16px] px-[24px] pb-[32px] motion-preset-pop motion-duration-700">
        <CiCircleRemove
          onClick={handleRemoveSignIn}
          className="ml-auto font-bold text-[1.25rem] cursor-pointer"
        />
        <div className="header-title">
          <h5 className="text-center font-bold text-[1.2rem]">Đăng nhập</h5>
        </div>

        {/* Form with react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[#767676] font-semibold" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email không hợp lệ",
                },
              })}
              type="email"
              className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="email"
              id="email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[#767676] font-semibold" htmlFor="password">
              Mật khẩu
            </label>
            <input
              {...register("password", {
                required: "Mật khẩu là bắt buộc",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              })}
              type="password"
              className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="password"
              id="password"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password.message}</span>
            )}
          </div>

          {/* Forget Password Link */}
          <div className="forget-password">
            <p
              className="text-blue-600 ml-auto font-semibold hover:text-blue-700 duration-300 transition-all cursor-pointer"
              onClick={forgetPassword}
            >
              Quên mật khẩu
            </p>
          </div>

          {/* Submit Button */}
          <div className="submit-rental mt-3">
            <button
              type="submit"
              className="bg-blue-300 w-full hover:bg-blue-500/80 hover:text-white transition-all text-blue-600 font-bold rounded-xl p-[12px] cursor-pointer"
              disabled={loading} // Disable the button during loading
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>

          {/* SignUp/SignIn Toggle */}
          <div className="">
            <p className="flex items-center justify-center gap-3">
              <span className="text-[.9rem] text-slate-400">Bạn chưa là thành viên?</span>
              <span
                className="text-blue-400 text-[.9rem] cursor-pointer hover:text-blue-600"
                onClick={handleSignIn}
              >
                Đăng ký ngay
              </span>
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex items-center mt-4 gap-3">
            <button className="border-slate-300 flex items-center w-full border justify-evenly hover:border-blue-500/90 duration-300 transition-all text-black opacity-95 hover:opacity-100 font-bold rounded-xl p-[12px] cursor-pointer">
              <FaFacebookF className="text-blue-500" />
              <span>Facebook</span>
            </button>
            <button className="border-slate-300 border w-full flex items-center justify-evenly hover:border-blue-500/90 duration-300 transition-all text-black opacity-95 hover:opacity-100 font-bold rounded-xl p-[12px] cursor-pointer">
              <FcGoogle />
              <span>Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
