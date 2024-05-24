import type {DateTime, XAxisTime} from "$lib/types";

export const TimeData:XAxisTime ={
    unit: "minute",
    min: new Date("2022-10-01T12:00"),
    max: new Date("2022-10-01T15:00"),
    stepSize: 15

}

export const DatedTime: DateTime ={
    min: new Date("2022-10-01T00:00"),
    max: new Date("2022-10-06T00:00")
}