import {
  usePeripheralReady,
  usePeripheralActions,
  useBonded,
  useConnected
} from "./PeripheralStore";

const App = () => {
  const isPeripheralReady = usePeripheralReady();
  const isConnected = useConnected();
  const isBonded = useBonded();

  const {
    togglePeripheralBonded,
    togglePeripheralConnected
  } = usePeripheralActions();
  return (
    <div>
      <h3>Peripheral Ready</h3>
      <div>
        {isPeripheralReady ? "Ready 🥰" : "Not ready 😞"}
        <br />
        <button onClick={togglePeripheralBonded}>
          toggle bonding {isBonded ? "off" : "on"}
        </button>
        <br />
        <button onClick={togglePeripheralConnected}>
          toggle connection {isConnected ? "off" : "on"}
        </button>
      </div>
    </div>
  );
};

export default App;
