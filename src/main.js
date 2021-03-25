import Main from './Main.svelte';

const app = new Main({
	target: document.body,
	props: {
		name: 'world',
	}
});

export default app;