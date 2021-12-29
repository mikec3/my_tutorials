import * as d3 from 'd3';
import {useEffect, useState} from 'react';

const Histogram = (props) => {

	const {width, height } = props;

	let jsonURL = "https://api.openbrewerydb.org/breweries";

	const [data, setData] = useState([]);

	// draw the chart after the data is updated
	useEffect(() => {
		drawChart();
	},[data])

	// get the data after component mounts
	useEffect(() => {
		getURLData();
	}, [])

	// fetchs json and converts to an array from a random API I found
	// ex. [{state: 'Idaho', frequency: 1}]
	const getURLData = async () => {
	    let urlResponse = await fetch(jsonURL);
	    let jsonResult = await urlResponse.json();

	    // build a dictionary to record the frequency of each state in the json response
	    let stateFreq = {};
	    jsonResult.forEach((element) => {
	    	if (stateFreq[element.state] > 0) {
	    		stateFreq[element.state] = stateFreq[element.state] + 1;
	    	} else {
	    		stateFreq[element.state] = 1;
	    	}
	    	})

	    // convert the dictionary to an array
	    let stateFreqArray = Object.keys(stateFreq).map(function(key) {
	    	return {'state': key, 'frequency': stateFreq[key]};
	    })

	    // sort the array by frequency and send it to the data variable
	    setData(stateFreqArray.sort(function(a,b){return b.frequency - a.frequency}));
	}

	const drawChart = () => {

	// wipe previous chart that was rendered without data
	d3.select('#histogram')
	.select('svg').remove();

	// declare margins
	const margin = {top: 70, right: 50, bottom: 70, left: 50};

	// create the svg that holds the chart
    const svg = d3.select("#histogram")
    .append('svg')
		  .style("background-color", "white")
		  .attr("width", width)
		  .attr("height", height)
		  .append('g')
		  .attr("transform",`translate(0,-${margin.bottom-10})`);

	// create the x axis scale, scaled to the states
	const xScale = d3.scaleBand()
		.domain(data.map(d => d.state))
		.rangeRound([margin.left, width - margin.right])
		.padding(0.1)

	// create the y axis scale, scaled from 0 to the max
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.frequency)])
		.range([height - margin.bottom, margin.top])

	// create a scale between colors that varies by the frequency
	const barColors = d3.scaleLinear()
	  .domain([0,d3.max(data, d => d.frequency)])
	  .range(["blue","red"])

	  // create the actual bars on the graph, appends a 'rect' for every data element
	  // sets the x and y positions relative to the scales already established
	  // sets the height according to the yscale
	  // static bar width, color is scaled on the y axis
	  // finally the bars have an outline
	  const bars = svg
	  .selectAll("rect")
	  .data(data)
	  .enter().append("rect")
	    .attr('x', d => xScale(d.state))
	    .attr('y', d => yScale(d.frequency))
	    .attr('width', xScale.bandwidth())
	    .attr('height', d => yScale(0) - yScale(d.frequency))
	    .style("padding", "3px")
	    .style("margin", "1px")
	    .style("width", d => `${d * 10}px`)
	    .attr("fill", function(d) {return barColors(d.frequency)})
	    .attr("stroke", "black")
	    .attr("stroke-width", 1)

	// set the x axis on the bottom.
	// tilts the axis text so it's readable and not smushed.
    svg.append("g")
      .attr('transform', `translate(0,${height-margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
	  .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // set the y axis on the left
    svg.append("g")
    .attr('transform', `translate(${margin.left},0)`)
    	.call(d3.axisLeft(yScale));

}

return (
	<div>
	  	<h4> Histogram- http JSON response </h4>
	<div id='histogram'/>
	</div>
	)
}

export default Histogram;