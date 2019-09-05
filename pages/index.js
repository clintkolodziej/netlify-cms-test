import React from 'react'
import matter from 'gray-matter';
import Link from 'next/link';
export default class extends React.Component {
    static async getInitialProps() {
        // Get posts from folder
        const posts = (ctx => {
            //console.log("context", ctx);

            const keys = ctx.keys();
            const values = keys.map(ctx);
            
            const data = keys.map((key, index) => {

                // Create slug from filename
                const slug = key.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
                const value = values[index];

                // Parse document
                const document = matter(value.default);

                return {
                    document,
                    slug
                };

            });

            return data;
            
        })(require.context("../content", true, /\.md$/));

        return {
            posts
        };
    }
    render() {
        return (
            <>
                <h1>Posts: {this.props.posts.slug}</h1>
                {this.props.posts.map(({ document: { data }, slug }) => (
                    <Link 
                      href="/post/[pid]" key={slug}
                      as={`/post/${slug}`}>
                         <a>{data.title}</a>
                    </Link>
                    
                ))}
            </>
        )
    }
}