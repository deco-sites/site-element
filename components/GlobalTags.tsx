import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `          
        @font-face {
              font-family: "Poppins-Medium";
              src: url("${
            asset("/fonts/Poppins-Medium.woff2")
          }") format("woff2");
              font-style: medium;
              font-weight: normal;
        @font-face {
              font-family: "Poppins-Regular";
              src: url("${
            asset("/fonts/Poppins-Regular.woff2")
          }") format("woff2");
              font-style: regular;
              font-weight: normal;
        },
        @font-face {
              font-family: "Poppins-SemiBold";
              src: url("${
            asset("/fonts/Poppins-SemiBold.woff2")
          }") format("woff2");
              font-style: semibold;
              font-weight: normal;
        },
              
              body{
                font-family:'Poppins-Regular'
              }`,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
