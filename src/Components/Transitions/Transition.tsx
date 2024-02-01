import { useState, useEffect } from "react";
import { snapshot, useSnapshot } from "valtio";
import ReactSelect from "react-select";
import state from "../../Store/state";
import { handleAddState } from "../../Store/actions";
import { customStyles } from "../../Layouts/customStyles";
import { Wire } from "./Wire";
import { addTransition } from "../../Store/actions";
import { SelectTransition } from "./Select";

export default function Transition() {
    const { transitionButtonsActive, transitionPortActive } =
        useSnapshot(state);
    return (
        <div className="w-full h-screen">
            <DropdownSource />
            {transitionPortActive ? <DropdownPort /> : null}
            <DropdownTarget />

            {transitionButtonsActive ? <TransitionButton /> : null}
        </div>
    );
}

export const DropdownSource = () => {
    const {
        transitionId,
        arrayStates,
        transitionSelected,
        selectedSource,
        optionsStateSourceChanged,
    } = useSnapshot(state);
    const optionsState = arrayStates.map((x) => ({
        value: x.stateId,
        label: x.name,
    }));
    const changeSource = (event: any) => {
        state.selectedSource = event.value;
        state.transitionArr[transitionId].sourceId = event.value;
        state.transitionPortActive = true;
        state.optionsStateSourceChanged = arrayStates.map((x) => ({
            value: x.stateId,
            label: x.name,
        }));
    };

    return (
        <div className="mt-6">
            <span className="text-xs -indent-1 ">From State:</span>
            <ReactSelect
                placeholder="Select a Source"
                name="colors"
                // value={optionsStateSourceChanged}
                options={optionsState}
                styles={customStyles}
                classNamePrefix="select"
                isClearable={false}
                onChange={(value: any) => changeSource(value)}
            />
        </div>
    );
};

export const DropdownTarget = () => {
    const {
        transitionId,
        arrayStates,
        transitionSelected,
        optionsStateTargetChanged,
    } = useSnapshot(state);
    const optionsState = arrayStates.map((x) => ({
        value: x.stateId,
        label: x.name,
    }));
    const changeTarget = (event: any) => {
        state.selectedTarget = event.value;
        state.transitionArr[transitionId].targetId = event.value;
        state.transitionButtonsActive = true;
        state.optionsStateTargetChanged = arrayStates.map((x) => ({
            value: x.stateId,
            label: x.name,
        }));
    };

    return (
        <div className="mt-6">
            <span className="text-xs -indent-1 ">To State:</span>
            <ReactSelect
                placeholder="Select a Target"
                name="colors"
                // value={optionsStateTargetChanged}
                options={optionsState}
                styles={customStyles}
                classNamePrefix="select"
                isClearable={false}
                onChange={(value: any) => changeTarget(value)}
            />
        </div>
    );
};

export const DropdownPort = () => {
    const { transitionArr, transitionId } = useSnapshot(state);
    const optionsSourcePort = [
        { portId: 0, value: "port1", label: "Port 1" },
        { portId: 1, value: "port2", label: "Port 2" },
        { portId: 2, value: "port3", label: "Port 3" },
        { portId: 3, value: "port4", label: "Port 4" },
        { portId: 4, value: "port5", label: "Port 5" },
    ];
    const changePort = (event: any) => {
        state.transitionArr[transitionId].portId = event.portId;
    };
    return (
        <div className="">
            <span className="text-xs -indent-1 mt-4">Source Port:</span>
            <ReactSelect
                placeholder="Select a Port"
                name="colors"
                options={optionsSourcePort}
                styles={customStyles}
                classNamePrefix="select"
                isClearable={false}
                onChange={(value: any) => changePort(value)}
            />
        </div>
    );
};

