<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Image</td>
                <td class="description">Description</td>
                <td class="price">Price</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <template v-if="numMyWishlist > 0">
                <template v-for="cd in combineData">
                  <tr :key="cd.id">
                    <td class="cart_product">
                      <a href=""
                        ><img
                          v-bind:src="image_url + cd.product_banner_image"
                          alt="Image not found"
                          width="110"
                          height="110"
                      /></a>
                    </td>
                    <td class="cart_description">
                      <h4>
                        <a href="">{{ cd.product_name }}</a>
                      </h4>
                      <p>Product ID: {{ cd.id }}</p>
                    </td>
                    <td class="cart_price">
                      <p>
                        ${{ cd.get_product_attributes_assoc[0].product_price }}
                      </p>
                    </td>
                    <td class="cart_delete">
                      <a
                        class="cart_quantity_delete"
                        href="javascript:void(0)"
                        @click="delFromWishlist(cd.id)"
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
                    colspan="4"
                  >
                    <h4>Currently, your wishlist is empty.</h4>
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
        <div class="row">
          <div class="col-sm-6"></div>
          <div class="col-sm-12" v-if="numMyWishlist > 0">
            <div class="total_area">
              <!-- <ul>
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
              </ul> -->
              <a
                class="btn btn-default check_out"
                href="javascript:void(0)"
                @click="addToCart"
                >Add to Cart</a
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
import { saveMyWishlist, getMyWishlist } from "../common/mywishlist";
import { getProduct /* , getProductAssoc */ } from "../common/service";
import { IMAGE_URL } from "../common/Url";

export default {
  name: "Wishlist",
  data() {
    return {
      image_url: `${IMAGE_URL}`,
      products: [],
      // productAssocs: [],
    };
  },
  methods: {
    fetchProduct() {
      let wishlist = this.myWishlist;
      let tempProduct = [];

      wishlist.forEach((element) => {
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
    //   let wishlist = this.myWishlist;
    //   let tempProductAssoc = [];

    //   wishlist.forEach((element) => {
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

    // incQty(product_id, product_qty_max) {
    //   let cart = this.myCart;

    //   cart.forEach((cp) => {
    //     if (cp.pid == product_id && cp.quantity < product_qty_max) {
    //       cp.quantity += 1;
    //     }
    //   });

    //   saveMyCart(cart);
    //   this.$store.dispatch({ type: "get_my_cart", myCart: cart });
    // },

    // descQty(product_id) {
    //   let cart = this.myCart;

    //   cart.forEach((cp) => {
    //     if (cp.pid == product_id && cp.quantity > 1) {
    //       cp.quantity -= 1;
    //     }
    //   });

    //   saveMyCart(cart);
    //   this.$store.dispatch({ type: "get_my_cart", myCart: cart });
    // },

    delFromWishlist(product_id) {
      // console.log("To delete: " + product_id);
      let wishlist = this.myWishlist;
      let arr = [];
      let obj = {};

      wishlist.forEach((cp) => {
        if (cp.pid != product_id) {
          // console.log("Item added: " + cp.pid);
          obj = { pid: cp.pid, quantity: cp.quantity };
          arr.push(obj);
        }
      });

      // console.log(arr);
      saveMyWishlist(arr);
      this.$store.dispatch({ type: "get_my_wishlist", myWishlist: arr });
    },

    addToCart() {
      this.$store.dispatch("resetSessionMyCart");
      let arr = JSON.parse(getMyWishlist());
      saveMyCart(arr);
      this.$store.dispatch({ type: "get_my_cart", myCart: arr });
      this.$swal("Success", `Items added to the cart`, "success");
      this.$router.push("/cart").catch(() => {});
      this.$store.dispatch("resetSessionMyWishlist");
    },
  },
  computed: {
    myWishlist() {
      return this.$store.getters.myWishlist;
    },
    numMyWishlist() {
      return this.myWishlist.length;
    },

    combineData() {
      return this.products;
    },

    // combineData() {
    //   let combinedData = [];
    //   // console.log("Hello");
    //   let wishlist = this.myWishlist;
    //   let fp = this.products;
    //   let fpa = this.productAssocs;
    //   // console.log(fp);
    //   // console.log(fpa);
    //   wishlist.forEach((ca) => {
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
    //             // product_qty: ca.quantity,
    //             // product_qty_max: productAssoc.product_qty_max,
    //             product_image: product.product_banner_image,
    //           });
    //         }
    //       });
    //     });
    //   });

    //   // console.log(combinedData);
    //   return combinedData;
    // },

    // cartCost() {
    //   let combineData = this.combineData;
    //   let cartSubTotal = 0;
    //   let ecoTax = 2;
    //   let shippingCost = 50;

    //   combineData.forEach((element) => {
    //     cartSubTotal += element.getProductAttributesAssoc[0].product_price * element.product_qty;
    //   });

    //   if (cartSubTotal > 500) shippingCost = 0;

    //   let cartCost = {
    //     cartSubTotal: cartSubTotal,
    //     ecoTax: ecoTax,
    //     shippingCost: shippingCost,
    //     total: cartSubTotal + ecoTax + shippingCost,
    //   };

    //   // console.log(cartCost);
    //   return cartCost;
    // },

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
