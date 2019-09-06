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

        //
        // Set up static paths
        //

        const paths = {
          '/': { page: '/' },
          //'/about': { page: '/about' }
        };

        //
        // Set up dynamic paths: post/[pid]
        //

        let posts = getPosts();

        logWithDescription(posts, "Registered content slugs for posts");

        posts.forEach(post => {
          paths[`/post/${post.slug}`] = { page: '/post/[pid]', query: { pid: post.slug } };
        });

        //
        // Return the resulting path list
        //

        logWithDescription(paths, "Paths being registered");

        return paths;

    }
}

function getPosts() {

    const directoryPath = path.join(__dirname, 'content');

    let mdFiles = fs.readdirSync(directoryPath).filter(file => {
        return file.match(/\.md$/);
    });

    logWithDescription(mdFiles, "Markdown files in 'content' directory");

    let posts = mdFiles.map((key, index) => {

        // Create slug from filename
        const slug = key.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');

        return {
            slug
        };

    });

    return posts;

}

function logWithDescription(obj, description) {

    console.log("");
    console.log(description + ":");
    console.log(obj);

}