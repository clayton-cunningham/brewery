import "./generic.less";

export const Row = (props: any) => {

    const {children, onClick} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <div className={"row" + classNameSuffix} onClick={onClick}>
            {children}
        </div>
    )
}