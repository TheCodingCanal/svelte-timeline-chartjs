export interface TooltipData {
    [key: string]: string;
}

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
<<<<<<< HEAD
    unit: Unit;
    min: Date;
    max: Date;
    stepSize: number;
}

export interface DateTime{
    min: Date;
    max: Date;
}

export type Unit = false| "millisecond"| "second"| "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined
=======
    unit: string;
    min: string;
    max: string;
    stepSize: number;
}
>>>>>>> a064cbb (wip: x-axis changes betteen day, hour, minutes based on the XAxisTime object. stepSize allows for intervals of fractional hours (15min 10 min...).)
