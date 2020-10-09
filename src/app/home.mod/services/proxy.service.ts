// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV_SERVICE_URL } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ProxyService {

	constructor(private http: HttpClient) { }

	public getAPI(service: string, params?: any) {
		// set url
		let url = ENV_SERVICE_URL + service;

		console.log('params.queryParams: ', params);
		// add path params
		url =
			params && params.queryParams
				? this.addQueryParamsToUrl(url, params.queryParams)
				: url;

		// options
		const options: any = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			}),
			responseType: 'json',
		};

		// api: get
		console.log('url: ', url, 'options', options);
		return this.http.get<any>(url, options);
	}

	public addQueryParamsToUrl(url: string, queryParams: any) {
		let params = '';
		let firstItem = true;

		if (queryParams !== null && Object.keys(queryParams).length !== 0) {
			for (const key in queryParams) {
				if (queryParams.hasOwnProperty(key)) {
					// set ? at start and & for the rest
					if (firstItem) {
						params = '?';
						firstItem = false;
					} else {
						params = params + '&';
					}

					// logic
					if (queryParams[key] instanceof Array) {
						let nestedFirstItem = false;
						queryParams[key].forEach((value) => {
							if (nestedFirstItem) {
								params = '?';
								nestedFirstItem = false;
							} else {
								params = params + '&';
							}

							params = params.concat(key).concat('=').concat(value);
						});
					} else {
						params = params.concat(key).concat('=').concat(queryParams[key]);
					}
				}
			}
		}
		return url + params;
	}
}
