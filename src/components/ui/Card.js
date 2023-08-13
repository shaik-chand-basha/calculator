import { forwardRef } from "react"
import style from "./Card.module.css"

export default forwardRef(function Card(props,ref) {
    return (
        <div className={`${style.card} ${props.className || ""}`} ref={ref}>
            {props.children}
        </div>
    )
})
