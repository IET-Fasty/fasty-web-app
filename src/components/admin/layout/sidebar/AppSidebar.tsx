'use client';

import Link from 'next/link';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import MainSidebarGroup from './MainSidebarGroup';
import Loading from './Loading';

const links = {
	mainLinks: [
		{
			title: 'Inventory',
			url: '/admin/inventory',
		},
		{
			title: 'Orders',
			url: '/admin/orders',
		},
	],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	const { isSignedIn, isLoaded } = useUser();

	const { setOpenMobile } = useSidebar();

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:p-1.5!"
						>
							<Link href="/admin/dashboard" onClick={() => setOpenMobile(false)}>
								<span className="text-base font-semibold">Fasty Admin</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<MainSidebarGroup items={links.mainLinks} />
			</SidebarContent>

			<SidebarFooter>
				{isLoaded ? (
					isSignedIn ? (
						<SignOutButton>
							<Button>Logout</Button>
						</SignOutButton>
					) : (
						<SignInButton mode="modal">
							<Button>Login</Button>
						</SignInButton>
					)
				) : (
					<Loading />
				)}
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
