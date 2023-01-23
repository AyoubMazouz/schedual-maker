import React from "react";
import { IcBin, IcEdit, IcRoom } from "../../../components/icons";
import MoreMenu from "../../../components/MoreMenu";
import { useGlobalContext } from "../../../Contexts/GlobalContext";
import useSettings from "../../../hooks/useSettings";

const Rooms = ({
    currMenu,
    setCurrMenu,
    menuRef,
    setSaved,
    labelsData,
    setLabelsData,
}) => {
    const { setModel } = useGlobalContext();
    const { deleteRoom } = useSettings();
    const showDetails = (v) => {
        const details = [
            ["id", v.id],
            ["room", v.name],
            ["created at", v.createdAt.toDate().toDateString()],
            ["modified at", v.modifiedAt.toDate().toDateString()],
        ];
        setModel({ type: "showDetails", details });
    };
    const editHandler = (value) => {
        setModel({
            type: "addRoom",
            labelsData,
            setLabelsData,
            setSaved,
            value,
            update: true,
        });
    };
    const deleteHandler = (value) => {
        deleteRoom(labelsData, setLabelsData, value.id);
        setSaved(false);
    };

    return (
        <div className="border-2 rounded-lg shadow-lg border-dark/25">
            {labelsData.rooms.map((value, index) => (
                <div
                    key={value}
                    className={`menu-item group flex justify-between text-center ${
                        index % 2 === 0 && "bg-dark/5"
                    }`}
                >
                    <button
                        onClick={(e) => showDetails(value)}
                        className="grid w-full grid-cols-12"
                    >
                        <div className="space-x-1 text-left col-span-full group-hover:underline sm:col-span-9">
                            <IcRoom className="inline-block icon" />
                            <span>{value.name}</span>
                        </div>
                        <div className="hidden col-span-3 md:block">
                            {value.createdAt.toDate().toDateString()}
                        </div>
                    </button>
                    <MoreMenu
                        menuId={`room:${value.name}`}
                        menuRef={menuRef}
                        currMenu={currMenu}
                        setCurrMenu={setCurrMenu}
                        options={[
                            ["edit", () => editHandler(value), IcEdit],
                            ["delete", () => deleteHandler(value), IcBin],
                        ]}
                    />
                </div>
            ))}
        </div>
    );
};

export default Rooms;
