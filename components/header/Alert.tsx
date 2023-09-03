import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "deco-sites/staging/components/ui/Icon.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface ItemAlert {
  /**
   * @title Item of Alert
   * @description primary line
   */
  firstline?: {
    text: string;
    background?: string;
    link: {
      isLink: boolean;
      label: string;
      href: string;
    };
  };
  /**
   * @description secord line
   */
  secordline?: {
    text: string;
    background?: string;
    link: {
      isLink: boolean;
      label: string;
      href: string;
    };
  };
}

export type Coutrys = {
  img?: LiveImage;
  label: string;
};

export type OuthersLinks = {
  pageCustom: {
    label: string;
    href: string;
  };
  countrySelector: {
    label: string;
    coutrys: Coutrys[];
  };
  userAccess: {
    label: string;
    content: string;
    btn: {
      label: string;
      href: string;
    };
    link: {
      label: string;
      href: string;
    };
  };
};

export interface Props {
  alerts: ItemAlert[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;

  outhersLinks: OuthersLinks;
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-1">
        <Slider.PrevButton>
          <Icon
            class={"bg-transparent text-white"}
            size={20}
            id="ChevronLeft"
            strokeWidth={2}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-1">
        <Slider.NextButton>
          <Icon
            class={"bg-transparent text-white"}
            size={22}
            id="ChevronRight"
            strokeWidth={2}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function Alert(
  { alerts, interval, outhersLinks }: Props,
) {
  const { pageCustom, userAccess, countrySelector } = outhersLinks;
  const id = useId();

  return (
    <div
      class={"flex flex-row bg-pre-header justify-center items-center w-full"}
    >
      <div
        class={"flex flex-row bg-pre-header justify-between items-center lg:px-12 max-w-[95rem] mx-auto w-full"}
      >
        <div class={"flex w-full justify-center items-center"}>
          <div
            id={id}
            class={"grid grid-cols-[25px_1fr_25px] max-w-[600px] w-full grid-rows-1 "}
          >
            <Slider class="carousel carousel-center w-full gap-6 h-16 md:h-10 max-w-[600px]">
              {alerts.map((alert, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full flex justify-center items-center"
                >
                  <div class={"bg-pre-header"}>
                    <p
                      class={"text-[11px] uppercase text-center text-white font-semibold tracking-wider"}
                    >
                      <span
                        style={{ background: alert.firstline?.background }}
                      >
                        {alert.firstline?.text}
                      </span>
                      {alert.firstline?.link &&
                        (
                          <a
                            class={"text-[11px] uppercase text-center text-white underline"}
                            href={alert.firstline?.link.href}
                          >
                            {alert.firstline?.link.label}
                          </a>
                        )}
                      <br />
                      <span
                        style={{ background: alert.secordline?.background }}
                      >
                        {alert.secordline?.text}
                      </span>
                      {alert.secordline?.link &&
                        (
                          <a
                            class={"text-[11px] uppercase text-center text-white underline"}
                            href={alert.secordline?.link.href}
                          >
                            {alert.secordline?.link.label}
                          </a>
                        )}
                    </p>
                  </div>
                </Slider.Item>
              ))}
            </Slider>

            <Buttons />

            <SliderJS rootId={id} interval={interval && interval * 1e3} />
          </div>
        </div>
        <div
          class={"hidden xl:flex w-full max-w-[286px] justify-end items-center gap-2"}
        >
          <a
            class={"font-Poppins-Medium cursor-pointer text-white text-[11px] uppercase tracking-wider hover:text-gray-500 group/edit group-hover/item:visible"}
            href={pageCustom.href}
          >
            {pageCustom.label}
          </a>
          <div class={"group"}>
            <span
              class={" font-Poppins-Medium cursor-pointer text-white text-[11px] uppercase tracking-wider hover:text-gray-500 "}
            >
              {countrySelector.label}
            </span>
            <div
              class={"w-full h-full bg-black absolute top-[100%] hidden group-hover:flex "}
            >
              <h4>Select Coutry</h4>
              <div>
                {countrySelector.coutrys.map((coutry, index) => {
                  <li>
                    <img src={coutry.img}>
                    </img>
                    <a>
                      {coutry.label}
                    </a>
                  </li>;
                })}
              </div>
            </div>
          </div>
          <div>
            <span
              class={"font-Poppins-Medium cursor-pointer text-white text-[11px] uppercase tracking-wider hover:text-gray-500 group/edit group-hover/item:visible"}
            >
              {userAccess.label}
            </span>
            <div class={"absolute"}>
              <p>
                {userAccess.content}
              </p>
              <a href={userAccess.btn.href}>
                {userAccess.btn.label}
              </a>
              <a href={userAccess.link.href}>
                {userAccess.link.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;
