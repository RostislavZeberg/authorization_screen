import logo from '../../assets/images/logo.svg';
import './Logo.scss';

export const Logo = () => {
  return (
    <div className="module__logo logo">
      <img src={logo} alt="Company Logo" className="logo__icon" />
      <p className="logo__text">Company</p>
    </div>
  )
}