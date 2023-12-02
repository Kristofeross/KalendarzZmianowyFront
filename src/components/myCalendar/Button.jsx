const Button = ({action, name}) => (
    <div className={`buttonStyle ${name === 'Dodaj' ? 'oneButton' : 'twoButtons' }`} onClick={action}>
        {name}
    </div>
);

export default Button;