'use client';
import { useAuthRedirect } from '@/app/_hooks/useAuthRedirect';
import { REDIRECT_PATHS } from '@/app/_constants/path';
import { Sidebar } from '@/app/(dashboard)/chat/_components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, token } = useAuthRedirect({
    isLogin: false,
    redirectPath: REDIRECT_PATHS.unauthenticated,
  });

  if (!isLoading && token)
    return (
      <div className="">
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
        <Sidebar />
        <div className="ml-[240px]">{children}</div>
      </div>
    );
}
