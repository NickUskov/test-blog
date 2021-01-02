<template>
  <v-col
          cols="12"
  >
    <v-card height="250" >
      <router-link :to="{ name: 'Post', params: { id: post.id }}">
        <v-card-title :key="user.id" v-if="post.userId == user.id" v-for="user in users">
          {{user.name}}
        </v-card-title>
        <v-card-subtitle>
          {{post.title}}
        </v-card-subtitle>
      </router-link>
      <v-card-text>
        {{post.body}}
      </v-card-text>
    </v-card>
  </v-col>

</template>

<script>
    export default {
        name: "PostItem",
        props: ['post', 'users']
    }
</script>

<style scoped>

</style>