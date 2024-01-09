import { Button } from './button';

export default {
	title: 'Welcome',
	component: Button,
};

export const Default = {
	args: {
		text: 'Button',
		onClick: () => {
			console.log('Button clicked');
		},
	},
};
