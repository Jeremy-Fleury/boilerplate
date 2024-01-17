export interface ButtonProps {
	text: string;
	onClick: () => void;
}

export function Button({ text, onClick }: ButtonProps) {
	return (
		<button className="text-3xl font-bold" type="button" onClick={onClick}>
			{text}
		</button>
	);
}
