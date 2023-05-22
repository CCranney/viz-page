import './App.css';
import { VizCard } from './components/VizCard';
import { ScatterPlotChart } from './components/scatter-plot/ScatterPlotChart';
import { BarChart } from './components/bar/BarChart';

function App() {

  const visuals = [
    {
      name: "Scatter Plot",
      visual: (<ScatterPlotChart /> ),
      linkText: 'Resource Unavailable',
      link: ''
    },

    {
      name: "Bar Plot",
      visual: (<BarChart /> ),
      linkText: 'Pew Research',
      link: 'https://www.pewresearch.org/religion/dataset/american-trends-panel-wave-24/'
    },
  ]


  return (
    <>
      <h1 className="mt-3 text-center">Visuals</h1>
      <div className='viz-container'>
        {visuals.map((visual, i) => (
          <VizCard 
            key={visual.name} 
            name={visual.name} 
            visual={visual.visual} 
            i={i}
            linkText={visual.linkText}
            link={visual.link} />
        ))}
      </div>
    </>
  );
  
}

export default App;
