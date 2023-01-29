import { Timestamp } from "firebase/firestore";
import React from "react";
import { useGlobalContext } from "../../../Contexts/GlobalContext";
import useSettings from "../../../hooks/useSettings";
import { Button } from "../../Button";
import { IcCancel, IcLogin } from "../../../helpers/icons";

const AddRoom = () => {
  const { model, setModel, setAlert, labelsData, setLabelsData } =
    useGlobalContext();
  const { addEvent } = useSettings();

  const [eventInput, setEventInput] = React.useState("");

  const submitHandler = () => {
    const res = addEvent(labelsData, setLabelsData, eventInput);
    if (res) {
      model.setSaved(false);
      setModel(null);
    } else {
      setAlert({
        type: "warn",
        message: `event "${eventInput}" already exists!`,
      });
      setEventInput("");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-6">
        <div className="text-center text-xl text-primary">Add New Event</div>
        <div className="flex flex-col items-center gap-y-2">
          <label className="input-label" htmlFor="event">
            Event:
          </label>
          <input
            className="input max-w-[26rem]"
            type="text"
            name="event"
            value={eventInput}
            onChange={(e) => setEventInput(e.target.value.toUpperCase())}
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
        <Button text="cancel" onClick={() => setModel(null)} Icon={IcCancel} />
      </div>
    </>
  );
};

export default AddRoom;
