// angular
import { Component, Input, OnDestroy, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})

export class ChartComponent implements AfterViewInit, OnDestroy, OnChanges {
	private chart: am4charts.XYChart;
	@Input() chartId: string;
	@Input() chartData: any;

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		if (changes['chartData'] && changes['chartData'].currentValue && !changes['chartData'].firstChange) {
			this.createChart(changes['chartData'].currentValue);
		}
	}

	ngAfterViewInit() {
		// Chart code goes in here
		am4core.useTheme(am4themes_animated);

		if (this.chartData) {
			this.createChart(this.chartData);
		}
	}

	/**
	 *
	 * @param response
	 */
	public createChart(response: any) {

		// Create chart instance
		if (this.chart === undefined) {
			this.chart = am4core.create(this.chartId, am4charts.XYChart);
		}

		this.chart.paddingRight = 20;
		this.chart.data = response;

		const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
		dateAxis.baseInterval = {
			'timeUnit': 'minute',
			'count': 15
		};
		dateAxis.tooltipDateFormat = 'HH:mm, d MMMM';
		dateAxis.title.text = 'Time';

		const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.tooltip.disabled = true;
		valueAxis.title.text = 'Werktag Values';

		const series = this.chart.series.push(new am4charts.LineSeries());
		series.dataFields.dateX = 'date';
		series.dataFields.valueY = 'value';
		series.tooltipText = 'Value: [bold]{valueY}[/]';
		series.fillOpacity = 0.3;

		this.chart.cursor = new am4charts.XYCursor();
		this.chart.cursor.lineY.opacity = 0;
		this.chart.scrollbarX = new am4charts.XYChartScrollbar();

		dateAxis.keepSelection = true;
		var bullet = series.bullets.push(new am4charts.CircleBullet());
		bullet.circle.stroke = am4core.color("#fff");
		bullet.circle.strokeWidth = 2;
	}

	ngOnDestroy() {
		if (this.chart) {
			this.chart.dispose();
		}
	}
}
