import { useState } from 'react'
import './Hello.css'

export function Hello({ text, name }: { text: string, name?: string }) {
    const [count, setCount] = useState(0)
    return (
        <div className="card">
            <h1>{text}</h1>
            <p>{name} is connected</p>
        </div>    
    )
}