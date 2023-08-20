import { create } from "zustand";

interface PeripheralStateActions {
  markPeripheralConnected: (flag: boolean) => void;
  togglePeripheralConnected: () => void;
  markPeripheralBonded: (flag: boolean) => void;
  togglePeripheralBonded: () => void;
  storePeripheralId: (id: string) => void;
  resetConnectionState: () => void;
}

interface PeripheralState {
  isPeripheralConnected: boolean;
  isPeripheralBonded: boolean;
  // isPeripheralReady: boolean;
  peripheralId: string | undefined;
  actions: PeripheralStateActions;
}

const usePeripheralStore = create<PeripheralState>()((set, get) => ({
  isPeripheralConnected: false,
  isPeripheralBonded: false,
  // isPeripheralReady: get().isPeripheralConnected && get().isPeripheralBonded,
  peripheralId: undefined,
  actions: {
    markPeripheralConnected: (flag: boolean) =>
      set(() => ({ isPeripheralConnected: flag })),
    togglePeripheralConnected: () =>
      set((state) => ({ isPeripheralConnected: !state.isPeripheralConnected })),
    markPeripheralBonded: (flag: boolean) =>
      set(() => ({ isPeripheralBonded: flag })),
    togglePeripheralBonded: () =>
      set((state) => ({ isPeripheralBonded: !state.isPeripheralBonded })),
    storePeripheralId: (peripheralId: string | undefined) =>
      set({ peripheralId }),
    resetConnectionState: () =>
      set({
        isPeripheralConnected: false,
        isPeripheralBonded: false,
        peripheralId: undefined
      })
  }
}));

export const useConnected = () =>
  usePeripheralStore((state) => state.isPeripheralConnected);
export const useBonded = () =>
  usePeripheralStore((state) => state.isPeripheralBonded);
export const usePeripheralReady = () =>
  usePeripheralStore(
    (state) => state.isPeripheralConnected && state.isPeripheralBonded
  );
// export const usePeripheral = () => usePeripheralStore(state => state.isPeripheralReady);
export const usePeripheralActions = () =>
  usePeripheralStore((state) => state.actions);
