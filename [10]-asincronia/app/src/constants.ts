export const API_URL = "http://localhost:3000";
export const CHARACTERS_URL = `${API_URL}/personajes`;
export const FILTERED_CHARACTERS_URL = (filter: string) =>
    `${API_URL}/personajes?nombre_like=${filter}`;
