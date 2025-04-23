import React, { ReactNode } from 'react';
import { Link } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { AppSidebar } from '@/components/layout/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

type TitleBreadcrumb = {
  label: string;
  link?: string;
}[];

export const getBreadcrumbs = (data: TitleBreadcrumb) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {data.map(({ label, link }, index) => {
          const notLast = index < data.length - 1;

          const item =
            link != undefined ? (
              <BreadcrumbLink asChild>
                <Link to={link}>{label}</Link>
              </BreadcrumbLink>
            ) : (
              label
            );

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {!notLast ? <BreadcrumbPage>{item}</BreadcrumbPage> : item}
              </BreadcrumbItem>

              {notLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const Layout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: ReactNode;
}) => {
  title = typeof title == 'string' ? getBreadcrumbs([{ label: title }]) : title;

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex flex-col w-full overflow-x-hidden">
        <header className="flex items-center gap-6">
          <div className="p-4 h-[60px]">
            <SidebarTrigger />
          </div>

          <div className="flex-[1]">
            <h1>{title}</h1>
          </div>

          <Button variant="link" className="text-black font-normal" asChild>
            <Link to="/login">Sair</Link>
          </Button>
        </header>

        <main className="flex flex-col flex-[1] p-4 lg:p-6 mx-auto w-[1280px] max-w-full">
          {children}
        </main>
      </div>

      <ToastContainer />
    </SidebarProvider>
  );
};
