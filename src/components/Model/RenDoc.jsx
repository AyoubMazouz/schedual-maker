import React from "react";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import useEditor from "../../hooks/useEditor";
import { IcCancel, IcEdit } from "../icons";

const RenDoc = () => {
    const { model, setModel } = useGlobalContext();
    const { renameDocument } = useEditor();

    const [newDocName, setNewDocName] = React.useState(model.value);

    const renameHandler = async () => {
        setModel(null);
        await renameDocument(model.value, newDocName);
    };
    return (
        <div className="fixed top-[4rem] left-[50%] z-40 w-full max-w-[600px] translate-x-[-50%] px-4">
            <div
                className={`rounded-lg border-2 border-dark/25 bg-light p-4 text-center shadow-lg`}
            >
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="name" className="input-label">
                        Rename Document:
                    </label>
                    <input
                        type="text"
                        className="input"
                        value={newDocName}
                        onChange={(e) => setNewDocName(e.target.value)}
                    />
                </div>
                <div className="flex mt-8 gap-x-6">
                    <button className="btn-success" onClick={renameHandler}>
                        <IcEdit className="icon" />
                        <span>Rename</span>
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => setModel(null)}
                    >
                        <IcCancel className="icon" />
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RenDoc;
