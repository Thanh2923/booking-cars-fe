"use client";

import React from "react";

// import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import WrapContainer from "@/components/wrapContainer/wrapContainer";
import { FcOvertime } from "react-icons/fc";
import { CiStar } from "react-icons/ci";
import { SiGoogleanalytics } from "react-icons/si";
import { BiSolidDiscount } from "react-icons/bi";
import { MdNavigateNext } from "react-icons/md";
import { useState, useEffect } from "react";
import Description from "@/components/cars/description";
import { useParams } from "next/navigation";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";
interface Product {
  _id: string;
  car_name: string;
  category_id: string;
  price_per_day: number;
  availability_status: boolean;
  image: string[];
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

const Page = () => {
  // const [date, setDate] = React.useState<Date>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalDays, setTotalDays] = useState<number | null>(0);
  const [error, setError] = useState<string | null>(null);
  const { nameCar } = useParams(); 
  const [car, setCar] = useState<Product | null>(null);
  const urlImage = process.env.NEXT_PUBLIC_API_IMAGE;
   const { data: session } = useSession(); // Lấy session trực tiếp
    const [currentSession, setCurrentSession] = useState(null); // State để lưu session
    useEffect(() => {
      if (session) {
        setCurrentSession(session);
      }
    }, [session]); // Chỉ chạy khi session thay đổi
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      const request = await axios.get(`${baseURL}/car/getCarById/${nameCar}`);
      console.log(request);
      setCar(request.data);
    };

