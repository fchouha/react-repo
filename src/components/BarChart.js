import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {

    data = [];
    margin = { top: 10, right: 0, bottom: 20, left: 20 };
    width = this.props.width || 600;
    height = this.props.height || 400;
    chart;
    xScale;
    yScale;
    colorScale;
    tooltip;

    componentDidMount() {

        this.data = this.props.data;
        this.width = this.width - this.margin.left - this.margin.right;
        this.height = this.height - this.margin.top - this.margin.bottom;

        this.createScales();

        this.createTooltip();

        this.createChart();

        this.createGuides();
    }

    createScales() {

        const labels = this.data.map(d => d.label);
        const values = this.data.map(d => d.value);

        // Y scale.
        this.yScale = d3.scaleLinear()
        .domain([0, d3.max(values)])
        .range([0, this.height]);

        // X scale.
        this.xScale = d3.scaleBand()
        .domain(labels)
        .paddingOuter(0.1)
        .paddingInner(0.2)
        .range([0, this.width]);

        // Color scale.
        this.colorScale = d3.scaleLinear()
        .domain([0, 18, d3.max(values)])
        .range(['skyblue', 'orange', 'red']);
    }

    createChart() {
        this.chart = d3.select('.bar-chart')
        .append("svg")
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            //.style('border', '1px solid black')
            .append('g')
                .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
                .selectAll('rect')
                .data(this.data)
                .enter().append('rect')
                    .attr('width', () => {
                        return this.xScale.bandwidth();
                    })
                    .attr('height',0)
                    .attr('x', d => {
                        return this.xScale(d.label);
                    })
                    .attr('y', this.height)
                    .style('fill', d => {
                        return this.colorScale(d.value);
                    })
                    .on('mouseover', d => this.onMouseoverBar(d))
                    .on('mouseout', d => this.onMouseoutBar(d));
    
        // Animation.
        this.chart.transition()
            .attr('height', d => {
                return this.yScale(d.value);
            })
            .attr('y', d => {
                return this.height - this.yScale(d.value);
            })
            .delay((d, i) => {
                return i * 20;
            })
            .duration(500)
            .ease(d3.easeBounceOut);
    }

    createTooltip() {
        this.tooltip = d3.select('body')
            .append('div')
            .style('position', 'absolute')
            .style('padding', '0 10px')
            .style('background', 'white')
            .style('opacity', 0);
    }

    onMouseoverBar(d) {
        this.tooltip.html(d.value)
            .style('left', (d3.event.pageX - 20) + 'px')
            .style('top', (d3.event.pageY - 30) + 'px');
        
        this.tooltip.transition()
            .duration(200)
            .style('opacity', .9);

        d3.select(d3.event.target)
            .style('opacity', .6);
    }

    onMouseoutBar(d) {
        this.tooltip.html('');
        d3.select(d3.event.target)
            .style('opacity', 1);
    }

    createGuides() {

        const values = this.data.map(d => d.value);

        // Y axis.
        const yAxisValues = d3.scaleLinear()
            .domain([0, d3.max(values)])
            .range([this.height, 0]);
            
        const yAxisTicks = d3.axisLeft(yAxisValues)
            .ticks(10);

        d3.select('.bar-chart svg').append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
            .call(yAxisTicks);

        // X axis.
        const xAxisTicks = d3.axisBottom(this.xScale);

        d3.select('.bar-chart svg').append('g')
            .attr('transform', `translate(${this.margin.left},${this.height + this.margin.top})`)
            .call(xAxisTicks);
    }

    render() {
        return <div className="bar-chart" />;
    }
}

export default BarChart;
