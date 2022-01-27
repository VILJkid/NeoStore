<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <!-- <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active">Check out</li>
          </ol>
        </div> -->
        <!--/breadcrums-->

        <div class="shopper-informations">
          <div class="row">
            <div class="col-sm-3">
              <div class="shopper-info">
                <p>Customer Information</p>
                <form v-if="computedUserProfile">
                  <input
                    type="text"
                    placeholder="First Name"
                    readonly
                    v-bind:value="computedUserProfile.firstname"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    readonly
                    v-bind:value="computedUserProfile.lastname"
                  />
                </form>
              </div>
            </div>
            <div class="col-sm-5 clearfix">
              <div class="bill-to">
                <p>Bill To</p>
                <div class="form-one">
                  <form
                    v-if="computedUserProfile"
                    @submit.prevent="postCheckout"
                  >
                    <input
                      type="text"
                      placeholder="Emai"
                      readonly
                      v-bind:value="computedUserProfile.email"
                    />
                    <input
                      type="text"
                      placeholder="First Name"
                      readonly
                      v-bind:value="computedUserProfile.firstname"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      readonly
                      v-bind:value="computedUserProfile.lastname"
                    />
                    <input
                      type="text"
                      placeholder="Address *"
                      v-model="detailsCheckout.order_address"
                    />
                    <!-- <input type="text" placeholder="Address 2" /> -->
                  </form>
                  <div
                    v-if="detailsCheckout.successCheckout"
                    class="alert alert-success"
                  >
                    {{ detailsCheckout.successCheckout }}
                  </div>
                  <div v-if="detailsCheckout.errorsCheckout.length > 0">
                    <div
                      v-for="(error, index) in detailsCheckout.errorsCheckout"
                      :key="index"
                      class="alert alert-danger"
                    >
                      {{ error }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="order-message">
                <p>Shipping Order</p>
                <textarea
                  name="message"
                  placeholder="Notes about your order, Special Notes for Delivery"
                  rows="16"
                  v-model="detailsCheckout.order_note"
                ></textarea>
                <!-- <label
                  ><input type="checkbox" /> Shipping to bill address</label
                > -->
              </div>
            </div>
          </div>
        </div>
        <div class="review-payment">
          <h2>Review &amp; Payment</h2>
        </div>

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
                <tr>
                  <td colspan="3">
                    <div v-if="cartCost.shippingCost == 0">
                      <select v-model="coupon_value">
                        <option selected disabled value="">
                          -- Select a Coupon --
                        </option>
                        <option
                          v-for="(coupon, index) in coupons"
                          :key="index"
                          v-bind:value="coupon.coupon_value"
                        >
                          {{ coupon.coupon_name }} | ${{ coupon.coupon_value }}
                          Discount
                        </option>
                      </select>
                    </div>
                  </td>
                  <td colspan="1">&nbsp;</td>
                  <td colspan="2">
                    <table class="table table-condensed total-result">
                      <tr>
                        <td>Cart Sub Total</td>
                        <td>${{ cartCost.cartSubTotal }}</td>
                      </tr>
                      <tr>
                        <td>Eco Tax</td>
                        <td>${{ cartCost.ecoTax }}</td>
                      </tr>
                      <tr class="shipping-cost">
                        <td>Shipping Cost</td>
                        <td v-if="cartCost.shippingCost == 0">Free</td>
                        <td v-else>${{ cartCost.shippingCost }}</td>
                      </tr>
                      <tr v-if="getCouponValue && cartCost.shippingCost == 0">
                        <td>Coupon Applied</td>
                        <td>-${{ getCouponValue }}</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>
                          <span>${{ cartCost.total - getCouponValue }}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
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

        <div class="payment-options">
          <!-- <span>
            <label><input type="checkbox" /> Direct Bank Transfer</label>
          </span>
          <span>
            <label><input type="checkbox" /> Check Payment</label>
          </span>
          <span>
            <label><input type="checkbox" /> Paypal</label>
          </span> -->
          <div class="text-right">
            <button @click="postCheckout" class="btn btn-primary">
              Continue &amp; Pay
            </button>
          </div>
          <!-- <div class="mx-auto w-50" ref="paypal"></div> -->
        </div>
      </div>
    </section>
    <!--/#cart_items-->
  </div>
</template>

<script>
import { saveMyCart } from "../common/mycart";
import {
  getProduct,
  /* getProductAssoc */
  getAllCoupons,
  userProfile,
  placeOrder,
} from "../common/service";
import { IMAGE_URL } from "../common/Url";

export default {
  name: "Checkout",
  data() {
    return {
      image_url: `${IMAGE_URL}`,
      products: [],
      // productAssocs: [],
      coupons: {},
      userProfileData: {},
      coupon_value: undefined,

      // product: {
      //   price: 4.9,
      //   description: "backlink from",
      // },

      detailsCheckout: {
        order_address: null,
        order_note: null,
        errorsCheckout: [],
        successCheckout: null,
      },
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

    fetchAllCoupons() {
      let tempAllCoupons = {};

      getAllCoupons()
        .then((res) => {
          // console.log(res.data.coupons);
          tempAllCoupons = res.data.coupons;
          this.coupons = tempAllCoupons;
        })
        .catch((error) => {
          console.log(error);
        });

      // this.coupons = tempAllCoupons;
    },

    fetchUserProfile() {
      let tempUserProfileData = {};
      let id_token = this.id_token;
      // console.log("Met tok");
      // console.log(id_token);

      userProfile(id_token)
        .then((res) => {
          // console.log(res.data);
          tempUserProfileData = res.data;
          // console.log("Met");
          // console.log(res);
          this.userProfileData = tempUserProfileData;
        })
        .catch((error) => {
          console.log(error);
        });

      // this.userProfileData = tempUserProfileData;
    },

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

    postCheckout() {
      // alert("Hi");
      this.detailsCheckout.errorsCheckout = [];
      this.detailsCheckout.successCheckout = "";
      if (!this.detailsCheckout.order_address) {
        this.detailsCheckout.errorsCheckout.push("Address is required");
      }

      if (!this.detailsCheckout.order_note) {
        this.detailsCheckout.errorsCheckout.push("Note is required");
      }

      if (this.detailsCheckout.errorsCheckout.length == 0) {
        let formData = {
          order_address: this.detailsCheckout.order_address,
          order_note: this.detailsCheckout.order_note,
          order_amount: this.cartCost.total - this.getCouponValue,
          user_id: this.computedUserProfile.id,
          products: this.myCart,
          coupon_value: this.getCouponValue,
        };

        // console.log(formData);
        placeOrder(formData)
          .then(() => {
            // console.log(res.data);
            this.$store.dispatch("resetSessionMyCart");
            this.$swal("Success", `Order Placed!`, "success");
            this.$router.push("/").catch(() => {});
          })
          .catch((error) => {
            this.$swal("Oops!", "Something went wrong.", "error");
            if (error.response) {
              if (error.response.status == 401) {
                console.log(error.response.data.error);
                this.detailsCheckout.errorsCheckout.push(
                  error.response.data.error
                );
              }
              if (error.response.status == 422) {
                if (error.response.data.order_address) {
                  console.log(error.response.data.order_address[0]);
                  this.detailsCheckout.errorsCheckout.push(
                    error.response.data.order_address[0]
                  );
                }

                if (error.response.data.order_note) {
                  console.log(error.response.data.order_note[0]);
                  this.detailsCheckout.errorsCheckout.push(
                    error.response.data.order_note[0]
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

    // setLoaded: function () {
    //   this.loaded = true;
    //   window.paypal
    //     .Buttons({
    //       createOrder: (data, actions) => {
    //         return actions.order.create({
    //           purchase_units: [
    //             {
    //               description: this.product.description,
    //               amount: {
    //                 currency_code: "USD",
    //                 value: this.product.price,
    //               },
    //             },
    //           ],
    //         });
    //       },
    //       onApprove: async (data, actions, resp) => {
    //         this.loadding = true;
    //         const order = await actions.order.capture();
    //         console.log(resp);
    //         console.log(order);
    //         this.data;
    //         this.paidFor = true;
    //         this.loadding = false;
    //         // window.location.href = "./paymentsuccess/" + this.resp;
    //         this.$swal("Payment success", `Product ID: Bla bla`, "success");
    //         this.$router.push("/").catch(() => {});
    //       },
    //       onError: (err) => {
    //         console.log(err);
    //       },
    //     })
    //     .render(this.$refs.paypal);
    // },

    // selectedOption(coupon) {
    //   if (this.value) {
    //     return coupon.coupon_value === this.value.coupon_value;
    //   }
    //   return false;
    // },
    // change(e) {
    //   const selectedValue = e.target.value;
    //   const coupon = this.coupons.find((coupon) => {
    //     return selectedValue === coupon.coupon_value;
    //   });
    //   this.$emit("input", coupon);
    // },
  },
  computed: {
    myCart() {
      return this.$store.getters.myCart;
    },
    numMyCart() {
      return this.myCart.length;
    },

    id_token() {
      return this.$store.getters.id_token;
    },

    combineData() {
      let combinedData = [];
      // console.log("Hello");
      let cart = this.myCart;
      let fp = this.products;
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

      // console.log(combinedData);
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

    //   // console.log(combinedData);
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

    computedUserProfile() {
      // console.log("Comp");
      // console.log(this.userProfileData);
      return this.userProfileData;
    },

    getCouponValue() {
      // console.log(this.coupon_value);
      if (this.coupon_value) return this.coupon_value;
      else return 0;
    },

    // computedCoupons() {
    //   return this.coupons;
    // },
  },
  mounted() {
    this.fetchProduct();
    // this.fetchProductAssoc();
    this.fetchAllCoupons();
    this.fetchUserProfile();

    // paypal.Button.render(
    //   {
    //     env: "sandbox", // Optional: specify 'sandbox' environment
    //     client: {
    //       sandbox: "xxxx",
    //       production: "xxxx",
    //     },
    //     locale: "en_US",
    //     style: {
    //       size: "large",
    //       color: "gold",
    //       shape: "pill",
    //       label: "checkout",
    //       tagline: "true",
    //     },
    //     commit: true, // Optional: show a 'Pay Now' button in  the checkout flow

    //     payment: function (resolve, reject) {
    //       // Set up the payment here, when the buyer clicks  on the button

    //       let returnUrl = "_YOUR_RETURN_URL";
    //       let amount = 20;

    //       //Here call your own API server
    //       return new Promise((resolve, reject) => {
    //         axios
    //           .post(
    //             "/checkout-paypal",
    //             {
    //               return_url: returnUrl,
    //               amount: amount,
    //             },
    //             {
    //               headers: { Authorization: "Bearer " + state.token },
    //             }
    //           )
    //           .then((res) => {
    //             resolve(res.data.id);
    //           })
    //           .catch((error) => {
    //             reject(error);
    //           });
    //       });
    //     },

    //     onAuthorize: function (data) {
    //       // Execute the payment here, when the buyer approves the transaction

    //       return new Promise((resolve, reject) => {
    //         axios
    //           .post(
    //             "/execute-paypal",
    //             {
    //               payer_id: data.payerID,
    //               payment_id: data.paymentID,
    //             },
    //             {
    //               headers: { Authorization: "Bearer " + state.token },
    //             }
    //           )
    //           .then((res) => {
    //             resolve(res);
    //           })
    //           .catch((error) => {
    //             reject(error);
    //           });
    //       });
    //     },
    //   },
    //   "#paypal-button"
    // );

    // const script = document.createElement("script");
    // script.src =
    //   "https://www.paypal.com/sdk/js?client-id=AdDTwXt6KCUFqnkcceOscnQikVinpPmIIOMxAn0HKjQ5snAsD2pW9uAjK0Q7rPpDTf_tvAHCV3CyEwZR";
    // script.addEventListener("load", this.setLoaded);
    // document.body.appendChild(script);
  },
};
</script>

<style></style>
