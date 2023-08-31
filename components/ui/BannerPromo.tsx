import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import {
  Picture,
  Source,
} from "deco-sites/std/packs/image/components/Picture.tsx";
import Button from "deco-sites/staging/components/ui/Button.tsx";

export interface Props {
  ImagemDesk: LiveImage;
  ImagemMobile: LiveImage;
  alt: string;
  primaryText: string;
  secordText: string;
  btnLink: {
    label: string;
    href: string;
  };
  lcp: boolean;
}

function BannerPromo(
  { ImagemMobile, ImagemDesk, primaryText, secordText, btnLink, lcp, alt }:
    Props,
) {
  return (
    <div class={"relative"}>
      <Picture preload={lcp}>
        <Source
          media="(max-width: 1020px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={ImagemMobile}
          width={360}
          height={168}
        />
        <Source
          media="(min-width: 1020px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={ImagemDesk}
          width={1903}
          height={118}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={ImagemMobile}
          alt={alt}
        />
      </Picture>
      <div
        class={"absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-3 lg:flex-row lg:justify-around"}
      >
        <p
          class={"text-sm font-Poppins-Medium tracking-wider text-white lg:text-xl"}
        >
          {primaryText}
        </p>
        <p
          class={"text-sm font-Poppins-Medium tracking-wider text-white lg:text-xl"}
        >
          {secordText}
        </p>
        <a href={btnLink.href}>
          <Button class={"uppercase"} label={btnLink.label}>
            {btnLink.label}
          </Button>
        </a>
      </div>
    </div>
  );
}

export default BannerPromo;
