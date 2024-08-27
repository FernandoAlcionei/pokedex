"use client";
import PokemonCard from '@/components/PokemonCard';
import { usePokemonList } from '@/hooks/pokemon/usePokemonList';
import { useTranslations } from 'next-intl';

export default function Home() {
  const { data } = usePokemonList();
  const t = useTranslations();

  return (
    <div className="flex flex-col">
      <h2>
        Pokedex
      </h2>

      <div className="grid grid-cols-4 gap-4">
        { data?.results.map((item) => (
          <PokemonCard key={item.name} name={item.name} />
        ))}
      </div>
    </div>
  );
}
