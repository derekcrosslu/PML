import { useSnapshot } from "valtio";
import { TransitionWires } from "../Transitions/TransitionWires";
import state from "../../Store/state";
import { addTransition, handleSelectState } from "../../Store/actions";
import { useEffect, useRef, useState } from "react";
import { BiPlug, BiEdit } from "react-icons/bi";
import { RiOutletLine, RiEditFill } from "react-icons/ri";

export const States = () => {
    const {
        arrayStates,
        selectedSource,
        showSelectedState,
        selectedState,
        transitionSelected,
    } = useSnapshot(state);
    return (
        <div className="grid grid-cols-2 gap-20 ">
            {state.arrayStates.map((x, index) => {
                if (selectedState !== index) {
                    return (
                        <State
                            stateCode={x.stateId}
                            stateName={x.name}
                            key={index}
                            index={index}
                        />
                    );
                } else {
                    // return showSelectedState ? <StateSelected stateCode={x.stateId} stateName={x.name} key={index} /> : <State stateCode={x.stateId} stateName={x.name} key={index} />
                    return (
                        <State
                            stateCode={x.stateId}
                            stateName={x.name}
                            key={index}
                            index={index}
                        />
                    );
                }
            })}
        </div>
    );
};

export const State = ({ stateCode, stateName, index }: any) => {
    const {
        arrayStates,
        selectedStateBorderOptions,
        transitionArr,
        transitionSelected,
        selectedTransition,
        selectedStateBorder,
        showSelectedState,
    } = useSnapshot(state);
    // useEffect(() => {
    //     console.log('transitionSelected state', transitionSelected);
    //     state.arrayStates[stateCode].borderColor = 0
    // }, [selectedTransition])
    // if (stateCode !== transitionArr[transitionSelected].sourceId) {
    //     // state.arrayStates[stateCode].borderColor = 2
    // }
    if (showSelectedState) {
        if (stateCode === selectedTransition) {
            if (stateCode === transitionArr[selectedTransition].sourceId) {
                state.selectedStateBorder[stateCode] = 2;
            }
        } else if (stateCode !== selectedTransition) {
            if (stateCode === transitionArr[selectedTransition].targetId) {
                state.selectedStateBorder[stateCode] = 3;
            }
        } else {
            state.selectedStateBorder[stateCode] = 0;
        }
    } else {
        state.selectedStateBorder[stateCode] = 0;
    }
    return (
        <div className="z-5" onClick={() => handleSelectState(stateCode)}>
            <div className="text-xs mb-2 indent-3 text-gray-400 font-bold">
                {stateName ? stateName : null}
            </div>
            <div
                id={stateCode}
                className={`grid grid-flow-row p-3 rounded ${
                    selectedStateBorderOptions[selectedStateBorder[stateCode]]
                } w-48 gap-1.5 shadow-lg`}
            >
                <ButtonState
                    port={"1"}
                    color={
                        arrayStates[index].portActive[0]
                            ? "bg-gray-400"
                            : "bg-gray-100"
                    }
                    id={stateCode + "_port0"}
                />
                <ButtonState
                    port={"2"}
                    color={
                        arrayStates[index].portActive[1]
                            ? "bg-gray-400"
                            : "bg-gray-100"
                    }
                    id={stateCode + "_port1"}
                />
                <ButtonState
                    port={"3"}
                    color={
                        arrayStates[index].portActive[2]
                            ? "bg-gray-400"
                            : "bg-gray-100"
                    }
                    id={stateCode + "_port2"}
                />
                <ButtonState
                    port={"4"}
                    color={
                        arrayStates[index].portActive[3]
                            ? "bg-gray-400"
                            : "bg-gray-100"
                    }
                    id={stateCode + "_port3"}
                />
                <ButtonState
                    port={"5"}
                    color={
                        arrayStates[index].portActive[4]
                            ? "bg-gray-400"
                            : "bg-gray-100"
                    }
                    id={stateCode + "_port4"}
                />
            </div>
        </div>
    );
};

const ButtonState = ({ id, port, color }: any) => {
    const { arrayStates, selectedState } = useSnapshot(state);
    return (
        <div
            id={id}
            className={`rounded ${color}  flex place-content-center items-center text-xs h-12 p-1`}
        >
            {/* <CheckboxTwd /> */}
            <span className="text-center w-full text-white font-bold -ml-2">
                Port {port}
            </span>{" "}
            <div className={`flex justify-center gap-5 mr-4 text-white`}>
                <RiOutletLine size={20} />
                <BiPlug size={20} />
            </div>
        </div>
    );
};

const CheckboxTwd = () => (
    <div className=" mt-0.5  flex  box-decoration-slice">
        <input type="checkbox" className="  form-checkbox h-3 w-3  rounded " />
    </div>
);
