import create from "zustand";
import produce from "immer";
import * as O from "optics-ts";
import * as R from "ramda";

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type State = {
  deep: {
    nested: {
      obj: { count: number };
      arr: string[];
    };
  };
  normalInc: () => void;
  immerInc: () => void;
  opticsInc: () => void;
  ramdaInc: () => void;
  normalSetText: (s: string, i: number) => void;
  immerSetText: (s: string, i: number) => void;
  opticsSetText: (s: string, i: number) => void;
  ramdaSetText: (s: string, i: number) => void;
};

const useStore = create<State>((set) => ({
  deep: {
    nested: {
      obj: { count: 0 },
      arr: ["hello"]
    }
  },
  normalInc: () =>
    set((state) => ({
      ...state,
      deep: {
        ...state.deep,
        nested: {
          ...state.deep.nested,
          obj: {
            ...state.deep.nested.obj,
            count: state.deep.nested.obj.count + 1
          }
        }
      }
    })),
  immerInc: () =>
    set(
      produce((state: State) => {
        ++state.deep.nested.obj.count;
      })
    ),
  opticsInc: () =>
    set(O.modify(O.optic<State>().path("deep.nested.obj.count"))((c) => c + 1)),
  ramdaInc: () =>
    set(R.over(R.lensPath(["deep", "nested", "obj", "count"]), (c) => c + 1)),
  normalSetText: (s: string, i: number) =>
    set((state) => ({
      ...state,
      deep: {
        ...state.deep,
        nested: {
          ...state.deep.nested,
          arr: [
            ...state.deep.nested.arr.slice(0, i),
            s,
            ...state.deep.nested.arr.slice(i + 1)
          ]
        }
      }
    })),
  immerSetText: (s: string, i: number) =>
    set(
      produce((state: State) => {
        state.deep.nested.arr[i] = s;
      })
    ),
  opticsSetText: (s: string, i: number) =>
    set(
      O.set(O.optic<State>().prop("deep").prop("nested").prop("arr").at(i))(s)
    ),
  ramdaSetText: (s: string, i: number) =>
    set(R.set(R.lensPath(["deep", "nested", "arr", i]), s))
  // set(R.assocPath(["deep", "nested", "arr", i], s)) // can't infer types
}));

const App = () => {
  const state = useStore();
  const isPeripheralReady = usePeripheralReady();
  const {
    togglePeripheralBonded,
    togglePeripheralConnected
  } = usePeripheralActions();
  return (
    <div>
      <h3>Normal</h3>
      <div>
        {state.deep.nested.obj.count}
        <button onClick={state.normalInc}>+1</button>
        <input
          value={state.deep.nested.arr[0]}
          onChange={(e) => state.normalSetText(e.target.value, 0)}
        />
      </div>
      <h3>Immer</h3>
      <div>
        {state.deep.nested.obj.count}
        <button onClick={state.immerInc}>+1</button>
        <input
          value={state.deep.nested.arr[0]}
          onChange={(e) => state.immerSetText(e.target.value, 0)}
        />
      </div>
      <h3>Optics</h3>
      <div>
        {state.deep.nested.obj.count}
        <button onClick={state.opticsInc}>+1</button>
        <input
          value={state.deep.nested.arr[0]}
          onChange={(e) => state.opticsSetText(e.target.value, 0)}
        />
      </div>
      <h3>Ramda</h3>
      <div>
        {state.deep.nested.obj.count}
        <button onClick={state.ramdaInc}>+1</button>
        <input
          value={state.deep.nested.arr[0]}
          onChange={(e) => state.ramdaSetText(e.target.value, 0)}
        />
      </div>
    </div>
  );
};

export default App;
