// import { signal } from '@preact/signals-react';
import { Signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

type modalData = {
	show: Signal<boolean>;
	children: string;
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
			<p>{modalInfo.children}</p>
			<p>Insert pretty picture</p>
			<button
				onClick={() => {
					dialog?.close();
				}}
			>
				Close modal
			</button>
			<p>Sorry, you can't login.</p>
		</dialog>
	);
}
