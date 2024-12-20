"use client";
import React, { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Register = ({
  handleHiddenRegister,
}: {
  handleHiddenRegister: () => void;
}) => {
  const [formData, setFormData] = useState({
    address: "", // Đổi từ " address" thành "address"
    nameOwnerCar: "",
    phoneNumber: "",
    car_type: "",
    license: "", // Đổi từ " license" thành "license"
  });

  const districts = [
    "Hải Châu",
    "Thanh Khê",
    "Sơn Trà",
    "Ngũ Hành Sơn",
    "Liên Chiểu",
    "Cẩm Lệ",
    "Hòa Vang",
    "Hoàng Sa",
  ];

  const { data: session, status } = useSession();
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const licenses = ["A1", "A2", "B1", "B2", "C", "D", "E", "F"]; // Các loại bằng cấp

  const handleRemoveSignIn = () => {
    handleHiddenRegister();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Tạo đối tượng dữ liệu cần gửi
    const dataToSend = {
      address: formData.address, // Sửa thành formData.address
      nameOwnerCar: formData.nameOwnerCar,
      phoneNumber: formData.phoneNumber,
      car_type: formData.car_type,
      license: formData.license, // Sửa thành formData.license
    };


    // Kiểm tra xem có token trong session không
    if (session?.token) {
      axios.post(`${baseURL}/carOwnerRequest/submit`, dataToSend, {
        headers: {
          Authorization: `Bearer ${session.token}`, // Gửi token với prefix "Bearer"
        },
      })
      .then(response => {
        toast.success("Bạn đã đăng ký thành công , vui lòng chờ kết quả");
        setTimeout(()=>{
          
          handleHiddenRegister()
        },1000)
      })
      .catch(error => {
        console.log("Error:", error);
      });
    }
  };

  return (
    <div className="opacity-95 fixed top-0 left-0 w-full h-full z-[1000] bg-black/50">
      <ToastContainer/>
      <div className="w-[95%] mt-3 mx-auto lg:mt-10 lg:w-[555px] lg:mx-auto bg-white rounded-xl pt-[16px] px-[24px] pb-[32px] motion-preset-pop motion-duration-700">
        <CiCircleRemove
          onClick={handleRemoveSignIn}
          className="ml-auto font-bold text-[1.25rem] cursor-pointer"
        />
        <div className="header-title flex flex-col gap-3">
          <h5 className="text-center text-blue-500 font-bold text-[1.2rem]">
            Đăng ký xe cho thuê
          </h5>
          <span className="text-[0.8rem] text-slate-400 text-center">
            Bạn vui lòng điền đầy đủ thông tin, MIOTO sẽ liên hệ với bạn trong
            vòng một ngày làm việc.
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-2">
            <label
              className="text-[#767676] font-semibold"
              htmlFor="address" // Sửa id và htmlFor thành "address"
            >
              Khu vực cho thuê ở Đà Nẵng
            </label>
            <select
              className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="address" // Sửa name thành "address"
              id="address" // Sửa id thành "address"
              value={formData.address}
              onChange={handleChange}
            >
              <option value="">Chọn khu vực</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-[#767676] font-semibold" htmlFor="nameOwnerCar">
                Tên chủ xe*
              </label>
              <input
                type="text"
                className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
                name="nameOwnerCar"
                id="nameOwnerCar"
                placeholder="Tên của bạn"
                value={formData.nameOwnerCar}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#767676] font-semibold" htmlFor="phoneNumber">
                Số di động*
              </label>
              <input
                type="text"
                className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Số của bạn"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#767676] font-semibold" htmlFor="car_type">
              Xe cho thuê
            </label>
            <input
              type="text"
              className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="car_type"
              id="car_type"
              placeholder="Loại xe của bạn"
              value={formData.car_type}
              onChange={handleChange}
            />
          </div>

          {/* Thêm phần chọn loại bằng cấp */}
          <div className="flex flex-col gap-2">
            <label className="text-[#767676] font-semibold" htmlFor="license">
              Loại bằng cấp
            </label>
            <select
              className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="license" // Sửa name thành "license"
              id="license" // Sửa id thành "license"
              value={formData.license}
              onChange={handleChange}
            >
              <option value="">Chọn loại bằng cấp</option>
              {licenses.map((degree, index) => (
                <option key={index} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </div>

          <div className="submit-rental mt-3">
            <button
              type="submit"
              className="bg-blue-300 w-full hover:bg-blue-500/80 hover:text-white transition-all text-blue-600 font-bold rounded-xl p-[12px] cursor-pointer"
            >
              Gửi đến chúng tôi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
