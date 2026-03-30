import { Button } from '@/components/ui/button';
import { Item, ItemContent } from '@/components/ui/item';
import { ButtonGroup } from '../ui/button-group';
import { Item as _Item } from '@/types/cart.types';
import useCartStore from '@/store/cart.store';

export default function CartItem({ product_id, image, name, price, quantity, stock }: _Item) {
	const { updateQuantity, removeItem } = useCartStore();

	return (
		<Item
			variant="outline"
			className="w-[360px] p-4 rounded-xl bg-white"
			style={{ margin: '10px' }}
		>
			<ItemContent>
				<div className="flex items-center gap-5">
					<img src={image} alt={name} className="w-20 h-20 object-cover rounded-lg" />

					<div className="flex-1">
						<h3 className="text-base font-semibold">{name}</h3>
						<p className="text-sm text-gray-500">Price: ₹{price}</p>
					</div>

					<ButtonGroup className="h-10 px-5 rounded-lg">
						<Button
							variant="outline"
							disabled={quantity === 0}
							onClick={() =>
								quantity === 1
									? removeItem(product_id)
									: updateQuantity(product_id, quantity - 1)
							}
						>
							-
						</Button>
						<Button variant="outline">{quantity}</Button>
						<Button
							variant="outline"
							onClick={() => updateQuantity(product_id, quantity + 1)}
						>
							+
						</Button>
					</ButtonGroup>
				</div>
			</ItemContent>
		</Item>
	);
}
