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
	fairy: '#ffe2e3',
	fighting: '#b5c1c7',
	psychic: '#efaf37',
	rock: '#cbcdd3',
	ghost: '#545661',
}