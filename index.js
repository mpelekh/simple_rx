const createObservable = require('./simple_rx');

const arrayObservable = createObservable(observer => {
	[10, 20, 30].forEach(x => observer.next(x));
	observer.complete();
});

const observer = {
	next: data => console.log(data),
	error: error => console.error(error),
	complete: () => console.log('done')
};

arrayObservable
	.map(x => x/10)
	.filter(x => x !== 2)
	.delay(2000)
	.subscribe(observer);
