import { Suspense } from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import ProductGridSkeleton from '@/components/products/ProductSkeletonGrid';
import { ErrorBoundary } from 'react-error-boundary';
import ProductError from '@/components/products/ProductError';
import CurrentOrdersBanner from '@/components/CurrentOrdersBanner';

export default function HomePage() {
	return (
		<ErrorBoundary FallbackComponent={ProductError}>
			<Suspense fallback={<ProductGridSkeleton />}>
				<CurrentOrdersBanner />
				<ProductGrid />
			</Suspense>
		</ErrorBoundary>
	);
}
