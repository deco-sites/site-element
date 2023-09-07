import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

export type Props =
  & Pick<
    ProductListingPage,
    "pageInfo"
  >
  & {
    itemListElement: BreadcrumbList["itemListElement"];
  };

function HeadingTag({ itemListElement = [], pageInfo }: Props) {
  return (
    <div class={"flex items-center gap-3"}>
      <h1 class={"text-4xl font-Poppins-SemiBold font-bold leading-8"}>
        {itemListElement[itemListElement.length - 1]?.name}
      </h1>
      <p class={"text-sm font-Poppins-Medium self-center"}>
        ({pageInfo.records} Results)
      </p>
    </div>
  );
}

export default HeadingTag;
