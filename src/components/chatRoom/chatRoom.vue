<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>Chatroom</h2>
    </div>
    <div class="chat-messages">
      <ul>
        <li v-for="message in messages" :key="message.id">
          <strong>{{ message.sender }}</strong
          >: {{ message.text }}
        </li>
      </ul>
    </div>
    <div class="chat-input">
      <input
        type="text"
        v-model="newMessage"
        placeholder="Type your message"
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      messages: [],
      newMessage: "",
    };
  },
  methods: {
    ...mapActions("auth", ["authenticateUser"]),
    sendMessage() {
      if (this.newMessage.trim() === "") return;

      const message = {
        id: Date.now(),
        sender: this.loggedInUser ? this.loggedInUser.name : "Unknown",
        text: this.newMessage,
      };

      this.messages.push(message);
      this.newMessage = "";
    },
  },
  computed: {
    ...mapState("auth", ["loggedInUser"]),
  },
};
</script>

<style scoped>
.chat-container {
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.chat-header {
  background-color: #f1f1f1;
  padding: 10px;
}

.chat-header h2 {
  margin: 0;
}

.chat-messages {
  padding: 10px;
  overflow-y: auto;
  height: 300px;
}

.chat-messages ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.chat-messages li {
  margin-bottom: 10px;
}

.chat-input {
  display: flex;
  padding: 10px;
}

.chat-input input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.chat-input button {
  padding: 5px 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #45a049;
}
</style>
