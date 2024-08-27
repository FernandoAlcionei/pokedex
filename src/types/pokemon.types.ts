export type PokemonList = {
    count: number;
    next: string;
    previous: string;
    results: PokemonResult[];
};

type PokemonResult = {
    name: string;
    url: string;
}

export type Pokemon = {
    id: number;
    name: string;
    sprites: {
        other: {
            dream_world: {
                front_default: string;
                front_female: string;
            },
        },
    },
    types: PokemonType[];
}

type PokemonType = {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}