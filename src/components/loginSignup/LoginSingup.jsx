import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./LoginSignup.css";
import axios from "axios";

import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

class LoginSignup extends Component {

    state = {
        isLogged: false,
        diffPass: false,
        action: "Logowanie",
        name: "",
        email: "",
        password: "",
        repeatedPass: ""
    }

    handleChangeInputs = e => {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    handleFormSubmit = async () => {

        this.setState({
            diffPass: false
        })

        const { name, email, password } = this.state;
        const data = {
            name: name,
            email: email,
            password: password,
        };
        try {
            const response = await axios.post("http://localhost:4000/api/login", data);
            console.log("Response:", response.data);
            this.setState({
                isLogged: response.data.isLogged
            })
        } catch (error) {
            console.error("Error:", error);
        }
        console.log(data);
    };

    render(){

        const {action, diffPass, name, email, password, repeatedPass } = this.state;
        // const style = {cursor: 'pointer', paddingTop: '16px', border: '1px solid #000'}

        // Do przekierowania

        return (
        <>
            <div>
                {!this.state.isLogged ? <div>Private Route</div> : <Navigate replace to="/calendar" />}
            </div>

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
    
                <div className="submit-container">
                    <div className={action === "Logowanie" ? "submit gray" : "submit"} onClick={()=>{this.setState({action: "Rejestracja"})}} >Zarejestruj się</div>
                    <div className={action === "Rejestracja" ? "submit gray" : "submit"} onClick={()=>{this.setState({action: "Logowanie"})}} >Zaloguj się</div> 
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