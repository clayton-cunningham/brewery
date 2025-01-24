import "./generic.less";
import { Row } from "./Row";

export const LeftAlign = (props: any) => {

    const {children} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <Row className={"left-align" + classNameSuffix}>
            {children}
        </Row>
    )
}