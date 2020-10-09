import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ChartComponent } from './chart/chart.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
	declarations: [HomeComponent, ChartComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatButtonModule,
		MatDividerModule,
		MatTabsModule
	],
})
export class HomeModule { }
