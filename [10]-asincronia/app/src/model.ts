export interface CharacterApiModel {
    id: string;
    nombre: string;
    apodo: string;
    especialidad: string;
    habilidades: string[];
    amigo: string;
    imagen: string;
}

export interface CharacterVm {
    nombre: string;
    especialidad: string;
    habilidades: string[];
    imagen: string;
}
