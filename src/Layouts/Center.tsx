import { Wire } from "../Components/Transitions/Wire";
import { States } from "../Components/State/State";
import { useRef } from "react";
import state from "../Store/state";
import { useSnapshot } from "valtio";
import { TransitionWires } from "../Components/Transitions/TransitionWires";
import { EditStateModal } from "../Components/State/Modal";

export default function Center() {
    const { showEditState } = useSnapshot(state);
    // const divRef = useRef<JSX.Element>(null);
    // function changeInnerText(el: JSX.Element, value: JSX.Element) {
    //     el.props = value;
    // }
    // if (null !== divRef.current) {
    //     changeInnerText(divRef.current, <TransitionWires />);
    // }
    return (
        <div className="w-full ">
            {!showEditState ? (
                <div className="flex justify-center items-center mt-12">
                    <States />
                </div>
            ) : (
                <div className="flex justify-center items-center mt-12">
                    {" "}
                    <EditStateModal />
                </div>
            )}
            {/* {divRef.current} */}
            <TransitionWires />
        </div>
    );
}
