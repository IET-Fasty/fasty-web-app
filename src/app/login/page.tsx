import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className="text-2xl font-bold mb-6">Login Page</h1>
			<p className="mb-4 text-gray-500">This is a mock login page.</p>
			<Link href="/">
				<Button>Go back to home</Button>
			</Link>
		</div>
	);
}
