const path = require('path')

const withImages = require('next-images')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, './src', 'styles')]
  },
  withImage: withImages({
    esModule: true
  })
}
