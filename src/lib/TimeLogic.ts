// import {TimeData} from "$lib/TimeData";
import type {DateTime, XAxisTime} from "$lib/types";



function differenceBettweenDates(timeInfo: DateTime){
    const timeMax: Date = timeInfo.max;
    const timeMin: Date = timeInfo.min;
    const timeDifference: number = timeMax.getTime() - timeMin.getTime();
    console.log(timeInfo.min);
    console.log(timeMax.getTime() - timeMin.getTime());
    const timeDifferenceHours: number =timeDifference / (60000 * 60);
    return timeDifferenceHours;
}
const XAxis: XAxisTime = {};
export function XAxisAdjustment(timeInfo: DateTime): XAxisTime{
    console.log("samp-le");
   const timespan: number = differenceBettweenDates(timeInfo);

   XAxis.min = timeInfo.min;
   XAxis.max = timeInfo.max;
console.log("XAxis.max",XAxis.max)
   if(timespan < 2){
       XAxis.unit = "minute";
       XAxis.stepSize = 15;
       return XAxis;
   }
   if (timespan < 4 && timespan > 2){
       XAxis.unit = "minute";
       XAxis.stepSize = 30;
       return XAxis;
   }
   if (timespan > 4 && timespan < 24){
       XAxis.unit = "hour";
       XAxis.stepSize = 1;
       return XAxis;
   }
   if(timespan > 24){
       XAxis.unit = "day";
       XAxis.stepSize = 1;
       return XAxis;
   }
   XAxis.unit = "day";
   XAxis.stepSize = 1;
   return XAxis;
   console.log(timespan)
}