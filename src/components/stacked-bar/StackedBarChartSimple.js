import * as d3 from "d3";
import { useD3 } from '../../hooks/useD3'
import { initializeXYGraph } from '../../hooks/initializeXYGraph'
import { useEffect, useRef, useState } from "react";

export const StackedBarChartSimple = () => {

    
    const [data, setData] = useState([]);
    const [bars, setBars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //d3.csv('/data/Stacked_barchart/ATP W70.csv', row).then(setData);
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv").then((d) => {
            setData(d);
            setLoading(false);
        });
    }, [])

    const vizWidth = 400;
    const vizHeight = 300;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const idHeader = 'stacked-barchart-simple';

    const ref = useD3(
        (svg) => {
            initializeXYGraph(svg, idHeader, vizHeight, vizWidth, margin);
            d3.select(`#${idHeader}-title`)
                .text('Stacked Bar Plot');
            d3.select(`#${idHeader}-x-axis-text`)
                .text('placeholder x');
            d3.select(`#${idHeader}-y-axis-text`)
                .text('placeholder y');
            if(data.length > 0) {
                var subgroups = data.columns.slice(1);
                var groups = d3.map(data, function(d){return(d.group)});
                var xScale = d3.scaleBand()
                    .domain(groups)
                    .range([0, vizWidth])
                    .padding([0.2]);
                d3.select(`#${idHeader}-x-axis`)
                    .call(d3.axisBottom(xScale).tickSizeOuter(0));
                var yScale = d3.scaleLinear()
                    .domain([0, 60])
                    .range([ vizHeight, 0 ]);

                d3.select(`#${idHeader}-y-axis`)
                    .call(d3.axisLeft(yScale));

                var colorScale = d3.scaleOrdinal()
                    .domain(subgroups)
                    .range(['#e41a1c','#377eb8','#4daf4a']);

                var stackedData = d3.stack()
                    .keys(subgroups)
                    (data);
                console.log(data);
                console.log(stackedData);
                const newBars = stackedData.map((subgroup, i) => {
                    return(
                    <g 
                        key={i}
                        fill={colorScale(subgroup.key)}
                    >
                        {subgroup.map((group, j) => {
                            return (
                                <rect
                                    key={j}
                                    x={xScale(group.data.group) + margin.left}
                                    y={yScale(group[1]) + margin.bottom}
                                    width={xScale.bandwidth()}
                                    height={yScale(group[0])-yScale(group[1])}
                                    opacity={0.9}
                                />
                            );
                        })}
                    </g>
                )})
                setBars(newBars);
            }                
        }, [loading])

    

    

    return (
    <>
        {loading && <div>loading</div>}
        { !loading && 
            <svg 
                ref={ref}
                style={{
                    width:vizWidth+margin.top+margin.bottom,
                    height:vizHeight+margin.left+margin.right,
                }}
            >
                {bars}
            </svg> 
        }
    </>
)
}
