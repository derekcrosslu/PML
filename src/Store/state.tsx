import { proxy, useSnapshot } from "valtio";
import { Options, Transition, ArrayStates } from "./actions";
import { Wire } from "../Components/Transitions/Wire";

const state = proxy({
    stateId: 0,
    sourceIdSelected: 0,
    targetIdSelected: 0,
    arrayStates: [
        {
            stateId: 0,
            name: "State Name",
            portActive: [true, true, true, true, true],
            inIcon: false,
            outIcon: false,
            portNum: 0,
            borderColor: 0,
        },
    ] as unknown as ArrayStates[],
    targetSelected: false,
    transitionId: 0 as unknown as number,
    transitionSelected: 0,
    btnSelect: false,
    // stateOptions: [{ value: 0, label: 'Default State Name' }] as unknown as Options[],
    stateName: "",
    selectedSource: 0,
    selectedTarget: 0,
    selectedPortId: 0,
    selectedCondition: 0,
    selectedTransition: 0,
    selectedState: 0,
    optionsStateSourceChanged: {},
    optionsStateTargetChanged: {},
    transitionArr: [
        {
            transitionId: 0,
            stateId: 0,
            toggleId: 0,
            conditionInput: 0,
            conditionId: 0,
            portId: 0,
            targetId: null,
            sourceId: null,
            tObj: <Wire start={""} end={""} color={""} />,
            showWire: false,
            tColorDash: true,
        },
    ] as unknown as Transition[],
    toggleId: 0,
    conditionInput: "",
    conditionInputSymbolArr: ["W", "W", "%"],
    toggleNameArr: [
        "Consumption",
        "Power Generation",
        "Battery SoC",
        "Power Harvested",
    ],
    toggleName: "",
    buttonColor: ["bg-green-400", "bg-blue-400", "bg-pink-600"],
    highlightColor: ["bg-green-100", "bg-blue-100", "bg-pink-100"],
    textColor: ["text-green-400", "text-blue-400", "text-pink-600"],
    buttonColorRGB: ["rgb(74 222 128)", "rgb(96 165 250)", "rgb(219 39 119)"],
    rightPaneMessage: [
        'You currently only have one state. Click "Add State" before adding transitions.',
        "No transitions to show .",
        "No More States to Add at this point.",
    ],
    transitionButtonsActive: false,
    tPanelActive: false,
    tPanelActiveLimit: false,
    tColorDash: false,
    transitionPortActive: false,
    showTransitionList: false,
    showEditState: false,
    showSelectedState: false,
    selectedStateBorderOptions: [
        "border-1",
        "border-gray-500 border-4",
        "border-blue-300 border-4",
        "border-orange-300 border-4",
    ],
    selectedStateBorder: [0],
    editTransition: false,
});

export default state;
