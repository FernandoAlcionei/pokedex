import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const { replace } = useRouter();
    const pathname = usePathname();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (search) {
            const params = new URLSearchParams();
            params.set('search', search);
            replace(`${pathname}?${params.toString()}`);
        } else {
            replace(pathname);
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)} className="w-full">
            <div className="flex border rounded-lg bg-gray-50 overflow-hidden items-center">
                <input
                    type="search"
                    className="w-full text-gray-800 bg-gray-50 !outline-none text-sm pl-6"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Button type="submit" variant="link">
                    <Search width={20} height={20} />
                </Button>
            </div>
        </form>
    );
}

export default SearchInput;