import { ReactNode } from "react";
import "./TopBar.css"

interface Props {
  children: ReactNode;
}

export default function TopBar({children}: Props) {
  return (
    <div className="top-bar">{children}</div>
  )
}