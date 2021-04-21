const path = require('path')

const withImages = require('next-images')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, './src', 'styles')]
  },
  images: {
    domains: ['storage.googleapis.com']
  },
  withImage: withImages({
    esModule: true
  })
}
