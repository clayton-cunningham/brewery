import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Row } from "../../generic/Row";
import { getCookie } from "../../../helpers/cookieHelpers";
import ReactSelect from "react-select";
import { recipeTypes } from "../../../assets/resources";

const getTitleInit = () => {
    const cookie = getCookie("r");
    if (cookie.length > 0) return cookie
    return "";
}

export const RecipeSelector = (props: {setWeeklyRecipe: Dispatch<SetStateAction<string>>}) => {

    const {setWeeklyRecipe} = props;
    const [title, setTitle] = useState(getTitleInit());

    useEffect(() => {
        setWeeklyRecipe(title);
        document.cookie = "r" + "=" + title;
    }, [title])

    window.onload = () => {
        var recipeSel = document.getElementById("recipe-selector") as HTMLInputElement;
        if (recipeSel == null) return;
        recipeSel.onchange = () => {
            if (recipeSel == null) return;
            setTitle(recipeSel.value);
        }
    }

    return (
        <div className={"recipe-selector-container"}>
            <ReactSelect
                id="recipe-selector"
                className="react-select-dropdown"
                placeholder={"Select a recipe type..."}
                defaultValue={title ? {value: title, type: title} : undefined}
                isClearable={true}
                options={recipeTypes.map(rT => {return {value: rT, type: rT}})}
                onChange={(recipeType) => {setTitle(recipeType?.value ?? "");}}
                formatOptionLabel={recipeType => (
                    <div key={recipeType + "-selector"}>
                        <Row>
                            <p className="flex-1">{recipeType.value}</p>
                            {(window?.innerWidth > 900 &&
                                <>
                                    <img className="img-xs" src={"./recipes/" + recipeType.value.toLowerCase().split("/")[0] + ".png"} />
                                </>
                            )}
                        </Row>
                    </div>
                )}
            />
        </div>
    )
}