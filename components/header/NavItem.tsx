import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export type Transform = "uppercase" | "lowercase";
export interface INavItem {
  label: string;
  href: string;
  textTransform?: Transform;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image, textTransform } = item;

  console.log(textTransform);

  return (
    <li class="group flex items-center">
      <a
        href={href}
        class="px-4 py-5 uppercase font-Poppins-Medium text-xs hover:border-b-[3px] tracking-wider hover:border-b-danger"
      >
        <span class="">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
            style={{ top: "0px", left: "0px", marginTop: 103 }}
          >
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-4">
                  <a
                    class="uppercase font-Poppins-Medium text-xs"
                    href={node.href}
                  >
                    <span>{node.label}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a
                          class={`${
                            leaf.textTransform == "uppercase"
                              ? "font-Poppins-Medium"
                              : "font-Poppins-Regular"
                          } tracking-wider`}
                          style={{ textTransform: leaf.textTransform }}
                          href={leaf.href}
                        >
                          <span class="text-xs">{leaf.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            {image?.src && (
              <Image
                class="my-3"
                src={image.src}
                alt={image.alt}
                width={450}
                height={250}
                loading="lazy"
              />
            )}
          </div>
        )}
    </li>
  );
}

export default NavItem;
