<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <!-- <div class="col-sm-3">
            <Sidebar />
          </div> -->

          <div class="col-sm-12">
            <!-- <div class="blog-post-area">
              <h2 class="title text-center">Account Information</h2>
              <div class="single-blog-post">
                <h3>Confidential Data</h3>
                <div class="post-meta">
                  <ul>
                    <li><i class="fa fa-user"></i> Mac Doe</li>
                    <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                    <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                  </ul>
                  <span>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half-o"></i>
                  </span>
                </div>
                <a href="">
                  <img src="images/blog/blog-one.jpg" alt="" />
                </a>
                <p>First Name:</p>
                <br />

                <p>Last Name:</p>
                <br />

                <p>Email:</p>
                <br />
                <div class="pager-area">
                  <ul class="pager pull-right">
                    <li><a href="#">Pre</a></li>
                    <li><a href="#">Next</a></li>
                  </ul>
                </div>
              </div>
            </div> -->
            <!--/blog-post-area-->

            <!-- <div class="rating-area">
              <ul class="ratings">
                <li class="rate-this">Rate this item:</li>
                <li>
                  <i class="fa fa-star color"></i>
                  <i class="fa fa-star color"></i>
                  <i class="fa fa-star color"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </li>
                <li class="color">(6 votes)</li>
              </ul>
              <ul class="tag">
                <li>TAG:</li>
                <li>
                  <a class="color" href="">Pink <span>/</span></a>
                </li>
                <li>
                  <a class="color" href="">T-Shirt <span>/</span></a>
                </li>
                <li><a class="color" href="">Girls</a></li>
              </ul>
            </div> -->
            <!--/rating-area-->

            <!-- <div class="socials-share">
              <a href=""><img src="images/blog/socials.png" alt="" /></a>
            </div> -->
            <!--/socials-share-->
            <div class="replay-box">
              <div class="row">
                <div class="col-sm-4">
                  <h2>Account Information</h2>
                  <form>
                    <div class="blank-arrow">
                      <label>First Name</label>
                    </div>
                    <span></span>
                    <input
                      type="text"
                      placeholder="First Name"
                      v-if="computedUserProfile"
                      v-bind:value="computedUserProfile.firstname"
                      readonly
                    />

                    <div class="blank-arrow">
                      <label>Last Name</label>
                    </div>
                    <span></span>
                    <input
                      type="text"
                      placeholder="Last Name"
                      v-if="computedUserProfile"
                      v-bind:value="computedUserProfile.lastname"
                      readonly
                    />

                    <div class="blank-arrow">
                      <label>Email Address</label>
                    </div>
                    <span></span>
                    <input
                      type="email"
                      placeholder="Email"
                      v-if="computedUserProfile"
                      v-bind:value="computedUserProfile.email"
                      readonly
                    />
                  </form>
                </div>

                <div class="col-sm-8">
                  <h2>Change Password</h2>

                  <div
                    v-if="detailsUpdatePassword.successUpdatePassword"
                    class="alert alert-success"
                  >
                    {{ detailsUpdatePassword.successUpdatePassword }}
                  </div>
                  <div
                    v-if="detailsUpdatePassword.errorsUpdatePassword.length > 0"
                  >
                    <div
                      v-for="(
                        error, index
                      ) in detailsUpdatePassword.errorsUpdatePassword"
                      :key="index"
                      class="alert alert-danger"
                    >
                      {{ error }}
                    </div>
                  </div>

                  <form @submit.prevent="updatePasswordForm">
                    <div class="blank-arrow">
                      <label>Current Password</label>
                    </div>
                    <span>*</span>
                    <input
                      type="password"
                      placeholder="Current Password"
                      required
                      v-model="detailsUpdatePassword.originalPassword"
                    />

                    <div class="blank-arrow">
                      <label>New Password</label>
                    </div>
                    <span>*</span>
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      v-model="detailsUpdatePassword.newPassword"
                    />

                    <div class="blank-arrow">
                      <label>Confirm Password</label>
                    </div>
                    <span>*</span>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      v-model="detailsUpdatePassword.confirmPassword"
                    />

                    <button type="submit" class="btn btn-primary">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <!--/Repaly Box-->
            <!-- {{ computedOrderData }} -->
            <div class="media commnets" v-if="computedOrderData">
              <h4>Order History</h4>

              <!-- <a class="pull-left" href="#">
                <img
                  class="media-object"
                  src="images/blog/man-one.jpg"
                  alt=""
                />
              </a> -->
              <template v-for="cod in computedOrderData">
                <div class="media-body" :key="cod.id">
                  <hr />
                  <div class="col-sm-6">
                    <h4 class="media-heading">
                      Total Amount: ${{ cod.order_amount }}
                    </h4>
                    <p>Address: {{ cod.order_address }}</p>
                    <p>Note: {{ cod.order_note }}</p>
                  </div>
                  <div class="col-sm-6">
                    <h4 class="media-heading">Products</h4>
                    <p v-for="gop in cod.get_order_products" :key="gop.id">
                      {{ gop.get_product.product_name }} [x{{
                        gop.product_qty
                      }}]
                    </p>
                  </div>

                  <!-- <div class="blog-socials">
                  <ul>
                    <li>
                      <a href=""><i class="fa fa-facebook"></i></a>
                    </li>
                    <li>
                      <a href=""><i class="fa fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href=""><i class="fa fa-dribbble"></i></a>
                    </li>
                    <li>
                      <a href=""><i class="fa fa-google-plus"></i></a>
                    </li>
                  </ul>
                  <a class="btn btn-primary" href="">Other Posts</a>
                </div> -->

                  <hr />
                </div>
              </template>
            </div>
            <div class="media commnets" v-else>
              <h4>No Order History</h4>
            </div>
            <!--Comments-->
            <!-- <div class="response-area">
              <h2>3 RESPONSES</h2>
              <ul class="media-list">
                <li class="media">
                  <a class="pull-left" href="#">
                    <img
                      class="media-object"
                      src="images/blog/man-two.jpg"
                      alt=""
                    />
                  </a>
                  <div class="media-body">
                    <ul class="sinlge-post-meta">
                      <li><i class="fa fa-user"></i>Janis Gallagher</li>
                      <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                      <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                    </ul>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <a class="btn btn-primary" href=""
                      ><i class="fa fa-reply"></i>Replay</a
                    >
                  </div>
                </li>
                <li class="media second-media">
                  <a class="pull-left" href="#">
                    <img
                      class="media-object"
                      src="images/blog/man-three.jpg"
                      alt=""
                    />
                  </a>
                  <div class="media-body">
                    <ul class="sinlge-post-meta">
                      <li><i class="fa fa-user"></i>Janis Gallagher</li>
                      <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                      <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                    </ul>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <a class="btn btn-primary" href=""
                      ><i class="fa fa-reply"></i>Replay</a
                    >
                  </div>
                </li>
                <li class="media">
                  <a class="pull-left" href="#">
                    <img
                      class="media-object"
                      src="images/blog/man-four.jpg"
                      alt=""
                    />
                  </a>
                  <div class="media-body">
                    <ul class="sinlge-post-meta">
                      <li><i class="fa fa-user"></i>Janis Gallagher</li>
                      <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                      <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                    </ul>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <a class="btn btn-primary" href=""
                      ><i class="fa fa-reply"></i>Replay</a
                    >
                  </div>
                </li>
              </ul>
            </div> -->
            <!--/Response-area-->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  userProfile,
  updatePassword,
  userLogout,
  getOrders,
} from "../common/service";

