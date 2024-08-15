import type { ChartData } from '../lib/Types';
import { signal } from '@preact/signals-react';
import { Signal } from '@preact/signals-react';
import { data } from '../lib/Data';
import { useSignals } from '@preact/signals-react/runtime';

// const data: ChartData = signal();
// const tooltipDataIndex: Signal<number> = signal(0);
// const tooltipDatasetIndex: Signal<number> = signal(0);
// const left: Signal<number> = signal(0);
// const top: Signal<number> = signal(0);
// const bottom: Signal<number> = signal(0);
// const right: Signal<number> = signal(0);
// const opacity: Signal<number> = signal(0);

type tooltipData = {
	tooltipDataIndex: Signal<number>;
	tooltipDatasetIndex: Signal<number>;
	left: Signal<number | string>;
	top: Signal<number | string>;
	bottom: Signal<number | string>;
	right: Signal<number | string>;
	opacity: Signal<number>;
};
export default function TooltipText(tooltipInfo: tooltipData) {
	useSignals();
	const display: Signal<string> = signal('');
	const justifyContent: Signal<string> = signal('');
	const style: Signal<any> = signal({
		left: `${tooltipInfo.left}px`,
		right: `${tooltipInfo.right}px`,
		top: `${tooltipInfo.top}px`,
		bottom: `${tooltipInfo.bottom}px`,
		display: `${display}`,
		justifyContent: `${justifyContent}`,
		opacity: `${tooltipInfo.opacity}`
	});

	style.value.top = 'auto';
	style.value.bottom = 'auto';

	if (tooltipInfo.bottom.value !== 0) {
		style.value.bottom = `${tooltipInfo.bottom}px`;
	}
	if (tooltipInfo.bottom.value == 0) {
		style.value.top = `${tooltipInfo.top}px`;
	}
	if (tooltipInfo.right.value !== 0) {
		style.value.left = `${tooltipInfo.left}px`;

		style.value.right = `${tooltipInfo.right}px`;

		style.value.display = 'flex';
		style.value.justifyContent = 'flex-end';
	}

	const convertToHtml =
		data.datasets[tooltipInfo.tooltipDatasetIndex.value].data[tooltipInfo.tooltipDataIndex.value]
			.tooltip;
	const dangerousHtml = { __html: `${convertToHtml}` };
	return (
		<div
			className="tooltip"
			id="tooltip"
			style={style.value}
			dangerouslySetInnerHTML={dangerousHtml}
		></div>
	);
}
