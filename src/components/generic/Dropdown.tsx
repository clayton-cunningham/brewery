import { Column } from "./Column";
// @ts-ignore
import React, { useState } from "react";

export const Dropdown = (props: {menuDisplay: any, contents: any[], className?: string}) => {

    const { menuDisplay, contents } = props;
    const classNameSuffix = props.className ? " " + props.className : "";
    const [visible, setVisible] = useState(false);

    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setVisible(false);
        }
    };

    return (
        <button
            className={"dropdown max-width" + classNameSuffix}
            onClick={() => setVisible(!visible)}
            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                dismissHandler(e)
            }
        >
            {menuDisplay}
            {visible && (
                <Column>
                    {contents}
                </Column>
            )}
        </button>
    )
}