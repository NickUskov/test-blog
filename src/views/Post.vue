<template>
  <v-container v-if="post" >
    <v-row>
      <v-col>
        <h2>Информация о посте</h2>
      </v-col>
      <v-col :cols="12">
        <v-card>
          <v-card-title>
            <router-link to="/">
              Вернуться назад
            </router-link>
          </v-card-title>
          <v-card-title>
            {{post.title}}
          </v-card-title>
          <v-card-title>
            <v-avatar size="56">
              <img
                      alt="user"
                      src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              >
            </v-avatar>
            <span class="ml-5">{{post.user.name}}</span>
          </v-card-title>
          <v-card-text>
            {{post.body}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col>
        <h2>Комментарии</h2>
      </v-col>
      <Comment :key="com.id" v-for="com in post.comments" :commnet="com"></Comment>
    </v-row>
  </v-container>

</template>

<script>
    // @ is an alias to /src

    import Comment from "../components/Comment";

    export default {
        name: 'Post',
        data: () => {
            return {
            }
        },
        components: {Comment},
        mounted() {
            this.$store.dispatch('fetchPostById', this.$route.params.id)
        },
        computed: {
            post() {
                return this.$store.state.post
            }
        },
    }
</script>