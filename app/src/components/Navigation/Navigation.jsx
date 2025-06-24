import Logo from "../Logo/Logo";

const Navigation = () => {
  return (
    <nav className="container flex justify-between items-center py-4">
      <Logo />
      <div>
        <ul>
          <li>
            <p>{'Sign out'}</p>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;