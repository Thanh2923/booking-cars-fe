"use client";
import { signOut } from "next-auth/react"

import React, { useEffect, useState } from "react";
import WrapContainer from "../wrapContainer/wrapContainer";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import "./header.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import clsx from "clsx";
import SignIn from "../sign-in/sign-in";
import SignUp from "../sign-up/sign-up";
import ForgetPassword from "../forgetPassword/forgetPassword";
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react"

const Header = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname.includes('/dashboard');
  const [isOpen, setIsOpen] = useState(true);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);
  const { data: session } = useSession(); // Lấy session trực tiếp
  const [currentSession, setCurrentSession] = useState(null); // State để lưu session

  useEffect(() => {
    if (session) {
      setCurrentSession(session);
    }
  }, [session]); // Chỉ chạy khi session thay đổi

  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleShowSignIn = () => {
    setSignIn(!signIn);
  };
  const handleSignIn = () => {
    setSignIn(!signIn);
  };
  const handleSignUp = () => {
    setSignUp(!signUp);
  };
  const handleShowSignUp = () => {
    setSignUp(!signUp);
  };
  const handleForgetPass = () => {
    setForgetPass(!forgetPass);
  };
   
  if(isAdminRoute){
    return
  }

  return (
    <>
      {forgetPass ? (
        <ForgetPassword
          handleForgetPass={handleForgetPass}
          handleShowSignUp={handleShowSignUp}
        />
      ) : null}
      {signUp ? (
        <SignUp
          handleSignUp={handleSignUp}
          handleShowSignIn={handleShowSignIn}
          handleForgetPass={handleForgetPass}
          handleShowSignUp={handleShowSignUp}
        />
      ) : null}
      {signIn ? <SignIn setSignIn={handleShowSignIn} setSignUp={handleShowSignUp} handleSignIn={handleSignIn} /> : null}
      <section className="header relative w-[100%] z-[999] bg-blue-600">
        <WrapContainer className="px-5">
          <header className="flex items-center justify-between py-4">
            <Link
              href="/"
              className="name text-white  flex items-center motion-preset-bounce  lg:motion-delay-300"
            >
              <img
                src="/logo/2.png"
                className="mr-2  rounded-full w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] cursor-pointer "
              />

              {/* <FaCar className="hidden lg:block text-[1.4rem] motion-preset-wobble  " /> */}
            </Link>
            <div className="iconMenu flex items-center gap-3">
            {currentSession?.user.role_id !=="user" ? "" : 
                <Link
                href="/userBooking"
                className="text-white text-[1rem] px-[16px] py-[12px] link-md overflow-hidden relative  group group motion-preset-bounce  lg:motion-delay-[500ms]"
              >
                Danh sách thuê xe
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
              </Link>}
              <Link
                href="/about"
                className="text-white text-[1rem] px-[16px] py-[12px] link-md overflow-hidden relative  group motion-preset-bounce  lg:motion-delay-[400ms]"
              >
                Về Chúng tôi
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
              </Link>
              
              <>
               {currentSession?.user.role_id ==="ownerCar" ? "" : 
                <Link
                href="/owner/register"
                className="text-white text-[1rem] px-[16px] py-[12px] link-md overflow-hidden relative  group group motion-preset-bounce  lg:motion-delay-[500ms]"
              >
                Trở thành chủ xe
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
              </Link>}
              </>
              {!currentSession ? 
              
            <>
             <Link
                onClick={handleShowSignIn}
                href=""
                className="overflow-hidden relative  group text-white text-[1rem] px-[16px] py-[12px] hidden lg:block group motion-preset-bounce  lg:motion-delay-[600ms]"
              >
                Đăng ký
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
              </Link>
              <Link
                onClick={handleShowSignUp}
                href=""
                className="text-white hover:bg-white hover:text-blue-600 duration-300 transition-all text-[1rem] px-[16px] py-[12px] hidden border rounded-md lg:block relative overflow-hidden motion-preset-bounce  lg:motion-delay-[700ms]"
              >
                Đăng nhập
              </Link>
            </> 
            :
             <ul className="relative group">
  <Link
          
          href=""
          className="text-white hover:text-white duration-300 transition-all text-[1rem] px-[16px] py-[12px] hidden border rounded-md lg:block relative overflow-hidden motion-preset-bounce  lg:motion-delay-[700ms]"
        >
          {currentSession.user?.email}
        </Link> 

        <li className="absolute w-full mt-[2px] text-blue-500 top-[100%] bg-white left-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity  duration-300 ">
        <Link
          onClick={() => signOut()}
          href=""
          className="text-blue-500 hover:bg-white hover:text-blue-600 duration-300 transition-all text-[1rem] px-[16px] py-[12px] hidden border rounded-md lg:block relative overflow-hidden motion-preset-bounce  lg:motion-delay-[700ms]"
        >
          Đăng xuất
        </Link> 

        </li>
             </ul>
           
            }
             
              <IoMdMenu
                className={clsx(
                  "text-white text-[1.7rem] cursor-pointer lg:hidden "
                )}
                onClick={handleClick}
              />
              <div
                className={clsx(
                  "dropListMenu fixed top-0 right-0 w-[100vw] h-[100vh] bg-[#dbd6d6] z-[1100] transition-all duration-300 ease-in-out",
                  isOpen ? "move-left" : ""
                )}
              >
                <div className="header_menu-left p-4 flex justify-end">
                  <CiCircleRemove
                    className="text-[2rem] cursor-pointer"
                    onClick={handleClick}
                  />
                </div>
                <div className="text-center mt-10">
                  <ul className="block">
                   {!currentSession ? 
                  <>
                    <li className="py-5 text-[1.4rem] relative overflow-hidden">
                      <Link
                        href=""
                        onClick={handleSignIn}
                        
                        className="relative inline-block before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-black before:transform before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 before:mt-2"
                      >
                        Đăng Kí
                      </Link>
                    </li>
                    <li className="py-5 text-[1.4rem] relative overflow-hidden">
                      <Link
                        onClick={handleShowSignUp}
                        href=""
                        className=" relative inline-block before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-black before:transform before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 before:mt-2"
                      >
                        Đăng nhập
                      </Link>
                    </li>
                  </>  
                  : 
                  <ul className="relative group">
                  <li className="py-5 text-[1.4rem] relative overflow-hidden">
                    <Link
                      href=""
                      className="relative inline-block before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-black before:transform before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 before:mt-2"
                    >
                      {currentSession.user?.email}
                    </Link>
                  </li>
                  <li className="py-5 text-[1.4rem] absolute top-5 left-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 overflow-hidden z-10">
                    <Link
                      href=""
                      className="relative inline-block before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-black before:transform before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 before:mt-2"
                    >
                      {currentSession.user?.email}
                    </Link>
                  </li>
                </ul>
                
                  }
                    <li className="py-5 text-[1.4rem] relative overflow-hidden">
                      <Link
                        href="/about"
                        className="relative inline-block before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-black before:transform before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 before:mt-2"
                      >
                        Về Chúng tôi
                      </Link>
                    </li>
                    <li className="py-5 text-[1.4rem] relative overflow-hidden">
                      <Link
                        href="/owner/register"
                        className="relative inline-block before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-black before:transform before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 before:mt-2"
                      >
                        Trở thành chủ xe
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu fixed bottom-0 left-0 w-[100%] py-[100px] flex justify-center gap-6  bg-blue-600">
                  <div className="w-[100px]  flex justify-center items-center h-[100px] rounded-full  bg-white motion-preset-oscillate motion-delay-300">
                    <FaFacebookF className="text-blue-600 cursor-pointer text-[2rem]" />
                  </div>
                  <div className="w-[100px] h-[100px]  flex justify-center items-center rounded-full  bg-white motion-preset-oscillate motion-delay-[400ms]">
                    <FaTwitter className="text-blue-600 cursor-pointer text-[2rem]" />
                  </div>
                  <div className="w-[100px] h-[100px]  flex justify-center items-center rounded-full  bg-white motion-preset-oscillate motion-delay-[500ms] ">
                    <SiZalo className="text-blue-600 cursor-pointer text-[2rem]" />
                  </div>
                </div>
              </div>
            </div>
          </header>
        </WrapContainer>
      </section>
    </>
  );
};

export default Header;
