<template>
  <div>
    <section id="form">
      <!--form-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4 col-sm-offset-1">
            <div class="login-form">
              <!--login form-->
              <h2>Login to your account</h2>
              <div v-if="detailsLogin.successLogin" class="alert alert-success">
                {{ detailsLogin.successLogin }}
              </div>
              <div v-if="detailsLogin.errorsLogin.length > 0">
                <div
                  v-for="(error, index) in detailsLogin.errorsLogin"
                  :key="index"
                  class="alert alert-danger"
                >
                  {{ error }}
                </div>
              </div>
              <form @submit.prevent="postLogin">
                <input
                  type="email"
                  placeholder="Email Address"
                  v-model="detailsLogin.emailLogin"
                />
                <input
                  type="password"
                  placeholder="Password"
                  v-model="detailsLogin.passLogin"
                />
                <span>
                  <input type="checkbox" class="checkbox" />
                  Keep me signed in
                </span>
                <button type="submit" class="btn btn-default">Login</button>
              </form>

              <!-- <div>
                <p>{{ id_token }}</p>
                <p>{{ id_email }}</p>
              </div> -->
            </div>
            <!--/login form-->
          </div>
          <div class="col-sm-1">
            <h2 class="or">OR</h2>
          </div>
          <div class="col-sm-4">
            <div class="signup-form">
              <!--sign up form-->
              <h2>New User Signup!</h2>
              <div
                v-if="detailsRegister.successRegister"
                class="alert alert-success"
              >
                {{ detailsRegister.successRegister }}
              </div>
              <div v-if="detailsRegister.errorsRegister.length > 0">
                <div
                  v-for="(error, index) in detailsRegister.errorsRegister"
                  :key="index"
                  class="alert alert-danger"
                >
                  {{ error }}
                </div>
              </div>
              <form @submit.prevent="postRegister">
                <input
                  type="text"
                  placeholder="First Name"
                  v-model="detailsRegister.firstnameRegister"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  v-model="detailsRegister.lastnameRegister"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  v-model="detailsRegister.emailRegister"
                />
                <input
                  type="password"
                  placeholder="Password"
                  v-model="detailsRegister.passRegister"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  v-model="detailsRegister.confirmPassRegister"
                />
                <button type="submit" class="btn btn-default">Signup</button>
              </form>
            </div>
            <!--/sign up form-->
          </div>
        </div>
      </div>
    </section>
    <!--/form-->
  </div>
</template>

<script>
import { userLogin, saveTokenData, userRegister } from "../common/service";
import { saveToken } from "../common/jwttoken";
import { saveTokenProfile } from "../common/jwtprofile";

