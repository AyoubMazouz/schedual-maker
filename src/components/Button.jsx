import React from "react";

export const Button = ({
    onClick,
    Icon,
    text = "",
    trigger = null,
    type = "secondary",
    children = null,
    disabled = false,
}) => {
    if (!text)
        return (
            <button
                className={`flex h-8 w-8 items-center justify-center rounded transition-all duration-300 hover:bg-dark/25 ${
                    trigger ? "bg-primary/25" : ""
                }`}
                onClick={(e) => onClick(e)}
            >
                <Icon className="icon" />
            </button>
        );
    return (
        <button
            disabled={disabled}
            className={`btn-${type} ${Icon ? "pl-4 pr-2" : "px-4"}`}
            onClick={(e) => onClick(e)}
        >
            {children}
            <span>{text}</span>
            <Icon className="icon" />
        </button>
    );
};
