module.exports = {
  reactStrictMode: true,
}

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/react',
])

// next.config.js
module.exports = withTM({
  images: {
    domains: ['https://avatars.githubusercontent.com'],
  },
})