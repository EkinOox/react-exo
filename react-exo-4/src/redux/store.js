import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './stores/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})