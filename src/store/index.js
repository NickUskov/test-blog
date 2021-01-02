import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        users: [],
        comments: []
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
                    context.dispatch('fetchComments')
                })
        },
        fetchComments(context) {
            axios.get('https://jsonplaceholder.typicode.com/comments')
                .then(res => {
                    context.commit('setComments', res.data)
                    context.commit('addCommentsToPosts')
                })
        }
    },
    modules: {}
})
