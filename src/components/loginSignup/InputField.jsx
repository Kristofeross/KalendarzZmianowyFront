export const InputField = props => (
    <div className="input">
        <img src={props.icon} alt="" />
        <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} name={props.name} />
    </div>
);