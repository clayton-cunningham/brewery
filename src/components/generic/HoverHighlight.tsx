import "./generic.less";

export const HoverHighlight = (props: any) => {

    const {children} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <div className={"hover-highlight" + classNameSuffix}>
            {children}
        </div>
    )
}