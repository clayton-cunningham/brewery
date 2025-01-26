import "./generic.less";

export const Grid = (props: {cells: any[], id?: string, className?: string}) => {

    const {cells} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <div className={"grid" + classNameSuffix}>
            {cells.map(cell => 
                <div className="grid-item">
                    {cell}
                </div>
            )}
        </div>
    )
}