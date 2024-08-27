import { usePokemon } from '@/hooks/pokemon/usePokemon';
import { POKEMON_COLORS } from '@/lib/utils';
import Image from 'next/image';

type PokemonCardProps = {
  name: string;
}

const PokemonCard = ({ name }: PokemonCardProps) => {
  const { data: pokemon } = usePokemon(name);

  return (
    <div className="h-40 border border-gray-200 rounded-lg shadow flex justify-between overflow-hidden"
        style={{
          background: POKEMON_COLORS[pokemon?.types[0].type.name || '']
        }}
      >

      <div className="flex flex-col gap-4 p-4">
        <h5 className="text-white max-w-sm text-capitz capitalize">
          {pokemon?.name}
        </h5>

        <div className="flex flex-col gap-1 items-start">
          { pokemon?.types.map((pokemonType) => (
            <span key={`${pokemon.id}-${pokemonType.type.name}`} className='text-xs text-white bg-white bg-opacity-30 rounded-full px-4 py-1'>
              { pokemonType.type.name }
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-end relative">
        { pokemon?.sprites.other.dream_world.front_default && (
          <div className="p-4 z-index-1">
            <Image
              className='h-28'
              width={100}
              height={100}
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
          </div>
        )}

        <div className="w-44 h-44 bg-white bg-opacity-20 rounded-full absolute -left-5 -bottom-8" />
      </div>
    </div>
  );
}

export default PokemonCard;