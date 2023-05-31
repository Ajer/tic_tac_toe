
export default function Button({className,handleReset})
{
    return(
        <button className={className} onClick={handleReset}>Reset</button>
    )
}