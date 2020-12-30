<template>
  <v-container fluid>
    {{ message.body.text }}
  </v-container>
</template>

<script>
export default {
  name: "MessageBlockComponent",
  props: ["message"],
}
</script>