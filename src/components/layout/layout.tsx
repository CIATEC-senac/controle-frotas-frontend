import { ReactNode } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';

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

        <main className="flex flex-col p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
};
