import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginSignup.css";
import axios from "axios";

import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

// Do komponentów
import { FormButtons } from "./FormButtons";
import { Header } from "./Header";
import { InputField } from "./InputField";
import { Message } from "./Message";
import { SubmitButton } from "./SubmitButton";


const LoginSignup = () => {

    // Do state
    const [message, setMessage] = useState("");
    const [isToken, setToken] = useState(null);
    const [action, setAction] = useState("Logowanie");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPass, setRepeatedPass] = useState("");
    const navigate = useNavigate();

    // Do pól formularza
    const handleChangeInputs = e => {
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
    };

    // Do przycisku wysyłającego formularz
    const handleFormSubmit = async () => {
        if (action === "Rejestracja") {
            if (!name || !email || !password) {
                setMessage("Proszę wypełnić puste pola");
                return;
            }
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
            if ( !(password === repeatedPass) ) {
                setMessage("Podane hasło muszą być takie same");
                return;
            }

            const data = {
                username: name,
                mail: email,
                password: password,
            };
            try {
                const response = await axios.post("http://127.0.0.1:5000/api/register", data);
                console.log("Response:", response.status);
                setAction("Logowanie");
                setMessage("Poprawnie zarejestrowany");
            } catch (error) {
                console.error("Error:", error);
                setMessage("Podana nazwa użytkownika jest już zajęta");
            }
        } else { // Logowanie
            if(!name || !password){
                setMessage("Puste pole nazwy użytkownika lub hasła");
                return;
            }
            const data = {
                username: name,
                password: password,
            };
            try {
                const response = await axios.post("http://127.0.0.1:5000/api/login", data);

                sessionStorage.setItem('token', response.data.token);
                if( sessionStorage.getItem('token') ) setToken(true);       

            } catch (error) {
                console.error("Error:", error.response.status);
                setMessage("Niepoprawny login lub hasło");
            }
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

    return (
        <div className="containerLoginRegister">
            <Header action={action} />
            <div className="inputs">
                <FormButtons action={action} handleChangeForm={handleChangeForm} />
                <Message message={message} />
                <InputField icon={user_icon} type="text" placeholder="Nazwa użytkownika" value={name} onChange={handleChangeInputs} name="name" />
                {action === "Logowanie" ? null : (
                    <InputField icon={email_icon} type="email" placeholder="Email" value={email} onChange={handleChangeInputs} name="email" />
                )}
                <InputField icon={password_icon} type="password" placeholder="Hasło" value={password} onChange={handleChangeInputs} name="password" />
                {action === "Logowanie" ? <div className="emptySpaceInputs"></div> : (
                    <InputField icon={password_icon} type="password" placeholder="Powtórz hasło" value={repeatedPass} onChange={handleChangeInputs} name="repeatedPass" />
                )}
            </div>
            <SubmitButton handleFormSubmit={handleFormSubmit} />
        </div> 
    );
};

export default LoginSignup;