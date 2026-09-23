import 'React'
import {useState, useEffect, useRef} from "react";



function Stopwatch(){
    const[isRunning,setIsRunning]=useState(false);
    const[elapsedTime,setElapsedTime]=useState(0);
    const intervalIdRef=useRef(null);
    const startTimeRef= useRef (0); //refs are object meaning you can access stuff with startTimeRef. etc.

    useEffect(()=>{
        if(isRunning===true){
            intervalIdRef.current=setInterval(()=>{
                setElapsedTime(Date.now()-startTimeRef.current)
            }, 10);              // setInterval(callback to function, then a time)
        }

        return()=>{
            clearInterval(intervalIdRef.current)
        }

    }, [isRunning])
    // do this when the code isRunning status true

    function start(){
        setIsRunning(true)
        startTimeRef.current= Date.now()- elapsedTime; // date.now gives current time in milliseconds

    }
    function stop(){
        setIsRunning(false)
    }
    function reset(){
        setIsRunning(false)
        setElapsedTime(0)

    }
    function formatTime(){
        let hours= Math.floor(elapsedTime/(1000*60*60))
        let minutes= Math.floor(elapsedTime/(1000*60)%60)
        let seconds= Math.floor(elapsedTime/(1000)%60)
        let milliseconds= Math.floor((elapsedTime%(1000))/10)// only first 2 digits

        hours=String(hours).padStart(2, "0")//typecasting
        minutes=String(minutes).padStart(2, "0")
        seconds=String(seconds).padStart(2, "0")
        milliseconds=String(milliseconds).padStart(2, "0")

        return `${hours}:${minutes}:${seconds}:${milliseconds}`
    }







    return(
        <div className={"stopwatch"}>
            <div className={"display"}>{formatTime()}</div>
            <div className={"Controls"}>
                <button className={"start-button"} onClick={start}>Start</button>
                <button className={"reset-button"} onClick={reset}>Reset</button>
                <button className={"stop-button"} onClick={stop}>Stop</button>
            </div>
        </div>
    )
}
export default Stopwatch