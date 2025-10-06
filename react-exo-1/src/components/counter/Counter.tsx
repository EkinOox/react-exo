import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  const inc = () => setCount((c) => c + 1)
  const dec = () => setCount((c) => c - 1)
  const reset = () => setCount(0)
  return (
    <div>
      <p>Compteur: {count}</p>
      <button onClick={dec}>-1</button>
      <button onClick={inc}>+1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}