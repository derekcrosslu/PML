import Xarrow from "react-xarrows";
import { memo } from "react";
import { snapshot, useSnapshot } from "valtio";
import state from "../../Store/state";

export const Wire = memo(({ start, end, tCode }: any) => {
    const {
        transitionButtonsActive,
        selectedSource,
        sourceIdSelected,
        stateId,
    } = useSnapshot(state);
    const { buttonColorRGB, tPanelActive } = useSnapshot(state);
    const tColor = buttonColorRGB[tCode];

    const defineStroke = () => {
        if (tPanelActive) {
            if (transitionButtonsActive) {
                return tColor;
            } else {
                return "red";
            }
        } else {
            return tColor;
        }
    };

    return (
        <Xarrow
            color={defineStroke()}
            start={start}
            end={end}
            tailShape={{
                svgElem: <TailSvg />,
                offsetForward: 1,
            }}
            showTail={true}
            showHead={true}
            arrowTailProps={{
                strokeWidth: "0.1",
                stroke: defineStroke(),
            }}
            dashness={!transitionButtonsActive}
        />
    );
});

const TailSvg = () => {
    return (
        <svg
            width="1pt"
            height="1pt"
            viewBox="0 0 1 2"
            version="1.1"
            y={0.18}
            x={0.335}
        >
            <g id="surface1" transform="scale(0.5)">
                <path d="M 1 2 C 0.449219 2 0 1.550781 0 1 C 0 0.449219 0.449219 0 1 0 Z M 1 2 " />
            </g>
        </svg>
    );
};
