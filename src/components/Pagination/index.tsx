import { usePagination } from '@/hooks/pagination/usePagination';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

const Pagination = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize
  });

  const onNext = () => {
    onChange(currentPage + 1);
  };

  const onPrevious = () => {
    onChange(currentPage - 1);
  };

  const onChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', `${page}`);
    replace(`${pathname}?${params.toString()}`);
    onPageChange(page);
  }

  const isLastPage = () => (paginationRange) && currentPage == paginationRange[paginationRange.length - 1];

  const isFirstPage = () => currentPage == 1;

  return (
    <ul className="flex">
      <Button
        variant="link"
        disabled={isFirstPage()}
        onClick={onPrevious}
        className="p-2 sm:p-4"
      >
        <ChevronLeft />
      </Button>

      {paginationRange?.map((pageNumber, index) =>
        (typeof pageNumber == 'number') ? (
            <Button
              key={`btn-pagination-${index}`}
              variant="link"
              className={cn('p-2 sm:p-4', {['font-bold']: pageNumber == currentPage})}
              onClick={() => onChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          ) : (
            <Button
              key={`btn-dots-${index}`}
              className="p-2 sm:p-4"
              variant="link"
            >
              &#8230;
            </Button>
          )
        )
      }

      <Button
        variant="link"
        className="p-2 sm:p-4"
        disabled={isLastPage()}
        onClick={onNext}
      >
        <ChevronRight />
      </Button>
    </ul>
  );
};

export default Pagination;
