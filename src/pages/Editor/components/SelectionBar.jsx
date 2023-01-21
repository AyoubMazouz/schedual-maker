import React from "react";
import { useGlobalContext } from "../../../Contexts/GlobalContext";
import useSettings from "../../../hooks/useSettings";
import useEditor from "../../../hooks/useEditor";
import { useEditorContext } from "../../../Contexts/EditorContext";

const SelectionBar = () => {
    const { data, setData, setAlert } = useGlobalContext();
    const { selectedCell, fusionMode, setSaved } = useEditorContext();
    const { getLabels } = useSettings();
    const { editField } = useEditor();

    const [labels, setLabels] = React.useState({
        faculties: [],
        trainers: [],
        rooms: [],
        events: [],
    });
    const [modules, setModules] = React.useState([]);
    React.useEffect(() => {
        getLabels().then((labels) => {
            setLabels(labels);
        });
    }, []);

    React.useEffect(() => {
        if (selectedCell) {
            const l = data[selectedCell[0]].group.length;
            const faculty = data[selectedCell[0]].group.slice(0, l - 4);
            const year = data[selectedCell[0]].group.slice(l - 3, l - 2);
            const facultiesLS = labels.faculties.filter(
                (f) => f.name === faculty
            );
            if (facultiesLS.length) {
                if (year === "1") {
                    setModules(facultiesLS[0].firstYearModules);
                } else {
                    setModules(facultiesLS[0].secondYearModules);
                }
            } else {
                setModules([]);
            }
        }
    }, [selectedCell, data]);

    if (!selectedCell) return null;

    let [schedualIndex, dayIndex, sessionIndex] = selectedCell;

    const editFieldHandler = (row, value) => {
        const res = editField(
            data,
            setData,
            setAlert,
            schedualIndex,
            dayIndex,
            sessionIndex,
            row,
            value,
            fusionMode
        );
        if (res) setSaved(false);
    };
    const getOffset = () => {
        if (!fusionMode) return 0;
        const z = parseInt(selectedCell.charAt(2));
        if (z === sessionIndex) return 0;
        return z % 2 === 0 ? -1 : 1;
    };
    const isComplete = (session) => {
        if (session[0].trim() && session[1].trim() && session[2].trim())
            return "all";
        else if (session[0].trim() || session[1].trim() || session[2].trim())
            return "some";
    };

    return (
        <div className="sticky top-0 z-30 flex justify-between w-full p-2 border rounded-lg shadow-md bg-light">
            <div>
                <select
                    name="trainer"
                    className="input"
                    value={
                        data[schedualIndex].schedual[dayIndex][sessionIndex][0]
                    }
                    onChange={(e) => editFieldHandler(0, e.target.value)}
                >
                    <option value="" disabled>
                        Trainer...
                    </option>
                    {labels.trainers.map((trainer) => {
                        return (
                            <option value={trainer.name}>{trainer.name}</option>
                        );
                    })}
                </select>
            </div>
            <div>
                <select
                    name="module"
                    className="input"
                    value={
                        data[schedualIndex].schedual[dayIndex][sessionIndex][1]
                    }
                    onChange={(e) => editFieldHandler(1, e.target.value)}
                >
                    <option value="" disabled>
                        Module...
                    </option>
                    {modules.map((mod) => (
                        <option value={mod}>{mod}</option>
                    ))}
                </select>
            </div>
            <div>
                <select
                    name="room"
                    className="input"
                    value={
                        data[schedualIndex].schedual[dayIndex][sessionIndex][2]
                    }
                    onChange={(e) => editFieldHandler(2, e.target.value)}
                >
                    <option value="" disabled>
                        Room...
                    </option>
                    {labels.rooms.map((room) => {
                        return <option value={room.name}>{room.name}</option>;
                    })}
                </select>
            </div>
            <div>
                <select
                    name="event"
                    className="input"
                    value={
                        data[schedualIndex].schedual[dayIndex][sessionIndex][3]
                    }
                    onChange={(e) => editFieldHandler(3, e.target.value)}
                >
                    <option value="" disabled>
                        Event...
                    </option>
                    {labels.events.map((event) => {
                        return <option value={event.name}>{event.name}</option>;
                    })}
                </select>
            </div>
            <div className="text-xs leading-3">
                <div>
                    <span>Schedual:</span>
                    <span className="font-semibold text-primary">
                        {schedualIndex}
                    </span>
                </div>
                <div>
                    <span>Day:</span>
                    <span className="font-semibold text-primary">
                        {dayIndex}
                    </span>
                </div>
                <div>
                    <span>Session:</span>
                    <span className="font-semibold text-primary">
                        {sessionIndex}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SelectionBar;
