export const FormButtons = props => (
    <div className="submit-container">
        <div className={props.action === "Logowanie" ? "submit gray" : "submit"} onClick={() => props.handleChangeForm("Rejestracja")}>Zarejestruj się</div>
        <div className={props.action === "Rejestracja" ? "submit gray" : "submit"} onClick={() => props.handleChangeForm("Logowanie")}>Zaloguj się</div>
    </div>
);