"use client";
import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import PokemonCard from '@/components/PokemonCard';
import { Switch } from '@/components/ui/switch';
import { useFavorite } from '@/hooks/pokemon/useFavorite';
import { usePokemonList } from '@/hooks/pokemon/usePokemonList';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState({
    search: searchParams.get('search') || '',
    page: Number(searchParams.get('page')) || 1,
    pageSize: 40,
    favorites: false,
  })

  const { data, isFetching, refetch: refreshPokemonList } = usePokemonList(filter);
  const { mutateAsync: favorite } = useFavorite();

  useEffect(() => {
    refreshPokemonList()
  }, [filter])

  useEffect(() => {
    setFilter({
      ...filter,
      search: searchParams.get('search') || '',
      page: Number(searchParams.get('page')) || 1,
    })
  }, [searchParams])

  const onPageChange = (page: number) => {
    setFilter({
      ...filter,
      page
    })
  }

  const addFavorite = async (pokemon: string) => {
    await favorite({ pokemon });
    refreshPokemonList();
  }

  const onFavoritesChange = () => {
    setFilter({
      ...filter,
      page: 1,
      favorites: !filter.favorites
    })
  }

  return (
    <div className="flex flex-col gap-10 flex-1">
      {isFetching && (
        <Loader />
      )}

      {data?.results.length ? (
        <div className="flex flex-col gap-10 h-full justify-between pt-4 sm:pt-12">
          <div className="flex gap-4 items-center justify-end">
            <Switch
              id="switch-favorites"
              checked={filter.favorites}
              onCheckedChange={onFavoritesChange}
            />

            <label htmlFor="switch-favorites" className="text-primary cursor-pointer">
              Favorites
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.results.map((pokemon) => (
              <PokemonCard
                key={`${pokemon.id}-${pokemon.name}`}
                pokemon={pokemon}
                addFavorite={addFavorite}
              />
            ))}
          </div>

          <div className="flex items-center justify-center pb-10">
            <Pagination
              currentPage={filter.page}
              totalCount={data.count}
              pageSize={filter.pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      ) : null}

      {!isFetching && !data?.results.length && (
        <div className="flex flex-1 justify-center">
          <span className="text-xl text-gray-500 flex items-center w-full justify-center">
            No results were found for your search
          </span>
        </div>
      )}
    </div>
  );
}
