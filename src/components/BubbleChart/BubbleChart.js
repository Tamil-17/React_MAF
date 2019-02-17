import React from 'react';
import * as d3 from 'd3';
import PropTypes from "prop-types";
import "./bubble.css"


class BubbleChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.createChart= this.createChart.bind(this);
    }

    componentDidMount() {

        const data = this.props.data ;
        const xAxisTitle = this.props.xAxisTitle;
        const yAxisTitle = this.props.yAxisTitle;
        const xAxisLabel = this.props.xAxisLabel;
        const yAxisLabel = this.props.yAxisLabel;
        const kpi = this.props.kpi;
        this.createChart(data,xAxisTitle,yAxisTitle, kpi, xAxisLabel, yAxisLabel );

    }

    //Create chart
    createChart(data, xAxisTitle, yAxisTitle, kpi, xAxisLabel, yAxisLabel){
        // set the dimensions and margins of the graph
        let margin = {top: 60, right: 80, bottom: 60, left: 50},
            width = 750 - margin.left - margin.right,
            height = 620 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        let svg = d3.select("#bubble")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        // function to format data in terms of '%'
        const formatPercentage = (percentage) => {
            if (percentage === 'NA' || percentage === '?' || percentage === 'NaN') {
                return (`${parseFloat(0).toFixed(1).toString()}%`);
            }
            return (`${parseFloat(percentage).toFixed(1).toString()}%`);
        };

        // Tick Format
        // function to format y-axis labels in terms of 'K'
        const kFormatter = (i) => {
            if (i >= 1000 || i <= -1000) {
                const rounded = Math.round(i / 1000);
                return (`${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}K`);
            }
            return (Math.round(i));
        };


        // Add X axis

        let xmin = d3.min(data.dataPoints, function(d) { return d[xAxisTitle]}),
            xmax = d3.max(data.dataPoints, function(d) { return d[xAxisTitle] }),
            ymin = d3.min(data.dataPoints, function(d) { return d[yAxisTitle] }),
            ymax = d3.max(data.dataPoints, function(d) { return d[yAxisTitle ]}),
            zmin = d3.min(data.dataPoints, function(d) { return d.total_sales }),
            zmax = d3.max(data.dataPoints, function(d) { return d.total_sales });

        if (xmin === xmax){
            xmax = xmin +10
        }
        if (ymin === ymax){
            ymax = ymin + 10
        }

        let x = d3.scaleLinear()
            .domain([xmin, xmax])
            .range([ 0, width ])
            .nice();

        let y = d3.scaleLinear()
            .domain([ymin, ymax])
            .range([ height, 0])
            .nice();

        //Add X axis

        svg.append("g")
            .attr("transform", "translate(0, " + y(ymin)+")")
            .call(d3.axisBottom(x)
                .ticks(5)
                .tickFormat(
                   d => {
                       if(kpi==="absolute"){
                           return kFormatter(d)
                       }
                       else{
                           return (`${d.toString()}%`);
                       }
                   }

                ));

        //Add X axis gridlines
        svg.append("g")
            .attr("class","grid")
            .attr("transform", "translate(0," + y(ymin)+ ")")
            .call(d3.axisBottom(x)
                .ticks(5)
                .tickSize(-height)
                .tickFormat("")
            );


        // Add Y axis

        svg.append("g")
            .attr("transform", "translate(" + x(xmin) + ",0)")
            .call(d3.axisLeft(y)
                .tickFormat(
                    d => {
                        if(kpi==="absolute"){
                            return kFormatter(d)
                        }
                        else{
                            return (`${d.toString()}%`);
                        }
                    }

                ));


        //Add Y axis gridlines
        svg.append("g")
            .attr("class", "grid")
            .call(d3.axisLeft(y)
                .tickSize(-width)
                .tickFormat("")
            );


        // Add a scale for bubble size
        let z = d3.scaleLinear()
            .domain([zmin, zmax])
            .range([ 4, 40]);


        // This is for getting the axis labels
        svg.append('text')/*
            .attr('transform',
                `translate(${width / 2} ,${height + 3 * margin.top})`)*/
            .attr('x', width /2)
            .attr('y', height + margin.bottom )
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-family', 'Arial')
            .text(xAxisLabel);

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - (height / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-family', 'Arial')
            .text(yAxisLabel);


        // Add a scale for bubble color
        let myColor = d3.scaleOrdinal()
            .domain(["TopLeft","TopRight","BottomLeft","BottomRight"])
            .range(d3.schemeSet2);


        // -1- Create a tooltip div that is hidden by default:
        let tooltip = d3.select("#bubble")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("z-index", "10")
            .style("position","absolute")
            .style("background-color", "black")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("color", "white");

        // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
        let showTooltip = function(d) {
            tooltip
                .transition()
                .duration(200);
            tooltip
                .style("opacity", 1)
                .style("pointer-events", 'none')
                .html("Product ID: " + d.product_id)
                .style("left", (d3.mouse(this)[0]+70) + "px")
                .style("top", (d3.mouse(this)[1]+70) + "px")
        };

        let moveTooltip = function(d) {
            tooltip
                .style("left", (d3.mouse(this)[0]+70) + "px")
                .style("top", (d3.mouse(this)[1]+70) + "px")
        };

        let hideTooltip = function(d) {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0)
        };



        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data.dataPoints)
            .enter()
            .append("circle")
            .attr("class", "bubbles")
            .attr("cx", function (d) { return x(d[xAxisTitle]); } )
            .attr("cy", function (d) { return y(d[yAxisTitle]); } )
            .attr("r", function (d) { return z(d.total_sales); } )
            .style("fill", function (d) { return myColor(d.quadrant); })
       // -3- Trigger the functions
            .on("mouseover", showTooltip )
            .on("mousemove", moveTooltip )
            .on("mouseleave", hideTooltip )



        // Add quadrant lines based on average of KPIs
        let startX = d3.min(x.domain()),
            endX = d3.max(x.domain()),
            startY = d3.min(y.domain()),
            endY = d3.max(y.domain());

        let lines = [
            {x1: startX, x2: endX, y1: data.averageY, y2: data.averageY}, //Horizontal line - average of y-axis
            {x1: data.averageX, x2: data.averageX, y1: startY, y2: endY}]; //Vertical line - average of x-axis

        svg.selectAll(".quadrant-line")
            .data(lines).enter()
            .append("line")
            .style("class", ".quadrant-line")
            .attr("x1", function(d){ return x(d.x1); })
            .attr("x2", function(d){ return x(d.x2); })
            .attr("y1", function(d){ return y(d.y1); })
            .attr("y2", function(d){ return y(d.y2); })
            .style("stroke", "#000")
            .style("stroke-dasharray", (10,10));


        // Add Average values to quadrant lines
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', x(data.averageX))
            .attr('x', -y(data.averageY))
            .attr('dy', '1em')
            .style('text-anchor', 'left')
            .style('font-size', '12px')
            .style('font-family', 'Arial')
            .style('font-color', 'Black')
            .style('opacity', '0.8')
            .text(function (){
                if(kpi === "absolute")
                    return 'Average X: '+kFormatter(data.averageX)
                else
                    return 'Average X: '+formatPercentage(data.averageX)
            });


        svg.append('text')
            .attr('y', y(data.averageY))
            .attr('x', x(data.averageX)-margin.left)
            .attr('dy', '1em')
            .style('text-anchor', 'left')
            .style('font-size', '12px')
            .style('font-family', 'Arial')
            .style('font-color', 'Black')
            .style('opacity', '0.8')
            .text(function (){
                if(kpi === "absolute")
                    return 'Average Y: '+kFormatter(data.averageY)
                else
                    return 'Average Y: '+formatPercentage(data.averageY)
            });

        // Add quadrant labels
        let labels = [{
            text: data.quadrantBottomLeft,
            x: startX ,
            y: startY ,
            textAnchor: 'start'
        }, {
            text: data.quadrantTopLeft,
            x: startX ,
            y: endY,
            textAnchor: 'start'
        }, {
            text: data.quadrantBottomRight,
            x: endX,
            y: startY,
            textAnchor: 'end'
        }, {
            text: data.quadrantTopRight,
            x: endX,
            y: endY,
            textAnchor: 'end'
        }];

        svg.selectAll(".quadrant-label")
            .data(labels)
            .enter()
            .append('text')
            .attr('class', 'quadrant-label')
            .attr('x', function(d) {return x(d.x);})
            .attr('y', function(d) {if(d.textAnchor === "quadrantBottomLeft" || d.textAnchor === "quadrantBottomRight"){ return (0 - margin.left) } else return y(d.y);})
            .attr('text-anchor', function(d) {return d.textAnchor})
            .append('tspan')
            .text(function(d) {return ( `${xAxisLabel}: ` + kFormatter(d.text[`${xAxisTitle}`]));})
            .append('tspan')
            .attr('x',function(d) {return x(d.x);})
            .attr('dy',"1em")
            .text(function(d) {return (`${yAxisLabel}: ` + kFormatter(d.text[`${yAxisTitle}`]))})
            .append('tspan')
            .attr('x',function(d) {return x(d.x);})
            .attr('dy',"1.2em")
            .text(function(d) {
                return ('# of SKU: ' + kFormatter(d.text['# of SKU']))
            });


    }

    render() {
        return(
            <div id="bubble"></div>
        );
    }
}



BubbleChart.propTypes = {
    data: PropTypes.object,
    xAxisLabel : PropTypes.string,
    yAxisLabel : PropTypes.string,
    xAxisTitle : PropTypes.string,
    yAxisTitle : PropTypes.string,
    kpi : PropTypes.string
};

export default BubbleChart;