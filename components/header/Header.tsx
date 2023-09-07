import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { Image } from "deco-sites/std/components/types.ts";
import Alert, { ItemAlert, OuthersLinks } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export type Transform = "uppercase" | "lowercase";
export interface NavItem {
  label: string;
  href: string;
  textTransform?: Transform; // Adicione esta propriedade
  children?: Array<NavItem>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  alerts: ItemAlert[];
  outhesLinks: OuthersLinks;
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: Product[] | null;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: Suggestion | null;

  /** @title Logo */
  logo?: { src: Image; alt: string };
}

function Header({
  alerts,
  outhesLinks,
  searchbar: _searchbar,
  products,
  navItems = [],
  suggestions,
  logo,
}: Props) {
  const searchbar = { ..._searchbar, products, suggestions };
  return (
    <>
      <header class={"h-[116px] lg:h-[103px]"}>
        <Drawers
          menu={{ items: navItems }}
          searchbar={searchbar}
        >
          <div class="bg-base-100 w-full z-50">
            <Alert alerts={alerts} outhersLinks={outhesLinks} />
            <Navbar items={navItems} searchbar={searchbar} logo={logo} />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
