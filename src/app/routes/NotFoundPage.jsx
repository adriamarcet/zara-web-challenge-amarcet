import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="container">
      <h1>Page not found</h1>
      <Link to="/">Go back to main page.</Link>
    </section>
  )
}

export default NotFoundPage
