'use client';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CartItemsGrid from './CartItemsGrid';
import CartSummary from './CartSummary';
import useSheetFlow from '@/hooks/useSheetFlow';
import { OrderPlaced } from '../OrderPlaced';
import { SummaryTable } from '../checkout/OrderSummary';
import { NoRefundNotice } from '../checkout/NoRefundNotice';
import { CheckoutForm } from '../checkout/CheckOutForm';
import CartButton from '../navbar/CartButton';
import { useCartCount, useCartTotal } from '@/store/cart.selectors';
import { useState } from 'react';

export default function CartSheet() {
	const {
		sheetStatus,
		setSheetStatus,
		placedOrderId,
		pendingData,
		setOrderPlaced,
		setPendingData,
		setPlacedOrderId,
	} = useSheetFlow();

	const total = useCartTotal();
	const itemsCount = useCartCount();

	const [open, setOpen] = useState(false);
	const onOpenChange = (open: boolean) => {
		setOpen(open);
		if (!open) closeSheet();
	};

	const closeSheet = () => {
		setOpen(false);
		setSheetStatus('cart');
	};

	return (
		<div className="flex flex-wrap gap-2">
			<Sheet open={open} onOpenChange={onOpenChange}>
				<SheetTrigger asChild>
					<CartButton />
				</SheetTrigger>

				{sheetStatus === 'cart' ? (
					<SheetContent
						side="right"
						className="p-0 data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
					>
						<SheetHeader>
							<SheetTitle>My Cart</SheetTitle>
							<SheetDescription>Your cart items</SheetDescription>
						</SheetHeader>

						<CartItemsGrid />

						<SheetFooter>
							<CartSummary setSheetStatus={setSheetStatus} />
						</SheetFooter>
					</SheetContent>
				) : sheetStatus === 'checkout' ? (
					<SheetContent
						side="right"
						className="p-0 data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
					>
						<SheetHeader>
							<SheetTitle>Checkout</SheetTitle>
							<SheetDescription>Checkout</SheetDescription>
						</SheetHeader>

						<SummaryTable />
						<NoRefundNotice />

						<SheetFooter>
							<CheckoutForm
								pendingData={pendingData}
								setOrderPlaced={setOrderPlaced}
								setPendingData={setPendingData}
								setPlacedOrderId={setPlacedOrderId}
								setSheetStatus={setSheetStatus}
							/>
						</SheetFooter>
					</SheetContent>
				) : (
					<SheetContent
						side="right"
						className="p-0 data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
					>
						<SheetHeader></SheetHeader>

						<OrderPlaced
							orderId={placedOrderId}
							roomNo={pendingData?.roomNo ?? ''}
							totalAmount={total}
							itemCount={itemsCount}
							setSheetStatus={setSheetStatus}
							closeSheet={closeSheet}
						/>
						<SheetFooter></SheetFooter>
					</SheetContent>
				)}
			</Sheet>
		</div>
	);
}
