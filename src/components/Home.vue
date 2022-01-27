<template>
  <div>
    <Slider />

    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <Sidebar />
          </div>

          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->
              <h2 class="title text-center">Featured Items</h2>

              <div v-for="cd in combineData" :key="cd.id" class="col-sm-4">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <router-link :to="{ path: '/product_details/' + cd.id }">
                        <img
                          v-bind:src="image_url + cd.product_banner_image"
                          alt="Image not found"
                        />
                      </router-link>
                      <h2>
                        ${{ cd.get_product_attributes_assoc[0].product_price }}
                      </h2>
                      <p>{{ cd.product_name }}</p>
                      <a
                        href="javascript:void(0)"
                        class="btn btn-default add-to-cart"
                        @click="addToCart(cd.id)"
                        ><i class="fa fa-shopping-cart"></i>Add to cart</a
                      >
                    </div>
                    <div class="product-overlay">
                      <div class="overlay-content">
                        <router-link
                          :to="{ path: '/product_details/' + cd.id }"
                        >
                          <img
                            v-bind:src="image_url + cd.product_banner_image"
                            alt="Image not found"
                          />
                        </router-link>
                        <h2>
                          ${{
                            cd.get_product_attributes_assoc[0].product_price
                          }}
                        </h2>
                        <p>{{ cd.product_name }}</p>
                        <a
                          href="javascript:void(0)"
                          class="btn btn-default add-to-cart"
                          @click="addToCart(cd.id)"
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
                          @click="addToWishlist(cd.id)"
                          v-if="id_token"
                          ><i class="fa fa-plus-square"></i>Add to wishlist</a
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
  // getAllProductAssocDefault,
  getAllProductDefault,
} from "../common/service";
import { IMAGE_URL } from "../common/Url";
import { getMyCart, saveMyCart } from "../common/mycart";
import { getMyWishlist, saveMyWishlist } from "../common/mywishlist";

import Slider from "./Includes/Slider.vue";
import Sidebar from "./Includes/Sidebar.vue";

export default {
  name: "Home",
  data() {
    return {
      products: [],
      productAssocs: [],
      image_url: `${IMAGE_URL}`,
    };
  },
  components: { Slider, Sidebar },
  methods: {
    fetchAllProductDefault() {
      getAllProductDefault()
        .then((res) => {
          // console.log(res.data.products);
          this.products = res.data.products;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // fetchAllProductAssocDefault() {
    //   getAllProductAssocDefault()
    //     .then((res) => {
    //       // console.log(res.data.productAssocs);
    //       this.productAssocs = res.data.productAssocs;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

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
    combineData() {
      console.log(this.products);
      return this.products;
    },

    // combineData() {
    //   let combinedData = [];
    //   // console.log("Hello");
    //   let fp = this.products;
    //   let fpa = this.productAssocs;
    //   // console.log(fp);
    //   // console.log(fpa);

    //   fp.forEach((product) => {
    //     // console.log("here 1");
    //     fpa.forEach((productAssoc) => {
    //       // console.log("here 2");
    //       if (product.id == productAssoc.id) {
    //         // console.log(product.id);
    //         combinedData.push({
    //           product_id: product.id,
    //           product_name: product.product_name,
    //           product_price: productAssoc.product_price,
    //           product_image: product.product_banner_image,
    //         });
    //       }
    //     });
    //   });

    //   // console.log(combinedData);
    //   return combinedData;
    // },

    id_token() {
      return this.$store.getters.id_token;
    },
  },
  mounted() {
    this.fetchAllProductDefault();
    // this.fetchAllProductAssocDefault();
  },
  watch: {
    // $route(to) {
    //   this.loadUp(to.params.category_id);
    // },
  },
  created() {
    // console.log(this.$route.params);
    // this.category_id = this.$route.params.category_id;
  },
};
</script>

<style></style>
