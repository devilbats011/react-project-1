import React from 'react'
import {default as Btn} from 'react-bootstrap/Button'
// import { useEffect } from 'react'

function Button({className,style,disabled,onClick,onChange,children,color = 'mango'}) {
    
    return (
        <Btn 
         className={`py-1 px-3 ${color} border-0 ${className}`}
         style={style} disabled={disabled}
         onClick={onClick} onChange={onChange} >
            {children}
        </Btn>
    )
}
export default Button
