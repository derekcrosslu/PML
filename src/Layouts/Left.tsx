import { useSnapshot } from "valtio";
import { SelectState } from "../Components/State/Select";
import { handleAddState } from "../Store/actions";
import state from "../Store/state";

export default function Left() {
    return (
        <div>
            <SelectState />
            <button
                className="rounded-full bg-blue-500 h-8 w-32 font-bold text-xs text-white ml-10 mt-12"
                onClick={handleAddState}
            >
                + ADD STATE
            </button>
        </div>
    );
}
