<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <Sidebar />
          </div>

          <div class="col-sm-9 padding-right">
            <div class="product-details">
              <!--product-details-->
              <div class="col-sm-5">
                <div class="view-product">
                  <!-- {{ combineData }} -->
                  <img
                    v-bind:src="image_url + combineData.product_banner_image"
                    v-if="combineData.product_banner_image"
                    alt="Image not found"
                  />
                  <h3>MEOW</h3>
                </div>
                <div
                  id="similar-product"
                  class="carousel slide"
                  data-ride="carousel"
                  v-if="combineData.product_image"
                >
                  <!-- Wrapper for slides -->
                  <div class="carousel-inner text-center">
                    <template v-for="(cd, index) in combineData.product_image">
                      <div
                        class="item active"
                        v-if="index == 0"
                        :key="cd.product_support_image"
                      >
                        <img
                          v-bind:src="image_url + cd.product_support_image"
                          alt="Image not found"
                          width="100px"
                        />
                      </div>
                      <div class="item" v-else :key="cd.product_support_image">
                        <img
                          v-bind:src="image_url + cd.product_support_image"
                          alt="Image not found"
                          width="100px"
                        />
                      </div>
                    </template>
                  </div>

                  <!-- Controls -->
                  <a
                    v-if="combineData.product_image"
                    class="left item-control"
                    href="#similar-product"
                    data-slide="prev"
                  >
                    <i class="fa fa-angle-left"></i>
                  </a>
                  <a
                    v-if="combineData.product_image"
                    class="right item-control"
                    href="#similar-product"
                    data-slide="next"
                  >
                    <i class="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
              <div class="col-sm-7">
                <div class="product-information">
                  <!--/product-information-->
                  <img
                    v-if="combineData.product_condition == 'New'"
                    src="/images/product-details/new.jpg"
                    class="newarrival"
                    alt="Image not found"
                  />
                  <h2>{{ combineData.product_name }}</h2>
                  <p>Product ID: {{ combineData.product_id }}</p>
                  <!-- <img src="images/product-details/rating.png" alt="" /> -->
                  <span>
                    <span>US ${{ combineData.product_price }}</span>
                    <label>Quantity:</label>
                    <input type="text" value="1" readonly />
                    <button
                      type="button"
                      class="btn btn-fefault cart"
                      @click="addToCart(combineData.product_id)"
                    >
                      <i class="fa fa-shopping-cart"></i>
                      Add to cart
                    </button>
                  </span>
                  <p><b>Availability:</b> In Stock</p>
                  <p><b>Condition:</b> {{ combineData.product_condition }}</p>
                  <p><b>Brand:</b> {{ combineData.product_brand }}</p>
                  <!-- <a href=""
                    ><img
                      src="images/product-details/share.png"
                      class="share img-responsive"
                      alt=""
                  /></a> -->
                </div>
                <!--/product-information-->
              </div>
            </div>
            <!--/product-details-->

            <!--category-tab-->
            <!-- <div class="category-tab shop-details-tab">
              
              <div class="col-sm-12">
                <ul class="nav nav-tabs">
                  <li><a href="#details" data-toggle="tab">Details</a></li>
                  <li>
                    <a href="#companyprofile" data-toggle="tab"
                      >Company Profile</a
                    >
                  </li>
                  <li><a href="#tag" data-toggle="tab">Tag</a></li>
                  <li class="active">
                    <a href="#reviews" data-toggle="tab">Reviews (5)</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content">
                <div class="tab-pane fade" id="details">
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery4.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane fade" id="companyprofile">
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery4.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane fade" id="tag">
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="images/home/gallery4.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            class="btn btn-default add-to-cart"
                          >
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane fade active in" id="reviews">
                  <div class="col-sm-12">
                    <ul>
                      <li>
                        <a href=""><i class="fa fa-user"></i>EUGEN</a>
                      </li>
                      <li>
                        <a href=""><i class="fa fa-clock-o"></i>12:41 PM</a>
                      </li>
                      <li>
                        <a href=""
                          ><i class="fa fa-calendar-o"></i>31 DEC 2014</a
                        >
                      </li>
                    </ul>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.Duis aute irure dolor in reprehenderit in
                      voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur.
                    </p>
                    <p><b>Write Your Review</b></p>

                    <form action="#">
                      <span>
                        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Email Address" />
                      </span>
                      <textarea name=""></textarea>
                      <b>Rating: </b>
                      <img src="images/product-details/rating.png" alt="" />
                      <button type="button" class="btn btn-default pull-right">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div> -->
            <!--/category-tab-->

            <!--recommended_items-->
            <!-- <div class="recommended_items">
              <h2 class="title text-center">recommended items</h2>

              <div
                id="recommended-item-carousel"
                class="carousel slide"
                data-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="item active">
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              class="btn btn-default add-to-cart"
                            >
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/recommend2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              class="btn btn-default add-to-cart"
                            >
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/recommend3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              class="btn btn-default add-to-cart"
                            >
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              class="btn btn-default add-to-cart"
                            >
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/recommend2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              class="btn btn-default add-to-cart"
                            >
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/recommend3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button
                              type="button"
                              class="btn btn-default add-to-cart"
                            >
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  class="left recommended-item-control"
                  href="#recommended-item-carousel"
                  data-slide="prev"
                >
                  <i class="fa fa-angle-left"></i>
                </a>
                <a
                  class="right recommended-item-control"
                  href="#recommended-item-carousel"
                  data-slide="next"
                >
                  <i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div> -->
            <!--/recommended_items-->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getProduct,
  getProductAssoc,
  getProductImage,
} from "../common/service";
import { IMAGE_URL } from "../common/Url";
import { getMyCart, saveMyCart } from "../common/mycart";

