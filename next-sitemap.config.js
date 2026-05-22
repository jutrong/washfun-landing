/** @type {import('next-sitemap').IConfig} */

const SITE_URL = "https://www.lifedivergence.com";

module.exports = {
  siteUrl: SITE_URL,
  changefreq: "weekly",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  priority: 0.7,
  exclude: [
    "/inquiry",
    "/inquiry/*",
    "/term-of-service",
    "/terms-of-service",
    "/terms-of-service-kiosk",
    "/terms-of-privacy",
    "/terms-of-privacy-kiosk",
    "/terms-of-digital",
    "/terms-of-location",
    "/terms-of-location/*",
    "/privacy-policy",
  ],
  transform: async (config, path) => {
    const priorityMap = {
      "/": 1.0,
      "/consulting": 0.95,
      "/consulting/start-business": 0.9,
      "/consulting/self-wash": 0.9,
      "/consulting/auto-wash": 0.9,
      "/consulting/remodeling": 0.9,
      "/consulting/system": 0.9,
      "/consulting/operations": 0.9,
      "/service": 0.85,
      "/contact": 0.85,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap[path] ?? 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async () => [
    { loc: "/" },
    { loc: "/consulting" },
    { loc: "/consulting/start-business" },
    { loc: "/consulting/self-wash" },
    { loc: "/consulting/auto-wash" },
    { loc: "/consulting/remodeling" },
    { loc: "/consulting/system" },
    { loc: "/consulting/operations" },
    { loc: "/service" },
    { loc: "/contact" },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/inquiry",
          "/term-of-service",
          "/terms-of-service",
          "/terms-of-service-kiosk",
          "/terms-of-privacy",
          "/terms-of-privacy-kiosk",
          "/terms-of-digital",
          "/terms-of-location",
          "/privacy-policy",
        ],
      },
    ],
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
  },
};
