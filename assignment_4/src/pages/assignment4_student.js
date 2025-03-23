import React from 'react'
import * as d3 from "d3"
import 'bootstrap/dist/css/bootstrap.css'

import { Row, Col, Container} from 'react-bootstrap'
import ScatterPlot from '../components/ScatterPlot'
import BarChart from '../components/BarChart'


const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv'

//the following function is used to load the data from the csv file
//it returns the data in the form of an array of objects
//each object represents a row in the csv file
//the keys of the object are the column names in the csv file
//the values of the object are the values in the corresponding row in the csv file
function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(()=>{
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}


const Charts = () => {
    const [month, setMonth] = React.useState('4'); //It is a useState hook that initializes the month to May (4th month)

    const dataAll = useData(csvUrl);

    //if dataAll is null, it will return a loading message
    //it guarantees that the data is loaded before the rest of the code
    if (!dataAll) {
        return <pre>Loading...</pre>;
    };
    const WIDTH = 600;
    const HEIGHT = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 35};
    const innerHeightScatter = HEIGHT - margin.top - margin.bottom;
    const innerHeightBar = HEIGHT - margin.top - margin.bottom-120;
    const innerWidth = WIDTH - margin.left - margin.right;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = dataAll.filter( d => { 
        return d.month === MONTH[month] 
    });

    //The following scales are used to map the data values to the screen coordinates
    //The scales are defined based on the data values
    //The scales are used in the ScatterPlot and BarChart components
    const xScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationS)])
        .range([0, innerWidth])
        .nice(); //nice() function extends the domain to the nearest round value
    const yScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationE)])
        .range([innerHeightScatter, 0])
        .nice();

    //Task 6: Complete the xScaleBar and yScaleBar
    //Hint: use d3.scaleBand for xScaleBar
    const xScaleBar=[
        d3.scaleBand()
            .domain(
                data.map(d => d.station)
            )
            .range([0, innerWidth])
    ]; //replace it with the correct scale
       
    const yScaleBar=[
        d3.scaleLinear()
            .domain(
                [0, d3.max(data, d => d.start)]
            )
            .range([innerHeightBar, 0])
            .nice()
    ]; //replace it with the correct scale

    
    //Task1: Complete the changeHandler function
    //The function is used in the <input> tag as the callback function for the onChange event
    //It should update the month based on the value of the input element
    
    //Hint: use setMonth function; also you can use console.log to see the value of event.target.value
    const changeHandler = (event) => {
       //Todo: update the month based on the value of the input element


       //顶部的滑动条要正常工作，可以将其移动以选择每月数据。
       setMonth(event.target.value); // JavaScript中的setMonth()方法可以设置一个月份
        
    };

    return (
        <Container >
            <Row>
                <Col lg={3} md={2}>
                    <input key="slider" type='range' min='0' max='11' value={month} step='1' onChange={changeHandler}/>
                    <input key="monthText" type="text" value={MONTH[month]} readOnly/>
                </Col>
                
            </Row>
            <Row className='justify-content-md-center'>
                <Col>
                    <ScatterPlot svgWidth={WIDTH} svgHeight={HEIGHT} marginLeft={margin.left} marginTop={margin.top} data={data} xScale={xScaleScatter} 
                        yScale={yScaleScatter} />
                </Col>
                <Col>
                    {//Todo: uncomment the following line when you complete the xScaleBar and yScaleBar and work on the bar chart
                    }
                    {/* <BarChart svgWidth={WIDTH} svgHeight={HEIGHT} marginLeft={margin.left} marginTop={margin.bottom} data={data} xScale={xScaleBar} 
                        yScale={yScaleBar} />  */}
                </Col>
            </Row>
        </Container>
    )   
}


export default Charts




