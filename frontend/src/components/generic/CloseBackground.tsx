import "./generic.less";

export const CloseBackground = (props: {className?: string, action: () => any}) => {

    const {action} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <div 
            className={"close-background" + classNameSuffix} 
            onClick={(event) => {
                action();
                event.stopPropagation();
            }}
        />
    )
}