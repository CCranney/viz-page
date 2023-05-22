import React, { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";
import './BarChart.css'
import { CardFooter } from 'reactstrap';

export const BarChart = () => {


  const [data, setData] = useState([]);
  const [isClickedArray, setClickedArray] = useState(Array(5).fill(false));

  const count = useRef({
    'Very satisfied': 0,
    'Mostly satisfied': 0,
    'Mostly dissatisfied': 0,
    'Very dissatisfied': 0,
    'Refused': 0,
  });

  const row = d => d.LIFE1_W24;

  useEffect(() => {
    d3.csv('/data/Bar/ATP W24.csv', row).then(setData);
  }, [])

  useEffect(() => {
    count.current = data.reduce((acc, curr) => {
      return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {})
  }, [data])

  const svgWidth = 500;
  const svgHeight = 400;
  const margin = 100;
  const vizHeight = svgHeight - margin;
  const vizWidth = svgWidth - margin;
  const orderedKeys = [
    'Very satisfied',
    'Mostly satisfied',
    'Mostly dissatisfied',
    'Very dissatisfied',
    'Refused',
  ]
  
  const xScale = d3.scaleBand()
      .domain(orderedKeys)
      .range([0, vizWidth])
  const yScale = d3.scaleLinear()
      .domain([0, 3000])
      .range([vizHeight, 0])

  const ref = useRef();
  const svgElement = d3.select(ref.current);
  svgElement.append('text')
    .attr('id', 'title');

svgElement.append('text')
    .attr('id', 'x-axis-text');


svgElement.append('text')
  .attr('id', 'y-axis-text');


var g = svgElement.append("g")
    .attr("transform", `translate(${margin*0.5},${margin*0.5})`);

  g.append("g")
    .attr("id", "x-axis");
    
  g.append("g")
    .attr("id", "y-axis");
  
  useEffect(() => {

    d3.select('#title')
      .attr('x', vizWidth/2 + margin*0.5)
      .attr('y', margin*0.25)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .text('Bar Plot');


    d3.select('#x-axis-text')
      .attr('x', vizWidth/2 + margin*0.5)
      .attr('y', vizHeight - 15 + margin)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 12)
      .text('Degree of Satisfaction');


      d3.select('#y-axis-text')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${margin * 0.1},${vizHeight-margin})rotate(-90)`)
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Number of Responses');


    d3.select('#x-axis')
        .attr("transform",`translate(0,${vizHeight})`)
        .call(d3.axisBottom(xScale));
        //.selectAll("text")
        //.attr("dx", "-.8em")
        //.attr("dy", ".15em")
        //.attr("transform", "rotate(-10)");


    d3.select('#y-axis')
        .call(d3.axisLeft(yScale));

}, [data])

const allRects = orderedKeys.map((d, i) => 
    (
      <rect 
        key={d}
        x={xScale(d) + margin*0.5 + xScale.bandwidth()/4}
        y={yScale(count.current[d]) + margin*0.5}
        width={xScale.bandwidth()/2}
        height={vizHeight - yScale(count.current[d])}
        className={isClickedArray[i] ? 'clicked-rect' : 'unclicked-rect'}
        onClick={() => {
          const tempIsClickedArray = [...isClickedArray];
          tempIsClickedArray[i] = !tempIsClickedArray[i];
          setClickedArray(tempIsClickedArray);
        }}
      />

    )
  )


  return (
    <>
        <svg 
            ref={ref}
            style={{
                width:svgWidth,
                height:svgHeight,
            }}
        >
          {allRects}
        </svg>
    </>
  )
}
