<template>
  <div class="login">
    <div class="login_container">
      <h2 class="login_title">Login</h2>
      <form class="login_form" @submit.prevent="login">
        <!-- Email input -->
        <div class="login_group">
          <baseInput
            id="email"
            name="email"
            label="Email"
            type="text"
            placeholder="Enter your username or email"
            v-model="userForm.email"
            :applyErrorClass="$v.userForm.email.$error"
            @blur="$v.userForm.email.$touch()"
          ></baseInput>
          <template v-if="$v.userForm.email.$error">
            <p class="error-msg" v-if="!$v.userForm.email.required">
              Email is required
            </p>
          </template>
        </div>

        <!-- Password input -->
        <div class="login_group">
          <baseInput
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="********"
            v-model="userForm.password"
            :applyErrorClass="$v.userForm.password.$error"
            @blur="$v.userForm.password.$touch()"
          ></baseInput>
          <template v-if="$v.userForm.password.$error">
            <p class="error-msg" v-if="!$v.userForm.password.required">
              Password is required
            </p>
            <p class="error-msg" v-if="!$v.userForm.password.min">
              Password should be at least 8 characters long
            </p>
          </template>
        </div>

        <!-- Login button -->
        <div class="login_group">
          <baseButton
            type="submit"
            buttonClass="button--primary login_button"
            :disabled="$v.$anyError"
            >SIGN IN</baseButton
          >
          <p v-if="$v.$anyError" class="error-msg">
            Please fill out the required field(s).
          </p>
        </div>
      </form>

      <!-- Registration link -->
      <div class="login_question">
        <span class="login_span">Don't have an account? </span>
        <router-link class="login_link" to="/register">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import baseInput from "@/components/baseInput/baseInput.vue";
import baseButton from "@/components/baseButton/baseButton.vue";
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  components: {
    baseInput,
    baseButton,
  },
  data() {
    return {
      userForm: {
        email: "",
        password: "",
      },
      isSubmitted: false,
    };
  },
  validations() {
    return {
      userForm: {
        email: {
          required,
          email,
        },
        password: {
          required,
          min: minLength(8),
        },
      },
    };
  },
  methods: {
    ...mapActions("auth", ["authenticateUser"]),
    login() {
      this.isSubmitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      // Retrieve the email and password entered by the user
      const { email, password } = this.userForm;

      // Call the authenticateUser action
      this.authenticateUser({ email, password })
        .then(() => {
          // Authentication successful, navigate to the dashboard
          this.$router.push("/home");
        })
        .catch(() => {
          // Invalid email or password, show an error message
          alert("Invalid email or password");
        });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/loginView.scss";
</style>
