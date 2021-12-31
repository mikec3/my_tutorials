import * as d3 from 'd3'
import {useEffect, useState} from 'react'

function LineChart(props) {

  const {width, height } = props;

  const [data, setData] = useState([]);


  useEffect(()=>{
  	if (data.length > 0) {
  		drawChart();
  	} else {
  		generateData();
  	}
  },[data])

    	// generate random data and set it to the data element 
  	// ex. [{label: 1, value: 5}, {label:2, value: 10}]
  const generateData = () => {
    const chartData = [];
    for (let i = 0; i < 20; i++) {
      const value = Math.floor(Math.random() * i + 3);
      chartData.push({
        label: i,
        value
      });
    }
    setData(chartData)
  }

  const drawChart = () => {

         // Establish margins
	const margin = { top: 10, right: 50, bottom: 50, left: 50 };

	// establish x and y max values
	const yMinValue = d3.min(data, d => d.value);
	const yMaxValue = d3.max(data, d => d.value);
	const xMinValue = d3.min(data, d => d.label);
	const xMaxValue = d3.max(data, d => d.label);

  		// create chart area
	const svg = d3
	    .select('#container')
	    .append('svg')
	    .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
	    .append('g')
	    .attr('transform', `translate(${margin.left},${margin.top})`);

	// create scale for the x axis
	const xScale = d3
	    .scaleLinear()
	    .domain([xMinValue, xMaxValue])
	    .range([0, width]);
	    
	// create scale for y axis
	const yScale = d3
	    .scaleLinear()
	    .range([height, 0])
	    .domain([0, yMaxValue]);

		// Create x grid
	svg
	    .append('g')
	    .attr('class', 'grid')
	    .attr('transform', `translate(0,${height})`)
	    .call(
	    d3.axisBottom(xScale)
	        .tickSize(-height)
	        .tickFormat(''),
	    );

		//create y grid
	svg
	    .append('g')
	    .attr('class', 'grid')
	    .call(
	        d3.axisLeft(yScale)
	        .tickSize(-width)
	        .tickFormat(''),
	    );

		// create the x axis on the bottom
	svg
	    .append('g')
	    .attr('class', 'x-axis')
	    .attr('transform', `translate(0,${height})`)
	    .call(d3.axisBottom().scale(xScale).tickSize(15));

	// create the y axis on the left
	svg
	    .append('g')
	    .attr('class', 'y-axis')
	    .call(d3.axisLeft(yScale));

			// create a line with x and y coordinates scaled to the data
	const line = d3
	    .line()
	    .x(d => xScale(d.label))
	    .y(d => yScale(d.value))    
	    .curve(d3.curveMonotoneX);

		// draw the line
	svg
	    .append('path')
	    .datum(data)
	    .attr('fill', 'none')
	    .attr('stroke', '#f6c3d0')
	    .attr('stroke-width', 4)
	    .attr('class', 'line') 
	    .attr('d', line);
  }

  return (
  	<div>
  	  	<h4> Line Chart - static fake data - 
  		<a href='https://betterprogramming.pub/react-d3-plotting-a-line-chart-with-tooltips-ed41a4c31f4f'>Original Tutorial</a>
  		 </h4>
  	<div id='container'/>
  </div>

  )
}

export default LineChart;