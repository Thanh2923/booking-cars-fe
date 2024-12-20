import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Lấy JWT token từ request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
   
   if(!token){
    return NextResponse.redirect(new URL('/', req.url));
   }
  // Nếu đã đăng nhập và cố gắng truy cập login/register
  if (token.role_id === "user" ) {
    return NextResponse.redirect(new URL('/', req.url)); // Chuyển hướng về trang chủ
  }

  if (token.role_id === "ownerCar" && ( pathname === '/dashboard/owner-management' || pathname === '/dashboard/category-management' || pathname === '/dashboard/event-management' )) {
    return NextResponse.redirect(new URL('/dashboard?unauthorized=true', req.url)); // Chuyển hướng về trang chủ
  }
  // Nếu người dùng có quyền, cho phép tiếp tục với yêu cầu
  return NextResponse.next();
}

// Áp dụng middleware cho tất cả các trang con trong `/dashboard/`
export const config = {
  matcher: ['/dashboard/:path*'],  // Sử dụng dấu `:path*` để áp dụng cho tất cả các trang con trong `/dashboard/`
};
