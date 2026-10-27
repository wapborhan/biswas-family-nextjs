// app/metadata.js

export const siteMetadata = {
  metadataBase: new URL("https://family.wapborhan.com"),

  title: {
    default: "Biswas Family | Family Tree & Heritage",
    template: "%s | Biswas Family",
  },

  description:
    "Explore the Biswas Family tree, family history, heritage, relationships, traditions, and cultural roots in Bangladesh.",

  applicationName: "Biswas Family",

  keywords: [
    "Biswas Family",
    "Biswas family tree",
    "Biswas family history",
    "family tree Bangladesh",
    "family heritage",
    "family relationships",
    "Bangladesh family history",
  ],

  authors: [{ name: "Borhan Uddin" }],
  creator: "Borhan Uddin",
  publisher: "Borhan Uddin",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Biswas Family",
    title: "Biswas Family | Family Tree & Heritage",
    description:
      "Discover the Biswas Family tree, family history, relationships, and heritage in Bangladesh.",
    images: [
      {
        url: "/screenshot.jpg",
        width: 1200,
        height: 630,
        alt: "Biswas Family tree and heritage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Biswas Family | Family Tree & Heritage",
    description:
      "Explore the Biswas Family tree, family history, and heritage in Bangladesh.",
    images: ["/screenshot.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  category: "family",
};
