import { snapshot } from "valtio/vanilla";
import state from "./state";
import { State } from "../Components/State/State";
import { Wire } from "../Components/Transitions/Wire";

export interface States {
    stateId: number;
    name: string;
    sComp: JSX.Element;
}

export interface TransitionType {
    transitionId: number;
    tType: string;
    tCondition: number;
    tComp: JSX.Element;
}

export interface Options {
    value: number;
    label: string;
}

export interface TransitionWireArr {
    tComp: JSX.Element;
}

export interface TransitionToggleButton {
    charge: object;
    generation: object;
    consumption: object;
}
export interface TransitionTypeConsumtion {
    consumption: number;
}
export interface TransitionTypeCharge {
    charge: number;
}
export interface TransitionTypeGeneration {
    generation: number;
}

export interface ArrayStates {
    stateId: number;
    name: string;
    sComp: JSX.Element;
    portActive: boolean[];
    inIcon: boolean;
    outIcon: boolean;
    portNum: number;
    borderColor: number;
}

export interface Transition {
    stateId: number;
    toggleId: number;
    conditionInput: string;
    transitionId: number;
    portId: string;
    conditionId: number;
    targetId: number;
    sourceId: number;
    tObj: JSX.Element;
    showWire: boolean;
    tColorDash: boolean;
}

export const handleAddState = () => {
    const { transitionId, transitionArr, selectedSource } = snapshot(state);
    const a: ArrayStates[] = state.arrayStates;
    state.stateId = state.stateId + 1;
    const sObj = {
        stateId: state.stateId,
        name: "State Name",
        sComp: <State stateCode={`state0`} stateName={"State Name"} />,
        portActive: [true, true, true, true, true],
        inIcon: false,
        outIcon: false,
        portNum: 0,
        borderColor: 0,
    };
    if (a[0].stateId === undefined) state.arrayStates.splice(0, 1, sObj);
    else state.arrayStates.push(sObj);
};

export const addTransition = () => {
    const { transitionId, transitionArr, tPanelActive, buttonColorRGB } =
        snapshot(state);
    const source = `${transitionArr[transitionId].sourceId.toString()}_${
        transitionArr[transitionId].portId
    }`;
    const target = `${transitionArr[transitionId].targetId.toString()}`;

    const tglObj = {
        transitionId: transitionArr[transitionId].transitionId,
        stateId: transitionArr[transitionId].sourceId,
        toggleId: transitionArr[transitionId].toggleId,
        conditionInput: transitionArr[transitionId].conditionInput,
        conditionId: transitionArr[transitionId].conditionId,
        portId: transitionArr[transitionId].portId,
        targetId: transitionArr[transitionId].targetId,
        sourceId: transitionArr[transitionId].sourceId,
        tObj: (
            <Wire
                start={source}
                end={target}
                color={buttonColorRGB[transitionArr[transitionId].toggleId]}
            />
        ),
        showWire: true,
        tColorDash: true,
    };
    state.transitionArr.push(tglObj);
};

export const editTransition = () => {
    const { transitionId, transitionArr, tPanelActive, buttonColorRGB } =
        snapshot(state);
    const source = `${transitionArr[transitionId].sourceId.toString()}_${
        transitionArr[transitionId].portId
    }`;
    const target = `${transitionArr[transitionId].targetId.toString()}`;

    const tglObj = {
        transitionId: transitionArr[transitionId].transitionId,
        stateId: transitionArr[transitionId].sourceId,
        toggleId: transitionArr[transitionId].toggleId,
        conditionInput: transitionArr[transitionId].conditionInput,
        conditionId: transitionArr[transitionId].conditionId,
        portId: transitionArr[transitionId].portId,
        targetId: transitionArr[transitionId].targetId,
        sourceId: transitionArr[transitionId].sourceId,
        tObj: (
            <Wire
                start={source}
                end={target}
                color={buttonColorRGB[transitionArr[transitionId].toggleId]}
            />
        ),
        showWire: true,
        tColorDash: true,
    };
    state.transitionArr.splice(transitionId, 1, tglObj);
};

export const changeState = (name: string, stateId: number) => {
    state.arrayStates[stateId].name = name;
};

export const changeTransitions = (index: number) => {
    state.transitionSelected = index;
};

export const handleSelectedState = () => {
    const { showSelectedState } = snapshot(state);
    state.showSelectedState = !showSelectedState;
};
export const handleSelectState = (stateCode: any) => {
    const { selectedState } = snapshot(state);
    state.selectedState = stateCode;
};
