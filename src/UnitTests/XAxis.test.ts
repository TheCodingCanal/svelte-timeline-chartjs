import { XAxisAdjustment } from '$lib/TimeLogic';
import { expect, test } from 'vitest';
import type { DateRange, XAxisTime } from '$lib/types';

test('takes in 2022-10-01T12:00 and 2022-10-01T13:00 and returns XAxisTime.unit = "minute" and XAxisTime.step = 15', () => {
	const expectedXAxisTime: XAxisTime = {
		min: new Date('2022-10-01T12:00'),
		max: new Date('2022-10-01T13:00'),
		unit: 'minute',
		stepSize: 15
	};
	const inputDateTime: DateRange = {
		max: new Date('2022-10-01T13:00'),
		min: new Date('2022-10-01T12:00')
	};
	expect(XAxisAdjustment(inputDateTime)).toEqual(expectedXAxisTime);
});

test('takes in 2022-10-01T12:00 and 2022-10-01T15:00 and returns XAxisTime.unit = "minute" and XAxisTime.step = 30', () => {
	const expectedXAxisTime: XAxisTime = {
		min: new Date('2022-10-01T12:00'),
		max: new Date('2022-10-01T15:00'),
		unit: 'minute',
		stepSize: 30
	};
	const inputDateTime: DateRange = {
		max: new Date('2022-10-01T15:00'),
		min: new Date('2022-10-01T12:00')
	};
	expect(XAxisAdjustment(inputDateTime)).toEqual(expectedXAxisTime);
});

test('takes in 2022-10-01T12:00 and 2022-10-01T23:00 and returns XAxisTime.unit = "hour" and XAxisTime.step = 1', () => {
	const expectedXAxisTime: XAxisTime = {
		min: new Date('2022-10-01T12:00'),
		max: new Date('2022-10-01T23:00'),
		unit: 'hour',
		stepSize: 1
	};
	const inputDateTime: DateRange = {
		max: new Date('2022-10-01T23:00'),
		min: new Date('2022-10-01T12:00')
	};
	expect(XAxisAdjustment(inputDateTime)).toEqual(expectedXAxisTime);
});

test('takes in 2022-10-01T12:00 and 2022-10-03T12:00 and returns XAxisTime.unit = "day" and XAxisTime.step = 1', () => {
	const expectedXAxisTime: XAxisTime = {
		min: new Date('2022-10-01T12:00'),
		max: new Date('2022-10-03T13:00'),
		unit: 'day',
		stepSize: 1
	};
	const inputDateTime: DateRange = {
		max: new Date('2022-10-03T13:00'),
		min: new Date('2022-10-01T12:00')
	};
	expect(XAxisAdjustment(inputDateTime)).toEqual(expectedXAxisTime);
});
