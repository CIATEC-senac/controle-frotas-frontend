import {
  Bus,
  ChartLine,
  Home,
  ListChecks,
  Map,
  User,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

type AppRoutingDetails = {
  title: string;
  url: string;
  icon: any;
};

// define itens do sidebar com título, caminho e icone
const generalRoutes: AppRoutingDetails[] = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: User,
  },
  {
    title: 'Rotas',
    url: '/routes',
    icon: Map,
  },
  {
    title: 'Manutenções',
    url: '/maintenances',
    icon: Wrench,
  },
  {
    title: 'Veículos',
    url: '/vehicles',
    icon: Bus,
  },
];

const managerRoutes: AppRoutingDetails[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: ChartLine,
  },
  {
    title: 'Aprovação',
    url: '/dashboard',
    icon: ListChecks,
  },
];

const renderGroup = (items: AppRoutingDetails[], title: string) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        {renderGroup(managerRoutes, 'Gestor')}
        {renderGroup(generalRoutes, 'Admin')}
      </SidebarContent>
    </Sidebar>
  );
};
