import { signal } from '@preact/signals-react';
import { Signal } from '@preact/signals-react';

export default function Modal(show: Signal<boolean>, onClose: Function, children: string) {
	if (!show.value) {
		return null;
	}

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<button className="modal-close" onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
}
