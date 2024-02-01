import { snapshot, useSnapshot } from "valtio";
import state from "../../Store/state";
import { changeState } from "../../Store/actions";
import { useState, useEffect } from "react";
import { BiPlug, BiEdit } from "react-icons/bi";
import { RiOutletLine, RiEditFill } from "react-icons/ri";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

export const SelectState = () => {
    const { arrayStates } = useSnapshot(state);
    return (
        <div>
            {arrayStates.map((x, index) => (
                <SelectStateComponent
                    index={index}
                    key={index}
                    stateElement={x}
                />
            ))}
        </div>
    );
};
const SelectStateComponent = ({ index, stateElement }: any) => {
    const [editMode, setEditMode] = useState<string>("3");
    const {
        selectedSource,
        transitionSelected,
        showSelectedState,
        selectedState,
    } = useSnapshot(state);
    useEffect(() => {
        const indexString = index;
        // state.showSelectedState = !showSelectedState
        if (selectedState !== indexString) {
            setEditMode("3");
        } else {
            setEditMode("2");
        }
    }, [selectedState]);

    switch (editMode) {
        case "2":
            return (
                <StatesListSelected
                    setEditMode={setEditMode}
                    stateElement={stateElement}
                    index={index}
                />
            );
        case "3":
            return (
                <StatesListDeSelected
                    setEditMode={setEditMode}
                    stateElement={stateElement}
                    key={index}
                    index={index}
                />
            );
        default:
            return null;
    }
};

export const StatesListSelected = ({
    stateElement,
    setEditMode,
    index,
}: any) => {
    const { transitionId, arrayStates } = useSnapshot(state);
    const handleEdit = () => {
        state.showEditState = true;
        state.selectedState = index;
    };
    const handleDelete = (value: any) => {
        const { arrayStates } = snapshot(state);
        if (arrayStates.length > 1) {
            state.arrayStates.splice(value.target.value, 1);
        }
    };

    const name = `${stateElement.name} `;
    return (
        <div className="flex bg-blue-100 p-2 w-full  gap-3 h-14 items-center">
            <button
                onClick={handleEdit}
                className="border-b-2 text-xs border-gray-400 h-5 w-48 font-medium  ml-5 -indent-10  "
            >
                {name}
            </button>
            <button onClick={handleEdit} className="">
                {" "}
                <RiEditFill size={20} />
            </button>
            {/* <button value={index} onClick={handleDelete} className=""> <AiFillDelete size={20} /></button> */}
            <div className=" h-5 w-5 text-gray-500 outline-gray-800 text-xs leading-normal mb-3"></div>
        </div>
    );
};

export const StatesListDeSelected = ({
    stateElement,
    setEditMode,
    index,
}: any) => {
    const handleEdit = () => {
        setEditMode("2");
        state.selectedState = index;
    };
    const handleDelete = (value: any) => {
        const { arrayStates } = snapshot(state);
        if (arrayStates.length > 1) {
            state.arrayStates.splice(value.target.value, 1);
        }
    };
    const name = `${stateElement.name} `;
    return (
        <div className="flex p-2 w-full  gap-3 h-14 items-center">
            <button
                onClick={handleEdit}
                className="border-b-2 text-xs border-gray-400 h-5 w-48 font-medium  ml-5 -indent-10 "
            >
                {name}
            </button>
            <button onClick={handleEdit} className="">
                {" "}
                <RiEditFill size={20} />
            </button>
            {/* <button value={index} onClick={handleDelete} className=""> <AiFillDelete size={20} /></button> */}
            <div className=" h-5 w-5 text-gray-500 outline-gray-800 text-xs leading-normal mb-3 "></div>
        </div>
    );
};
