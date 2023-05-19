import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import { VizCard } from './components/VizCard';
import * as d3 from "d3";
import { ScatterPlotChart } from './components/ScatterPlotChart';

function App() {

  const [data, setData] = useState([]);

  const row = d => {
    d.numStudents = +d.numStudents;
    d.marksObtained = +d.marksObtained;
    return d;
  }

  useEffect(() => {
    d3.csv('/data/students.csv', row).then(setData);
  }, [])

  const visuals = [
    {
      name: "Bar Chart",
      visual: (<div className='demo'>BarChart</div> )
    },
    {
      name: "Scatter Plot Chart",
      visual: (<ScatterPlotChart dataset={data}/> )
    }
  ]


  return (
    <Container>
        <h1 className="mt-3 text-center">Visuals</h1>
        <div className='viz-container'>
          {visuals.map((visual, i) => (
            <VizCard key={visual.name} name={visual.name} visual={visual.visual} i={i} />
          ))}
        </div>
    </Container>
  );
  
}

export default App;
