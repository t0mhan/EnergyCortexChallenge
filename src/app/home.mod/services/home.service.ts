// angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// app
import { ProxyService } from './proxy.service';
import { AppServicesInterface } from '../interfaces/home-interface';

@Injectable({
	providedIn: 'root',
})
export class HomeServiceService {
	constructor(
		private proxyService: ProxyService,
		private http: HttpClient
	) { }

	/**
	 * accepts inputs/filters from form
	 * @param data function to fetch data from API
	 */
	fetchData(data: AppServicesInterface) {
		const payload = {
			queryParams: {
				sector: data.sector,
				weekend_prod: data.weekend_prod,
				day: data.day
			},
		};

		return this.proxyService
			.getAPI('/dev/load_profiles/', payload)
			.pipe(map((res) => res));
	}

	/**
	 * fetch data from JSON file when API not working
	 */
	fetchJSONData() {
		return this.http.get('../../../assets/data/chart-data.json');
	}
}
