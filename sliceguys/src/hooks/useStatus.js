import React, { useState } from 'react';

const useStatus = () => {
    const [alldata, setAlldata] = useState([]);
    const [status, setStatus] = useState(false);
    const [noti, setNoti] = useState()
    return{
        status,
        setStatus,
        noti, 
        setNoti
    }
}

export default useStatus;