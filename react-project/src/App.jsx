import { useState, useEffect } from 'react';
import LogIn from './Components/Authentication/LogIn';
import SignUp from './Components/Authentication/SignUp';
import About from './Components/Content/About';
import Help from './Components/Content/Help';
import Title from './Components/Header/Title';
import Navbar from './Components/Header/Navbar';
import SearchBar from './Components/Header/SearchBar';
import MailList from './Components/Footer/MailList'; 
import Results from './Components/Content/Results';
import Featured from './Components/Home/Featured';
import Home from './Components/Home/Home'; 
import ReviewAndRating from './Components/Reviews/ReviewAndRating';
import UserProfile from './Components/UserProfile/UserProfile';
import CreateHotel from './Components/UserProfile/CreateHotel';
import Footer from './Components/Footer/Footer';
import HotelBooking from './Components/UserProfile/Bookings';
import Detail from './Components/Content/Detail';


export default function App() {
  const [activeContent, setActiveContent] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
   
  const [, setShowUserProfile] = useState(false);
  

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== "null") {
      setIsLoggedIn(true);
      console.log('token')
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setActiveContent("results");
  };

  const handleCityClick = (results) => {
    setSearchResults(results);
    setActiveContent("results");
  };

  const renderContent = () => {
    switch (activeContent) {
      case "about":
        return <About />;
      case "help":
        return <Help />;
      case "results":
        return <Results searchResults={searchResults}/>;
      case "userProfile":
        return <UserProfile setActiveContent={setActiveContent}/>
      case "createHotel":
        return <CreateHotel setActiveContent={setActiveContent}/>
      case "bookings":
        return <HotelBooking setActiveContent={setActiveContent}/>
      case "ReviewAndRating":
        return <ReviewAndRating setActiveContent={setActiveContent}/>
      case "detail":
        return <Detail />

      default:
        return (
          <div id="home">
            <div className="relative w-full max-w-[1024px]">
              <Home />
            </div>
            <Featured onSearchResults={handleCityClick} />
          </div>
        );
    }
  };

  return (
      <>
     <div className="flex flex-col items-center">
      <section className="fixed top-0 left-0 right-0 w-full h-[15%] bg-white p-0 z-20"> 
        <Title />
        <Navbar 
        setActiveContent={(content) => {
          setActiveContent(content);
          if (content === 'userProfile') setShowUserProfile(true); // Set state to display UserProfile
        }}
          setShowSignUpModal={setShowSignUpModal}
          setShowLogInModal={setShowLogInModal} 
          isLoggedIn={isLoggedIn} 
          username={username} 
          handleLogout={handleLogout} 
        /> 
        
      <SearchBar onSearchResults={handleSearchResults} />
      </section>
    <div className="flex relative flex-col items-center w-full max-w-[1024px]">
      {renderContent()}
      
     
      
    </div>
    {showLogInModal && <LogIn setShowLogInModal={setShowLogInModal} setShowSignUpModal={setShowSignUpModal} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
    {showSignUpModal && <SignUp setShowSignUpModal={setShowSignUpModal} setShowLogInModal={setShowLogInModal} />}
    </div>

    <MailList />
    <Footer />
  </>
  );
}  