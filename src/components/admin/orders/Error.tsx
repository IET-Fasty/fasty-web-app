import { Button } from '@/components/ui/button';
import { AdminError } from '@/types/admin.types';

interface ErrorProps {
	error: AdminError;
	refetch: () => void;
}

const Error = ({ error, refetch }: ErrorProps) => {
	return (
		<div className="flex h-[70vh] items-center justify-center">
			<div className="text-center space-y-3">
				<p className="text-sm text-muted-foreground">{error.message}</p>

				<Button variant="outline" onClick={refetch}>
					Retry
				</Button>
			</div>
		</div>
	);
};

export default Error;
