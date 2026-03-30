'use client';

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const Home = () => {
	const { isLoaded, isSignedIn } = useUser();

	return (
		<div>
			<Link href="/admin/inventory">admin</Link>
			<Separator />
			{isLoaded ? isSignedIn ? <SignOutButton /> : <SignInButton /> : 'Loading...'}
		</div>
	);
};

export default Home;
