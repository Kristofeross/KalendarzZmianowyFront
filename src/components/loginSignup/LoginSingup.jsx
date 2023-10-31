import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./LoginSignup.css";
import axios from "axios";

import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';


class LoginSignup extends Component {

    state = {
        user: null,

        message: null,

        isLogged: false,
        diffPass: false,
        action: "Logowanie",
        name: "",
        email: "",
        password: "",
        repeatedPass: ""
    }

    // Do pól formularza
    handleChangeInputs = e => {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    // Do wyboru rejestracji lub logowania
    handleChangeForm = action => {
        this.setState({
            action: action,

            message: null,

            name: "",
            email: "",
            password: "",
            repeatedPass: "",
            diffPass: false
        })
    }

    // Do przycisku wysyłającego formularz
    handleFormSubmit = async () => {

        const { action, diffPass, name, email, password, repeatedPass } = this.state;

        if (action === "Rejestracja" ) {

            if (password === repeatedPass) {

                //Walidacja do emali
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    this.setState({ message: "Niepoprawny adres email" });
                    return;
                }
                //Walidacja do hasła
                if (!/(?=.*[A-Za-z])(?=.*\d).{2,}/.test(password)) {
                    this.setState({ message: "Hasło musi zawierać przynajmniej dwie litery i co najmniej jedną cyfrę" });
                    return;
                }

                const data = {
                    action: action,
                    name: name,
                    email: email,
                    password: password,
                };
                try {
                    const response = await axios.post("http://localhost:4000/api/login", data);
                    console.log("Response:", response.data);

                    this.setState({
                        message: response.data.message
                    })

                } catch (error) {
                    console.error("Error:", error);
                }
                console.log(data);
                
            }
            else{
                this.setState({ diffPass: true });
                // console.log(`DiffPass ${diffPass}`);
                // console.log("Nie Przeszło");
            }

        }
        else{
            const data = {
                action: action,
                // name: name,
                email: email,
                password: password,
            };
            try {
                const response = await axios.post("http://localhost:4000/api/login", data);
                console.log("Response:", response.data);
                this.setState({
                    isLogged: response.data.isLogged,
                    message: response.data.message
                })

            } catch (error) {
                console.error("Error:", error);
            }
            console.log(data);
        }
    };

    render(){

        const {action, diffPass, name, email, password, repeatedPass } = this.state;

        // Przekierowanie użytkownika na inną stronę
        if (this.state.isLogged) {
            return <Navigate to="/calendar" />;
        }

        // Do przekierowania
        return (
        <>

            <div className="containerLoginRegister">
    
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
    
                <div className="inputs">
                    {action === "Logowanie" ? <div></div> :  <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Nazwa użytkownika" value={name} onChange={this.handleChangeInputs} name="name" />
                    </div>} 
                    
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email" value={email} onChange={this.handleChangeInputs} name="email"/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Hasło" value={password} onChange={this.handleChangeInputs} name="password" />
                    </div>
                    {action === "Logowanie" ? <div></div> : <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Powtórz hasło" value={repeatedPass} onChange={this.handleChangeInputs} name="repeatedPass" />
                    </div> }
                    { diffPass && action === "Rejestracja" ? <p className="red">Hasło oraz jego powtórzenie nie są takie same</p> : null }
                </div>
    
                {action === "Rejestracja" ? <div></div> : <div className="forgot-password">
                    Zapomniałeś hasła? <span>Naciśnij tu!</span>
                </div> }      

                { this.state.message ? <p>{this.state.message}</p> : null }
    
                <div className="submit-container">
                    <div className={action === "Logowanie" ? "submit gray" : "submit"} onClick={()=>{this.handleChangeForm("Rejestracja")}} >Zarejestruj się</div>
                    <div className={action === "Rejestracja" ? "submit gray" : "submit"} onClick={()=>{this.handleChangeForm("Logowanie")}} >Zaloguj się</div> 
                </div>
                <div className="submit-container2">
                    <div className="submit" onClick={this.handleFormSubmit} >Enter</div>
                </div>
    
            </div>
        </>
        )
    }
}

export default LoginSignup;