/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://washfun.vercel.app",
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