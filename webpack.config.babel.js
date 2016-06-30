import {join} from 'path'

const include = join(__dirname, 'src')

export default {
  entry: './src/json-truncate',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'json-truncate'
  },
  devtools: 'source-map',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', include},
      {test: /\.json$/, loader: 'babel', include}
    ]
  }
}
