<template>
  <FabBtnMenu>
    <v-btn fab dark color="green" @click="$emit('vote')">
      <v-icon>mdi-ballot-outline</v-icon>
    </v-btn>
    <v-btn fab dark color="indigo" @click="$emit('chat')">
      <v-icon>mdi-chat-outline</v-icon>
    </v-btn>
  </FabBtnMenu>
</template>

<script>
import FabBtnMenu from "@/components/FabBtnMenuComponent";

export default {
  name: "FabBtnMenuLayer",
  components: {
    FabBtnMenu,
  },
}
</script>