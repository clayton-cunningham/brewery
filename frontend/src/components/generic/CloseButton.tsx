import "./generic.less";

export const CloseButton = (props: {className?: string, action: () => any}) => {

    const {action} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <img 
            className={"close-button" + classNameSuffix} 
            src="./close-button.png" 
            onClick={(event) => {
                action();
                event.stopPropagation();
            }}
        />
    )
}