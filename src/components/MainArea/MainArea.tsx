import { ReactNode } from "react";
import "./MainArea.css"

interface Props {
    children: ReactNode;
}

export default function MainArea({children} : Props) {
	return (
        <div className="main-area">
            {children}
        </div>
    )
}
