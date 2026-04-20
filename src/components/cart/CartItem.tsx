import { Item, ItemContent } from '@/components/ui/item';
import { CartItem as CartItemProps } from '@/types/cart.types';
import ProductQuantitySelector from '../shared/ProductQuantitySelector';

export default function CartItem({
	productId,
	image,
	name,
	price,
	quantity,
	stock,
}: CartItemProps) {
	return (
		<Item variant="outline" className="w-90 p-0 border-none px-4 py-1 rounded-xl bg-white">
			<ItemContent>
				<div className="flex items-center gap-5">
					<img
						src={image}
						alt={name}
						className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-lg"
					/>

					<div className="flex-1">
						<h3 className="md:text-base font-semibold">{name}</h3>
						<p className="text-xs md:text-sm text-gray-500">Price: ₹{price}</p>
					</div>

					<ProductQuantitySelector
						productId={productId}
						quantity={quantity}
						stock={stock}
					/>
				</div>
			</ItemContent>
		</Item>
	);
}
