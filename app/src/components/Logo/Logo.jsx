import face from './logo.png';

const Logo = ({align}) => {
  return (
    <img className={align} src = {face} alt="Logo" />
  )
}

export default Logo;