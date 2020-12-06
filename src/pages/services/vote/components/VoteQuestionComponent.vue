<template>
  <v-container fluid>
    <v-text-field
      v-model="data"
      placeholder="Укажите вопрос"
      hide-details
      append-outer-icon="mdi-delete-outline"
      @change="changeQuestion"
      @click:append-outer="delQuestion" />
  </v-container>
</template>

<script>
export default {
  name: "VoteQuestionComponent",
  props: ["question"],
  data() {
    return {
      data: null
    };
  },
  methods: {
    changeQuestion() {
      this.$emit("change", { id: this.question.id, body: this.data });
    },
    delQuestion() {
      this.$emit("delete", this.question);
    },
  },
};
</script>