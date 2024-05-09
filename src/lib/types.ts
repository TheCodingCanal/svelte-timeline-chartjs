export interface TooltipData {
	[key: string]: string;
}

export interface TimelineChartData {
	x: [string, string];
	y: string;
	label: string;
	tooltip: TooltipData[];
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