// import Sidebar from "./Includes/Sidebar.vue";
export default {
  name: "Account",
  data() {
    return {
      userProfileData: {},
      user_id: 2,
      orderData: {},

      detailsUpdatePassword: {
        originalPassword: null,
        newPassword: null,
        confirmPassword: null,
        errorsUpdatePassword: [],
        successUpdatePassword: null,
      },
    };
  },

  methods: {
    fetchUserProfile() {
      let tempUserProfileData = {};
      let id_token = this.id_token;

      userProfile(id_token)
        .then((res) => {
          tempUserProfileData = res.data;
          this.userProfileData = tempUserProfileData;
          this.user_id = tempUserProfileData.id;
          // console.log("one" + this.user_id);
          this.fetchOrderData();
        })
        .catch((error) => {
          console.log(error);
        });

      // this.userProfileData = tempUserProfileData;
    },

    fetchOrderData() {
      // console.log(this.computedUserProfile.id);
      // this.fetchUserProfile();
      let u_id = this.user_id;
      // console.log("Fetch" + u_id);
      getOrders(u_id)
        .then((res) => {
          // console.log(res.data.orders);
          this.orderData = res.data.orders;
        })
        .catch((error) => {
          console.log(error);
        });

      // this.userProfileData = tempUserProfileData;
    },

    updatePasswordForm() {
      this.detailsUpdatePassword.errorsUpdatePassword = [];
      this.detailsUpdatePassword.successUpdatePassword = "";

      if (!this.detailsUpdatePassword.originalPassword) {
        this.detailsUpdatePassword.errorsUpdatePassword.push(
          "Original password is required"
        );
      }
      if (
        this.detailsUpdatePassword.originalPassword.length < 8 ||
        this.detailsUpdatePassword.originalPassword.length > 12
      ) {
        this.detailsUpdatePassword.errorsUpdatePassword.push(
          "Original Password should be between 8-12 chars"
        );
      }

      if (!this.detailsUpdatePassword.newPassword) {
        this.detailsUpdatePassword.errorsUpdatePassword.push(
          "New password is required"
        );
      }
      if (
        this.detailsUpdatePassword.newPassword.length < 8 ||
        this.detailsUpdatePassword.newPassword.length > 12
      ) {
        this.detailsUpdatePassword.errorsUpdatePassword.push(
          "New Password should be between 8-12 chars"
        );
      }

      if (!this.detailsUpdatePassword.confirmPassword) {
        this.detailsUpdatePassword.errorsUpdatePassword.push(
          "Confirm password is required"
        );
      }
      if (
        this.detailsUpdatePassword.confirmPassword.length < 8 ||
        this.detailsUpdatePassword.confirmPassword.length > 12
      ) {
        this.detailsUpdatePassword.errorsUpdatePassword.push(
          "Confirm Password should be between 8-12 chars"
        );
      }

      if (this.detailsUpdatePassword.errorsUpdatePassword.length == 0) {
        let formData = {
          old_password: this.detailsUpdatePassword.originalPassword,
          password: this.detailsUpdatePassword.newPassword,
          password_confirmation: this.detailsUpdatePassword.confirmPassword,
          user_id: this.computedUserProfile.id,
        };

        // console.log(formData);

        updatePassword(formData, this.id_token)
          .then(() => {
            // console.log(res.data);
            userLogout(this.id_token)
              .then(() => {
                this.$store.dispatch("resetSessionState");
              })
              .catch((error) => {
                console.log(error);
                this.$swal("Oops!", "Something went wrong.", "error");
              });

            this.$swal("Success", `Password updated!`, "success");
            this.$router.push("/login").catch(() => {});
          })
          .catch((error) => {
            this.$swal("Oops!", "Something went wrong.", "error");
            if (error.response) {
              if (error.response.status == 401) {
                console.log(error.response.data.error);
                this.detailsUpdatePassword.errorsUpdatePassword.push(
                  error.response.data.error
                );
              }
              if (error.response.status == 422) {
                if (error.response.data.old_password) {
                  console.log(error.response.data.old_password[0]);
                  this.detailsUpdatePassword.errorsUpdatePassword.push(
                    error.response.data.old_password[0]
                  );
                }

                if (error.response.data.password) {
                  console.log(error.response.data.password[0]);
                  this.detailsUpdatePassword.errorsUpdatePassword.push(
                    error.response.data.password[0]
                  );
                }

                if (error.response.data.confirm_password) {
                  console.log(error.response.data.confirm_password[0]);
                  this.detailsUpdatePassword.errorsUpdatePassword.push(
                    error.response.data.confirm_password[0]
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
  },
  components: {
    // Sidebar,
  },

  computed: {
    id_token() {
      return this.$store.getters.id_token;
    },

    computedUserProfile() {
      // console.log("Comp");
      let tempUserProfileData = this.userProfileData;
      // let u_id = this.computedUserId;
      // console.log(u_id);
      // console.log(tempUserProfileData);
      return tempUserProfileData;
    },

    computedOrderData() {
      let od = this.orderData;
      // console.log("Comp");
      console.log(od);
      return od;
    },
  },

  mounted() {
    this.fetchUserProfile();
    this.fetchOrderData();
  },
};
</script>

<style></style>
