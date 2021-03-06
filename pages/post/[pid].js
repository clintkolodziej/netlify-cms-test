import React from 'react'
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown'

export default class extends React.Component {

    static async getInitialProps({ query }) {

        try{
            let content = await require(`../../content/${query.pid}.md`);

            const document = matter(content.default);

            return {
                ...document
            };
        }
        catch (error) {

            return {};

        }
    }

    render() {

        if (!this.props.data)
            return <div>Post is not found</div>;
            
        return (
            <>

                <h1>{this.props.data.title}</h1>
                <i>{`Written by ${this.props.data.writtenBy} | ${this.props.data.date}`}</i>
                <ReactMarkdown source={this.props.content} />

            </>
        )

    }
}