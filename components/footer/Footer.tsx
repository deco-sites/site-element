import { useId } from "$store/sdk/useId.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

export type Link = {
  label: string;
  href: string;
};

interface Props {
  links: Link[];
}

function Link({ link }: { link: Link }) {
  const { label, href } = link;
  return (
    <a
      href={href}
      class={"rounded-full bg-tag-footer text-default text-xs py-2 px-6 tracking-widest"}
    >
      {label}
    </a>
  );
}

function SlideLinks({ links = [] }: Props) {
  const id = useId();
  return (
    <div id={id} class={"flex px-3 relative z-50 w-full justify-center"}>
      <div class={" max-w-[1530px] w-full border-b border-primary-newsletter"}>
        <Slider class="carousel  carousel-center w-full col-span-full row-span-full gap-5 py-8 ">
          {links?.map((link, index) => (
            <Slider.Item
              index={index}
              class="carousel-item flex justify-center items-center"
            >
              <Link link={link} />
            </Slider.Item>
          ))}
        </Slider>
        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

function Footer({ links = [] }: Props) {
  return (
    <div class={"w-full bg-footer"}>
      <SlideLinks links={links} />
    </div>
  );
}

export default Footer;
