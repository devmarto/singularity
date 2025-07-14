import face from './logo-dark.png';

const LogoDark = ({align}) => {
  return (
    <img className={align} src = {face} alt="Logo" />
  )
}

export default LogoDark;