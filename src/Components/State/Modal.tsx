import { snapshot, useSnapshot } from "valtio";
import { useState } from "react";
import state from "../../Store/state";
import { changeState } from "../../Store/actions";
import { BiPlug, BiEdit } from "react-icons/bi";
import { RiOutletLine, RiEditFill } from "react-icons/ri";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

export const EditStateModal = () => {
    const { showEditState, selectedState, arrayStates } = useSnapshot(state);
    const [inputEdit, setInputEdit] = useState(arrayStates[selectedState].name);
    const ports = [1, 2, 3, 4, 5];
    const handleBack = () => {
        state.showEditState = false;
    };
    const handleNameInput = (value: any) => {
        setInputEdit(value.target.value);
        state.arrayStates[selectedState].name = value.target.value;
    };
    const handlePortActive = (index: any) => {
        state.arrayStates[selectedState].portActive[index.target.value] =
            !arrayStates[selectedState].portActive[index.target.value];
    };
    const handleInStatus = () => {
        state.arrayStates[selectedState].inIcon =
            !arrayStates[selectedState].inIcon;
    };
    const handleOutStatus = () => {
        state.arrayStates[selectedState].outIcon =
            !arrayStates[selectedState].outIcon;
    };

    const handleSubmit = (val: any) => {
        changeState(inputEdit, selectedState);
    };

    return (
        <div className="flex gap-5 justify-center p-5 ml-5 bg-white  z-50 h-screen w-screen">
            <div className="flex flex-col gap-5 items-center  justify-center  p-10 w-128 h-4/6 bg-gray-50 border-2 border-gray-400 rounded-lg shadow-md">
                <div className="flex mt-2 mb-5">
                    <div className="w-40 font-bold text-gray-600">
                        State Name:{" "}
                    </div>
                    <div className="     border-b-2 text-xs border-gray-400 h-8 outline-none">
                        <input
                            value={inputEdit}
                            onChange={handleNameInput}
                            className="h-6 w-72 font-bold  text-center    bg-gray-50 outline-none"
                        />
                    </div>
                </div>
                {/* iteration over ports to render rows */}
                {ports.map((x, index) => {
                    return (
                        <PortComponent
                            key={index}
                            portNum={x}
                            handlePortActive={handlePortActive}
                            index={index}
                        />
                    );
                })}

                <div className="flex  justify-end gap-5 mt-5 w-7/8">
                    <button
                        onClick={handleBack}
                        className=" rounded-lg h-8 bg-red-600 w-32  flex justify-center items-center text-xs text-white font-bold"
                    >
                        {" "}
                        Cancel
                    </button>
                    <button
                        onClick={handleBack}
                        className=" rounded-lg h-8 bg-green-600 w-32  flex justify-center items-center text-xs text-white font-bold"
                    >
                        {" "}
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

const PortComponent = ({ portNum, handlePortActive, index }: any) => {
    return (
        <div className="flex gap-10  items-center">
            <div className="p-3 w-26 h-10 flex bg-blue-100 justify-start gap-10 items-center rounded-md">
                Active
                <CheckboxTwd
                    handlePortActive={handlePortActive}
                    index={index}
                />
            </div>
            <div>
                <ButtonState portNum={portNum} index={index} id={index} />
            </div>
        </div>
    );
};

const ButtonState = ({ id, portNum, index }: any) => {
    const { arrayStates, selectedState } = useSnapshot(state);
    return (
        <div
            id={id}
            className={`rounded  flex justify-between items-center text-xs h-12 p-5 w-72 bg-gray-400 `}
        >
            <span className="  text-white font-bold">Port {portNum}</span>
            <div
                className={`flex justify-center gap-10 ${
                    arrayStates[selectedState].portActive[index]
                        ? "text-white"
                        : "text-gray-500"
                }`}
            >
                <RiOutletLine size={26} />
                <BiPlug size={26} />
            </div>
        </div>
    );
};

const CheckboxTwd = ({ handlePortActive, index }: any) => {
    const { arrayStates, selectedState } = useSnapshot(state);
    const valueString = arrayStates[selectedState].portActive[index];
    return (
        <div className=" mt-0.5  flex  box-decoration-slice">
            <input
                type="checkbox"
                className="  form-checkbox h-3 w-3  rounded "
                onChange={handlePortActive}
                value={index}
                checked={arrayStates[selectedState].portActive[index]}
            />
        </div>
    );
};
