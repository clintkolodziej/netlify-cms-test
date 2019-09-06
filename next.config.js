const path = require('path');
const fs = require('fs');

module.exports = {
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.md$/,
                use: 'raw-loader'
            }
        )
        return config;
    },

    exportPathMap: async function() {

        const paths = {
          '/': { page: '/' },
          //'/about': { page: '/about' }
        };

        const directoryPath = path.join(__dirname, 'content');

        let mdFiles = fs.readdirSync(directoryPath).filter(file => {
            return file.match(/\.md$/);
        });

        console.log("");
        console.log("Markdown files in 'content' directory: ");
        console.log(mdFiles);
        console.log("");

        let posts = mdFiles.map((key, index) => {

            // Create slug from filename
            const slug = key.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');

            return {
                slug
            };

        });

        console.log("Registered content slugs for posts: ");
        console.log(posts);
        console.log("");
    
        posts.forEach(post => {
          paths[`/post/${post.slug}`] = { page: '/post/[pid]', query: { pid: post.slug } };
        });

        console.log("Paths being registered: ");
        console.log(paths);
        console.log("");

        return paths;
      }
}