import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.pathname;

  // Kiểm tra đường dẫn
  if (url.startsWith("/dashboard")) {
    const response = NextResponse.next();
    response.headers.set("x-hide-header-footer", "true"); // Thêm header để báo hiệu
    return response;
  }

  return NextResponse.next();
}
