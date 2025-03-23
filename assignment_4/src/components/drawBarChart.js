import * as d3 from "d3";

// 匯出一個名為 drawBarChart 的函數，用於繪製條形圖
// 參數：
// - barChatLayer: D3.js 的選擇對象，表示條形圖的圖層
// - data: 資料陣列，包含每個站點的資料
// - xScale: X 軸的比例尺，用於將站點名稱映射到 X 軸位置
// - yScale: Y 軸的比例尺，用於將資料值映射到 Y 軸位置
// - barChartWidth: 條形圖的寬度
// - barChartHeight: 條形圖的高度

export let drawBarChart = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {

    //Task 7: Complete the code to draw the bars
    //Hint:
    //1. The bars are drawn as rectangles
    //2. Add a mouseover event to the bar
    //3. The mouseover event should also highlight the corresponding points in the scatter plot
    //4. The mouseout event should remove the highlight from the corresponding points in the scatter plot 
    //5. You can refer to the code in the drawScatterPlot function

    barChatLayer.selectAll('.bar') 
    // 選擇 bar
        .data(data) 
        .enter() 
        // 為每個資料點搞一个佔位符
        .append('rect') 
        .attr('class', 
            d => 'bar ${d.station.replace(/[^a-zA-Z]/g, "")}'
        ) // 枪毙non-字母字符
        .attr('x', d => xScale(d.station)) 
        .attr("y", d => yScale(d.start)) 
        .attr('width', xScale.bandwidth()) 
        // bandwidth 宽
        .attr('height', d => barChartHeight - yScale(d.start)) 
        .style("fill", 'steelblue') 
        .style("stroke", "black")
        .style("stroke-width", 2) 
        .on("mouseover", (event, d) => { 
            // 當mouse懸停

            // console.log(event);
            // d3.select(event.currentTarget) 
            //     .style('fill', "red"); 

            const bar = d3.select(event.currentTarget);
            bar.style('fill', "red"); 

            // 高亮
            const stationClass = d.station.replace(/[^a-zA-Z]/g, ""); 
            d3.selectAll(".point.${stationClass}") 
                .style("fill", "red") 
                .attr("r", 10) 
                .raise();

        })
        .on('mouseout', (event, d) => { 
            // d3.select(event.currentTarget) 
            //     .style("fill", "steelblue");

            const bar = d3.select(event.currentTarget);
            bar.style('fill', 'steelblue'); 

            const stationClass = d.station.replace(/[^a-zA-Z]/g, "");
            d3.selectAll(`.point.${stationClass}`) 
                .style("fill", "steelblue") 
                .attr('r', 5);
        });

    console.log(data); 
    //Task 8: Connect the bar chart with the scatter plot
    //Hint:
    //1. Add a mouseover event to the bar
    //2. The mouseover event should also highlight the corresponding points in the scatter plot
    

};