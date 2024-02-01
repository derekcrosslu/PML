import { useSnapshot } from "valtio";
import Transition from "../Components/Transitions/Transition";
import EditTransition from "../Components/Transitions/Edit";
import { SelectTransition } from "../Components/Transitions/Select";
import state from "../Store/state";
import { addTransition } from "../Store/actions";

export default function Right() {
    const {
        editTransition,
        rightPaneMessage,
        arrayStates,
        showTransitionList,
        transitionSelected,
    } = useSnapshot(state);
    console.log("transitionSelected", transitionSelected);

    if (arrayStates.length < 2) {
        return <div className="text-sm  italic"> {rightPaneMessage[0]}</div>;
    } else {
        if (showTransitionList) {
            return <SelectTransition />;
        } else {
            return !editTransition ? <Transition /> : <EditTransition />;
        }
    }
}
