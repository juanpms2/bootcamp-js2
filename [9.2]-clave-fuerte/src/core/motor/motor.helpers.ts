export const tieneMayusculasYMinusculas = (clave: string): boolean =>
	/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(clave);

export const tieneNumeros = (clave: string): boolean => /[0-9]/.test(clave);

export const tieneCaracteresEspeciales = (clave: string): boolean =>
	/[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?`~]/.test(clave);

export const tieneLongitudMinima = (clave: string): boolean =>
	clave.length >= 8;

export const tieneNombreUsuario = (
	nombreUsuario: string,
	clave: string
): boolean =>
	!clave.toLocaleLowerCase().includes(nombreUsuario.toLocaleLowerCase());

export const tienePalabrasComunes = (
	clave: string,
	commonPasswords: string[]
): boolean =>
	!commonPasswords.find(
		(word) => clave.toLocaleLowerCase() === word.toLocaleLowerCase()
	);
