import {react} from 'react'
import { Tab, Tabs } from "react-bootstrap";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const FocusedGeneralIndicatorSkeleton = () => {

    return (
        <>
        <div className="row">
            <div className="col-md-2"><Skeleton width="100%" height={50}/></div>
            <div className="col-md-2"><Skeleton width="100%" height={50}/></div>
            <div className="col-md-2"><Skeleton width="100%" height={50}/></div>
        </div>
         <Skeleton width="100%" height={400}/>   
        </>
    );
}
export default FocusedGeneralIndicatorSkeleton;