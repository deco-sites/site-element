import { useState } from "preact/hooks";

export interface Props {
  title: string;
  content: string;
}

function DivDrawerSimple({ title, content }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div class={"w-full p-3 border-y border-primary-newsletter"}>
      <div
        class={"flex justify-between flex-row items-center"}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p class={"text-black text-[14px] uppercase"}>
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
        <p class={"text-black text-xs mt-1"}>
          {content}
        </p>
      </div>
    </div>
  );
}

export default DivDrawerSimple;
