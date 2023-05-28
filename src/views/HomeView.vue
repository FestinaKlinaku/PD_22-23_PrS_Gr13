<template>
  <div class="home">
    <h1>This is the home page</h1>
    <chatRoom></chatRoom>
  </div>
</template>

<script>
import chatRoom from "../components/chatRoom/chatRoom.vue";
export default {
  name: "HomeView",
  components: {
    chatRoom,
  },
};
</script>
