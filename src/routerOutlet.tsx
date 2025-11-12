import { Link, Outlet } from "react-router"

export default function RouterOutlet() {
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/add'>Add</Link>
      </nav>
      <Outlet/>
    </div>
  )
}
