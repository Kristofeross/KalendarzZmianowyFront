export const Message = props => (
    <>
       { props.message ? <div className="messageLogin">{props.message}</div> : <div className="emptySpaceMessage"></div> }  
    </>
);
