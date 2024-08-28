"use client";
import SearchInput from "../SearchInput";
import Image from "next/image";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/login/useLogout";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter()
    const { mutateAsync: logout } = useLogout();
    const t = useTranslations();

    const onClickLogout = async () => {
        await logout(true);
        router.push('/');
    }

    return (
        <div className="h-16 w-full">
            <nav className="h-16 fixed bg-primary border-b border-gray-200 z-10 w-full">
                <div className="flex sm:gap-4 items-center mx-auto max-w-screen-xl h-full px-4 sm:px-12">
                    <Image
                        className='h-8 hidden sm:block'
                        width={100}
                        height={100}
                        src="/images/pokedex.png"
                        alt="Pokedex logo"
                    />

                    <SearchInput />

                    <Button variant="link" className="text-white text-sm" onClick={() => onClickLogout()}>
                        { t('logout') }
                    </Button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
