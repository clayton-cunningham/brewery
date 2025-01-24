import "./generic.less";

export const Column = (props: any) => {

    const {children} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <div className={"column" + classNameSuffix}>
            {children}
        </div>
    )
}