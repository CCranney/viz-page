import './App.css';
import { VizCard } from './components/VizCard';
import { ScatterPlotChart } from './components/scatter-plot/ScatterPlotChart';

function App() {

  const visuals = [
    {
      name: "Bar Chart",
      visual: (<div className='demo'>BarChart</div> )
    },
    {
      name: "Scatter Plot Chart",
      visual: (<ScatterPlotChart /> )
    }
  ]


  return (
    <>
      <h1 className="mt-3 text-center">Visuals</h1>
      <div className='viz-container'>
        {visuals.map((visual, i) => (
          <VizCard key={visual.name} name={visual.name} visual={visual.visual} i={i} />
        ))}
      </div>
    </>
  );
  
}

export default App;
