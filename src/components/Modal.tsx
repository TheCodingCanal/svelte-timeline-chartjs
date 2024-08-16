import { Signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

type modalData = {
	show: Signal<boolean>;
	children: Signal<string>;
};
export default function Modal(modalInfo: modalData) {
	useSignals();
	const dialog = document.querySelector('dialog');
	
	if (modalInfo.show.value && dialog) {
		dialog.showModal();
	} else {
		dialog?.close();
	}

	return (
		<dialog>
			<p>{modalInfo.children.value}</p>
			<p>adjective</p>
			<button
				onClick={() => {
					dialog?.close();
					modalInfo.show.value = false;
				}}
			>
				Close modal
			</button>
		</dialog>
	);
}
