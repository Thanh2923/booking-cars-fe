import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Gửi yêu cầu đăng nhập tới API backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json(); // Nhận phản hồi từ API

        if (res.ok && data.token) {
          // Trả về user và token nếu đăng nhập thành công
          return {
            id: data.user.id,
            fullName: data.user.fullName,
            email: data.user.email,
            phone: data.user.phone,
            role_id: data.user.roleName,
            token: data.token,
          };
        }
        return null; // Trả về null nếu đăng nhập thất bại
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Nếu có user (đăng nhập thành công), lưu thông tin vào token
      if (user) {
        token.id = user.id;
        token.fullName = user.fullName;
        token.email = user.email;
        token.phone = user.phone;
        token.role_id = user.role_id;
        token.accessToken = user.token; // Lưu accessToken vào token JWT
      }
      return token;
    },
    async session({ session, token }) {
      // Lưu thông tin từ token vào session để trả về client
      session.user.id = token.id,
      session.user.fullName = token.fullName;
      session.user.email = token.email;
      session.user.phone = token.phone;
      session.user.role_id = token.role_id;
      session.user.roleName = token.roleName;
      session.token = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Sử dụng JWT cho session
  },
  pages: {
    signIn: "/auth/signin", // Trang đăng nhập tùy chỉnh nếu cần
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
