import { UserContext } from '../UserContext'
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import LogoutButton from './LogoutButton';
import logo from "../assets/TT_Logo_Design.png";

function Header() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const handleLogoClick = () => {
        navigate("/Home");
    };

    const handleLoginClick = () => {
        navigate("/Login");
    };

    return user ? 
    <header>
        <div className="flex-container">
        <img className="logo-top" src={logo} onClick={handleLogoClick} />
        <div className="link-row">
          <LogoutButton/>
        </div>
      </div>
    </header> 
    : 
    <header>
        <div className="flex-container">
        <img className="logo-top" src={logo} onClick={handleLogoClick} />
        <div className="link-row">
          <button onClick={handleLoginClick}>
            Log in
          </button>
        </div>
      </div>
    </header>;
}

export default Header;
