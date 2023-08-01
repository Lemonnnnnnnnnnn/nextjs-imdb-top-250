import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
    className ?: string 
    children : ReactNode
}

const Dot : React.FC<Props> = ({className , children}) => {
    return ( 
        <>
            <div className={clsx(`
                    rounded-full
                    w-8
                    h-8
                    bg-red-600
                    grid
                    place-items-center
                `,
                className
                ) }>
                {children}
            </div>
        </>
     );
}
 
export default Dot;