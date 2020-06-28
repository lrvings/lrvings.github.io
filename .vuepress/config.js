module.exports = {
  base: "/",
  markdown: {
    lineNumbers: false,
    externalLinks: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  title: "笔记文档",
  description: "Lrving",
  head: [
    ["link", { rel: "icon", href: "/img/favicon.ico" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "author", content: "lrving" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
  ],
  themeConfig: {
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",
    nav: [
      { text: "主页", link: "/" },
      {
        text: "技术笔记",
        items: [
          // { text: "前端规范", link: "/frontEnd/" },
          // { text: "开发环境", link: "/development/" },
          // { text: "学习文档", link: "/notes/" },
          { text: "前端开发笔记", link: "/docs/web/" },
          { text: "正则表达式", link: "/docs/web/js/regExp" },
          { text: "JS原型", link: "/docs/web/js/prototype" },
          { text: "Vue全家桶学习", link: "/docs/web/vue/vue-base" },
        ],
      },
      { text: "关于", link: "/about/" },
      { text: "Github", link: "https://github.com/lrvings" },
    ],
    sidebar: {
      "/docs/web/": [
        "js/regExp",
        "js/document",
        "js/prototype",
        {
          title: "前端",
          collapsable: true,
          children: [
            // "/docs/web/vue/vue-base",
            // "/docs/web/vue/vue-component",
            // "/docs/web/vue/vue-componentTwo",
            {
              title: "Vue 入门",
              collapsable: true,
              children: [
                "/docs/web/vue/vue-base",
                "/docs/web/vue/vue-component",
                "/docs/web/vue/vue-componentTwo",
              ],
            },
            // "/notes/frontEnd/VueJS组件编码规范",
            // "/notes/frontEnd/vue-cli脚手架快速搭建项目",
            // "/notes/frontEnd/深入理解vue中的slot与slot-scope",
            // "/notes/frontEnd/webpack入门",
          ],
        },
      ]
    },
    sidebarDepth: 6,
    lastUpdated: "Last Updated",
  },
  serviceWorker: true,
};
