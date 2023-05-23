export const initializeXYGraph = (svg, idHeader, vizHeight, vizWidth, margin) => {

    svg.append('text')
        .attr('id', `${idHeader}-title`)
        .attr('x', vizWidth/2 + margin.left)
        .attr('y', margin.top/2)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 20);
  
    
    svg.append('text')
        .attr('id', `${idHeader}-x-axis-text`)
        .attr('x', vizWidth/2 + margin.left)
        .attr('y', vizHeight - 15 + margin.top + margin.bottom)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 12);
  
    
    svg.append('text')
        .attr('id', `${idHeader}-y-axis-text`)
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${margin.left*.2},${vizHeight-margin.top-margin.bottom})rotate(-90)`)
        .style('font-family', 'Helvetica')
        .style('font-size', 12);

    
    var g = svg.append("g")
        .attr("id", `${idHeader}-axes`)
        .attr("transform", `translate(${margin.left},${margin.top})`);
            
    g.append("g")
        .attr("id", `${idHeader}-x-axis`)
        .attr("transform",`translate(0,${vizHeight})`);
    
    g.append("g")
        .attr("id", `${idHeader}-y-axis`);
}
