import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";
import './ScatterPlotChart.css'

export const ScatterPlotChart = ({dataset}) => {

    const svgWidth = 500;
    const svgHeight = 400;
    const margin = 100;
    const vizHeight = svgHeight - margin;
    const vizWidth = svgWidth - margin;
    const ref = useRef();
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset.map(d => d.marksObtained))])
        .range([0, vizWidth])
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset.map(d => d.numStudents))])
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
        
        // X label
        svgElement.append('text')
            .attr('x', vizWidth/2 + margin*0.5)
            .attr('y', vizHeight - 15 + margin)
            .attr('text-anchor', 'middle')
            .style('font-family', 'Helvetica')
            .style('font-size', 12)
            .text('Marks Obtained');
        
        // Y label
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
    
    })

    const allCircles = dataset.map((d,i) => {

        return (
            <circle
                key={i}
                cx={xScale(d.marksObtained)}
                cy={yScale(d.numStudents)}
                className={'scatterplotCircle'}
                transform={`translate(${margin*0.5},${margin*0.5})`}
                r="6"
        />);
        })

    return (
        <svg 
            ref={ref}
            style={{
                height:svgHeight,
                width:svgWidth,
            }}
        >
        {allCircles}
        </svg>  )
}
