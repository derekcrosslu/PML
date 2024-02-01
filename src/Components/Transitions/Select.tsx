import { useSnapshot, snapshot } from "valtio";
import state from "../../Store/state";
import { changeTransitions } from "../../Store/actions";
import { useState, useEffect } from "react";
import Transition from "./Transition";
import { BiPlug, BiEdit } from "react-icons/bi";
import { RiOutletLine, RiEditFill } from "react-icons/ri";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

export const SelectTransition = () => {
    const handleAddTransition = () => {
        state.showTransitionList = false;
    };
    return (
        <div>
            <TransitionList />
            <button
                className="rounded-full bg-green-500 h-8 w-36 font-bold text-xs text-white ml-6 mt-12"
                onClick={() => handleAddTransition()}
            >
                + ADD TRANSITION
            </button>
        </div>
    );
};

const TransitionList = () => {
    const { transitionArr, rightPaneMessage, selectedTransition, arrayStates } =
        useSnapshot(state);

    return (
        <div>
            {transitionArr.map((x, index) => {
                if (x.showWire) {
                    return (
                        <SelectTransitionComponent
                            index={index}
                            key={index}
                            stateElement={x}
                        />
                    );
                }
            })}
        </div>
    );
};

const SelectTransitionComponent = ({ index, stateElement }: any) => {
    const [editMode, setEditMode] = useState<string>("1");
    const { selectedTransition, transitionSelected } = useSnapshot(state);

    useEffect(() => {
        const indexString = index;
        if (transitionSelected !== indexString) {
            setEditMode("1");
        } else {
            setEditMode("2");
        }
    }, [transitionSelected]);

    switch (editMode) {
        case "1":
            return (
                <TransitionListDeSelected
                    setEditMode={setEditMode}
                    stateElement={stateElement}
                    key={index}
                    index={index}
                />
            );
        case "2":
            return (
                <TransitionListSelected
                    setEditMode={setEditMode}
                    stateElement={stateElement}
                    index={index}
                    key={index}
                />
            );

        default:
            return null;
    }
};

export const TransitionListSelected = ({
    stateElement,
    setEditMode,
    index,
}: any) => {
    const {
        transitionArr,
        arrayStates,
        toggleNameArr,
        textColor,
        buttonColor,
        highlightColor,
        transitionSelected,
    } = useSnapshot(state);
    const handleEdit = () => {
        setEditMode("1");
        state.transitionSelected = index;
        changeTransitions(index);
        state.showTransitionList = false;
        state.editTransition = true;
    };
    const handleDelete = (value: any) => {
        if (transitionArr.length > 1) {
            state.transitionArr.splice(value.target.value, 1);
        }
    };
    const sourceName = `${arrayStates[stateElement.sourceId].name}`;
    const targetName = `${arrayStates[stateElement.targetId].name}`;
    const TransitionName = () => (
        <>
            {sourceName}{" "}
            <span
                className={`${
                    textColor[stateElement.toggleId]
                } forn-bold text-1xl`}
            >
                {" "}
                ➜{" "}
            </span>{" "}
            {targetName}
        </>
    );
    return (
        <div
            className={`flex bg-orange-100  w-96  gap-2 p-2 h-14 items-center`}
        >
            <button
                onClick={handleEdit}
                className="border-b-2 text-xs border-gray-400 h-5 w-72 font-medium  ml-1 mr-3  text-gray-500"
            >
                <TransitionName />
            </button>
            <button onClick={handleEdit} className={`rounded h-5  `}>
                {" "}
                <RiEditFill size={20} />
            </button>
            {/* <button value={index} onClick={handleDelete} className={`rounded h-5   `}> <AiFillDelete size={20} /></button> */}
            <div className=" h-5 w-10 text-gray-500 outline-gray-800 text-xs leading-normal mb-3"></div>
        </div>
    );
};

export const TransitionListDeSelected = ({
    stateElement,
    setEditMode,
    index,
}: any) => {
    const {
        arrayStates,
        transitionArr,
        toggleNameArr,
        buttonColor,
        textColor,
        transitionSelected,
    } = useSnapshot(state);
    const handleEdit = () => {
        setEditMode("2");
        state.transitionSelected = index;
        changeTransitions(index);
    };
    const handleDelete = (value: any) => {
        if (transitionArr.length > 0) {
            state.transitionArr.splice(value.target.value, 1);
        }
    };

    const sourceName = `${arrayStates[stateElement.sourceId].name}`;
    const targetName = `${arrayStates[stateElement.targetId].name}`;
    const TransitionName = () => (
        <>
            {sourceName}{" "}
            <span
                className={`${
                    textColor[stateElement.toggleId]
                } forn-bold text-1xl`}
            >
                {" "}
                ➜{" "}
            </span>{" "}
            {targetName}
        </>
    );

    return (
        <div className="flex p-2 w-96 gap-2 h-14 items-center">
            <button
                onClick={handleEdit}
                className="border-b-2 text-xs border-gray-400 h-5 w-72 font-medium   ml-1 mr-3 "
            >
                <TransitionName />
            </button>
            <button onClick={handleEdit} className={`rounded h-5  `}>
                {" "}
                <RiEditFill size={20} />
            </button>
            {/* <button value={index} onClick={handleDelete} className={`rounded h-5  `}> <AiFillDelete size={20} /></button>    */}
            <div className=" h-5 w-10 text-gray-500 outline-gray-800 text-xs leading-normal mb-3"></div>
        </div>
    );
};
