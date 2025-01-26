import { Column } from "./Column";
import "./generic.less";

export const PageSection = (props: any) => {

    const {children} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <Column className={"section" + classNameSuffix}>
            {children}
        </Column>
    )
}