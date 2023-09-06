import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import HeadingTag from "deco-sites/staging/components/ui/Headintag.tsx";

export type Props =
  & Pick<
    ProductListingPage,
    "filters" | "breadcrumb" | "sortOptions" | "pageInfo"
  >
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions, pageInfo }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h1 class="px-3 lg:px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class={"flex flex-col"}>
        <div class="flex flex-col justify-between mb-4 p-0 py-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:border-b sm:border-base-200">
          <div class="flex flex-col gap-4 items-start sm:p-0 mb-7">
            <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
            <HeadingTag
              itemListElement={breadcrumb?.itemListElement}
              pageInfo={pageInfo}
            />
          </div>
          <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
            <Button
              class={displayFilter ? "btn-ghost" : "btn-ghost sm:hidden"}
              onClick={() => {
                open.value = true;
              }}
            >
              Filtrar
              <Icon id="FilterList" width={16} height={16} />
            </Button>
            {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
