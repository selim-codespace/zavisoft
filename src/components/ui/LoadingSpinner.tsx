import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
            <div className="bg-[#4A69E2] text-white p-4 rounded-full shadow-lg animate-bounce mb-4">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <p className="text-[#232321] font-semibold animate-pulse">{text}</p>
        </div>
    );
}
