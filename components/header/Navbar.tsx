import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { PLATFORM } from "$store/platform.ts";
import Image from "deco-sites/std/components/Image.tsx";
import type { INavItem, Transform } from "./NavItem.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden grid grid-cols-3 grid-rows-1 items-center border-b border-base-200 w-full px-4 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center before:content-['\E904'] before:font-Element-Icons text-[36px] before:text-black"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
          </a>
        )}

        <div class="flex gap-1 justify-end">
          <SearchButton />
          {PLATFORM === "vtex" && <CartButtonVTEX />}
          {PLATFORM === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:flex flex-row justify-between items-center max-w-[1530px] mx-auto w-full px-9 h-[64px] ">
        <div class="flex ">
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="flex gap-2 items-center py-3 after:content-['\E915'] after:font-Element-Icons text-black after:block after:text-[1.5rem] before:content-['\E904'] before:font-Element-Icons before:block before:text-[2rem]"
            >
            </a>
          )}
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <SearchButton />
          <Searchbar searchbar={searchbar} />
          {PLATFORM === "vtex" && <CartButtonVTEX />}
          {PLATFORM === "vnda" && <CartButtonVDNA />}
        </div>
      </div>
    </>
  );
}

export default Navbar;
