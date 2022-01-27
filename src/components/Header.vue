<template>
  <header id="header">
    <!--header-->
    <div class="header_top">
      <!--header_top-->
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="contactinfo">
              <ul class="nav nav-pills">
                <li>
                  <a href="#"><i class="fa fa-phone"></i> +1 23 45 67 890</a>
                </li>
                <li>
                  <a href="#"
                    ><i class="fa fa-envelope"></i>
                    info@ecommerceapplication.com</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="social-icons pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <a
                    href="https://www.facebook.com/ClashofClans"
                    target="_blank"
                    ><i class="fa fa-facebook"></i
                  ></a>
                </li>
                <li>
                  <a href="https://twitter.com/pakalupapitow" target="_blank"
                    ><i class="fa fa-twitter"></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header_top-->

    <div class="header-middle">
      <!--header-middle-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div class="logo pull-left">
              <router-link to="/"
                ><img src="/images/home/logo.png" alt=""
              /></router-link>
            </div>
            <!-- <div class="btn-group pull-right">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-default dropdown-toggle usa"
                  data-toggle="dropdown"
                >
                  USA
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a href="#">Canada</a></li>
                  <li><a href="#">UK</a></li>
                </ul>
              </div>

              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-default dropdown-toggle usa"
                  data-toggle="dropdown"
                >
                  DOLLAR
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a href="#">Canadian Dollar</a></li>
                  <li><a href="#">Pound</a></li>
                </ul>
              </div>
            </div> -->
          </div>
          <div class="col-sm-8">
            <div class="shop-menu pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <router-link to="/account" v-if="id_email"
                    ><i class="fa fa-user"></i> Account</router-link
                  >
                  <!-- <a href="#" v-else><i class="fa fa-user"></i> Account</a> -->
                </li>
                <li>
                  <router-link to="/wishlist" v-if="id_email"
                    ><i class="fa fa-star"></i> Wishlist
                    <span
                      class="badge badge-primary"
                      v-if="numMyWishlist > 0"
                      >{{ numMyWishlist }}</span
                    ></router-link
                  >
                </li>
                <!-- <li>
                  <router-link to="/checkout"
                    ><i class="fa fa-crosshairs"></i> Checkout</router-link
                  >
                </li> -->
                <li>
                  <router-link to="/cart"
                    ><i class="fa fa-shopping-cart"></i> Cart
                    <span class="badge badge-primary" v-if="numMyCart > 0">{{
                      numMyCart
                    }}</span></router-link
                  >
                </li>
                <li>
                  <a v-if="id_token" @click="logout" href="javascript:void(0)"
                    ><i class="fa fa-sign-out"></i> Logout</a
                  >
                  <!-- <a v-else-if="isAuth" @click="logout" href="#"
                    ><i class="fa fa-sign-out"></i> Logout</a
                  > -->
                  <router-link v-else to="/login"
                    ><i class="fa fa-lock"></i> Login</router-link
                  >
                </li>
                <li>
                  <!-- <div>
                <p>{{ id_token }}</p>
                <p>{{ id_email }}</p>
              </div> -->
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header-middle-->

    <div class="header-bottom">
      <!--header-bottom-->
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="mainmenu pull-left">
              <ul class="nav navbar-nav collapse navbar-collapse">
                <li>
                  <router-link to="/">Home</router-link>
                </li>
                <li class="dropdown">
                  <router-link to="/shop"
                    >Shop<i class="fa fa-angle-down"></i
                  ></router-link>
                  <ul role="menu" class="sub-menu">
                    <!-- <li><router-link to="/shop">Products</router-link></li> -->
                    <!-- <li>
                      <router-link to="/product_details"
                        >Product Details</router-link
                      >
                    </li> -->
                    <!-- <li><router-link to="/checkout">Checkout</router-link></li> -->
                    <li>
                      <router-link to="/wishlist" v-if="id_email"
                        >Wishlist</router-link
                      >
                    </li>
                    <li><router-link to="/cart">Cart</router-link></li>
                  </ul>
                </li>
                <li>
                  <router-link to="/cms">CMS</router-link>
                </li>
                <!-- <li><router-link to="/not_found">404</router-link></li> -->
                <li><router-link to="/contact">Contact</router-link></li>
                <li class="dropdown">
                  <a href="#">Account<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <li>
                      <router-link to="/account" v-if="id_email"
                        >Account Info</router-link
                      >
                    </li>
                    <li>
                      <a
                        v-if="id_token"
                        @click="logout"
                        href="javascript:void(0)"
                        >Logout</a
                      >
                      <router-link v-else to="/login">Login</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-3">
            <!-- <div class="search_box pull-right">
              <input type="text" placeholder="Search" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!--/header-bottom-->
  </header>
  <!--/header-->
</template>

<script>
import { userLogout } from "../common/service";
// import { getToken, removeToken } from "../common/jwttoken";
// import { getTokenProfile, removeTokenProfile } from "../common/jwtprofile";

// import store from "../store/store";
// import * as type from "../store/types";
// import { mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    id_token() {
      return this.$store.getters.id_token;
    },
    id_email() {
      return this.$store.getters.id_email;
    },

    myCart() {
      return this.$store.getters.myCart;
    },
    numMyCart() {
      return this.myCart.length;
    },

    myWishlist() {
      return this.$store.getters.myWishlist;
    },
    numMyWishlist() {
      return this.myWishlist.length;
    },
  },

  methods: {
    logout() {
      this.$swal({
        title: "Are you sure?",
        text: "You can't make any purchases unless you're logged in!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          userLogout(this.$store.getters.id_token)
            .then(() => {
              this.$store.dispatch("resetSessionState");

              // alert("Logout Successfully");
              this.$swal(
                "Success!",
                "You have been logged out successfully.",
                "success"
              );
              this.$router.push("/").catch(() => {});
            })
            .catch((error) => {
              console.log(error);
              this.$swal("Oops!", "Something went wrong.", "error");
            });
        }
      });
      // this.$swal("Hello Vue world!!!");
    },
  },
};
</script>

<style></style>
