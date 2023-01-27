import { Timestamp } from "firebase/firestore";
import React from "react";
import { useGlobalContext } from "../../../Contexts/GlobalContext";
import useSettings from "../../../hooks/useSettings";
import { Button } from "../../Button";
import { IcCancel, IcEx, IcLogin } from "../../icons";

const UpdateLevel = () => {
    const { model, setModel, setAlert, labelsData, setLabelsData } =
        useGlobalContext();
    const { updateLevel } = useSettings();

    const [levelInput, setLevelInput] = React.useState("");
    const [numOfGrps, setNumOfGrps] = React.useState(0);
    const [modules, setModules] = React.useState([]);
    const [moduleInput, setModuleInput] = React.useState("");

    React.useEffect(() => {
        setLevelInput(model.level.value);
        setNumOfGrps(model.level.numOfGrps);
        setModules(model.level.modules);
    }, []);

    const enterKeyPressHandler = (e) => {
        if (e.key !== "Enter" || !moduleInput) return;
        const value = moduleInput.trim(" ");
        const newModules = modules.filter((mod) => mod !== value);
        if (newModules.length !== modules.length) {
            return setAlert({
                type: "warn",
                message: `Module "${value} is already in the list"`,
            });
        }
        setModules((modules) => [...modules, value]);
        setModuleInput("");
    };

    const submitHandler = (e) => {
        const res = updateLevel(
            labelsData,
            setLabelsData,
            model.level,
            levelInput,
            numOfGrps,
            modules
        );
        if (res) {
            model.setSaved(false);
            setModel(null);
        } else {
            setAlert({
                type: "warn",
                message: `faculty "${levelInput}" already exists!`,
            });
            setLevelInput("");
        }
    };

    const removeModuleHandler = (value) => {
        const newModules = modules.filter((mod) => mod !== value);
        setModules(newModules);
    };

    return (
        <>
            <div className="space-y-6">
                <div className="text-center text-xl text-primary">
                    Add New Level
                </div>
                <div className="flex flex-col items-center gap-2">
                    <label className="input-label" htmlFor="level">
                        Level:
                    </label>
                    <input
                        className="input max-w-[26rem]"
                        type="text"
                        name="level"
                        value={levelInput}
                        onChange={(e) =>
                            setLevelInput(e.target.value.toUpperCase())
                        }
                    />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <label className="input-label" htmlFor="numberOfGroups">
                        Number Of Groups In This Level:
                    </label>
                    <input
                        className="input max-w-[26rem]"
                        type="number"
                        name="numberOfGroups"
                        value={numOfGrps}
                        onChange={(e) => setNumOfGrps(e.target.value)}
                    />
                </div>
                <div className="textbox">
                    <span>Modules: </span>
                    {modules.map((mod) => (
                        <div key={mod}>
                            {mod}
                            <IcEx
                                id="modules"
                                onClick={(e) => removeModuleHandler(mod)}
                                className="textbox-icon"
                            />
                        </div>
                    ))}
                    <input
                        type="text"
                        id="modules"
                        placeholder="type here..."
                        value={moduleInput}
                        onChange={(e) =>
                            setModuleInput(e.target.value.toUpperCase())
                        }
                        onKeyPress={enterKeyPressHandler}
                    />
                </div>
            </div>
            <div className="model-btn-container">
                <Button
                    text="add"
                    type="success"
                    onClick={submitHandler}
                    Icon={IcLogin}
                />
                <Button
                    text="Cancel"
                    onClick={(e) => setModel(null)}
                    Icon={IcCancel}
                />
            </div>
        </>
    );
};

export default UpdateLevel;
