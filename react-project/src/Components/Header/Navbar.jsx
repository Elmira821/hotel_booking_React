import PropTypes from 'prop-types';
import { FaBell } from 'react-icons/fa';

const Navbar = ({ setActiveContent, setShowLogInModal, setShowSignUpModal, isLoggedIn, handleLogout }) => {

    const buttonClass = 'px-3 py-2 transition duration-300 text-[#103346] font-[Arial] font-bold rounded-lg shadow-lg hover:shadow-xl hover:border-t-2 hover:border-l-2 hover:border-gray-300';

    return (
        <div className="absolute bottom-[50px] right-[30px] flex">
            <a href="#home" className={buttonClass} onClick={() => setActiveContent('home')}>Home</a>
            <a href="#about" className={buttonClass} onClick={() => setActiveContent('about')}>About</a>
            <a href="#help" className={buttonClass} onClick={() => setActiveContent('help')}>Help</a>
            
            {isLoggedIn ? (
                <>
                    <a href="#notifications" className='px-1 py-1 t-3 transition duration-300 text-[#103346] rounded-lg' onClick={() => alert('notifications')}><FaBell /></a>
                    <a href="#userProfile" className={buttonClass} onClick={() => setActiveContent('userProfile')}>Profile</a>
                    <a href="#createHotel" className={buttonClass} onClick={() => setActiveContent('createHotel')}>Create Hotel</a>
                    <a href="#logout" className={buttonClass} onClick={handleLogout}>Log Out</a>
                </>
            ) : (
                <>
                    <a href="#login" className={buttonClass} onClick={() => setShowLogInModal(true)}>Log In</a>
                    <a href="#signup" className={buttonClass} onClick={() => setShowSignUpModal(true)}>Sign Up</a>
                </>
            )}
        </div>
    );
}

Navbar.propTypes = {
    setShowLogInModal: PropTypes.func.isRequired,
    setShowSignUpModal: PropTypes.func.isRequired,
    setActiveContent: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string,
    handleLogout: PropTypes.func.isRequired
};

export default Navbar;
