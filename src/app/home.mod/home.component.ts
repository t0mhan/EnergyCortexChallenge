// angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// app
import { HomeServiceService } from './services/home.service';
import { SeasonDataInterface } from './interfaces/home-interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	filterForm: FormGroup;
	// sector dropdown values
	sectors = [
		'Industry',
		'Gewerbe',
		'Dienstleistungen/IT',
		'Verkehr/Landwirtschaft',
		'Haushalt',
	];
	weekendProds = ['Yes', 'No'];
	name = 'test control name';
	days = ['Werktag', 'Wochenende'];
	chartIds = ['sommerChart', 'winterChart', 'restSeasonChart'];
	seasonData: SeasonDataInterface;

	constructor(
		private homeServiceService: HomeServiceService,
		private fb: FormBuilder
	) {
		this.filterForm = this.fb.group({
			sector: ['', [Validators.required]],
			weekend_prod: ['', [Validators.required]],
			day: ['', [Validators.required]]
		});
	}

	/**
	 * functionality to perform of execute button click
	 */
	onSubmit() {
		this.seasonData = null;
		// on button click get data from JSON file
		this.homeServiceService.fetchJSONData().subscribe((data: any) => {
			// chart data passed to chart component
			this.seasonData = {
				summer: this.generateChartData(data.Summer[0].Werktag),
				winter: this.generateChartData(data.Winter[0].Werktag),
				rest: this.generateChartData(data.Rest[0].Werktag)
			};
		});

		/*
		// API to get data from URL
		// not working beacuse CORS policy is disabled on server
		const formData: AppServicesInterface = this.filterForm.value;
		this.enerygData = this.homeServiceService
			.fetchData(formData)
			.subscribe((data) => {
				//console.log('APIData: ', data[0]);
			});
			*/
	}

	/**
	 * 
	 * @param data receives JSONData and parses it to data format needed by amCharts
	 */

	public generateChartData(data: string[]) {
		const chartDataArray = [];
		// current date with 00:00 hours
		let firstDate = new Date();
		firstDate.setHours(0, 0, 0, 0);
		// tslint:disable-next-line: forin
		for (const key in data) {
			const newDate = new Date(firstDate);
			// each time we add 15 minutes
			newDate.setMinutes(newDate.getMinutes() + 15);
			firstDate = newDate;
			// add data item to the array
			chartDataArray.push({
				date: newDate,
				value: data[key]
			});
		}
		return chartDataArray;
	}

	//  cancel button functionality
	onClear() {
		// Resets to form and if needed graph can be disposed here
		this.filterForm.reset();
	}
}