export const TransitionButton = () => {
    const { transitionId, transitionArr, transitionSelected, toggleNameArr } =
        snapshot(state);

    const snap = useSnapshot(state);
    const handleToggleState = (event: any) => {
        state.transitionArr[transitionId].toggleId = parseInt(
            event.target.value
        );
    };

    return (
        <div className="mt-6 justify-center w-full ">
            <div className="text-xs -indent-1 mt-12 ml-16 mb-2 ">
                Transition Type:
            </div>

            {toggleNameArr.map((x, index) => {
                if (transitionArr[transitionId].toggleId !== index) {
                    return (
                        <ToggleButton
                            index={index}
                            handleToggleState={handleToggleState}
                            x={x}
                            key={index}
                        />
                    );
                } else {
                    return (
                        <ToggleButtonSelected
                            index={index}
                            handleToggleState={handleToggleState}
                            x={x}
                            key={index}
                        />
                    );
                }
            })}
            <TransitionComponent />
        </div>
    );
};
const ToggleButton = ({ index, handleToggleState, x }: any) => {
    const { buttonColor } = snapshot(state);
    return (
        <button
            className={`ml-10 mb-1 rounded-full border-1 border-black ${buttonColor[index]} w-36 h-8 font-semibold text-xs justify-center items-center flex`}
            onClick={handleToggleState}
            value={index}
        >
            {x}
        </button>
    );
};
const ToggleButtonSelected = ({ index, handleToggleState, x }: any) => {
    const { buttonColor } = snapshot(state);
    return (
        <button
            className={`ml-10 mb-1 rounded-full border-2 border-black ${buttonColor[index]} w-36 h-8 font-semibold text-xs justify-center items-center flex`}
            onClick={handleToggleState}
            value={index}
        >
            {x}
        </button>
    );
};

const TransitionComponent = () => {
    const {
        transitionId,
        conditionInputSymbolArr,
        transitionArr,
        toggleNameArr,
        buttonColor,
        transitionSelected,
    } = snapshot(state);

    const handleClose = () => {
        state.showTransitionList = true;
        return <SelectTransition />;
    };

    const handleChange = (value: any) => {
        state.transitionArr[transitionId].conditionId = value.index;
    };
    const handleOnChangeInput = (event: any) => {
        state.transitionArr[transitionSelected].conditionInput =
            event.target.value;
    };
    const handleAdd = () => {
        addTransition();
    };

    const conditionArr = [
        { index: 0, value: "is les than", label: "is les than" },
        { index: 1, value: "is equal to", label: "is equal to" },
        { index: 2, value: "is greater than", label: "is greater than" },
        {
            index: 3,
            value: "is greater or equal to",
            label: "is greater or equal to",
        },
    ];

    return (
        <div className="text-xs -indent-1 mt-14">
            <div className="flex ">
                <span className="text-xs indent-1">Condition:</span>
                <span className="text-black indent-2     text-xs font-semibold">
                    {toggleNameArr[transitionArr[transitionId].toggleId]}
                </span>
                <div
                    className={`h-1 w-14   ${
                        buttonColor[transitionArr[transitionId].toggleId]
                    } ml-3 mt-1.5 mb-4`}
                ></div>
            </div>

            <div>
                <ReactSelect
                    placeholder="Select a dropdown item"
                    name="colors"
                    options={conditionArr}
                    styles={customStyles}
                    classNamePrefix="select"
                    isClearable={false}
                    onChange={handleChange}
                />
            </div>
            <div className="flex ">
                <input
                    className="flex text-right bg-gray-300 rounded mt-2 h-7 text-sm  w-46 p-4"
                    value={transitionArr[transitionId].conditionInput}
                    onChange={handleOnChangeInput}
                />
                <div className="text-sm border-1  flex mt-4 ml-3">
                    {
                        conditionInputSymbolArr[
                            transitionArr[transitionId].toggleId
                        ]
                    }
                </div>
            </div>
            <div className="flex flex-col justify-center items-center  mt-20 mr-32 gap-5 ">
                <button
                    onClick={handleAdd}
                    className="text-xs font-semibold text-center text-blue-700"
                >
                    ADD TRANSITION{" "}
                </button>
                <button
                    onClick={handleClose}
                    className="text-xs font-semibold text-center  text-black"
                >
                    CLOSE PANEL
                </button>
            </div>
        </div>
    );
};
