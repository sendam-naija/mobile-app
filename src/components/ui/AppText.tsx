import React from "react";
import {
  Text as RNText,
  type TextProps as RNTextProps,
  type StyleProp,
  type TextStyle,
} from "react-native";

export type AppTextVariant = "header" | "large" | "medium" | "small" | "xs";

export type FontStyle =
  | "SR"
  | "SB"
  | "SSB"
  | "SM"
  | "SL"
  | "SEL"
  | "SEB"
  | "ST"
  | "FR"
  | "FB"
  | "FSB"
  | "FM"
  | "FL"
  | "FEB"
  | "FBL"
  | "FI"
  | "FBI"
  | "FBLI"
  | "FEBI"
  | "FLI"
  | "FMI"
  | "FSBI";

export interface AppTextProps extends RNTextProps {
  variant?: AppTextVariant;
  size?: number | string;
  font?: FontStyle;
  className?: string;
  children?: React.ReactNode;
}

const VARIANT_SIZES: Record<AppTextVariant, string> = {
  header: "text-3xl",
  large: "text-xl",
  medium: "text-base",
  small: "text-sm",
  xs: "text-xs",
};

const VARIANT_FONTS: Record<AppTextVariant, string> = {
  header: "font-SB",
  large: "font-SSB",
  medium: "font-SR",
  small: "font-SR",
  xs: "font-SR",
};

const FONT_CLASSES: Record<FontStyle, string> = {
  SR: "font-SR",
  SB: "font-SB",
  SSB: "font-SSB",
  SM: "font-SM",
  SL: "font-SL",
  SEL: "font-SEL",
  SEB: "font-SEB",
  ST: "font-ST",
  FR: "font-FR",
  FB: "font-FB",
  FSB: "font-FSB",
  FM: "font-FM",
  FL: "font-FL",
  FEB: "font-FEB",
  FBL: "font-FBL",
  FI: "font-FI",
  FBI: "font-FBI",
  FBLI: "font-FBLI",
  FEBI: "font-FEBI",
  FLI: "font-FLI",
  FMI: "font-FMI",
  FSBI: "font-FSBI",
};

const SIZE_CLASSES: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};

export const AppText: React.FC<AppTextProps> = ({
  variant = "medium",
  size,
  font,
  className = "",
  style,
  children,
  ...props
}) => {
  let sizeClass: string | undefined;
  let inlineSizeStyle: StyleProp<TextStyle>;

  if (size !== undefined) {
    if (typeof size === "number") {
      inlineSizeStyle = { fontSize: size };
    } else if (/^\d+(\.\d+)?(px)?$/.test(size)) {
      inlineSizeStyle = { fontSize: parseFloat(size) };
    } else {
      const cleanSize = size.startsWith("text-") ? size.slice(5) : size;

      if (cleanSize in SIZE_CLASSES) {
        sizeClass = SIZE_CLASSES[cleanSize];
      } else {
        inlineSizeStyle = {
          fontSize: size as unknown as TextStyle["fontSize"],
        };
      }
    }
  } else {
    sizeClass = VARIANT_SIZES[variant];
  }

  const fontClass = font ? FONT_CLASSES[font] : VARIANT_FONTS[variant];
  const combinedClassName = [sizeClass, fontClass, className]
    .filter(Boolean)
    .join(" ")
    .trim();
  const combinedStyle = inlineSizeStyle
    ? style
      ? [inlineSizeStyle, style]
      : inlineSizeStyle
    : style;

  return (
    <RNText className={combinedClassName} style={combinedStyle} {...props}>
      {children}
    </RNText>
  );
};

export default AppText;
