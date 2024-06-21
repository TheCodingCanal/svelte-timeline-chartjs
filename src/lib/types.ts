export interface TimelineChartData {
	x: [string, string];
	y: string;
	label: string;
	tooltip: string;
}

export interface Dataset {
	label: string;
	data: TimelineChartData[];
	backgroundColor: string;
	borderWidth: number;
	borderSkipped: boolean;
	borderColor: string;
}

export interface ChartData {
	labels: string[];
	datasets: Dataset[];
}

export interface XAxisTime {
	unit: Unit;
	min: Date;
	max: Date;
	stepSize: number;
}

export interface DateRange {
	min: Date;
	max: Date;
}

export interface anyObject {
	object: Record<string, any>;
}

export type Unit =
	| false
	| 'millisecond'
	| 'second'
	| 'minute'
	| 'hour'
	| 'day'
	| 'week'
	| 'month'
	| 'quarter'
	| 'year'
	| undefined;
