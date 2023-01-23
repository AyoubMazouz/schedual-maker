import React from "react";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { Button } from "../Button";
import { IcEx } from "../icons";

const ShowDetails = () => {
    const { model, setModel } = useGlobalContext();
    return (
        <div className="fixed top-[4rem] left-[50%] z-40 w-full max-w-[600px] translate-x-[-50%]">
            <div
                className={`rounded-lg border-2 border-dark/25 bg-light p-4 text-center shadow-lg`}
            >
                <div>
                    {model.details.map(([key, value], index) => (
                        <div
                            key={key}
                            className={`grid grid-cols-2 px-2 py-1 ${
                                index % 2 === 0 && "bg-dark/5"
                            }`}
                        >
                            <span className="text-left max-w-1/2">{key}:</span>
                            <span className="font-semibold text-right max-w-1/2 text-primary">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
                <Button
                    text="Close"
                    onClick={() => setModel(null)}
                    Icon={IcEx}
                />
            </div>
        </div>
    );
};

export default ShowDetails;
