import React,  { useState } from 'react';

type funcType = (...args:any[]) => Promise<any>;
function useLoading(action:funcType):[funcType, boolean] {
    const [loading, setLoading] = useState(false);
    const doAction = (...args:any[]) => {
        setLoading(true);
        return action(...args).finally(() => setLoading(false));
    };
    return [doAction, loading];
};

export default useLoading;