import { BarGraph } from "./components/bar-graph";
import { CircleGraph } from "./components/circle-graph";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CircleGraph />
      <BarGraph />
    </div>
  );
}

export default App;
