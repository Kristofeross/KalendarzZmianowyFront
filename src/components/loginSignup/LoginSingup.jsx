import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import axios from "axios";

import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';


const LoginSignup = () => {

    // Do state
    const [message, setMessage] = useState(null);
    const [isToken, setToken] = useState(null);
    const [diffPass, setDiffPass] = useState(false);
    const [action, setAction] = useState("Logowanie");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPass, setRepeatedPass] = useState("");
    const navigate = useNavigate();

    // Do pól formularza
    const handleChangeInputs = e => {
        // console.log(e.target.value)
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'repeatedPass':
                setRepeatedPass(e.target.value);
                break;
            default:
                break;
        }
    };

    // Do wyboru rejestracji lub logowania
    const handleChangeForm = action => {
        setAction(action);
        setMessage("");
        setName("");
        setEmail("");
        setPassword("");
        setRepeatedPass("");
        setDiffPass(false);
    };

    // Do przycisku wysyłającego formularz
    const handleFormSubmit = async () => {
        if (action === "Rejestracja") {
            if (!name || !email || !password) {
                setMessage("Proszę wypełnić puste pola");
                return;
            }
            if (password === repeatedPass) {
                const verificationEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                const verificationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
                if (!verificationEmail) {
                    setMessage("Niepoprawny adres email");
                    return;
                }
                if (!verificationPassword) {
                    setMessage("Hasło musi zawierać przynajmniej szejść liter, w tym conajmniej jedną cyfrę oraz jedną duża literę");
                    return;
                }
                const data = {
                    username: name,
                    mail: email,
                    password: password,
                };
                try {
                    const response = await axios.post("http://127.0.0.1:5000/api/register", data);
                    console.log("Response:", response.data);
                    setMessage("Poprawnie zarejestrowany");
                } catch (error) {
                    console.error("Error:", error);
                    // Kod błędu 400
                    setMessage("Podana nazwa użytkownika jest już zajęta");
                }
                console.log(data);
            } else {
                setDiffPass(true);
            }
        } else { // Logowanie
            if(!name || !password){
                setMessage("Puste pole nazwy użytkownika lub hasła");
                return;
            }
            const data = {
                email: email,
                username: name,
                password: password,
            };
            try {
                const response = await axios.post("http://127.0.0.1:5000/api/login", data);
                console.log("Response:", response.data);    
                // console.log("Response:", response.data.token);

                // Za pomocą localStorage
                // localStorage.setItem('token', response.data.token);
                // const token = localStorage.getItem('token');

                // Za pomocą sessionStorage
                sessionStorage.setItem('token', response.data.token);
                if( sessionStorage.getItem('token') ) setToken(true);       

            } catch (error) {
                console.error("Error:", error.response.status);
                // Kod błędu 401
                setMessage("Niepoprawny login lub hasło");
            }
            console.log(data);
        }
    };

    // Do lepszego przekierowywania
    const checkToken = ()=>{
        if (sessionStorage.getItem('token')) {
            setToken(true);
        }
    }

    const navigateCallback = useCallback(() => {
        checkToken();
        if (isToken) {
            navigate('/calendar');
        }
    }, [navigate, isToken]);

    useEffect(() => {
        navigateCallback();
    }, [navigateCallback]);

    console.log( sessionStorage.getItem('token') );
    // console.log(isLogged)

    return (
        <>
            <div className="containerLoginRegister">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">

                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Nazwa użytkownika" value={name} onChange={handleChangeInputs} name="name" />
                    </div>

                    {action === "Logowanie" ? null : (
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input type="email" placeholder="Email" value={email} onChange={handleChangeInputs} name="email"/>
                        </div>
                    )}
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Hasło" value={password} onChange={handleChangeInputs} name="password" />
                    </div>
                    {action === "Logowanie" ? null : (
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" placeholder="Powtórz hasło" value={repeatedPass} onChange={handleChangeInputs} name="repeatedPass" />
                        </div>
                    )}
                    { diffPass && action === "Rejestracja" ? <p className="red">Hasło oraz jego powtórzenie nie są takie same</p> : null }
                </div>
                {action === "Rejestracja" ? null : (
                    <div className="forgot-password">
                        Zapomniałeś hasła? <span>Naciśnij tu!</span>
                    </div>
                )}      
                {message ? <p>{message}</p> : null }
                <div className="submit-container">
                    <div className={action === "Logowanie" ? "submit gray" : "submit"} onClick={() => handleChangeForm("Rejestracja")}>Zarejestruj się</div>
                    <div className={action === "Rejestracja" ? "submit gray" : "submit"} onClick={() => handleChangeForm("Logowanie")}>Zaloguj się</div> 
                </div>
                <div className="submit-container2">
                    <div className="submit" onClick={handleFormSubmit}>Enter</div>
                </div>
            </div>
        </>
    );
};

export default LoginSignup;
