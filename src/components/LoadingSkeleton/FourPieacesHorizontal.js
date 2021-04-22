import {react} from 'react'

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const FourPieacesHorizontalSkeleton = () => {

    return (
        <>
        <div className="row">
            <div className="col-md-3"><Skeleton width="100%" height={200}/></div>
            <div className="col-md-3"><Skeleton width="100%" height={200}/></div>
            <div className="col-md-3"><Skeleton width="100%" height={200}/></div>
            <div className="col-md-3"><Skeleton width="100%" height={200}/></div>
        </div>
        </>
    );
}
export default FourPieacesHorizontalSkeleton;