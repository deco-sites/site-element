import {
  Picture,
  Source,
} from "deco-sites/std/packs/image/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  desktop: {
    image: LiveImage;
    width?: number;
    height?: number;
  };
  mobile: {
    image: LiveImage;
    width?: number;
    height?: number;
  };
  alt: string;
  href: string;
  lcp?: boolean;
}

function SimpleBanner({ desktop, mobile, alt, href, lcp }: Props) {
  return (
    <a href={href}>
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile.image}
          width={mobile.width ? mobile.width : 360}
          height={mobile.height ? mobile.height : 360}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop.image}
          width={desktop.width ? desktop.width : 1903}
          height={desktop.height ? desktop.height : 831}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop.image}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

export default SimpleBanner;
