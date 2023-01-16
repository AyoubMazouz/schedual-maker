import React from "react";
import { useNavigate } from "react-router-dom";
import { EMPTY_SCHEDUAL } from "../constants";
import useEditor from "../pages/Editor/useEditor";

const copyData = (data) => JSON.parse(JSON.stringify(data));

const GlobalContext = React.createContext();

export const useGlobalContext = () => {
    return React.useContext(GlobalContext);
};

export const GlobalContextProvider = ({ children }) => {
    const [alert, setAlert] = React.useState(null);
    const [model, setModel] = React.useState(null);
    const [data, setData] = React.useState([copyData(EMPTY_SCHEDUAL)]);
    const [name, setName] = React.useState("");

    const { getDocument } = useEditor();
    const navigate = useNavigate();

    React.useEffect(() => {
        const unsubscribe = setTimeout(() => {
            setAlert(null);
        }, 100000);
        return () => clearTimeout(unsubscribe);
    }, [alert]);

    const loadData = (name) => {
        return new Promise(async (resolve, reject) => {
            if (!name) resolve(false);

            const doc = await getDocument(name);

            if (doc) {
                setData(JSON.parse(doc.data));
                setName(doc.name);
                resolve(true);
            }
        });
    };

    const value = {
        alert,
        setAlert,
        model,
        setModel,
        data,
        setData,
        name,
        setName,
        loadData,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
