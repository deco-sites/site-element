import { useId } from "$store/sdk/useId.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import ListCollapsed from "deco-sites/staging/islands/DivClick.tsx";
export type Link = {
  label: string;
  href: string;
};

export type socialMedia = {
  social:
    | "Facebook"
    | "Twitter"
    | "Instagram"
    | "YouTube"
    | "Spotify"
    | "Tiktok ";
  href?: string;
};

export type ListItem = {
  title: string;
  itens: Link[];
};

interface Props {
  links: Link[];

  location?: "Find a Store" | string;
  contact?: "Contact Us" | string;

  socialMedia?: socialMedia[];

  listItem?: ListItem[];
}

function SocialMedia({ social }: socialMedia) {
  switch (social) {
    case "Facebook":
      return <span class="before:content-['\E900']"></span>;
    case "Twitter":
      return <span class="before:content-['\E903']"></span>;
    case "Instagram":
      return <span class="before:content-['\E901']"></span>;
    case "YouTube":
      return <span class="before:content-['\E902']"></span>;
    case "Spotify":
      return <span class="before:content-['\E923']"></span>;
    case "Tiktok ":
      return <span class="before:content-['\E924']"></span>;
    default:
      return null;
  }
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

function SlideLinks({ links }: Props) {
  const id = useId();
  return (
    <div
      id={id}
      class={"flex px-3 relative z-50 w-full justify-center  "}
    >
      <div class={"border-b border-primary-newsletter"}>
        <div class={" max-w-[1530px] w-full "}>
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
    </div>
  );
}

function Footer({ links, contact, location, socialMedia, listItem }: Props) {
  return (
    <div class={"w-full bg-footer"}>
      <SlideLinks links={links} />
      <div>
        <div class={"w-full flex flex-row justify-center"}>
          <div class={"w-full flex flex-col justify-center items-center"}>
            <a class=" text-default before:content-['\E91E'] font-Poppins-Medium before:font-Element-Icons before:text-[30px] w-full text-center px-4 py-14 before:block border-r border-primary-newsletter">
              {location}
            </a>
          </div>
          <div class={"w-full flex flex-col justify-center items-center"}>
            <a class=" text-default before:content-['\E92E'] font-Poppins-Medium before:font-Element-Icons before:text-[30px] w-full text-center px-4 py-14 before:block ">
              {contact}
            </a>
          </div>
        </div>
        <div
          class={"w-full flex justify-center gap-4 px-9 py-9 border-y border-primary-newsletter"}
        >
          {socialMedia?.map((social) => (
            <a
              href={social.href}
              class={"font-Element-Icons text-[1.75rem] text-default"}
            >
              <SocialMedia social={social.social} />
            </a>
          ))}
        </div>
        <div>
          {listItem?.map((item) => <ListCollapsed listItem={item} />)}
        </div>
      </div>
    </div>
  );
}

export default Footer;
