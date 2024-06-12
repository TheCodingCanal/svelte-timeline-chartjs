import type {DateRange, XAxisTime} from "$lib/types";

function differenceBetweenDatesHours(timeInfo: DateRange) {
    const timeMax: Date = timeInfo.max;
    const timeMin: Date = timeInfo.min;
    const timeDifferenceMilliseconds: number = timeMax.getTime() - timeMin.getTime();
    console.log(timeInfo.min);
    console.log(timeMax.getTime() - timeMin.getTime());
    const timeDifferenceHours: number = timeDifferenceMilliseconds / (60000 * 60);
    return timeDifferenceHours;
}

export function XAxisAdjustment(timeInfo: DateRange): XAxisTime {

    const timespan: number = differenceBetweenDatesHours(timeInfo);
    const XAxis: XAxisTime = {
        min: timeInfo.min,
        max: timeInfo.max,
        unit: "day",
        stepSize: 1,
    };

    if (timespan <= 2) {
        XAxis.unit = "minute";
        XAxis.stepSize = 15;
        return XAxis;
    }
    if (timespan <= 4 && timespan > 2) {
        XAxis.unit = "minute";
        XAxis.stepSize = 30;
        return XAxis;
    }
    if (timespan > 4 && timespan <= 24) {
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