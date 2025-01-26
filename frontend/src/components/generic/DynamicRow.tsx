import "./generic.less";
import { Row } from "./Row";

export const DynamicRow = (props: {childrenList: any, id?: string, className?: string, classNameAppend?: string}) => {

    const {childrenList, className, classNameAppend} = props;
    const classNameSuffix = (classNameAppend ? classNameAppend : "") + (className ? " " + className : "");

    return (
        <div className={"dynamic-row" + classNameSuffix}>
            <Row>
                {childrenList.map((c: any) => 
                    <div key={c.id} className="dynamic-row-cell">
                        {c.component}
                    </div>
                )}
            </Row>
        </div>
    )
}