import DataFillLoader from "@/components/loaders/DataFillLoader";

export default function SegmentLoading() {

    return (
        <div className="flex h-[60vh] items-center justify-center">
            <div className="text-center">
                <DataFillLoader 
                    width={200}
                    height={80}
                    bars={5}
                />
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    데이터를 불러오는 중입니다…
                </p>
            </div>
        </div>
    )
}