'use client'; 


import { useEffect, useRef } from "react";
import * as d3 from 'd3';
import { drawBarChart } from "./drawBarChart";


function BarChart(props){
    const { svgWidth, svgHeight, marginLeft, marginTop, data, xScale, yScale } = props;

    const d3Selection = useRef();
        
        useEffect(()=>{
            const svg = d3.select(d3Selection.current);
            let width = svgWidth - marginLeft ;
            let height = svgHeight - marginTop-120;

            const xAxis_bar = d3.axisBottom(xScale); 
            const yAxis_bar = d3.axisLeft(yScale).ticks(5);


            d3.selectAll('.bar').remove(); //remove all the bars before drawing the new bars
            d3.selectAll('.x-axis-label').remove();//remove all the x-axis labels before drawing the new labels
            
            let barChart = svg.append("g")
            .attr("transform", "translate(" + marginLeft + "," + marginTop +")");


            barChart.append('g')
            .attr("transform", "translate(" +0+ "," + height +")")
            .attr('class', 'x-axis')
            .call(xAxis_bar)
            .selectAll('text') //select all the text elements in the x-axis
            .attr('class', 'x-axis-label') //set the class of the text element
            .style('text-anchor', 'end')
            .attr('dx', '-0.8em')
            .attr('dy', '.015em')
            .attr('transform', 'rotate(-65)'); //rotate the text elements

            barChart.append('g')
            .attr('class', 'y-axis')
            .call(yAxis_bar);
            barChart.append("g")
            .attr("transform", `translate(${40}, ${-5})`)
            .append("text")
            .style("text-anchor", "middle")
            .text("Bikers start from");
            
            drawBarChart(barChart, data, xScale, yScale, width, height);
            
        }, [data]) //re-render the chart when the data changes
            
    return <svg width={svgWidth} height={svgHeight} ref={d3Selection}> </svg>; 
}

export default BarChart