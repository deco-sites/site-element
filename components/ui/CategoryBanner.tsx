import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { SectionProps } from "$live/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /** @description text to be rendered on top of the image */
  subtitle?: string;
  image: {
    /** @description Image for big screens */
    desktop: LiveImage;
    /** @description Image for small screens */
    mobile: LiveImage;
    /** @description image alt text */
    alt?: string;
  };
}

function Banner({ banner }: SectionProps<ReturnType<typeof loader>>) {
  if (!banner) {
    return null;
  }

  const { title, subtitle, image } = banner;

  return (
    <div class="grid grid-cols-1 px-3 lg:px-9 grid-rows-1">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile}
          width={360}
          height={120}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1823}
          height={398}
          media="(min-width: 767px)"
        />
        <img class="w-full" src={image.desktop} alt={image.alt ?? title} />
      </Picture>
    </div>
  );
}

export interface Props {
  banners?: Banner[];
}

export const loader = ({ banners = [] }: Props, req: Request) => {
  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};

export default Banner;
