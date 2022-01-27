<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <!-- <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active">Shopping Cart</li>
          </ol>
        </div> -->
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Image</td>
                <td class="description">Description</td>
                <td class="price">Price</td>
                <td class="quantity">Quantity</td>
                <td class="total">Total</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <template v-if="numMyCart > 0">
                <template v-for="cd in combineData">
                  <tr :key="cd.product_id">
                    <td class="cart_product">
                      <a href=""
                        ><img
                          v-bind:src="image_url + cd.product_image"
                          alt="Image not found"
                          width="110"
                          height="110"
                      /></a>
                    </td>
                    <td class="cart_description">
                      <h4>
                        <a href="">{{ cd.product_name }}</a>
                      </h4>
                      <p>Product ID: {{ cd.product_id }}</p>
                    </td>
                    <td class="cart_price">
                      <p>${{ cd.product_price }}</p>
                    </td>
                    <td class="cart_quantity">
                      <div class="cart_quantity_button">
                        <a
                          class="cart_quantity_up"
                          href="javascript:void(0)"
                          @click="incQty(cd.product_id, cd.product_qty_max)"
                        >
                          +
                        </a>
                        <input
                          class="cart_quantity_input"
                          type="text"
                          name="quantity"
                          v-bind:value="cd.product_qty"
                          autocomplete="off"
                          size="2"
                          min="1"
                          v-bind:max="cd.product_qty_max"
                          readonly
                        />
                        <a
                          class="cart_quantity_down"
                          href="javascript:void(0)"
                          @click="descQty(cd.product_id)"
                        >
                          -
                        </a>
                      </div>
                    </td>
                    <td class="cart_total">
                      <p class="cart_total_price">
                        ${{ cd.product_qty * cd.product_price }}
                      </p>
                    </td>
                    <td class="cart_delete">
                      <a
                        class="cart_quantity_delete"
                        href="javascript:void(0)"
                        @click="delFromCart(cd.product_id)"
                        ><i class="fa fa-times"></i
                      ></a>
                    </td>
                  </tr>
                </template>
              </template>
              <template v-else>
                <tr>
                  <td
                    class="cart_description text-center align-middle"
                    colspan="6"
                  >
                    <h4>We're looking forward to what you will buy.</h4>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!--/#cart_items-->

    <section id="do_action">
      <div class="container">
        <!-- <div class="heading">
          <h3>What would you like to do next?</h3>
          <p>
            Choose if you have a discount code or reward points you want to use
            or would like to estimate your delivery cost.
          </p>
        </div> -->
        <div class="row">
          <div class="col-sm-6">
            <!-- <div class="chose_area">
              <ul class="user_option">
                <li>
                  <input type="checkbox" />
                  <label>Use Coupon Code</label>
                </li>
                <li>
                  <input type="checkbox" />
                  <label>Use Gift Voucher</label>
                </li>
                <li>
                  <input type="checkbox" />
                  <label>Estimate Shipping & Taxes</label>
                </li>
              </ul>
              <ul class="user_info">
                <li class="single_field">
                  <label>Country:</label>
                  <select>
                    <option>United States</option>
                    <option>Bangladesh</option>
                    <option>UK</option>
                    <option>India</option>
                    <option>Pakistan</option>
                    <option>Ucrane</option>
                    <option>Canada</option>
                    <option>Dubai</option>
                  </select>
                </li>
                <li class="single_field">
                  <label>Region / State:</label>
                  <select>
                    <option>Select</option>
                    <option>Dhaka</option>
                    <option>London</option>
                    <option>Dillih</option>
                    <option>Lahore</option>
                    <option>Alaska</option>
                    <option>Canada</option>
                    <option>Dubai</option>
                  </select>
                </li>
                <li class="single_field zip-field">
                  <label>Zip Code:</label>
                  <input type="text" />
                </li>
              </ul>
              <a class="btn btn-default update" href="">Get Quotes</a>
              <a class="btn btn-default check_out" href="">Continue</a>
            </div> -->
          </div>
          <div class="col-sm-12" v-if="numMyCart > 0">
            <div class="total_area">
              <ul>
                <li>
                  Cart Sub Total <span>${{ cartCost.cartSubTotal }}</span>
                </li>
                <li>
                  Eco Tax <span>${{ cartCost.ecoTax }}</span>
                </li>
                <li>
                  Shipping Cost
                  <span v-if="cartCost.shippingCost == 0">Free</span>
                  <span v-else>${{ cartCost.shippingCost }}</span>
                </li>
                <li>
                  Total <span>${{ cartCost.total }}</span>
                </li>
              </ul>
              <!-- <a class="btn btn-default update" href="">Update</a> -->
              <a
                class="btn btn-default check_out"
                href="javascript:void(0)"
                @click="goToCheckout"
                >Check Out</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--/#do_action-->
  </div>
</template>

<script>
import { saveMyCart } from "../common/mycart";
import { getProduct /* getProductAssoc */ } from "../common/service";
import { IMAGE_URL } from "../common/Url";

