module.exports = {
  title: 'Ethan',
  description: 'There is no royal road to learning.',// 'Just playing around',
  head: [
    ['link', {
      rel: 'icon',
      href: '/logo.png'
    }],
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
    logo: '/logo.png',
    sidebarDepth: 2, // 提取markdown中h2 和 h3 标题，显示在侧边栏上
    lastUpdated: '上次更新',
    // 顶部导航栏
    // 单项 text：显示文字，link：指向链接
    // 这里的'/' 指的是 docs文件夹路径
    // [以 '/' 结尾的默认指向该路径下README.md文件]
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '分类',
        items: [
          {
            text: 'PHP',
            link: '/programming/php/algorithm'
          },
          {
            text: 'Python',
            link: '/programming/python/'
          },
          {
            text: 'Vue',
            link: '/programming/web/vue/'
          },
          {
            text: 'Es6',
            link: '/programming/web/es6/'
          },
          {
            text: 'Web',
            link: '/programming/web/'
          },
          {
            text: 'Server',
            items: [
              {
                text: 'Linux',
                link: '/server/linux/'
              },
              {
                text: 'Docker',
                link: '/server/docker/'
              },
              {
                text: 'Vagrant',
                link: '/server/vagrant/'
              },
              {
                text: 'Mysql',
                link: '/server/mysql/'
              },
            ]
          },
          {
            text: 'Nosql',
            items: [
              {
                text: 'Redis',
                link: '/server/redis/'
              },
              {
                text: 'MongoDB',
                link: '/server/mongo/'
              }
            ]
          },
          {
            text: 'Other',
            items: [
              // {
              //   text: 'Algorithm',
              //   link: '/algorithm/'
              // },
              {
                text: 'HTTP',
                link: '/other/http/'
              },
              {
                text: 'Git',
                link: '/other/git/'
              },
            ]
          },
        ]
      },
      {
        text: '标签',
        link: '/tags/'
      },
      {
        text: '随笔',
        link: '/essay/'
      },
      {
        text: '关于',
        link: '/about/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/JohnMaple'
      }
    ],
    sidebar: {
      '/programming/php/': [
        {
          title: 'PHP',
          children: [
            'algorithm',
            'verify',
            'file_cache',
          ]
        },
      ],
      '/programming/python/': [
        {
          title: 'Python',
          children: [
            '',
          ]
        },
      ],
      '/programming/web/': [
        {
          title: '前端栈',
          children: [
            '',
          ]
        },
      ],
      '/server/': [
        {
          title: 'Linux',
          children: [
            'linux/',
            'linux/nginx',
          ]
        },
        {
          title: 'Docker',
          children: [
            'docker/',
          ]
        },
        {
          title: 'Vagrant',
          children: [
            'vagrant/',
          ]
        },
        {
          title: 'Mysql',
          children: [
            'mysql/',
          ]
        },
        {
          title: 'Redis',
          children: [
            'redis/',
          ]
        },
        {
          title: 'Mongo',
          children: [
            'mongo/',
          ]
        },
      ],
      '/other/': [
        {
          title: 'HTTP',
          children: [
            'http/',
          ]
        },
        {
          title: 'Git',
          children: [
            'git/',
          ]
        }
      ],
      // '/algorithm/': [
      //   {
      //     title: '编程算法',
      //     children: [
      //       '',
      //     ]
      //   },
      // ],
    }
  }
}