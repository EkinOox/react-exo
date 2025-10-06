
import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

export function NotFound() {
  return (
    <div className='not-found'>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  )
}