export default {
  name: "Cart",
  data() {
    return {
      image_url: `${IMAGE_URL}`,
      products: [],
      // productAssocs: [],
    };
  },
  methods: {
    fetchProduct() {
      let cart = this.myCart;
      let tempProduct = [];

      cart.forEach((element) => {
        getProduct(element.pid)
          .then((res) => {
            tempProduct.push(res.data.product[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      });
      // console.log(tempProduct);
      this.products = tempProduct;
    },

    // fetchProductAssoc() {
    //   let cart = this.myCart;
    //   let tempProductAssoc = [];

    //   cart.forEach((element) => {
    //     getProductAssoc(element.pid)
    //       .then((res) => {
    //         tempProductAssoc.push(res.data.productAssoc[0]);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   });
    //   // console.log(tempProductAssoc);
    //   this.productAssocs = tempProductAssoc;
    // },

    incQty(product_id, product_qty_max) {
      let cart = this.myCart;

      cart.forEach((cp) => {
        if (cp.pid == product_id && cp.quantity < product_qty_max) {
          cp.quantity += 1;
        }
      });

      saveMyCart(cart);
      this.$store.dispatch({ type: "get_my_cart", myCart: cart });
    },

    descQty(product_id) {
      let cart = this.myCart;

      cart.forEach((cp) => {
        if (cp.pid == product_id && cp.quantity > 1) {
          cp.quantity -= 1;
        }
      });

      saveMyCart(cart);
      this.$store.dispatch({ type: "get_my_cart", myCart: cart });
    },

    delFromCart(product_id) {
      // console.log("To delete: " + product_id);
      let cart = this.myCart;
      let arr = [];
      let obj = {};

      cart.forEach((cp) => {
        if (cp.pid != product_id) {
          // console.log("Item added: " + cp.pid);
          obj = { pid: cp.pid, quantity: cp.quantity };
          arr.push(obj);
        }
      });

      // console.log(arr);
      saveMyCart(arr);
      this.$store.dispatch({ type: "get_my_cart", myCart: arr });
    },

    goToCheckout() {
      if (this.id_token) {
        this.$router.push("/checkout").catch(() => {});
      } else {
        this.$swal({
          title: "You aren't Logged in!",
          text: "You can't make any purchases unless you're logged in.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/login").catch(() => {});
          }
        });
        // this.$swal("Hello Vue world!!!");
      }
    },
  },
  computed: {
    myCart() {
      return this.$store.getters.myCart;
    },
    numMyCart() {
      return this.myCart.length;
    },

    combineData() {
      let combinedData = [];
      // console.log("Hello");
      let cart = this.myCart;
      let fp = this.products;
      // let fpa = this.productAssocs;
      // console.log(fp);
      // console.log(fpa);
      cart.forEach((ca) => {
        // console.log("here start");
        fp.forEach((product) => {
          // console.log("here 1");
          if (ca.pid == product.id) {
            // console.log(product.id);
            combinedData.push({
              product_id: product.id,
              product_name: product.product_name,
              product_price:
                product.get_product_attributes_assoc[0].product_price,
              product_qty: ca.quantity,
              product_qty_max:
                product.get_product_attributes_assoc[0].product_qty_max,
              product_image: product.product_banner_image,
            });
          }
        });
      });

      console.log(combinedData);
      return combinedData;
    },

    // combineData() {
    //   let combinedData = [];
    //   // console.log("Hello");
    //   let cart = this.myCart;
    //   let fp = this.products;
    //   let fpa = this.productAssocs;
    //   // console.log(fp);
    //   // console.log(fpa);
    //   cart.forEach((ca) => {
    //     // console.log("here start");
    //     fp.forEach((product) => {
    //       // console.log("here 1");
    //       fpa.forEach((productAssoc) => {
    //         // console.log("here 2");
    //         if (product.id == productAssoc.id && ca.pid == product.id) {
    //           // console.log(product.id);
    //           combinedData.push({
    //             product_id: product.id,
    //             product_name: product.product_name,
    //             product_price: productAssoc.product_price,
    //             product_qty: ca.quantity,
    //             product_qty_max: productAssoc.product_qty_max,
    //             product_image: product.product_banner_image,
    //           });
    //         }
    //       });
    //     });
    //   });

    //   console.log(combinedData);
    //   return combinedData;
    // },

    cartCost() {
      let combineData = this.combineData;
      let cartSubTotal = 0;
      let ecoTax = 2;
      let shippingCost = 50;

      combineData.forEach((element) => {
        cartSubTotal += element.product_price * element.product_qty;
      });

      if (cartSubTotal > 500) shippingCost = 0;

      let cartCost = {
        cartSubTotal: cartSubTotal,
        ecoTax: ecoTax,
        shippingCost: shippingCost,
        total: cartSubTotal + ecoTax + shippingCost,
      };

      // console.log(cartCost);
      return cartCost;
    },

    id_token() {
      return this.$store.getters.id_token;
    },
  },
  mounted() {
    this.fetchProduct();
    // this.fetchProductAssoc();
  },
  // updated() {
  //   this.fetchProduct();
  //   this.fetchProductAssoc();
  // },
};
</script>

<style></style>
