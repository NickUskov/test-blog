<template>
  <v-container>
    <v-row>
      <PostItem v-for="post in posts"
                :key="post.id"
                :post="post"
                :users="users"/>
    </v-row>
  </v-container>
</template>

<script>

    import PostItem from "../components/PostItem";

    export default {
        name: 'Home',
        components: {PostItem},
        data: () => {
            return {}
        },
        computed: {
            posts() {
                return this.$store.getters.posts
            },
            users() {
                return this.$store.state.users
            }
        },
    }
</script>
