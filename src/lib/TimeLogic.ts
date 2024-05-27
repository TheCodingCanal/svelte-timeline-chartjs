import type {DateTime, XAxisTime} from "$lib/types";

function differenceBettweenDates(timeInfo: DateTime) {
    const timeMax: Date = timeInfo.max;
    const timeMin: Date = timeInfo.min;
    const timeDifference: number = timeMax.getTime() - timeMin.getTime();
    console.log(timeInfo.min);
    console.log(timeMax.getTime() - timeMin.getTime());
    const timeDifferenceHours: number = timeDifference / (60000 * 60);
    return timeDifferenceHours;
}

export function XAxisAdjustment(timeInfo: DateTime): XAxisTime {

    const timespan: number = differenceBettweenDates(timeInfo);
    const XAxis: XAxisTime = {
        min: timeInfo.min,
        max: timeInfo.max,
        unit: "day",
        stepSize: 1,
    };

    if (timespan < 2) {
        XAxis.unit = "minute";
        XAxis.stepSize = 15;
        return XAxis;
    }
    if (timespan < 4 && timespan > 2) {
        XAxis.unit = "minute";
        XAxis.stepSize = 30;
        return XAxis;
    }
    if (timespan > 4 && timespan < 24) {
        XAxis.unit = "hour";
        XAxis.stepSize = 1;
        return XAxis;
    }
    if (timespan > 24) {
        XAxis.unit = "day";
        XAxis.stepSize = 1;
        return XAxis;
    }

    return XAxis;

}