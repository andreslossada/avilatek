export function CardSkeleton() {
    return (
        <div className="animate-pulse p-4 border rounded-md shadow-sm bg-white">
            <div className="flex items-center space-x-4 mb-4">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    );
}
