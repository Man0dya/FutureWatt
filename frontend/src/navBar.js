import futureWatt from './FutureWatt1.png';
import './App.css';

function navBar(){
    return(
        <div className='header'>
        <img src={futureWatt} className="main-logo" alt="imgLogo" />
        <nav className='navLinks'>
        <ul>
            <li>Home</li>
            <li>Packages</li>
            <li>About Us</li>
            <li>Contact Us</li>
            
        </ul>
        </nav>

        <button>Sign Up</button>
        </div>
    )
}

export default navBar;