    if (nameCar) fetchCarDetails();
  }, [nameCar]);
  const router = useRouter();

  const handleCalculateDays = () => {
    setError(null);

    if (!startDate || !endDate) {
      toast.error("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc!");
      return;
    }

    if (startDate > endDate) {
      toast.error("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
      return;
    }
    if (startDate && endDate) {
      const timeDiff = Math.abs(
        new Date(endDate).getTime() - new Date(startDate).getTime()
      );
      const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setTotalDays(totalDays); // Tính tổng số ngày
      console.log("Tổng số ngày đặt xe: ", totalDays);
      console.log(new Date(endDate).getTime(), new Date(startDate).getTime());
    }
  };

  const handleBooking = async (start: Date | null, end: Date | null) => {
    setError(null);

    if (!start || !end) {
      toast.error("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc!");
      return;
    }

    if (start > end) {
      toast.error("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
      return;
    }
    const formattedStartDate = format(start, "yyyy-MM-dd");
    const formattedEndDate = format(end, "yyyy-MM-dd");

    const bookingData = {
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      driver_option: false,
      car_id: nameCar
    };

    try {
      if(currentSession && currentSession.token){

        const response = await axios.post(`${baseURL}/booking`, bookingData, {
          headers: {
            Authorization: `Bearer ${currentSession.token}` // Gửi token với prefix "Bearer"
          }
        });
        if (response.status === 301) {
          return toast.success("Vui lòng đăng nhập để đặt xe!");
        }
        if (response.status === 401) {
          return toast.success("Vui lòng đăng kí để đặt xe!");
        }
        if (response.status === 200) {
  
          return toast.success("Thuê xe thành công!");
  
        } else if (response.status === 201) {
          toast.success("Thuê xe thành công. Đợi xát xát nhận.");
  
          setTimeout(() => {
            router.push("/userBooking");
          }, 3000); // Trì hoãn 3 giây
        }
      }else{
        toast.warning("Vui lòng đăng nhập , token hết hạn nên phải đăng nhập lại");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <section className="">
        <WrapContainer>
          <div className="cover-car p-5">
            <div className="cover-imageContainer md:flex justify-between gap-4">
              <div className="image-main">
                <img
                  src={`${urlImage}/${car?.image[0]}`}
                  alt=""
                  className="rounded-2xl object-cover opacity-90 hover:opacity-100 duration-300 transition-all cursor-pointer"
                />
              </div>
              <div className="sub-image hidden md:flex flex-col gap-2">
                <div className="item-image">
                  <img
                    src={`${urlImage}/${car?.image[1]}`}
                    alt=""
                    className="rounded-2xl lg:h-[225px] md:h-[140px] opacity-90 hover:opacity-100 duration-300 transition-all cursor-pointer lg:w-[370px] object-cover w-[350px]"
                  />
                </div>
                <div className="item-image">
                  <img
                    src={`${urlImage}/${car?.image[2]}`}
                    alt=""
                    className="rounded-2xl lg:h-[225px] md:h-[140px] opacity-90 hover:opacity-100 duration-300 transition-all cursor-pointer lg:w-[370px] object-cover w-[350px]"
                  />
                </div>
                <div className="item-image">
                  <img
                    src={`${urlImage}/${car?.image[3]}`}
                    alt=""
                    className="rounded-2xl lg:h-[225px] md:h-[140px] opacity-90 hover:opacity-100 duration-300 transition-all cursor-pointer lg:w-[370px] object-cover w-[350px]"
                  />
                </div>
              </div>
              {/* <div className='see-more_image'></div> */}
            </div>
            <div className="name-car mt-4">
              <div className=" flex flex-col justify-between md:flex-row gap-4">
                <div className="info_left md:w-[75%]">
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-3">
                      <h2 className="text-[1.2rem] lg:text-[2rem] font-bold">
                        {car?.car_name}
                      </h2>
                      {/* time choose  */}
                      <div className="share-save flex items-center gap-3">
                        <div className="search_form-item mb-2">
                          <div className="title flex items-center rounded-xl border border-red-500 cursor-pointer p-2 text-[#767676]">
                            <FcOvertime className="w-[20px] h-[20px] mr-2 md:w-[23px] md:h-[23px]" />
                            <p className="text-[14px] sm:text-[1.2rem]">
                              Chọn Thời gian thuê
                            </p>
                          </div>

                          <div className="mt-3 flex gap-4">
                            {/* Chọn ngày bắt đầu */}
                            <div className="date-start">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[280px] justify-start text-left font-normal",
                                      !startDate && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? (
                                      format(startDate, "PPP")
                                    ) : (
                                      <span>Pick a start date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            {/* Chọn ngày kết thúc */}
                            <div className="date-end">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[280px] justify-start text-left font-normal",
                                      !endDate && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? (
                                      format(endDate, "PPP")
                                    ) : (
                                      <span>Pick an end date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <button
                              className="p-2 rounded-xl bg-red-500/50 text-white hover:bg-red-500 transition-all duration-300 font-bold text-[14px]"
                              onClick={handleCalculateDays}
                            >
                              Đồng ý chọn ngày
                            </button>
                          </div>

                        </div>
                      </div>
                      {error && (
                        <div className="mt-3 text-red-500">
                          <p>{error}</p>
                        </div>
                      )}
                      {!error && (
                        <h1 className="font-bold text-red-500 text-[24px] my-2">
                          Tổng ngày thuê : {totalDays} ngày
                        </h1>
                      )}
                      <div className="info flex items-center gap-2 mt-3">
                        <div className="wrap-iconStar mr-1">
                          <CiStar className="fill-yellow-500 " />
                        </div>
                        <span className="number-star text-[#767676] font-[500] text[.75rem] mr-1">
                          5.0
                        </span>
                        <div className="wrap-analytics">
                          <SiGoogleanalytics className="text-[#5fcf86] mr-1" />
                        </div>
                        <span className="text-[#767676] font-[500] text-[13px] lg:text-[1rem]">
                          100 + Chuyến
                        </span>
                        <span className="text-[#767676] font-[500] text-[13px] lg:text-[1rem]">
                          Quận 4, TP. Hồ Chí Minh
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info_right md:w-[25%]">
                  <div className="flex items-baseline gap-2">
                    <div>
                      <img src="/insurance-polish.f54e308a.svg" alt="" />
                    </div>
                    <div>
                      <h5 className="text-[#007aff] text-[1.25rem]">
                        Bảo hiểm thuê xe
                      </h5>
                      <span className="text-[.8rem] text-slate-500">
                        Chuyến đi có mua bảo hiểm. Khách thuê bồi thường tối đa
                        2.000.000 VNĐ trong trường hợp có sự cố ngoài ý muốn.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:flex gap-4">
                <div className="carDetail  mt-8 order-1 lg:order-2 lg:w-[25%]">
                  <div className="price flex flex-col gap-2">
                    <div className="price-discount flex gap-2 items-center mb-2">
                      <del className="original text-[#c6c6c6]">689K</del>
                      <div className="discount">
                        <span className="px-2 py-1 bg-orange-600 text-black font-semibold rounded-xl">
                          20%
                        </span>
                      </div>
                    </div>
                    <h4 className="flex items-baseline gap-2">
                      <span className="font-bold text-[2rem]">
                        {car?.price_per_day.toLocaleString("vi-VN")}
                      </span>
                      <span className="text-slate-500 text-[1.25rem]">
                        {" "}
                        /ngày
                      </span>
                    </h4>
                  </div>

                  <div className="p-3 dropdown-form gap-[15px] mt-7 border-[0.5px] border-slate-300 rounded-2xl">
                    <label className="text-[#333] font-[500] text-[0.87rem]">
                      Địa điểm giao xe
                    </label>
                    <div className="wrap-from">
                      <span className="address font-[600] text-[1rem]">
                        Quận 4, TP. Hồ Chí Minh
                      </span>
                    </div>
                    <p className="note text-[.88rem] text-[#333]">
                      Rất tiếc, chủ xe không hỗ trợ giao xe tận nơi
                    </p>
                  </div>
                  <div className="p-3 dropdown-form gap-[20px] mt-7 border-[0.3px] border-slate-300 rounded-2xl">
                    <p className=" font-[500] text-[0.87rem] flex items-center justify-between">
                      <span className="text-[#5a5959]">Đơn giá thuê</span>
                      <span className="text-[#333] font-semibold">
                        {car?.price_per_day.toLocaleString("vi-VN")} K / ngày
                      </span>
                    </p>
                    <p className=" font-[500] text-[0.87rem] flex items-center justify-between">
                      <span className="text-[#5a5959]">Tổng ngày thuê</span>
                      <span className="text-[#333] font-semibold">
                        {totalDays} ngày
                      </span>
                    </p>
                    <p className=" font-[500] text-[0.87rem] flex items-center justify-between">
                      <span className="text-[#5a5959]">Tổng cộng</span>
                      <span className="text-[#333] font-semibold">
                        {car?.price_per_day.toLocaleString("vi-VN")} đ x{" "}
                        {totalDays} ngày
                      </span>
                    </p>
                  </div>
                  {/* sale */}
                  <div className="p-3 dropdown-form gap-[20px] mt-7 border-[0.3px] border-slate-300 rounded-2xl">
                    <div className="font-[500] text-[0.87rem] flex items-center justify-between">
                      <div className="text-[#5a5959] flex flex-col items-end gap-1">
                        <div className="flex gap-1 items-center cursor-pointer">
                          <BiSolidDiscount className="text-green-500" />
                          <span>Chương trình giảm giá</span>
                        </div>
                        <span className="pl-2 text-[12px]">
                          Giảm 120K trên đơn giá
                        </span>
                      </div>
                      <span className="text-[#333] font-semibold">
                        120 000 <sub>vnd</sub>
                      </span>
                    </div>
                    <div className="font-[500] mt-3 text-[0.87rem] flex items-center justify-between">
                      <div className="text-[#5a5959] flex flex-col items-end gap-1">
                        <div className="flex gap-1 items-center cursor-pointer">
                          <BiSolidDiscount className="text-green-500" />
                          <span>Code giảm giá</span>
                        </div>
                      </div>
                      <span className="text-[#333] font-semibold">
                        <MdNavigateNext className="text-[1.4rem] cursor-pointer" />
                      </span>
                    </div>
                  </div>
                  {/* total price  */}
                  <div className="total-price items-center mt-4 flex justify-between">
                    <p className="text-[1rem] font-bold">Thành tiền</p>
                    <p className="cost">
                      <span className="text-[1rem] text-red-500 font-bold">
                        {(car?.price_per_day * totalDays).toLocaleString(
                          "vi-VN"
                        )}
                        <sub>vnd</sub>
                      </span>
                    </p>
                  </div>
                  <div className="submit-rental mt-3">
                    <button
                      onClick={() => handleBooking(startDate, endDate)}
                      className="bg-slate-300/80 w-full hover:bg-blue-500/80 hover:text-white duration-300 transition-all text-slate-400 font-bold rounded-xl p-[12px] cursor-pointer"
                    >
                      Chọn thuê
                    </button>
                  </div>
                </div>
                <Description />
              </div>
              {/*  */}
            </div>
          </div>
        </WrapContainer>
      </section>
    </>
  );
};
export default Page;
