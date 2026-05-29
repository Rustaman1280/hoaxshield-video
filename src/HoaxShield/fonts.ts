import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: interFamily } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const FONT_INTER = interFamily;
