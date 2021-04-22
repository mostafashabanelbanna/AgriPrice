import {react} from 'react'

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ThreePieacesHorizontalSkeleton = () => {

    return (
        <>
        <div className="row">
            <div className="col-md-4"><Skeleton width="100%" height={200}/></div>
            <div className="col-md-4"><Skeleton width="100%" height={200}/></div>
            <div className="col-md-4"><Skeleton width="100%" height={200}/></div>
        </div>
        </>
    );
}
export default ThreePieacesHorizontalSkeleton;