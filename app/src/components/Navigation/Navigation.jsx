import Logo from "../Logo/Logo";
import { NavLink } from "react-router";

const Navigation = () => {
  return (
    <nav className="container flex justify-between items-center py-4">
      <NavLink to="/">
        <Logo align={'h-24'} />
      </NavLink>
      <div>
        <ul>
          <li>
            <NavLink to="/login">Sign out</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;