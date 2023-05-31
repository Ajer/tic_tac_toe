import Square from './Square'
import { useState,useEffect} from "react";
import Button from './Button';

export default function BoardGame()
{
   const  [squares,setSquares] = useState([null,null,null,null,null,null,null,null,null]); 

    /*Ex: squares= ['null','X','X',                     0,1,2
                     'O','O','O',                       3,4,5
                    'null','null','null']               6,7,8  */   
   

   const[player,setPlayer] = useState('player1');
   
   const[count,setCount]  = useState(0);

   const [shout,setShout] = useState("Player X begins");

   const [winner,setWinner] = useState(false);

 
   /* Beskriver vilka index som måste vara besatta antingen av 'X' eller 'O' för vinst */
   const winningPosIndices=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
   ];
 
   const cpyWP = winningPosIndices.slice();  /* kopiera hela array'en av möjliga "winner-states" */

   function checkForWinner()
   {   
          let i=0;

          while(i<=7)
          {
               const [a,b,c] = cpyWP[i];    /* studera en rad av vinnar-index i taget */
      
               if (squares[a]===squares[b] && squares[b]===squares[c] && squares[a]!==null && squares[b]!==null && squares[c]!==null)
               {
                  setWinner(true);
                  let c = (player==='player1')?'X':'O';
                   return(
                     c
                   )   
               }
               i++;
               
          }

          return 'NO';
   }
  
   function checkFull()
   {
      const cpy = squares.slice();

      for (let i=0;i<=8;i++)
      {
          if (!cpy[i])
          {
            return false;
          }
      }
      return true;
   }
   
    /* Använder checkForWinner() i useEffect då den tar lång tid */
    useEffect(() => {
      if (count!==0 && !winner && !checkFull())   
      {
        let w = checkForWinner();
        if (w==='NO')
        {
          if (player==='player1')
          {
             setShout('Player O move');
             setPlayer('player2');
          }
          else
          { 
             setShout('Player X move');
             setPlayer('player1');
          }   
        }
        else
        {
           setShout('Winner ' + w + ' !');
        }
      }
      else if (checkFull())
      {
         setShout('Board is full. Please reset');
      }
      setCount(count + 1);
    }, [squares]);
 

    

   function handleClick(i)
   {
      if (!squares[i] && !winner)
      {
        const cpy = squares.slice();
        if(player==='player1')
        {       
         cpy[i] = "X";
         
         updateSquares(i,cpy);
         
        }
        else
        {
         cpy[i] = "O";
         
         updateSquares(i,cpy);
        
         /* checkForWinner(); */

         /* setPlayer('player1'); */
        
        }
      }
        
   }

   const updateSquares = (index,cpy) => {
      setSquares(elems => {
        return [
          ...elems.slice(0, index),
                        cpy[index],
          ...elems.slice(index + 1),
        ]
      })
    }
    
  function handleReset()
  {
       setSquares(Array(9).fill(null));
       setWinner(false);
       setPlayer('player1');
       setCount(0);
       setShout("Player X begins");
  }

  return(
  <>
   <div className="mess">{shout}</div>
   <br/>
   <div className="board"> 
    <div className="flex-container">
       <Square id="11" className="sq" val={squares[0]} onSquareClick={()=>handleClick(0)} />
       <Square id="12" className="sq sq-col2" val={squares[1]} onSquareClick={()=>handleClick(1)} />
       <Square id="13" className="sq sq-col3" val={squares[2]} onSquareClick={()=>handleClick(2)} />
     </div>
     <div className="flex-container">
        <Square id="21" className="sq row2" val={squares[3]} onSquareClick={()=>handleClick(3)} />
        <Square id="22" className="sq sq-col2 row2" val={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square id="23" className="sq sq-col3 row2" val={squares[5]} onSquareClick={()=>handleClick(5)}/>       
      </div>
      <div className="flex-container">
         <Square id="31" className="sq row2" val={squares[6]} onSquareClick={()=>handleClick(6)} />
         <Square id="32" className="sq sq-col2 row3" val={squares[7]} onSquareClick={()=>handleClick(7)}/>
         <Square id="33" className="sq sq-col3 row3" val={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
    </div>
    <Button className={'normal_btn left-corr'} handleReset={handleReset} />
   </>
   );
}