import React, { Component } from 'react';

import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';

class Posts extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false

    }

    componentDidMount() {
        console.log(this.props);

        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 8);
                const updatedPost = posts.map(post => {
                    return {
                        ...post,
                        author: 'MAX'
                    }
                });

                this.setState({ posts: updatedPost });
                //console.log(response);
            })
            .catch(error => {
                //console.log(error);
                this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {

        let posts = <p style={{ textAlign: 'center' }}>Something is going to wrong</p>

        if (!(this.state.posts.length > 0)) {
            posts = <p style={{ textAlign: 'center' }}>Loading..</p>
        }

        if (!this.state.error && (this.state.posts.length > 0)) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;