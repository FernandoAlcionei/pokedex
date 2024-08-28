import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const POKEMON_COLORS: any = {
	default: '#545661',
	grass: '#47d1b2',
	fire: '#fb6c6c',
	water: '#76bfff',
	bug: '#9fd07c',
	normal: '#bbd7d9',
	electric: '#ffd96f',
	poison: '#cdbcdb',
	ground: '#af9985',
	fairy: '#FFB6C1',
	fighting: '#b5c1c7',
	psychic: '#efaf37',
	rock: '#cbcdd3',
	ghost: '#545661',
	flying: '#EEE8AA',
	steel: '#FF8C00',
	dark: '#483D8B',
	ice: '#B0E0E6',
	dragon: '#FF4500',
}