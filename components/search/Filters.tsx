import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";
import DivDrawerFilter from "deco-sites/staging/islands/DivDrawerFilter.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a
      href={url}
      class="flex items-center gap-3 font-Poppins-Regular pl-2"
    >
      <div
        aria-checked={selected}
        class="checkbox rounded-full max-w-[15px] max-h-[15px]"
      />
      <span class="text-sm">{label}</span>
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col pt-3 px-3 w-[80vw] lg:px-0 lg:w-full">
      {filters
        .filter(isToggle)
        .map((filter, index) => (
          <li class="flex flex-col gap-4">
            <DivDrawerFilter
              title={filter.label}
              index={index}
              children={
                <>
                  <FilterValues {...filter} />
                </>
              }
            />
          </li>
        ))}
    </ul>
  );
}

export default Filters;
