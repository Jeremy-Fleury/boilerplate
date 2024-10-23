/**
 * Transforme une fonction en une instance mockée de Jest tout en conservant son type d'origine.
 *
 * @template T - Le type de la fonction à mocker.
 */
// biome-ignore lint/suspicious/noExplicitAny: Nécessaire pour typer les fonctions avec des paramètres et retours de tout type.
type MockifyFunction<T extends (...args: any[]) => any> = jest.MockInstance<ReturnType<T>, Parameters<T>> & T;

/**
 * Transforme récursivement toutes les propriétés d'un objet en leurs versions mockées.
 *
 * @template T - Le type de l'objet à transformer.
 */
export type DeepMocked<T> = {
	// biome-ignore lint/suspicious/noExplicitAny: Nécessaire pour gérer les fonctions avec des paramètres et retours non spécifiés.
	[K in keyof T]: T[K] extends (...args: any[]) => any
		? MockifyFunction<T[K]>
		: T[K] extends object
			? DeepMocked<T[K]>
			: T[K];
} & T;
