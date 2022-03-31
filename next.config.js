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
    domains: ['127.0.0.1:8000']
  },
})