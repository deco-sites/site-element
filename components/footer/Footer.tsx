import { useId } from "$store/sdk/useId.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import DivDrawer from "deco-sites/staging/islands/DivClick.tsx";
import { repeat } from "https://deno.land/std@0.140.0/bytes/mod.ts";
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

  selectRegion?: string;

  infosFooter?: Link[];
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
      class={"flex relative z-50 w-full justify-center  "}
    >
      <div class={" w-full"}>
        <div
          class={" max-w-[1530px] w-full mx-auto lg:px-7"}
        >
          <Slider class="carousel  carousel-center w-full col-span-full border-b border-primary-newsletter px-3 row-span-full gap-5 py-8 lg:px-0">
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

function Footer(
  {
    links,
    contact,
    location,
    socialMedia,
    listItem,
    selectRegion,
    infosFooter,
  }: Props,
) {
  return (
    <div class={"w-full bg-footer"}>
      <SlideLinks links={links} />
      <div class={"lg:hidden"}>
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
              class={"font-Element-Icons text-[1.75rem] text-default hover:text-primary-newsletter "}
            >
              <SocialMedia social={social.social} />
            </a>
          ))}
        </div>
        <div>
          {listItem?.map((item) => <DivDrawer listItem={item} />)}
        </div>
      </div>
      {/* desktop */}
      <div
        class={`hidden w-full lg:grid grid-rows-1 max-w-[1530px] mx-auto py-7 px-7`}
        style={{
          gridTemplateColumns: `repeat(${
            listItem ? listItem.length + 1 : 1
          },minmax(0,1fr))`,
        }}
      >
        <div>
          <div>
            <h4
              class={"text-default uppercase pb-3 text-sm font-Poppins-Medium"}
            >
              {location}
            </h4>
            <div class={"pb-7"}>
              <input
                class={"border border-primary-newsletter pl-2 py-1 bg-transparent text-xs font-Poppins-Regular w-full h-[40px] max-w-[300px]"}
                type="text"
                placeholder={"Search your location"}
              >
                <button class="w-[40px] h-[40px]] after:content-['\E930'] after:font-Element-Icons text-[20px] relative top-[5px] right-[40px] text-default">
                </button>
              </input>
            </div>
          </div>
          <div>
            <h4
              class={"text-default uppercase pb-3 text-sm font-Poppins-Medium"}
            >
              {"Foolow Us"}
            </h4>
            <div
              class={"w-full flex justify-start gap-4 pr-9 py-9 lg:py-0 "}
            >
              {socialMedia?.map((social) => (
                <a
                  href={social.href}
                  class={"font-Element-Icons text-[1.75rem] text-default hover:text-primary-newsletter"}
                >
                  <SocialMedia social={social.social} />
                </a>
              ))}
            </div>
          </div>
        </div>
        {listItem?.map((iten) => (
          <div>
            <h4
              class={"text-default uppercase pb-3 text-sm font-Poppins-Medium"}
            >
              {iten.title}
            </h4>
            <ul>
              {iten.itens.map((link) => (
                <li
                  class={"text-default hover:text-primary-newsletter font-Poppins-Medium text-xs pb-2"}
                >
                  <a href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div class={"lg:px-7 lg:max-w-[1530px] mx-auto"}>
        <div
          class={"flex flex-col gap-4 p-7 lg:flex-row lg:border-t lg:border-primary-newsletter lg:px-0"}
        >
          <div class={"flex w-full justify-center  lg:justify-start"}>
            <span class="text-default font-Poppins-Medium before:content-['\E92F'] before:text-[20pxpx] before:font-Element-Icons before:block flex flex-row gap-2">
              {selectRegion}
            </span>
          </div>
          <div class={"w-full flex justify-center lg:justify-end "}>
            <span
              class={"text-center text-default text-xs hover:text-default lg:text-end"}
            >
              {infosFooter?.map((infos) => (
                <a
                  class={"text-primary-newsletter text-xs border-r border-primary-newsletter last:border-none px-2"}
                  href={infos.href}
                >
                  {infos.label}
                </a>
              ))}
              <span class={"mr-2"}>
                © 2022 Boardriders. All rights reserved
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
