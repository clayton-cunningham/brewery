import { DynamicRow } from "./DynamicRow";
import "./generic.less";

export const DynamicRowList = (props: any) => {

    const {childrenList} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <div className="list">
            <DynamicRow 
                childrenList={childrenList} 
                className={classNameSuffix}
                classNameAppend="-list"
            />
        </div>
    )
}