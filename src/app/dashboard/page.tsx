"use client"
import MainHomeAdmin from '@/components/dashboard/MainHomeAdmin'
import { useSearchParams } from 'next/navigation';  // Dùng useSearchParams thay vì useRouter
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Page = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Kiểm tra query parameter để hiển thị thông báo nếu người dùng không có quyền truy cập
    if (searchParams.get('unauthorized') === 'true') {
      toast.error("Bạn không có quyền truy cập")
    }
  }, [searchParams]);

  return (

    <>
    <ToastContainer/>
     <MainHomeAdmin />;
    </>
  )
};

export default Page;
