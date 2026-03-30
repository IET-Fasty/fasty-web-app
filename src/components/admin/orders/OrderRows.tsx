// OrderRows.tsx
import OrderRow from './OrderRow';
import { OrderWithDetails } from '@/types/admin.types';

interface OrderRowsProps {
	orders: OrderWithDetails[]; // assumed sorted by created_at descending
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDayLabel(isoString: string): string {
	const date = new Date(isoString);
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);

	const isSameDay = (a: Date, b: Date) =>
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate();

	if (isSameDay(date, today)) return 'Today';
	if (isSameDay(date, yesterday)) return 'Yesterday';

	return date.toLocaleDateString('en-IN', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

function getDateKey(isoString: string): string {
	// 'YYYY-MM-DD' — stable grouping key regardless of timezone shifts
	return new Date(isoString).toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD
}

// ─── Component ────────────────────────────────────────────────────────────────

const DaySeparator = ({ label }: { label: string }) => (
	<div className="flex items-center gap-3 px-4 py-2 bg-muted/30 border-y border-border">
		<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
			{label}
		</span>
	</div>
);

// Column header — mirrors OrderRow's grid exactly
const TableHeader = () => (
	<div className="grid grid-cols-[40px_1fr_90px_110px_100px_120px_140px] gap-4 px-4 py-2 border-b border-border bg-muted/50">
		{['#', 'Customer', 'Room', 'Payment', 'Total', 'Status', 'Actions'].map((col) => (
			<span
				key={col}
				className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
			>
				{col}
			</span>
		))}
	</div>
);

const OrderRows = ({ orders }: OrderRowsProps) => {
	// Group orders by date key, preserving order (already sorted by parent)
	const groups: { dateKey: string; label: string; orders: OrderWithDetails[] }[] = [];

	for (const order of orders) {
		const dateKey = getDateKey(order.created_at);
		const last = groups[groups.length - 1];

		if (last?.dateKey === dateKey) {
			last.orders.push(order);
		} else {
			groups.push({
				dateKey,
				label: formatDayLabel(order.created_at),
				orders: [order],
			});
		}
	}

	// Global serial counter so it runs across all day groups continuously
	let serialCounter = 0;

	return (
		<div className="rounded-lg border border-border overflow-hidden">
			<TableHeader />
			{groups.map((group) => (
				<div key={group.dateKey}>
					<DaySeparator label={group.label} />
					{group.orders.map((order) => (
						<OrderRow key={order.id} serialNo={++serialCounter} order={order} />
					))}
				</div>
			))}
		</div>
	);
};

export default OrderRows;
