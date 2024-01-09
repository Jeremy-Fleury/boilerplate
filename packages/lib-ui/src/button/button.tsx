import styles from './button.module.css';

export interface ButtonProps {
	text: string;
	onClick: () => void;
}

export function Button({ text, onClick }: ButtonProps) {
	return (
		<button className={styles['button']} type="button" onClick={onClick}>
			{text}
		</button>
	);
}
