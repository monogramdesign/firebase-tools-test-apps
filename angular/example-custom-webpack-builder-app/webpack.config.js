const webpack = require('webpack');

module.exports = {
  // Add custom plugins
  plugins: [
    // Example: Define environment variables
    new webpack.DefinePlugin({
      'process.env.CUSTOM_VAR': JSON.stringify(process.env.CUSTOM_VAR || 'default-value')
    })
  ],

  // Add custom rules or modify existing ones
  module: {
    rules: [
      // Example: Add support for additional file types
      // {
      //   test: /\.md$/,
      //   use: 'raw-loader'
      // }
    ]
  },

  // Add custom resolve configuration
  resolve: {
    // Example: Add custom aliases
    alias: {
      // '@shared': path.resolve(__dirname, 'src/shared')
    }
  },

  // Optimization settings
  optimization: {
    // Add custom optimization rules here
  }
};
