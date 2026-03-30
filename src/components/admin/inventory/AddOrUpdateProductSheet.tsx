'use client';

import { useState } from 'react';
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addProduct, updateProduct } from '@/services/admin/inventory.services';

interface AddOrUpdateProductSheetProps {
	isEdit: boolean;
	productId?: string;
	productImageUrl?: string;
	productName?: string;
	productPrice?: number;
	productStock?: number;
	children?: React.ReactNode;
}

const AddOrUpdateProductSheet = ({
	isEdit,
	productId,
	productImageUrl,
	productName,
	productPrice,
	productStock,
	children,
}: AddOrUpdateProductSheetProps) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [imageUrl, setImageUrl] = useState(productImageUrl || '');
	const [name, setName] = useState(productName || '');
	const [price, setPrice] = useState(productPrice || 0);
	const [stock, setStock] = useState(productStock || 0);

	const handleAdd = async () => {
		if (name.trim().length === 0) return;
		if (price < 0) return;
		if (stock < 0) return;

		setIsAdding(true);
		await addProduct(imageUrl, name, price, stock);
		setIsAdding(false);
		setDrawerOpen(false);
	};

	const handleEdit = async () => {
		if (!productId) return;
		if (name.trim().length === 0) return;
		if (price < 0) return;
		if (stock < 0) return;

		setIsEditing(true);
		await updateProduct(productId, imageUrl, name, price, stock);
		setIsEditing(false);
		setDrawerOpen(false);
	};

	return (
		<Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
			<DrawerTrigger asChild>
				{children ? (
					children
				) : (
					<Button variant="outline" size="default">
						Add Product
					</Button>
				)}
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader className="gap-1">
					<DrawerTitle>{isEdit ? 'Edit Product' : 'Add Product'}</DrawerTitle>
					<DrawerDescription>Add the product to the inventory</DrawerDescription>
				</DrawerHeader>

				<div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
					<Separator />

					<form className="flex flex-col gap-4">
						<div className="flex flex-col gap-3">
							<Label htmlFor="title">Image URL</Label>
							<Input
								id="image"
								type="url"
								placeholder="Image URL (Supabase Bucket)"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-3">
							<Label htmlFor="title">Name</Label>
							<Input
								id="name"
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-3">
							<Label htmlFor="title">Price</Label>
							<Input
								id="price"
								placeholder="Price"
								type="number"
								min={0}
								value={price}
								onChange={(e) => setPrice(Number(e.target.value))}
							/>
						</div>

						<div className="flex flex-col gap-3">
							<Label htmlFor="title">Stock</Label>
							<Input
								id="stock"
								placeholder="Stock"
								type="number"
								min={0}
								value={stock}
								onChange={(e) => setStock(Number(e.target.value))}
							/>
						</div>
					</form>
				</div>

				<DrawerFooter className="flex gap-2">
					<Button
						onClick={isEdit ? handleEdit : handleAdd}
						disabled={isAdding || isEditing}
					>
						{isEdit
							? isEditing
								? 'Updating...'
								: 'Update'
							: isAdding
								? 'Adding...'
								: 'Add'}
					</Button>

					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default AddOrUpdateProductSheet;
