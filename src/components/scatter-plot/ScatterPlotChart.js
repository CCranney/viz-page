import React, { useEffect, useRef, useState } from 'react'

import * as d3 from "d3";
import './ScatterPlotChart.css'
import { useSelector, useDispatch } from 'react-redux';
import { activateTooltip, deactivateTooltip } from '../../store/slices/tooltipSlice';
import { Tooltip } from '../Tooltip';
import { CardFooter } from 'reactstrap';

export const ScatterPlotChart = () => {

    const [data, setData] = useState([]);

    const row = d => {
      d.numStudents = +d.numStudents;
      d.marksObtained = +d.marksObtained;
      return d;
    }
  
    useEffect(() => {
      d3.csv('/data/students.csv', row).then(setData);
    }, [])
  

    const tooltipInfo = useSelector(state => state.tooltip);
    const dispatch = useDispatch();  
  
    const svgWidth = 500;
    const svgHeight = 400;
    const margin = 100;
    const vizHeight = svgHeight - margin;
    const vizWidth = svgWidth - margin;
    const ref = useRef();
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.marksObtained))])
        .range([0, vizWidth])
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.numStudents))])
        .range([vizHeight, 0])

    useEffect(() => {
        const svgElement = d3.select(ref.current);
        svgElement.append('text')
            .attr('x', vizWidth/2 + margin*0.5)
            .attr('y', margin*0.25)
            .attr('text-anchor', 'middle')
            .style('font-family', 'Helvetica')
            .style('font-size', 20)
            .text('Scatter Plot');
        
        svgElement.append('text')
            .attr('x', vizWidth/2 + margin*0.5)
            .attr('y', vizHeight - 15 + margin)
            .attr('text-anchor', 'middle')
            .style('font-family', 'Helvetica')
            .style('font-size', 12)
            .text('Marks Obtained');
        
        svgElement.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', `translate(${margin * 0.25},${vizHeight-margin})rotate(-90)`)
            .style('font-family', 'Helvetica')
            .style('font-size', 12)
            .text('Number of Students');

        var g = svgElement.append("g")
            .attr("transform", `translate(${margin*0.5},${margin*0.5})`);

        g.append("g")
            .attr("transform",`translate(0,${vizHeight})`)
            .call(d3.axisBottom(xScale));
        g.append("g")
            .call(d3.axisLeft(yScale));
    
    }, [data])

    const allCircles = data.map((d,i) => {

        return (
            <circle
                key={i}
                cx={xScale(d.marksObtained)}
                cy={yScale(d.numStudents)}
                className={'scatterplotCircle'}
                transform={`translate(${margin*0.5},${margin*0.5})`}
                onMouseEnter={() => 
                    dispatch(activateTooltip({
                        x:xScale(d.marksObtained) + margin*0.5,
                        y:yScale(d.numStudents) + margin*0.75,
                        tooltipString: `marks ${d.marksObtained}, students ${d.numStudents}`
                    }))}
                onMouseLeave={() => dispatch(deactivateTooltip())}
                r="6"
        />);
        })

    return (
    <>
        <svg 
            ref={ref}
            style={{
                width:svgWidth,
                height:svgHeight,
            }}
        >
            {allCircles}
        </svg> 
        <div
        style={{
            width:svgWidth,
            height:svgHeight,
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
        }}
        >  
            <Tooltip tooltipInfo={tooltipInfo}/>
        </div> 
    </>
    )
}
