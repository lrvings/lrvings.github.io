module.exports = {
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
          { text: "前端开发笔记", link: "/docs/web/" },
          { text: "Vue全家桶学习", link: "/docs/web/vue/" },
          {
            text: "分类2",
            items: [
              { text: "前端规范", link: "/docs/web/" },
              { text: "开发环境", link: "/docs/web/vue/" },
            ]
          },
          {
            text: "分类3",
            items: [
              { text: "学习文档", link: "/docs/web/" },
              { text: "深入理解vue中的slot与slot-scope", link: "/docs/web/vue/" },
            ]
          }
        ]
      },
      { text: "关于", link: "/about/" },
      { text: "Github", link: "https://github.com/lrvings" }
    ],
    sidebar: {
      "/docs/web/": [
        // "js/regExp",
        // "js/document",
        // "js/prototype",
        {
          title: "Vue 全家桶学习笔记",
          collapsable: true,
          children: [
            "/docs/web/vue/vue-base",
            "/docs/web/vue/vue-component",
            "/docs/web/vue/vue-component-advance",
            "/docs/web/vue/vue-Cli",
            "/docs/web/vue/vue-router-base",
            "/docs/web/vue/vuex",
          ],
        },
        {
          title: "Rect 入门",
          collapsable: true,
          children: [],
        },
      ]
    },
    sidebarDepth: 6,
    lastUpdated: "Last Updated",
  },
  serviceWorker: true,
};
