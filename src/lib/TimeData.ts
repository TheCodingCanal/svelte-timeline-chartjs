<<<<<<< HEAD
import type {DateTime, XAxisTime} from "$lib/types";

export const TimeData:XAxisTime ={
    unit: "minute",
    min: new Date("2022-10-01T12:00"),
    max: new Date("2022-10-01T15:00"),
    stepSize: 15
}

export const DatedTime: DateTime ={
    min: new Date("2022-10-01T12:00"),
    max: new Date("2022-10-01T24:00")
=======
import type {XAxisTime} from "$lib/types";

export const TimeData:XAxisTime ={
    unit: "minute",
    min: "2022-10-01T12:00",
    max: "2022-10-01T13:00",
    stepSize: 1

>>>>>>> a064cbb (wip: x-axis changes betteen day, hour, minutes based on the XAxisTime object. stepSize allows for intervals of fractional hours (15min 10 min...).)
}