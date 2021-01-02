import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        users: [],
        comments: [],
        post: null
    },
    getters: {
        posts: state => {
            return state.posts
        },
        getPostById: state => postId => {
            return state.posts.find(post => post.id === postId)
        }
    },
    mutations: {
        setPost(state, payload) {
          state.post = payload
        },
        setPosts(state, payload) {
            state.posts = payload
        },
        setUsers(state, payload) {
            state.users = payload
        },
        setComments(state, payload) {
            state.comments = payload
        },
        addUsersToPosts(state) {
            state.posts.forEach(post => {
                let user = state.users.find(user => user.id == post.userId)
                post.user = user
            })
        },
        addCommentsToPosts(state) {
            state.posts.forEach(post => {
                post.comments = state.comments.filter(comm => comm.postId == post.id)
            })
        }
    },
    actions: {
        fetchPostById(context, postId) {
            let post = null
            this.post = axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(res => {
                    post = res.data
                    axios.get(`https://jsonplaceholder.typicode.com/users/${res.data.id}`)
                        .then(res =>  {
                            post.user = res.data
                            axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                                .then(res => {
                                    post.comments = res.data
                                    context.commit('setPost', post)
                                })
                        })
                })
        },
        fetchPosts(context) {
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(res => {
                    context.commit('setPosts', res.data)
                    context.dispatch('fetchUsers')
                })
        },
        fetchUsers(context) {
            axios.get('https://jsonplaceholder.typicode.com/users')
                .then(res => {
                    context.commit('setUsers', res.data)
                    context.commit('addUsersToPosts')
                    // context.dispatch('fetchComments')
                })
        },
    },
    modules: {}
})