import Sidebar from "./Includes/Sidebar.vue";
export default {
  name: "Product_Details",
  data() {
    return {
      product_id: null,
      product: {},
      productAssoc: {},
      productImage: [],
      image_url: `${IMAGE_URL}`,
    };
  },
  components: {
    Sidebar,
  },
  methods: {
    loadUp(product_id) {
      this.product_id = product_id;

      getProduct(this.product_id)
        .then((res) => {
          // console.log(res.data.products);
          this.product = res.data.product[0];
        })
        .catch((error) => {
          console.log(error);
        });

      getProductAssoc(this.product_id)
        .then((res) => {
          // console.log(res.data.productAssoc);
          this.productAssoc = res.data.productAssoc[0];
        })
        .catch((error) => {
          console.log(error);
        });

      getProductImage(this.product_id)
        .then((res) => {
          // console.log(res.data.productAssocs);
          this.productImage = res.data.productImage;
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
  },
  computed: {
    combineData() {
      let combinedImage = [];
      // console.log("Hello");
      let fp = this.product;
      let fpa = this.productAssoc;
      let fi = this.productImage;

      // console.log(fp);
      // console.log(fpa);
      let combinedData = {
        product_id: fp.id,
        product_name: fp.product_name,
        product_price: fpa.product_price,
        product_condition: fpa.condition,
        product_brand: fpa.brand,
        product_banner_image: fp.product_banner_image,
        product_image: combinedImage,
      };

      // console.log(fi);
      fi.forEach((productImage) => {
        // console.log(product.id);
        combinedData.product_image.push({
          product_support_image: productImage.product_image,
        });
      });

      // console.log(combinedData);
      return combinedData;
    },
  },
  mounted() {
    this.loadUp(this.$route.params.product_id);
  },
  watch: {
    $route(to) {
      this.loadUp(to.params.product_id);
    },
  },
  created() {
    // console.log(this.$route.params);
    // this.category_id = this.$route.params.category_id;
  },
};
</script>

<style></style>
