import { memo } from "react";
import { snapshot, useSnapshot } from "valtio";
import ReactSelect from "react-select";
import state from "../../Store/state";
import { customStyles } from "../../Layouts/customStyles";
import { Wire } from "./Wire";
// const { transitionArr } = state
import { useRef } from "react";

export const TransitionWires = () => {
    const { transitionArr } = useSnapshot(state);
    const divRef = useRef<JSX.Element>(null);
    function changeInnerText(el: JSX.Element, value: JSX.Element) {
        el.props = value;
    }
    if (null !== divRef.current) {
        changeInnerText(divRef.current, <TransitionWires />);
    }
    return (
        <>
            {transitionArr &&
                transitionArr.map((x: any, index: any) => {
                    if (x.showWire === true) {
                        return (
                            <div key={index} className="z-50">
                                <Wire
                                    start={`${x.sourceId.toString()}_port${
                                        x.portId
                                    }`}
                                    end={x.targetId.toString()}
                                    tCode={x.toggleId}
                                />{" "}
                                {divRef.current}
                            </div>
                        );
                        // return x.tObj
                    } else {
                        return null;
                    }
                })}
        </>
    );
};
