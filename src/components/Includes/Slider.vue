<template>
  <section id="slider">
    <!--slider-->
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div id="slider-carousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li
                data-target="#slider-carousel"
                data-slide-to="0"
                class="active"
              ></li>
              <li data-target="#slider-carousel" data-slide-to="1"></li>
              <li data-target="#slider-carousel" data-slide-to="2"></li>
            </ol>

            <div class="carousel-inner">
              <div class="item active">
                <div class="col-sm-6">
                  <h1><span>ECOMMERCE</span>-APPLICATION</h1>
                  <h2>Buy products with ease</h2>
                  <p>Shopping online made simple!</p>
                  <router-link to="/shop" class="btn btn-default get">
                    Get it now
                  </router-link>
                </div>
                <div class="col-sm-6">
                  <img
                    src="images/home/girl1.jpg"
                    class="girl img-responsive"
                    alt=""
                  />
                  <img src="images/home/pricing.png" class="pricing" alt="" />
                </div>
              </div>
              <div class="item">
                <div class="col-sm-6">
                  <h1><span>EECOMMERCE</span>-APPLICATION</h1>
                  <h2>Want some discounts ?</h2>
                  <p>Avail upto $20 discount on your purchase.*</p>
                  <button type="button" class="btn btn-default get">
                    Get it now
                  </button>
                </div>
                <div class="col-sm-6">
                  <img
                    src="images/home/girl2.jpg"
                    class="girl img-responsive"
                    alt=""
                  />
                  <img src="images/home/pricing.png" class="pricing" alt="" />
                </div>
              </div>

              <div class="item">
                <div class="col-sm-6">
                  <h1><span>ECOMMERCE</span>-APPLICATION</h1>
                  <h2>Advanced features included</h2>
                  <p>Wishlist and Cart are waiting for your orders.</p>
                  <button type="button" class="btn btn-default get">
                    Get it now
                  </button>
                </div>
                <div class="col-sm-6">
                  <img
                    src="images/home/girl3.jpg"
                    class="girl img-responsive"
                    alt=""
                  />
                  <img src="images/home/pricing.png" class="pricing" alt="" />
                </div>
              </div>
            </div>

            <a
              href="#slider-carousel"
              class="left control-carousel hidden-xs"
              data-slide="prev"
            >
              <i class="fa fa-angle-left"></i>
            </a>
            <a
              href="#slider-carousel"
              class="right control-carousel hidden-xs"
              data-slide="next"
            >
              <i class="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--/slider-->
</template>

<script>
export default {
  name: "Slider",
};
</script>

<style></style>
