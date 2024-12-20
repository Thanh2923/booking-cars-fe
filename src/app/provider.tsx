'use client';
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

interface ReduxProviderProps {
  session: any; // Cần thay đổi nếu bạn có kiểu dữ liệu cụ thể cho session
  children: React.ReactNode;
}

export function ReduxProvider({ session, children }: ReduxProviderProps) {
 
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  );
}
