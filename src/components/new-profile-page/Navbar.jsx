//import './Navbar.css';
import Lunge from './Lunge.png';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
    const redirect = useNavigate();

    return (
    <div className='navbar-header'>
        <div className='navbar-logo-container'>
        </div>
    </div>
    );
}

export default Navbar;