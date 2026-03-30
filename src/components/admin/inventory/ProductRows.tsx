import { Product } from '@/types/admin.types';
import ProductRow from './ProductRow';

interface ProductRowsProps {
	products: Product[];
}

const ProductRows = ({ products }: ProductRowsProps) => {
	return (
		<div>
			{/* TODO: Stop using 'index' as key... See Claude */}
			{products.map((product, index) => (
				<ProductRow key={index} serialNo={index + 1} product={product} />
			))}
		</div>
	);
};

export default ProductRows;
