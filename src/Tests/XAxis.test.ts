import {XAxisAdjustment} from "$lib/TimeLogic";
import {expect, test} from "vitest";
import type {DateTime, XAxisTime} from "$lib/types";

const expectedXAxisTime: XAxisTime = {
    min : new Date("2022-10-01T12:00") ,
    max : new Date("2022-10-01T13:00") ,
    unit : "minute",
    stepSize : 15
}


const inputDateTime: DateTime = {
    max : new Date( " 2022-10-01T13:00"),
    min : new Date("2022-10-01T12:00")
}


test('takes in 2022-10-01T12:00 and 2022-10-01T13:00 and returns XAxisTime.unit = "minute" and XAxisTime.step = 15', ()=>{
    console.log(XAxisAdjustment(inputDateTime));
    expect(XAxisAdjustment(inputDateTime)).toEqual(expectedXAxisTime)

})