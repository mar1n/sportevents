import MSW from "@/providers/msw"
import "globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MSW>
      <Component {...pageProps} />
    </MSW>
  );
}