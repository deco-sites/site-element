import { useState } from "preact/hooks";
import { ComponentChildren } from "preact";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

export interface Props {
  title: string;
  index: number;
  children: ComponentChildren;
}

function DivDrawerFilter(props: Props) {
  const { title, index, children } = props;
  const [open, setOpen] = useState(false);

  return (
    <div class={"w-full py-3 pr-2 border-b border-primary-newsletter"}>
      <div
        class={"flex justify-between flex-row items-center"}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p
          class={"text-black text-[14px] uppercase cursor-pointer font-Poppins-SemiBold font-bold"}
        >
          {title}
        </p>
        <div>
          {open
            ? (
              <span class="before:content-['\E90D'] block before:font-Element-Icons text-sm text-black">
              </span>
            )
            : (
              <span class="before:content-['\E90C'] block before:font-Element-Icons text-sm text-black">
              </span>
            )}
        </div>
      </div>

      <div
        class={`${
          open ? "opacity-100 block h-auto pt-3" : " hidden opacity-0 h-0 "
        } ease-in duration-300 `}
      >
        {children}
      </div>
    </div>
  );
}

export default DivDrawerFilter;
