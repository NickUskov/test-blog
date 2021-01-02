<template>
  <v-col cols="12">
    <v-card>
      <v-card-title>
        <v-icon size="30" color="primary">
          mdi-email
        </v-icon>
        {{commnet.email}}
      </v-card-title>
      <v-card-subtitle>
        {{commnet.name}}
      </v-card-subtitle>
      <v-card-text>
        {{commnet.body}}
      </v-card-text>
    </v-card>
  </v-col>

</template>

<script>
    export default {
        name: "Comment",
        props:['commnet']
    }
</script>

<style scoped>

</style>