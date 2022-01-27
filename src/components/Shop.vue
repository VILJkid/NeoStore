<template>
  <div>
    <section id="advertisement">
      <div class="container">
        <img src="images/shop/advertisement.jpg" alt="" />
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <Sidebar />
          </div>

          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->
              <h2 class="title text-center">Featured {{ category_name }}s</h2>

              <div v-for="product in products" :key="product.id">
                <div
                  v-for="productAssoc in productAssocs"
                  :key="productAssoc.id"
                >
                  <div
                    v-if="product.id == productAssoc.product_id"
                    class="col-sm-4"
                  >
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <router-link
                            :to="{ path: '/product_details/' + product.id }"
                          >
                            <img
                              v-bind:src="
                                image_url + product.product_banner_image
                              "
                              alt="Image not found"
                          /></router-link>

                          <h2>${{ productAssoc.product_price }}</h2>
                          <p>{{ product.product_name }}</p>
                          <a
                            href="javascript:void(0)"
                            class="btn btn-default add-to-cart"
                            @click="addToCart(product.id)"
                            ><i class="fa fa-shopping-cart"></i>Add to cart</a
                          >
                        </div>
                        <div class="product-overlay">
                          <div class="overlay-content">
                            <router-link
                              :to="{ path: '/product_details/' + product.id }"
                            >
                              <img
                                v-bind:src="
                                  image_url + product.product_banner_image
                                "
                                alt="Image not found"
                            /></router-link>

                            <h2>${{ productAssoc.product_price }}</h2>
                            <p>{{ product.product_name }}</p>
                            <a
                              href="javascript:void(0)"
                              class="btn btn-default add-to-cart"
                              @click="addToCart(product.id)"
                              ><i class="fa fa-shopping-cart"></i>Add to cart</a
                            >
                          </div>
                        </div>
                      </div>
                      <div class="choose">
                        <ul class="nav nav-pills nav-justified">
                          <li>
                            <a
                              href="javascript:void(0)"
                              @click="addToWishlist(product.id)"
                              v-if="id_token"
                              ><i class="fa fa-plus-square"></i>Add to
                              wishlist</a
                            >
                          </li>
                          <!-- <li>
                            <a href=""
                              ><i class="fa fa-plus-square"></i>Add to
                              compare</a
                            >
                          </li> -->
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <ul class="pagination">
                <li class="active"><a href="">1</a></li>
                <li><a href="">2</a></li>
                <li><a href="">3</a></li>
                <li><a href="">&raquo;</a></li>
              </ul> -->
            </div>
            <!--features_items-->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getCategoryName,
  getAllProduct,
  getAllProductAssoc,
} from "../common/service";
import { IMAGE_URL } from "../common/Url";
import { getMyCart, saveMyCart } from "../common/mycart";
import { getMyWishlist, saveMyWishlist } from "../common/mywishlist";

import Sidebar from "./Includes/Sidebar.vue";
export default {
  name: "Shop",
  data() {
    return {
      category_id: null,
      category_name: null,
      products: [],
      productAssocs: [],
      image_url: `${IMAGE_URL}`,
    };
  },
  components: {
    Sidebar,
  },
  methods: {
    loadUp(category_id) {
      this.category_id = category_id;
      getCategoryName(this.category_id)
        .then((res) => {
          // console.log(res.data);
          this.category_name = res.data.categoryName;
        })
        .catch((error) => {
          console.log(error);
        });

      getAllProduct(this.category_id)
        .then((res) => {
          // console.log(res.data.products);
          this.products = res.data.products;
        })
        .catch((error) => {
          console.log(error);
        });

      getAllProductAssoc(this.category_id)
        .then((res) => {
          // console.log(res.data.productAssocs);
          this.productAssocs = res.data.productAssocs;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addToCart(product_id) {
      if (getMyCart() != undefined) {
        let arr = JSON.parse(getMyCart());
        let flag1 = 0;
        arr.forEach((element) => {
          if (element.pid == product_id) {
            flag1 = 1;
          }
        });

        if (flag1 == 0) {
          let obj = { pid: product_id, quantity: 1 };
          arr.push(obj);
          saveMyCart(arr);
          this.$store.dispatch({ type: "get_my_cart", myCart: arr });

          this.$swal("Added", `Product ID: ${product_id}`, "success");
        } else {
          this.$swal("Already added!", `Product ID: ${product_id}`, "warning");
        }
      } else {
        let arr = [];
        let obj = { pid: product_id, quantity: 1 };
        arr.push(obj);
        saveMyCart(arr);
        this.$store.dispatch({ type: "get_my_cart", myCart: arr });

        this.$swal("Added", `Product ID: ${product_id}`, "success");
      }
    },

    addToWishlist(product_id) {
      if (getMyWishlist() != undefined) {
        let arr = JSON.parse(getMyWishlist());
        let flag1 = 0;
        arr.forEach((element) => {
          if (element.pid == product_id) {
            flag1 = 1;
          }
        });

        if (flag1 == 0) {
          let obj = { pid: product_id, quantity: 1 };
          arr.push(obj);
          saveMyWishlist(arr);
          this.$store.dispatch({ type: "get_my_wishlist", myWishlist: arr });

          this.$swal("Added", `Product ID: ${product_id}`, "success");
        } else {
          this.$swal("Already added!", `Product ID: ${product_id}`, "warning");
        }
      } else {
        let arr = [];
        let obj = { pid: product_id, quantity: 1 };
        arr.push(obj);
        saveMyWishlist(arr);
        this.$store.dispatch({ type: "get_my_wishlist", myWishlist: arr });

        this.$swal("Added", `Product ID: ${product_id}`, "success");
      }
    },
  },

  computed: {
    id_token() {
      return this.$store.getters.id_token;
    },
  },

  mounted() {
    this.loadUp(this.$route.params.category_id);
  },
  watch: {
    $route(to) {
      this.loadUp(to.params.category_id);
    },
  },
  created() {
    // console.log(this.$route.params);
    // this.category_id = this.$route.params.category_id;
  },
};
</script>

<style></style>
