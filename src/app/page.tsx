import { Suspense } from 'react';
import { getProducts } from '@/services/product.service';
import ProductGrid from '@/components/products/ProductGrid';

export default async function HomePage() {
	const products = await getProducts();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ProductGrid products={products} />
		</Suspense>
	);
}
