import './App.css';
import { VizCard } from './components/VizCard';
import { ScatterPlotChart } from './components/scatter-plot/ScatterPlotChart';
import { BarChart } from './components/bar/BarChart';
import { StackedBarChartSimple } from './components/stacked-bar/StackedBarChartSimple';
import { StackedBarChart } from './components/stacked-bar/StackedBarChart';
import { DendrogramChart } from './components/dendrogram/DendrogramChart';

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
    {
      name: "Stacked Bar Plot (simple)",
      visual: (<StackedBarChartSimple /> ),
      linkText: 'Online Example',
      link: 'https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html'
    },
    {
      name: "Stacked Bar Plot",
      visual: (<StackedBarChart /> ),
      linkText: 'Pew Research',
      link: 'https://www.pewresearch.org/religion/dataset/american-trends-panel-wave-70/'
    },
    {
      name: "Dendrogram",
      visual: (<DendrogramChart /> ),
      linkText: 'Kaggle',
      link: 'https://www.kaggle.com/datasets/konivat/tree-of-life?resource=download'
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
