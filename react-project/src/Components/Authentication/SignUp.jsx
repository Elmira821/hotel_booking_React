import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { UserContext } from "./UserContext";

const SignUp = ({ setShowSignUpModal, setShowLogInModal }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);
    const [showModal, setShowModal] = useState(true);

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ username: username, email: email, password: password })
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/users`, requestOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail);
            } else {
                setToken(data.access_token);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const newUser = (e) => {
        e.preventDefault();
        submitRegistration();
        setShowSignUpModal(false);
        setShowModal(false);
        setShowLogInModal(true)
    };

    const closeModal = () => {
        setShowModal(false);
        setShowSignUpModal(false);
    };
    if (!showModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#ece9e4] p-5 rounded-xl border-2 border-[#103346] shadow-lg w-[400px] relative z-50">
                <span className="absolute top-2.5 right-3.5 cursor-pointer" onClick={closeModal}>&times;</span>
                <h2>Sign Up</h2>
                <div className="flex flex-col gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded transition duration-300 ease-in-out"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded transition duration-300 ease-in-out"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded transition duration-300 ease-in-out"
                    />
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <button onClick={newUser} className="bg-[#103346] text-white border-none m-0 mr-5 rounded-md cursor-pointer">
                        Sign Up
                    </button>
                    <div className="text-base">
                        Already have an account? 
                        <button className="bg-[#103346] text-white border-none m-0 mr-5 rounded-md cursor-pointer" onClick={() => { setShowLogInModal(true); setShowSignUpModal(false); }}>
                            Log In
                        </button>
                    </div>
                </div>
                {errorMessage && (
                    <div className="mt-2 text-red-500 text-sm">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};
SignUp.propTypes = {
  setShowLogInModal: PropTypes.func.isRequired,
  setShowSignUpModal: PropTypes.func.isRequired
};

export default SignUp;