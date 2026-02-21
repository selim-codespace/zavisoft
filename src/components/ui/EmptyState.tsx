import { SearchX } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
    title?: string;
    message?: string;
    actionText?: string;
    actionLink?: string;
}

export default function EmptyState({
    title = "No products found",
    message = "We couldn't find what you're looking for.",
    actionText = "Back to home",
    actionLink = "/"
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[400px] text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
                <SearchX className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#232321] mb-2">{title}</h3>
            <p className="text-gray-500 max-w-md mb-8">{message}</p>

            {actionLink && (
                <Link
                    href={actionLink}
                    className="bg-[#4A69E2] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
                >
                    {actionText}
                </Link>
            )}
        </div>
    );
}
