import { css } from "twin.macro"

/*
Font families defined by this CSS:

- "Inter"                  static "traditional" fonts for older web browsers
- "Inter var"              single-axis variable fonts for all modern browsers
- "Inter var experimental" multi-axis variable fonts for modern web browsers

Use like this in your CSS:

  :root { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    :root { font-family: 'Inter var', sans-serif; }
  }

------------------------- static ------------------------- */
const interFonts = (fontsCDN: string) => css`
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-Thin.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-Thin.woff") format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 100;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-ThinItalic.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-ThinItalic.woff") format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-ExtraLight.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-ExtraLight.woff") format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 200;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-ExtraLightItalic.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-ExtraLightItalic.woff") format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-Light.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-Light.woff") format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-LightItalic.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-LightItalic.woff") format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-Regular.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-Regular.woff") format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-Italic.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-Italic.woff") format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-Medium.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-Medium.woff") format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-MediumItalic.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-MediumItalic.woff") format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-SemiBold.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-SemiBold.woff") format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-SemiBoldItalic.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-SemiBoldItalic.woff") format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-Bold.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-Bold.woff") format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-BoldItalic.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-BoldItalic.woff") format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-ExtraBold.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-ExtraBold.woff") format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 800;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-ExtraBoldItalic.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-ExtraBoldItalic.woff") format("woff");
  }

  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-Black.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-Black.woff") format("woff");
  }
  @font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-BlackItalic.woff2") format("woff2"),
      url("${fontsCDN}/Inter/Inter-BlackItalic.woff") format("woff");
  }

  /* ----------------------- variable ----------------------- */

  @font-face {
    font-family: "Inter var";
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-roman.var.woff2") format("woff2");
    font-named-instance: "Regular";
  }

  @font-face {
    font-family: "Inter var";
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-italic.var.woff2") format("woff2");
    font-named-instance: "Italic";
  }

  /* ----------- experimental multi-axis variable -----------

Slant axis is not yet widely supported (as of February 2019) and thus this
multi-axis single-file variable font is opt-in rather than the default.
When using this, you will likely need to set font-variation-settings explicitly, e.g:
  * { font-variation-settings: "slnt" 0deg }
  .italic { font-variation-settings: "slnt" 10deg }
*/

  @font-face {
    font-family: "Inter var experimental";
    font-style: oblique 0deg 10deg;
    font-weight: 100 900;
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter.var.woff2") format("woff2");
  }

  /* Legacy name (became legacy on Feb 2, 2019) */
  @font-face {
    font-family: "Inter var alt";
    font-weight: 100 900;
    font-style: normal;
    font-named-instance: "Regular";
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-roman.var.woff2") format("woff2");
  }
  @font-face {
    font-family: "Inter var alt";
    font-weight: 100 900;
    font-style: italic;
    font-named-instance: "Italic";
    font-display: swap;
    src: url("${fontsCDN}/Inter/Inter-italic.var.woff2") format("woff2");
  }
`

export default interFonts
