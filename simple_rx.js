module.exports = createObservable;

function createObservable(subscribe) {
	return {
		subscribe,
		map,
		filter,
		delay
	};
}

function map(transformFn) {
	const inputObservable = this;
	const outputObservable = createObservable(outputObserver => {
		inputObservable.subscribe({
			next: x => {
				const y = transformFn(x);
				outputObserver.next(y);
			},
			error: e => outputObserver.error(e),
			complete: () => outputObserver.complete
		});
	});

	return outputObservable;
}

function filter(conditionFn) {
	const inputObservable = this;
	const outputObservable = createObservable(outputObserver => {
		inputObservable.subscribe({
			next: x => {
				if(conditionFn(x)){
					outputObserver.next(x);
				}
			},
			error: e => outputObserver.error(e),
			complete: () => outputObserver.complete
		});
	});

	return outputObservable;
}

function delay(period) {
	const inputObservable = this;
	const outputObservable = createObservable(outputObserver => {
		inputObservable.subscribe({
			next: x => setTimeout(() => outputObserver.next(x), period),
			error: e => outputObserver.error(e),
			complete: () => outputObserver.complete
		});
	});

	return outputObservable;
}