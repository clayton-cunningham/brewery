import "./generic.less";

export const RowColumnAdaptive = (props: any) => {

    const {children} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <div className={"row-column-adaptive" + classNameSuffix}>
            {children}
        </div>
    )
}