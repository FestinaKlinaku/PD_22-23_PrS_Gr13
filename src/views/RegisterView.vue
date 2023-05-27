<template>
  <div class="wrapper">
    <div class="register">
      <h2 class="register_title">Register</h2>
      <form
        class="register_form"
        action="http://localhost:3000/register"
        method="POST"
      >
        <div class="register_group">
          <baseInput
            id="username"
            name="name"
            label="Username"
            type="text"
            placeholder="Enter your username"
            v-model="userForm.username"
            :applyErrorClass="$v.userForm.username.$error"
            @blur="$v.userForm.username.$touch()"
          ></baseInput>
          <template v-if="$v.userForm.username.$error">
            <p class="error-msg" v-if="!$v.userForm.username.required">
              Username is required
            </p>
          </template>
        </div>
        <div class="register_group">
          <baseInput
            id="email"
            name="email"
            label="Email"
            type="text"
            placeholder="Enter your email"
            v-model="userForm.email"
            :applyErrorClass="$v.userForm.email.$error"
            @blur="$v.userForm.email.$touch()"
          ></baseInput>
          <template v-if="$v.userForm.email.$error">
            <p class="error-msg" v-if="!$v.userForm.email.required">
              Email is required
            </p>
            <p class="error-msg" v-if="!$v.userForm.email.email">
              Not a valid email
            </p>
          </template>
        </div>
        <div class="register_group">
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
        <div class="register_group">
          <baseButton
            type="submit"
            buttonClass="button--primary register_button"
            :disabled="$v.$anyError"
            >SIGN UP</baseButton
          >
          <p v-if="$v.$anyError" class="error-msg">
            Please fill out the required field(s).
          </p>
        </div>
      </form>
      <div class="register_question">
        <span class="register_span">Already have an account? </span>
        <router-link class="register_link" to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import baseInput from "@/components/baseInput/baseInput.vue";
import baseButton from "@/components/baseButton/baseButton.vue";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  components: {
    baseInput,
    baseButton,
  },
  data() {
    return {
      userForm: {
        username: "",
        email: "",
        password: "",
      },
      isSubmitted: false,
    };
  },
  validations() {
    return {
      userForm: {
        username: {
          required,
        },
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
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/registerView.scss";
</style>
