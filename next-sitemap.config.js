/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://www.lifedivergence.com",
  changefreq: "daily",
  generateRobotsTxt: true,
  priority: 1,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/inquiry",
          "/term-of-service",
          "/terms-of-digital",
          "/terms-of-location",
          "/terms-of-privacy",
          "/privacy-policy",
        ],
      },
    ],
  },
};
