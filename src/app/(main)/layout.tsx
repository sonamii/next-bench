import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import {
  baseURL,
  meta,
  fonts,
  effects,
  style,
  dataStyle,
} from "@/resources/once-ui.config";
import {
  Meta,
  Schema,
  Column,
  Flex,
  opacity,
  SpacingToken,
  Background,
} from "@once-ui-system/core";
import { Providers } from "../../components/Providers";

export async function generateMetadata() {
  return Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    canonical: meta.home.canonical,
    image: meta.home.image,
    robots: meta.home.robots,
    alternates: meta.home.alternates,
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable
      )}
      data-theme="light"
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={meta.home.title}
        description={meta.home.description}
        path={meta.home.path}
      />
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
          const root = document.documentElement;
          
          // Set defaults from config
          const config = ${JSON.stringify({
            theme: "light",
            brand: style.brand,
            accent: style.accent,
            neutral: style.neutral,
            solid: style.solid,
            "solid-style": style.solidStyle,
            border: style.border,
            surface: style.surface,
            transition: style.transition,
            scaling: style.scaling,
            "viz-style": dataStyle.variant,
          })};
          
          // Force theme to light
          root.setAttribute('data-theme', 'light');
          localStorage.setItem('data-theme', 'light');
          localStorage.setItem('theme', 'light');
          
          // Apply default values
          Object.entries(config).forEach(([key, value]) => {
            root.setAttribute('data-' + key, value);
          });

          // Apply any saved style overrides except theme
          const styleKeys = Object.keys(config).filter(key => key !== 'theme');
          styleKeys.forEach(key => {
            const value = localStorage.getItem('data-' + key);
            if (value) {
              root.setAttribute('data-' + key, value);
            }
          });
            } catch (e) {
          console.error('Failed to initialize theme:', e);
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('data-theme', 'light');
          localStorage.setItem('theme', 'light');
            }
          })();
        `,
          }}
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <Providers>
        <Column as="body" background="page" fillWidth margin="0" padding="0">
          {/* <Background
            position="absolute"
            mask={{
              x: effects.mask.x,
              y: effects.mask.y,
              radius: effects.mask.radius,
              cursor: effects.mask.cursor,
            }}
            gradient={{
              display: effects.gradient.display,
              opacity: effects.gradient.opacity as opacity,
              x: effects.gradient.x,
              y: effects.gradient.y,
              width: effects.gradient.width,
              height: effects.gradient.height,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
            }}
            dots={{
              display: effects.dots.display,
              opacity: effects.dots.opacity as opacity,
              size: effects.dots.size as SpacingToken,
              color: effects.dots.color,
            }}
            grid={{
              display: effects.grid.display,
              opacity: effects.grid.opacity as opacity,
              color: effects.grid.color,
              width: effects.grid.width,
              height: effects.grid.height,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity as opacity,
              size: effects.lines.size as SpacingToken,
              thickness: effects.lines.thickness,
              angle: effects.lines.angle,
              color: effects.lines.color,
            }}
          /> */}
          {children}
        </Column>
      </Providers>
    </Flex>
  );
}
