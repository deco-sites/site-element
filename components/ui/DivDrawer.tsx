import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";
import { ListItem } from "deco-sites/staging/components/footer/Footer.tsx";

export interface Props {
  listItem: ListItem;
}

function DivDrawer({ listItem }: Props) {
  const { title, itens } = listItem;
  const [open, setOpen] = useState(false);

  return (
    <div class={"w-full p-6 border-b border-primary-newsletter"}>
      <div
        class={"flex justify-between flex-row items-center"}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p class={"text-default text-[14px] uppercase"}>
          {title}
        </p>
        <div>
          {open
            ? (
              <span class="before:content-['\E90D'] block before:font-Element-Icons text-sm text-default">
              </span>
            )
            : (
              <span class="before:content-['\E90C'] block before:font-Element-Icons text-sm text-default">
              </span>
            )}
        </div>
      </div>

      <div
        class={`${
          open ? "opacity-100 block h-auto pt-3" : " hidden opacity-0 h-0 "
        } ease-in duration-300 `}
      >
        <ul>
          {itens.map((iten) => (
            <li class={"text-default text-xs mt-1"}>
              <a href={iten.href}>
                {iten.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DivDrawer;
