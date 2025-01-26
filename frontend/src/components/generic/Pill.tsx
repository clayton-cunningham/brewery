import "./generic.less";

export const Pill = (props: {vertical?: boolean, className?: string}) => {

    const { vertical } = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <div className={"pill" + (vertical ? " vertical-pill" : "") + classNameSuffix} />
    )
}