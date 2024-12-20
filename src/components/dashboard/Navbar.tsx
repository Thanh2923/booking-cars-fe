"use client"
import { signOut,useSession } from "next-auth/react"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState,useEffect } from 'react'
const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession()
  const [ activeItem,setActiveItem] = useState('');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName); 
  };

  useEffect(() => {
    // Lấy phần "user-management", "product-management", etc. từ đường dẫn hiện tại
    const section = pathname.split('/')[2];
    setActiveItem(section); // Cập nhật activeItem theo pathname
  }, [pathname]); // Mỗi khi pathname thay đổi, sẽ cập nhật lại activeItem


  return (
    <div className="w-1/5 h-full fixed top-0 left-0 bg-white shadow-md p-4">
      
   <Link href="/dashboard" > <h1 className="text-2xl cursor-pointer font-bold  bg-red-100 px-5 py-5 text-red-500 mb-6">3H1D ADMIN</h1></Link>
    <ul className="space-y-4">
    <li >
      <Link onClick={()=>handleItemClick(activeItem)} href="/dashboard/product-management" className={` ${activeItem==="product-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:bg-blue-500"></span>
          Quản Lý Xe
                 </Link>
      </li>
      <li >
      <Link onClick={()=>handleItemClick(activeItem)} href="/dashboard/cars-rental-management" className={` ${activeItem==="order-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-blue-500"></span>
          Quản Lý Thuê Xe
        </Link>
      </li>
    <li >
      <Link onClick={()=>handleItemClick(activeItem)} href="/dashboard/user-management" className={` ${activeItem==="user-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-blue-500"></span>
         Quản Lý Tài Khoản
        </Link>
      </li>
      <li >
      <Link onClick={()=>handleItemClick(activeItem)} href="/dashboard/owner-management" className={` ${activeItem==="event-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-red-500 group-hover:bg-blue-500"></span>
          Quản Lý Tài Xế
        </Link>
      </li>
     
      <li >
      <Link onClick={()=>handleItemClick(activeItem)} href="/dashboard/category-management" className={` ${activeItem==="category-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-yellow-500 group-hover:bg-blue-500"></span>
          Quản lý Danh Mục Xe
        </Link>
      </li>
      <li >
      <Link onClick={()=>handleItemClick(activeItem)} href="/dashboard/event-management" className={` ${activeItem==="event-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-red-500 group-hover:bg-blue-500"></span>
          Sự kiện
        </Link>
      </li>

      <li >
      
        <div className='w-full ps-10 group cursor-pointer relative '>
             <h3 className='text-lg text-blue-500 shadow-lg py-1 '>{session?.user?.email}</h3>
             <div className='absolute group-hover:opacity-100 opacity-0  transition-opacity duration-300 ease-in-out top-10 left-10'>
                <button  onClick={() => signOut()} className='text-gray-900 font-mono'>Đăng Xuất</button>
             </div> 
        </div>
      </li>


      
     
    </ul>
  </div>
  )
}

export default Navbar
