import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
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
        //this.props.history.push({ pathname: '/posts/' + id});
        this.props.history.push('/posts/' + id);

        console.log('\n\n\nPost is ' + id + '\n\n\n');


    }

    render() {

        let posts = <p style={{ textAlign: 'center' }}>Something is going to wrong</p>

        if (!(this.state.posts.length > 0)) {
            posts = <p style={{ textAlign: 'center' }}>Loading..</p>
        }

        if (!this.state.error && (this.state.posts.length > 0)) {
            posts = this.state.posts.map(post => {
                return (
                    //<Link to={'/posts/' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                    //</Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;