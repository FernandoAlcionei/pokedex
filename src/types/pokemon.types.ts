export type PokemonFilter = {
    page: number;
    search?: string | null;
    pageSize: number;
    favorites: boolean;
};

export type PokemonList = {
    count: number;
    results: Pokemon[];
};

export type Pokemon = {
    id: number;
    name: string;
    types: string[];
    image: string;
    favorite: boolean;
}

export type FavoritePayload = {
	pokemon: string;
};

export type FavoriteResponse = {
    pokemon: string;
};