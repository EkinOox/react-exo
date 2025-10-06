import './Timer.css'
import { useEffect, useState } from 'react'

export default function Timer({ initialTime, ticks }: { initialTime?: number, ticks?: number}) {
    const [time, setTime] = useState(initialTime)
    const [tickInterval, setTickInterval] = useState(ticks)
    const [isActive, setIsActive] = useState(true)
    
    useEffect(() => {
        if (isActive){
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1)
            }, tickInterval)
            
            return () => clearInterval(timer)
        }
    }, [tickInterval, isActive])
    
    return (
        <div className="timer">
        
                    <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Stop' : 'Start'}
            </button>
        
            <h2>Timer</h2>
            <p>{time} seconds</p>
            
            <div className="timer-controls">
                <label htmlFor="interval-input">Intervalle (ms): </label>
                <input 
                    id="interval-input"
                    type="number" 
                    value={tickInterval} 
                    onChange={(e) => setTickInterval(Number(e.target.value))}
                />
            </div>
            
            <button onClick={() => setTime(initialTime)}>reset Timer</button>
            <button onClick={() => setTickInterval(ticks)}>reset Ticks</button>
        </div>
    )
}