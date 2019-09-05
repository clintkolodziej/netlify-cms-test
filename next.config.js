module.exports = {
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.md$/,
                use: 'raw-loader'
                //use: 'frontmatter-markdown-loader'
            }
        )
        return config;
    }
}