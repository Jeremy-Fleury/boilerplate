import { Button } from '@org/lib-ui';

export function App() {
	return (
		<div>
			<Button text="Click me!" onClick={() => window.alert('Thanks')} />
		</div>
	);
}
