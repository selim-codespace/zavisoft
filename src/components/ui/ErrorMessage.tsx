import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorMessageProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export default function ErrorMessage({
    title = "Oops! Something went wrong.",
    message = "We couldn't load this content. Please try again later.",
    onRetry
}: ErrorMessageProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 min-h-[300px] text-center bg-red-50 rounded-3xl border border-red-100">
            <div className="bg-red-100 p-4 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">{title}</h3>
            <p className="text-red-700 max-w-md mb-6">{message}</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </button>
            )}
        </div>
    );
}
