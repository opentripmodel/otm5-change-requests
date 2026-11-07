import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "Open Trip Model",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://opentripmodel.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/documentation/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "opentripmodel", // Usually your GitHub org/user name.
  projectName: "documentation", // Usually your repo name.
  deploymentBranch: "main",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  themes: ["docusaurus-theme-openapi-docs", "@docusaurus/theme-mermaid"],

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          includeCurrentVersion: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  // plugins: [
  //   // We introduce a second Docusaurus docs content to publish the generated API docs
  //   [
  //     "@docusaurus/plugin-content-docs",
  //     {
  //       id: "api",
  //       path: "api-docs",
  //       routeBasePath: "api",
  //       docItemComponent: "@theme/ApiItem",
  //       // sidebarPath: './sidebarsCommunity.js',
  //       // ... other options
  //     },
  //   ],
  //   // The plugin below generates the API docs
  //   // Run `yarn docusaurus gen-api-docs all` to generate to the specified output dir 'api-docs'
  //   // The docs plugin above will serve those generated docs
  //   [
  //     "docusaurus-plugin-openapi-docs",
  //     {
  //       id: "api",
  //       docsPluginId: "classic",
  //       config: {
  //         otm: {
  //           specPath: "api/otm-api-v5.6.yaml",
  //           hideSendButton: true,
  //           showExtensions: false,
  //           outputDir: "api-docs",
  //           sidebarOptions: {
  //             groupPathsBy: "tagGroup",
  //           },
  //         } satisfies OpenApiPlugin.Options,
  //       },
  //     },
  //   ],
  // ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/logo-otm.png",
    navbar: {
      logo: {
        alt: "Open Trip Model",
        src: "img/logo-otm.png",
      },
      items: [
        {
          to: "/",
          label: "About",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
        },
        {
          type: "docSidebar",
          sidebarId: "docSidebar",
          position: "left",
          label: "Documentation",
        },
        { to: "/docs/profiles/", label: "OTM Profiles", position: "left" },
        { to: "/api", label: "API", position: "left" },
        { to: "/docs/developers/", label: "Developers", position: "left" },
        // { to: "/blog", label: "Blog", position: "left" },
        { to: "/adopters", label: "Adopters & contributors", position: "left" },
        {
          href: "https://sutc.semantic-treehouse.nl/",
          label: "STH",
          position: "right",
        },
        {
          href: "https://github.com/opentripmodel",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.sutc.nl/",
          label: "SUTC",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} SUTC`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
