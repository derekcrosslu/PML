import { LeftPane, CenterPane, RightPane } from "./Layouts";
import { useSnapshot } from "valtio";
import state from "./Store/state";
import { handleSelectedState } from "./Store/actions";

export default function Main() {
    const {  editTransition } = useSnapshot(state);

    return (
        <div className="w-screen h-screen ">
            <div className="w-full h-16  flex justify-center  font-semibold items-center  border-4 border-gray-200 ">
                <span className="ml-0">Power Management Property</span>
            </div>
            <div className="flex">
                {/* Left pane */}
                <div className="w-1/6  border-x-4 border-gray-100 flex flex-col gap-2">
                    <div className="text-sm font-semibold p-5">STATES</div>
                    <LeftPane />
                </div>
                {/* Center pane */}
                <div
                    className="w-4/6   h-screen flex justify-content-center items-start gap-5 p-10 "
                    onClick={handleSelectedState}
                >
                    <CenterPane />

                    {/* <button onClick={handleSelectedState} className='h-screen w-screen    absolute' /> */}
                </div>
                {/* Right pane */}
                <div className="w-1/5 border-x-4 border-gray-100 flex flex-col bg-gray-100 p-5 gap-2 h-screen">
                    <span className="mt-5 text-sm ml-0 font-semibold mb-5">
                        TRANSITIONS {editTransition ? "(Edit)" : null}
                    </span>
                    <div>
                        <RightPane />
                    </div>
                </div>
            </div>
        </div>
    );
}
