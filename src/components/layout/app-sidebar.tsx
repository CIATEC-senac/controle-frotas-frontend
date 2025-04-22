import {
  Bus,
  ChartLine,
  Home,
  Map,
  User as UserIcon,
  Wrench,
} from 'lucide-react';
import { useQuery } from 'react-query';
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
import { User, UserRole } from '@/models/user.type';

type AppRoutingDetails = {
  title: string;
  url: string;
  icon: any;
};

const generalRoutes: AppRoutingDetails[] = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
];

// define itens do sidebar com título, caminho e icone
const adminRoutes: AppRoutingDetails[] = [
  {
    title: 'Usuários',
    url: '/users',
    icon: UserIcon,
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
];

const RenderGroup = ({
  items,
  title,
  roles,
}: {
  items: AppRoutingDetails[];
  title?: string;
  roles?: UserRole[];
}) => {
  const { data: user } = useQuery<User>(['user']);

  console.log(title, roles, user?.role);

  if (roles?.length && !roles.includes(user?.role!)) {
    return null;
  }

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
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
        <RenderGroup items={generalRoutes} />

        <RenderGroup
          title="Gestor"
          roles={[UserRole.ADMIN, UserRole.MANAGER]}
          items={managerRoutes}
        />

        <RenderGroup
          title="Administrador"
          roles={[UserRole.ADMIN]}
          items={adminRoutes}
        />
      </SidebarContent>
    </Sidebar>
  );
};
