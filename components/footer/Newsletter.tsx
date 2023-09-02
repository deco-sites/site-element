import Button from "deco-sites/staging/components/ui/Button.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { lazy } from "https://esm.sh/v118/preact@10.15.1/compat/src/suspense.js";

export interface Props {
  img: LiveImage;
  alt: string;
  title: string;
  description: string;
  placeholder: string;
  labelbtn: string;
}

function Newsletter(
  { img, alt, title, description, placeholder, labelbtn }: Props,
) {
  return (
    <div
      class={"flex w-full justify-center items-center flex-col bg-primary-newsletter pt-8 pb-5 px-6"}
    >
      <div
        class={"flex w-full justify-start flex-col max-w-[400px] lg:max-w-[1530px] lg:flex-row lg:mx-0 items-center"}
      >
        <img
          class={"mb-10 lg:mb-0 lg:mr-4 self-start lg:self-center"}
          src={img}
          loading="lazy"
          alt={alt}
          width={50}
          height={50}
        >
        </img>
        <div class={"w-full flex flex-col items-start"}>
          <h3
            class={"font-Poppins-SemiBold uppercase text-secord-newsletter text-start text-[30px] tracking-[0.1rem] leading-[2rem] mb-2"}
          >
            {title}
          </h3>
          <p class={"font-Poppins-Regular text-xs text-secord-newsletter"}>
            {description}
          </p>
        </div>
        <div class={"w-full flex flex-col lg:flex-row lg:gap-2 items-center"}>
          <input
            class={" w-full border text-secord-newsletter border-secord-newsletter text-sm bg-transparent px-2 py-3 my-6 lg:max-w-[520px]"}
            type="text"
            placeholder={placeholder}
          >
          </input>
          <Button class={"w-full uppercase text-xs lg:max-w-[130px]"}>
            {labelbtn}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