import store from "../store/store";
import * as type from "../store/types";
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      passRegex: /^[a-zA-Z0-9]{8,12}$/,
      nameRegex: /^[a-zA-Z]+$/,

      detailsLogin: {
        emailLogin: null,
        passLogin: null,
        errorsLogin: [],
        successLogin: null,
      },

      detailsRegister: {
        firstnameRegister: null,
        lastnameRegister: null,
        emailRegister: null,
        passRegister: null,
        confirmPassRegister: null,
        errorsRegister: [],
        successRegister: null,
      },
    };
  },
  computed: mapState({
    id_token: (state) => state.id_token,
    id_email: (state) => state.id_email,
  }),
  methods: {
    postLogin() {
      // event.preventDefault();
      // alert(this.emailLogin + "\n" + this.passLogin);
      this.detailsLogin.errorsLogin = [];
      this.detailsLogin.successLogin = "";
      if (!this.detailsLogin.emailLogin) {
        this.detailsLogin.errorsLogin.push("Email is required");
      }

      if (!this.detailsLogin.passLogin) {
        this.detailsLogin.errorsLogin.push("Password is required");
      } else if (!this.passRegex.test(this.detailsLogin.passLogin)) {
        this.detailsLogin.errorsLogin.push(
          "Password should be alphanumeric and between 8-12 chars"
        );
      }

      if (this.detailsLogin.errorsLogin.length == 0) {
        let formData = {
          email: this.detailsLogin.emailLogin,
          password: this.detailsLogin.passLogin,
        };

        userLogin(formData)
          .then((res) => {
            // console.log(res.data);
            saveToken(res.data.access_token);
            this.successLogin = res.data.msg;

            store.dispatch({
              type: type.GET_ID_TOKEN,
              id_token: res.data.access_token,
            });

            saveTokenData(res.data.access_token).then((res) => {
              // console.log(res.data);
              saveTokenProfile(res.data.email);

              store.dispatch({
                type: type.GET_ID_EMAIL,
                id_email: res.data.email,
              });
            });

            // alert(res.data.msg);
            this.$swal(
              "Success!",
              "You have been logged in successfully.",
              "success"
            );
            this.$router.push("/").catch(() => {});
          })
          .catch((error) => {
            this.$swal("Oops!", "Something went wrong.", "error");
            if (error.response) {
              if (error.response.status == 401) {
                console.log(error.response.data.error);
                this.detailsLogin.errorsLogin.push(error.response.data.error);
              }
              if (error.response.status == 422) {
                if (error.response.data.email) {
                  console.log(error.response.data.email[0]);
                  this.detailsLogin.errorsLogin.push(
                    error.response.data.email[0]
                  );
                }
                if (error.response.data.password) {
                  console.log(error.response.data.password[0]);
                  this.detailsLogin.errorsLogin.push(
                    error.response.data.password[0]
                  );
                }
              }
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            // console.log("Something went wrong " + error);
          });
      }
    },
    postRegister() {
      this.detailsRegister.errorsRegister = [];
      this.detailsRegister.successRegister = "";
      if (!this.detailsRegister.firstnameRegister) {
        this.detailsRegister.errorsRegister.push("First name is required");
      } else if (!this.nameRegex.test(this.detailsRegister.firstnameRegister)) {
        this.detailsRegister.errorsRegister.push(
          "First name should be alphanumeric"
        );
      }

      if (!this.detailsRegister.lastnameRegister) {
        this.detailsRegister.errorsRegister.push("Last name is required");
      } else if (!this.nameRegex.test(this.detailsRegister.lastnameRegister)) {
        this.detailsRegister.errorsRegister.push(
          "Last name should be alphanumeric"
        );
      }

      if (!this.detailsRegister.emailRegister) {
        this.detailsRegister.errorsRegister.push("Email is required");
      }

      if (!this.detailsRegister.passRegister) {
        this.detailsRegister.errorsRegister.push("Password is required");
      } else if (!this.passRegex.test(this.detailsRegister.passRegister)) {
        this.detailsRegister.errorsRegister.push(
          "Password should be alphanumeric and between 8-12 chars"
        );
      }

      if (!this.detailsRegister.confirmPassRegister) {
        this.detailsRegister.errorsRegister.push(
          "Confirm password is required"
        );
      } else if (
        this.detailsRegister.confirmPassRegister !=
        this.detailsRegister.passRegister
      ) {
        this.detailsRegister.errorsRegister.push("Password don't match");
      }

      if (this.detailsRegister.errorsRegister.length == 0) {
        // alert("Okay fine. But this is as far you can go. XD");
        let formData = {
          firstname: this.detailsRegister.firstnameRegister,
          lastname: this.detailsRegister.lastnameRegister,
          email: this.detailsRegister.emailRegister,
          password: this.detailsRegister.passRegister,
          password_confirmation: this.detailsRegister.confirmPassRegister,
        };

        console.log(formData);
        userRegister(formData)
          .then((res) => {
            this.successRegister = res.data.Message;
            // alert(res.data.Message);

            //Automatic login
            let loginData = {
              email: this.detailsRegister.emailRegister,
              password: this.detailsRegister.passRegister,
            };

            userLogin(loginData).then((res) => {
              // console.log(res.data);
              saveToken(res.data.access_token);
              this.successLogin = res.data.msg;

              store.dispatch({
                type: type.GET_ID_TOKEN,
                id_token: res.data.access_token,
              });

              saveTokenData(res.data.access_token).then((res) => {
                // console.log(res.data);
                saveTokenProfile(res.data.email);

                store.dispatch({
                  type: type.GET_ID_EMAIL,
                  id_email: res.data.email,
                });
              });

              // alert(res.data.msg);
              this.$swal(
                "Success!",
                "You have been logged in successfully.",
                "success"
              );
              this.$router.push("/").catch(() => {});
            });
          })
          .catch((error) => {
            this.$swal("Oops!", "Something went wrong.", "error");
            console.log(error);
            alert("We failed");
          });
      }
    },
  },
};
</script>

<style></style>
