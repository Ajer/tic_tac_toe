import { useState } from "react";


export default function Square({id,className,val,onSquareClick})
{
    function handleClick(ev)
    {
         /* ev.preventDefault(); */
        /* setVal('X'); */
    }

    let sz = (val==='X')?'30px':'35px';

    return(
      <div id={id} className={className}>
         <button  onClick={onSquareClick} className="ttt-button" style={{fontSize:sz}}>{val}</button>            
      </div>
    )
}