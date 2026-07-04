import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "model-viewer": DetailedHTMLProps<
          HTMLAttributes<HTMLElement> & {
            src?: string;
            "ios-src"?: string;
            iosSrc?: string;
            ar?: boolean | "";
            "ar-modes"?: string;
            "camera-controls"?: boolean | "";
            "auto-rotate"?: boolean | "";
            "shadow-intensity"?: string;
            exposure?: string;
            "environment-image"?: string;
            poster?: string;
            alt?: string;
          },
          HTMLElement
        >;
      }
    }
  }
}

export {};