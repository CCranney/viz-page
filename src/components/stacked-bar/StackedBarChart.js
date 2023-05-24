import * as d3 from "d3";
import { useD3 } from '../../hooks/useD3'
import { initializeXYGraph } from '../../hooks/initializeXYGraph'
import { useEffect, useRef, useState } from "react";
import './StackedBarChart.css'

export const StackedBarChart = () => {

    
    const [data, setData] = useState([]);
    const [bars, setBars] = useState([]);
    const [legend, setLegend] = useState([]);
    const [isHighlightedArray, setIsHighlightedArray] = useState(Array(8).fill(true));
    const [loading, setLoading] = useState(true);

    const subgroups = [
        'Daily',
        'Weekly',
        'Monthly',
        'Less than monthly',
        'Never',
        'Refused',
    ]

    const groups = [
        'meditation',
        'yoga',
        'outdoors',
        'exercise',
        'prayer',
        'scripture',
        'talking',
        'television',                

    ]

    const colorScale = d3.scaleOrdinal()
    .domain(subgroups)
    .range(d3.schemeCategory10);

    const row = d => {
        return {
            meditation: d.SPIRIT1_a_W70,
            yoga: d.SPIRIT1_b_W70,
            outdoors: d.SPIRIT1_c_W70,
            exercise: d.SPIRIT1_d_W70,
            prayer: d.SPIRIT2_a_W70,
            scripture: d.SPIRIT2_b_W70,
            talking: d.SPIRIT2_c_W70,
            television: d.SPIRIT2_d_W70,
        }

      }
  
    useEffect(() => {
        d3.csv('/data/Stacked_barchart/ATP W70.csv', row).then((d) => {

            const initialGroupValues = {
                'Daily':0,
                'Weekly':0,
                'Monthly':0,
                'Less than monthly':0,
                'Never':0,
                'Refused':0,
            }
            var dataTable = {
                'meditation':{group: 'meditation', ...initialGroupValues},
                'yoga':{group: 'yoga', ...initialGroupValues},
                'outdoors':{group: 'outdoors', ...initialGroupValues},
                'exercise':{group: 'exercise', ...initialGroupValues},
                'prayer':{group: 'prayer', ...initialGroupValues},
                'scripture':{group: 'scripture', ...initialGroupValues},
                'talking':{group: 'talking', ...initialGroupValues},
                'television':{group: 'television', ...initialGroupValues},                
            }
            d.forEach((row) => {
                Object.keys(dataTable).forEach((group) => {
                    dataTable[group][row[group]]++
                })
            })
            dataTable = Object.values(dataTable);
            setData(dataTable);
            setLoading(false);
        });
    }, [])

    const vizWidth = 400;
    const vizHeight = 300;
    const margin = { top: 100, right: 150, bottom: 50, left: 50 };
    const idHeader = 'stacked-barchart';

    const ref = useD3(
        (svg) => {
            initializeXYGraph(svg, idHeader, vizHeight, vizWidth, margin);
            d3.select(`#${idHeader}-title`)
                .text('Stacked Bar Plot');
            d3.select(`#${idHeader}-x-axis-text`)
                .text('placeholder x');
            d3.select(`#${idHeader}-y-axis-text`)
                .text('placeholder y');
                var size = 20;
                const legendRect = (
                    <rect 
                        width={margin.right - 25}   
                        height={size * 8 + 30}
                        stroke="black"
                        strokeWidth="1"
                        fill="white"    
                    />
                )

            const legendRectSquares = subgroups.map((d,i) => 
                <rect 
                    key={i}
                    x={size}
                    y={size + i*(size+5)}
                    width={size}
                    height={size}
                    fill={colorScale(d)}
                    onMouseEnter={() => {
                        let tempHighlightedArray = Array(8).fill(false);
                        tempHighlightedArray[i] = true;
                        setIsHighlightedArray(tempHighlightedArray);
                    }}
                    onMouseLeave={() => {
                        setIsHighlightedArray(Array(8).fill(true));
                    }}
                />
            )

            const legendRectText = subgroups.map((d,i) => 
                <text 
                    key={i}
                    x={size + size*1.2}
                    y={size + i*(size+5) + size*0.6}
                    textAnchor="left"
                    alignmentBaseline="middle" 
                    onMouseEnter={() => {
                        let tempHighlightedArray = Array(8).fill(false);
                        tempHighlightedArray[i] = true;
                        setIsHighlightedArray(tempHighlightedArray);
                    }}
                    onMouseLeave={() => {
                        setIsHighlightedArray(Array(8).fill(true));
                    }}

                >
                    {d === 'Less than monthly' ? '< Monthly' : d}    
                </text>
            )

            setLegend(
                <g
                    transform={`translate(${vizWidth + margin.left + 10},${margin.top/2})`}
                >
                    {legendRect}
                    {legendRectSquares}
                    {legendRectText}
                </g>
            )


        }, [loading])


        useEffect(() => {
            var xScale = d3.scaleBand()
                .domain(groups)
                .range([0, vizWidth])
                .padding([0.2]);
            d3.select(`#${idHeader}-x-axis`)
                .call(d3.axisBottom(xScale).tickSizeOuter(0));
            var yScale = d3.scaleLinear()
                .domain([0, 10300])
                .range([ vizHeight, 0 ]);

            d3.select(`#${idHeader}-y-axis`)
                .call(d3.axisLeft(yScale));

                var stackedData = d3.stack()
                .keys(subgroups)
                (data);

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
                                y={yScale(group[1]) + margin.top}
                                className={isHighlightedArray[i] ? 'highlighted' : 'faded'}
                                width={xScale.bandwidth()}
                                height={yScale(group[0])-yScale(group[1])}
                                opacity={0.9}
                            />
                        );
                    })}
                </g>
            )})
            setBars(newBars);


        }, [isHighlightedArray, data])

    



    return (
    <>
        {loading && <div>loading</div>}
        { !loading && 
            <svg 
                ref={ref}
                style={{
                    width:vizWidth+margin.left+margin.right,
                    height:vizHeight+margin.top+margin.bottom,
                }}
            >
                {bars}
                {legend}
            </svg> 
        }
    </>
)
}
