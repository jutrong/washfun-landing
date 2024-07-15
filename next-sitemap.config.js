/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://www.lifedivergence.com",
  changefreq: "yearly",
  generateRobotsTxt: true,
  priority: 1,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
