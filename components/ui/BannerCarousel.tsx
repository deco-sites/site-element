import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "$store/sdk/useId.ts";
import type {
  Image as LiveImage,
  Video as LiveVideo,
} from "deco-sites/std/components/types.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  type: "Image" | "Video";
  /** @description desktop otimized image */
  desktop: LiveImage | LiveVideo;
  /** @description mobile otimized image */
  mobile: LiveImage | LiveVideo;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    action,
    type,
  } = image;

  return (
    <div class={"relative"}>
      <a
        href={action?.href ?? "#"}
        aria-label={action?.label}
        class="relative max-h-[600px] overflow-y-hidden w-full"
      >
        <Picture preload={false}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={360}
            height={600}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1440}
            height={600}
          />
          {type == "Image"
            ? (
              <img
                class="object-cover w-full h-full"
                loading={lcp ? "eager" : "lazy"}
                src={desktop}
                alt={alt}
              />
            )
            : (
              <video
                class="object-cover w-full h-full"
                loading={lcp ? "eager" : "lazy"}
                src={desktop}
                alt={alt}
                loop
                autoPlay
                preload={"auto"}
                type={"video/mp4"}
              >
              </video>
            )}
        </Picture>
      </a>
      <div class={"absolute top-0 left-0 w-full h-full pb-11 xl:pb-24"}>
        {action && (
          <div
            class={"w-full h-full top-0 left-0 flex justify-center items-end"}
          >
            <a href={action.href} class={""}>
              <Button class="bg-white hover:bg-[#565656] text-[11px] font-Poppins-Medium px-12 py-4 uppercase hover:text-white">
                {action.label}
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div class="w-2 h-2 rounded group-disabled:bg-white bg-default border border-default " />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="items-center justify-center z-10 col-start-1 row-start-2 hidden sm:flex">
        <Slider.PrevButton class="bg-transparent">
          <Icon
            class="text-base-100"
            size={30}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="items-center justify-center z-10 col-start-3 row-start-2 hidden sm:flex">
        <Slider.NextButton class="bg-transparent">
          <Icon
            class="text-base-100"
            size={30}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel({ images, preload, interval = 11 }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {images?.map((image, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>

      <Buttons />

      <Dots images={images} interval={interval} />

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
