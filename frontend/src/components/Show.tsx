//similar to the solidjs <show> tag

import {ReactNode} from "react";

interface ShowProps<T> {
    when: T | undefined | null | false;
    fallback?: ReactNode;
    children: ReactNode | ((item: T) => ReactNode);
}

const Show = <T,>({when, fallback, children}: ShowProps<T>) => {
    if(when){
        if(typeof children === "function") {
            return <>{(children as (item: T) => ReactNode) (when)}</>
        }
        return <>{children}</>
    }
    return <>{fallback}</>
};

export default Show;