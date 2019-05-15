module.exports = {
  title: 'Evan Hunter',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    // ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          lang = 'zh-CN'
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ]
  ],
  themeConfig: {
    sidebarDepth: 2,  // 提取markdown中h2 和 h3 标题，显示在侧边栏上
    lastUpdated: '上次更新',
    // 顶部导航栏
    // 单项 text：显示文字，link：指向链接
    // 这里的'/' 指的是 docs文件夹路径
    // [以 '/' 结尾的默认指向该路径下README.md文件]
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Programming',
        items: [
          { text: 'PHP', link: '/programming/php/' },
          { text: 'Python', link: '/programming/python/' },
          { text: 'Vue', link: '/programming/vue/' },
          { text: 'Es6', link: '/programming/es6/' },
          { text: 'Web', link: '/programming/web/' },
        ]
      },
      {
        text: 'Algorithm',
        link: 'http://www.baidu.com'
      },
      {
        text: 'Server',
        items: [
          { text: 'HTTP', link: '/server/http/' },
          { text: 'Linux', link: '/server/linux/' },
          { text: 'Docker', link: '/server/docker/' },
          { text: 'Vagrant', link: '/server/vagrant/' },
          { text: 'Mysql', link: '/server/mysql/' },
          {
            text: 'Nosql',
            items: [
              { text: 'Redis', link: '/server/redis/' },
              { text: 'MongoDB', link: '/server/mongo/' }
            ]
          },
          {
            text: 'Other',
            items: [
              { text: 'Git', link: '/server/git/' },
            ]
          },
        ]
      },
      { text: 'Essay', link: '/essay/' },
      { text: 'GitHub', link: 'https://github.com/JohnMaple' }
    ],
    sidebar: {
      '/server/': [
        {
          title: 'HTTP',
          children: [
            'http/',
          ]
        },
        {
          title: 'Linux',
          children: [
            'linux/',
            'linux/nginx',
          ]
        }
      ],
    }
  },
}