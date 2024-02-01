import { useState, useEffect } from "react";
import { snapshot, useSnapshot } from "valtio";
import ReactSelect from "react-select";
import state from "../../Store/state";
import { handleAddState } from "../../Store/actions";
import { customStyles } from "../../Layouts/customStyles";
import { Wire } from "./Wire";
import { editTransition } from "../../Store/actions";
import { SelectTransition } from "./Select";

export default function EditTransition() {
    const { transitionButtonsActive, transitionPortActive } =
        useSnapshot(state);
    return (
        <div className="w-full h-screen">
            <DropdownSource />
            <DropdownPort />
            <DropdownTarget />

            <TransitionButton />
        </div>
    );
}

const DropdownSource = () => {
    const { arrayStates, transitionSelected, selectedSource, transitionArr } =
        useSnapshot(state);
    const optionsState = arrayStates.map((x) => ({
        value: x.stateId,
        label: x.name,
    }));
    state.selectedSource = transitionArr[transitionSelected].sourceId;
    const changeSource = (event: any) => {
        state.transitionArr[transitionSelected].sourceId = event.value;
        state.transitionPortActive = true;
    };
    console.log(
        "transitionSelected DropdownSource",
        transitionSelected,
        "selectedSource",
        selectedSource
    );
    return (
        <div className="mt-6">
            <span className="text-xs -indent-1 ">From State: </span>
            <ReactSelect
                placeholder="Select a Source"
                name="colors"
                value={optionsState[selectedSource]}
                options={optionsState}
                styles={customStyles}
                classNamePrefix="select"
                isClearable={false}
                onChange={(value: any) => changeSource(value)}
            />
        </div>
    );
};

const DropdownTarget = () => {
    const { transitionArr, arrayStates, transitionSelected, selectedTarget } =
        useSnapshot(state);
    const optionsState = arrayStates.map((x) => ({
        value: x.stateId,
        label: x.name,
    }));
    state.selectedTarget = transitionArr[transitionSelected].targetId;
    const changeTarget = (event: any) => {
        state.transitionArr[transitionSelected].targetId = event.value;
        state.transitionButtonsActive = true;
    };

    return (
        <div className="mt-6">
            <span className="text-xs -indent-1 ">To State:</span>
            <ReactSelect
                placeholder="Select a Target"
                name="colors"
                value={optionsState[selectedTarget]}
                options={optionsState}
                styles={customStyles}
                classNamePrefix="select"
                isClearable={false}
                onChange={(value: any) => changeTarget(value)}
            />
        </div>
    );
};

const DropdownPort = () => {
    const { transitionArr, transitionId, selectedPortId, transitionSelected } =
        useSnapshot(state);

    const optionsSourcePort = [
        { portId: 0, value: "port1", label: "Port 1" },
        { portId: 1, value: "port2", label: "Port 2" },
        { portId: 2, value: "port3", label: "Port 3" },
        { portId: 3, value: "port4", label: "Port 4" },
        { portId: 4, value: "port5", label: "Port 5" },
    ];
    const changePort = (event: any) => {
        state.transitionArr[transitionSelected].portId = event.portId;
    };

    const selectedPort = parseInt(transitionArr[transitionSelected].portId);

    return (
        <div className="">
            <span className="text-xs -indent-1 mt-4">Source Port:</span>
            <ReactSelect
                placeholder="Select a Port"
                name="colors"
                value={optionsSourcePort[selectedPort]}
                options={optionsSourcePort}
                styles={customStyles}
                classNamePrefix="select"
                isClearable={false}
                onChange={(value: any) => changePort(value)}
            />
        </div>
    );
};

const TransitionButton = () => {
    const { transitionId, transitionArr, transitionSelected, toggleNameArr } =
        snapshot(state);

    const snap = useSnapshot(state);
    const handleToggleState = (event: any) => {
        state.transitionArr[transitionSelected].toggleId = parseInt(
            event.target.value
        );
    };

    return (
        <div className="mt-6 justify-center w-full ">
            <div className="text-xs -indent-1 mt-12 ml-16 mb-2 ">
                Transition Type:
            </div>

            {toggleNameArr.map((x, index) => {
                if (transitionArr[transitionSelected].toggleId !== index) {
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
        selectedCondition,
        conditionInput,
        conditionInputSymbolArr,
        transitionArr,
        toggleNameArr,
        buttonColor,
        transitionSelected,
    } = snapshot(state);

    const handleClose = () => {
        state.showTransitionList = true;
        state.editTransition = false;
        return <SelectTransition />;
    };

    const handleChange = (value: any) => {
        state.selectedCondition = value.index;
        state.transitionArr[transitionSelected].conditionId = value.index;
    };
    const handleOnChangeInput = (event: any) => {
        state.conditionInput = event.target.value;
        state.transitionArr[transitionSelected].conditionInput =
            event.target.value;
    };
    const handleEdit = () => {
        editTransition();
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
                    {toggleNameArr[transitionArr[transitionSelected].toggleId]}
                </span>
                <div
                    className={`h-1 w-14   ${
                        buttonColor[transitionArr[transitionSelected].toggleId]
                    } ml-3 mt-1.5 mb-4`}
                ></div>
            </div>

            <div>
                <ReactSelect
                    placeholder="Select a dropdown item"
                    name="colors"
                    value={conditionArr[selectedCondition]}
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
                    value={transitionArr[transitionSelected].conditionInput}
                    onChange={handleOnChangeInput}
                />
                <div className="text-sm border-1  flex mt-4 ml-3">
                    {
                        conditionInputSymbolArr[
                            transitionArr[transitionSelected].toggleId
                        ]
                    }
                </div>
            </div>
            <div className="flex flex-col justify-center items-center  mt-20 mr-32 gap-5 ">
                {/* <button onClick={handleEdit} className='text-xs font-semibold text-center text-blue-700'>ADD TRANSITION </button> */}
                <button
                    onClick={handleClose}
                    className="text-xs font-semibold text-center  text-black"
                >
                    DONE
                </button>
            </div>
        </div>
    );
};
