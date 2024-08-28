import { cn, POKEMON_COLORS } from '@/lib/utils';
import { Pokemon } from '@/types/pokemon.types';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { useState } from 'react';

type PokemonCardProps = {
  pokemon: Pokemon;
  onFavoriteClick: (id: number) => void;
}

const PokemonCard = ({ pokemon, onFavoriteClick }: PokemonCardProps) => {
  const [favorite, setFavorite] = useState(pokemon.favorite);

  const onChangeFavorite = () => {
    onFavoriteClick(pokemon.id);
    setFavorite(!favorite)
  }

  return (
    <div className="h-48 border border-gray-200 rounded-lg shadow flex justify-between overflow-hidden"
      style={{
        background: POKEMON_COLORS[pokemon.types[0] || '']
      }}
    >
      <div className="flex flex-col gap-4 p-4">
        <h5 className="text-white max-w-sm text-capitz capitalize">
          {pokemon?.name}
        </h5>

        <div className="flex flex-col gap-1 items-start">
          {pokemon?.types.map((type) => (
            <span key={`${pokemon.id}-${type}`} className='text-xs text-white bg-white bg-opacity-30 rounded-full px-4 py-1'>
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-end relative">
        <div className="absolute top-0 right-0">
          <Button
            variant="link"
            className={cn({
              ['text-white']: !favorite,
            })}
            onClick={onChangeFavorite}
          >
            <Heart fill={favorite ? '#d41a46' : 'transparent'} />
          </Button>
        </div>

        <div className="p-4 z-index-1">
          <Image
            className='h-28'
            width={100}
            height={100}
            loader={() => pokemon.image}
            src={pokemon.image}
            alt={pokemon?.name || 'Pokemon'}
          />
        </div>

        <div className="w-44 h-44 bg-white bg-opacity-20 rounded-full absolute -left-5 -bottom-8" />
      </div>
    </div>
  );
}

export default PokemonCard;