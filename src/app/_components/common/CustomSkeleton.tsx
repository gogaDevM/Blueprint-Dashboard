import Skeleton from "react-loading-skeleton"

import { CONFIG } from "@/_utils/Constants"

import { CustomSkeletonType } from "@/_types/common/CustomSkeleton"


const CustomSkeleton: React.FC<CustomSkeletonType> = ({
    rowCount,
    stopHorizontalScrolling,
    stopVh,
}) => {
    return (
        <div className={`${stopVh ? "" : "vh-100"} ${stopHorizontalScrolling ? "p-8" : ""}`}>
            <Skeleton
                count={rowCount ? rowCount : CONFIG.SKELETON_CONFIGURATION.SKELETON_ROWS_COUNT}
                height={CONFIG.SKELETON_CONFIGURATION.SKELETON_HEIGHT}
                className={"mb-2"}
            />
        </div>
    )
}

export default CustomSkeleton
