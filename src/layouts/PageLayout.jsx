import { Outlet } from 'react-router-dom'

function PageLayout() {
  return (
    <main className="container">
      <Outlet />
    </main>
  )
}

export default PageLayout