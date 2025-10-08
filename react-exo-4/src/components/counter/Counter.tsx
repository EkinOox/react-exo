import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
    reset,
} from "../../redux/stores/counter/counterSlice.js";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '20px'}}>
      <div style={{fontSize: '20px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
        <h3>Counter</h3>
        <span>{count}</span>

        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>

        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Reset value"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
