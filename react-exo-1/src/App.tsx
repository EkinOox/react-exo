import './App.css'
import { Hello } from './components/hello/Hello'
import { Counter } from './components/counter/Counter'
import Timer from './components/timer/Timer'
import Liste from './components/liste/Liste'

function App() {

  return (
    <>
      <Hello text='Hello World!' name='John Doe'/>
      <Counter />
      <br />
      <hr />
      <br />
      <Timer initialTime={0} ticks={1000}/>
      <br />
      <hr />
      <br />
      <Liste />
    </>
  )
}

export default App
