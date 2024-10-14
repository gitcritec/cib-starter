// Header.tsx

import { HeaderProps, MenuLang } from "@/types";
import { fetchMenuChildren } from "@/utils/crico";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "../elements/languageSelector";


const Header = ({ logo, menus, allLangsActives, lang_id }: HeaderProps) => {
    const headerMenu = fetchMenuChildren(menus,'2');
  
    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href={"/" + headerMenu[0].URL} className="flex items-center space-x-2">
                    <div className="bg-white shadow-lg absolute top-0 logo-cotainner">
                        <Image
                            src={`${logo}`}
                            alt="Dinamic Image"
                            fill
                            style={{ objectFit: 'contain', objectPosition: 'center center' }}
                        />
                    </div>
                </Link>
                <div className="flex items-center space-x-4">
                    <nav>
                        <ul className="hidden md:flex space-x-4">
                        {headerMenu.map((menuItem: MenuLang) => (
                            <li key={menuItem.MENU_ID}> {/* Aqui o key é string, conforme definido em MenuLang */}
                                <Link href={"/" + menuItem.URL} className="hover:underline">
                                    {menuItem.M_NAME}
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </nav>
                </div>
                {allLangsActives && allLangsActives.length > 1 && (
                    <LanguageSelector allLangsActives={allLangsActives} lang_id={lang_id} />
                )}

            </div>
        </header>
    );
};

export default Header;
