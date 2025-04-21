import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export const Layout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: ReactNode;
}) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex flex-col w-full overflow-x-hidden">
        <header className="flex items-center gap-6 ">
          <div className="p-4 h-[60px]">
            <SidebarTrigger />
          </div>

          <div>
            <h1>{title}</h1>
          </div>
        </header>

        <main className="flex flex-col flex-[1] p-6 mx-auto w-[1280px] max-w-full">
          {children}
        </main>
      </div>

      <ToastContainer />
    </SidebarProvider>
  );
};
