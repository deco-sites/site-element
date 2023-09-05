import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { PLATFORM } from "$store/platform.ts";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import Image from "deco-sites/std/components/Image.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import { Product } from "deco-sites/std/packs/vtex/types.ts";
import { asset } from "$fresh/runtime.ts";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: ProductDetailsPage | null;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 360;
const HEIGHT = 360;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductName({ page }: { page: ProductDetailsPage }) {
  return (
    <h1>
      <span class="text-[20px] font-Poppins-SemiBold">
        {page.product.name}
      </span>
    </h1>
  );
}

function Price({ page }: { page: ProductDetailsPage }) {
  const { product } = page;
  const { offers } = product;
  const { listPrice, price, installments } = useOffer(offers);
  return (
    <div class="mt-4">
      <div class="flex flex-row gap-2 items-center">
        <span class="line-through text-[#9e9e9e] text-xl font-Poppins-Medium">
          {formatPrice(listPrice, offers!.priceCurrency!)}
        </span>
        <span class="font-medium text-xl text-base-300 font-Poppins-Medium">
          {formatPrice(price, offers!.priceCurrency!)}
        </span>
      </div>
      <span class="text-sm text-base-300">
        {installments}
      </span>
    </div>
  );
}

function ProductSelectorPage({ page }: { page: ProductDetailsPage }) {
  const { product } = page;
  return (
    <>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
    </>
  );
}

function Buttons({ page }: { page: ProductDetailsPage }) {
  const { product } = page;
  const { name = "", productID, isVariantOf, offers, additionalProperty = [] } =
    product;
  const { price = 1, seller = "1", listPrice, availability } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;

  return (
    <>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 gap-2 grid grid-cols-[1fr_45px]">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {PLATFORM === "vtex" && (
                <AddToCartButtonVTEX
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                  seller={seller}
                />
              )}
              {PLATFORM === "vnda" && (
                <AddToCartButtonVNDA
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                  additionalProperty={additionalProperty}
                />
              )}

              <WishlistButton
                variant="icon"
                productID={productID}
                productGroupID={productGroupID}
              />
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
    </>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;

  return (
    <>
      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulation
          items={[{
            id: Number(product.sku),
            quantity: 1,
            seller: seller,
          }]}
        />
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div class="ml-2 mt-2">{description}</div>
            </details>
          )}
        </span>
      </div>
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  variant,
}: { page: ProductDetailsPage; variant: Variant }) {
  const { product, breadcrumbList } = page;
  const { name = "" } = product;
  const id = useId();
  const images = useStableImages(product);

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        <div>
          <div class={"p-3"}>
            {/* Breadcrumb */}
            <Breadcrumb
              itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
            />
          </div>
          <div class={"px-3"}>
            <ProductName page={page} />
          </div>
          <div
            id={id}
            class="grid grid-cols-1 gap-4 sm:grid-cols-[max-content_40vw_40vw] sm:grid-rows-1 sm:justify-center"
          >
            {/* Image Slider */}
            <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
              <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
                {images.map((img, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-full"
                  >
                    <Image
                      class="w-full"
                      sizes="(max-width: 640px) 100vw, 40vw"
                      style={{ aspectRatio: ASPECT_RATIO }}
                      src={img.url!}
                      alt={img.alternateName}
                      width={WIDTH}
                      height={HEIGHT}
                      // Preload LCP image for better web vitals
                      preload={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </Slider.Item>
                ))}
              </Slider>

              <Slider.PrevButton
                class="no-animation absolute left-2 top-1/2 before:content-['\E90E'] before:font-Element-Icons block before:text-[23px] p-3"
                disabled
              >
              </Slider.PrevButton>

              <Slider.NextButton
                class="no-animation absolute right-2 top-1/2 before:content-['\E910'] before:font-Element-Icons block before:text-[23px] p-3"
                disabled={images.length < 2}
              >
              </Slider.NextButton>

              <div class="absolute top-2 right-2 bg-base-100 rounded-full">
                <ProductImageZoom
                  images={images}
                  width={700}
                  height={Math.trunc(700 * HEIGHT / WIDTH)}
                />
              </div>

              {/* Dots */}
              <ul class="flex gap-2 justify-center overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1 absolute w-full bottom-0">
                {images.map((img, index) => (
                  <li class="min-w-[8px] flex justify-center items-center">
                    <Slider.Dot index={index}>
                      <div class="py-5">
                        <div class="w-2 h-2 rounded group-disabled:bg-[#aeaeb2cc] bg-default " />
                      </div>
                    </Slider.Dot>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Info */}
            <div class="px-4 sm:pr-0 sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1">
              <Price page={page} />
              <div class={"flex flex-col gap-3 my-3"}>
                <p class={" text-[#616161] text-xs"}>
                  Or 4 interest free payments of $13.50 by
                </p>
                <div class={"w-full flex flex-row"}>
                  <image
                    src={asset(`/image/afterpay.png`)}
                    loading={"lazy"}
                    width={80}
                    height={18}
                  >
                  </image>
                  <p class={"text-[#616161] text-xs"}>
                    LEARN MORE
                  </p>
                </div>
                <p class={"text-danger text-[13px]"}>
                  Extra 50% Off — Applied in Cart
                </p>
                <image
                  src={asset(`/image/my_element.png`)}
                  loading={"lazy"}
                  width={250}
                  height={51}
                >
                </image>
                <p class={"text-[#616161] text-xs"}>
                  FREE SHIPPING, FREE RETURNS, & AND REWARDS
                </p>
                <a class={"text-[#616161] text-xs uppercase underline"}>
                  JOIN NOW or SIGN IN
                </a>
              </div>
              <ProductSelectorPage page={page} />
              <Buttons page={page} />
              <ProductInfo page={page} />
            </div>
          </div>
          <SliderJS rootId={id}></SliderJS>
        </div>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div>
      <div class={"p-3"}>
        {/* Breadcrumb */}
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
      </div>
      <div>
        <ProductName page={page} />
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
        {/* Image slider */}
        <ul class="carousel carousel-center gap-6">
          {[images[0], images[1] ?? images[0]].map((img, index) => (
            <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
              <Image
                sizes="(max-width: 640px) 100vw, 24vw"
                style={{ aspectRatio: ASPECT_RATIO }}
                src={img.url!}
                alt={img.alternateName}
                width={WIDTH}
                height={HEIGHT}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </li>
          ))}
        </ul>

        {/* Product Info */}
        <div class="px-4 sm:pr-0 sm:pl-6">
          <Price page={page} />
          <ProductSelectorPage page={page} />
          <Buttons page={page} />
          <ProductInfo page={page} />
        </div>
      </div>
    </div>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="container py-0 sm:py-10">
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </div>
  );
}

export default ProductDetails;
