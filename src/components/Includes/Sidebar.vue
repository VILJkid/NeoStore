<template>
  <div class="left-sidebar">
    <h2>Category</h2>
    <div class="panel-group category-products" id="accordian">
      <!--category-productsr-->
      <!-- <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a
              data-toggle="collapse"
              data-parent="#accordian"
              href="#sportswear"
            >
              <span class="badge pull-right"><i class="fa fa-plus"></i></span>
              Sportswear
            </a>
          </h4>
        </div>
        <div id="sportswear" class="panel-collapse collapse">
          <div class="panel-body">
            <ul>
              <li><a href="#">Nike </a></li>
              <li><a href="#">Under Armour </a></li>
              <li><a href="#">Adidas </a></li>
              <li><a href="#">Puma</a></li>
              <li><a href="#">ASICS </a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian" href="#mens">
              <span class="badge pull-right"><i class="fa fa-plus"></i></span>
              Mens
            </a>
          </h4>
        </div>
        <div id="mens" class="panel-collapse collapse">
          <div class="panel-body">
            <ul>
              <li><a href="#">Fendi</a></li>
              <li><a href="#">Guess</a></li>
              <li><a href="#">Valentino</a></li>
              <li><a href="#">Dior</a></li>
              <li><a href="#">Versace</a></li>
              <li><a href="#">Armani</a></li>
              <li><a href="#">Prada</a></li>
              <li><a href="#">Dolce and Gabbana</a></li>
              <li><a href="#">Chanel</a></li>
              <li><a href="#">Gucci</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian" href="#womens">
              <span class="badge pull-right"><i class="fa fa-plus"></i></span>
              Womens
            </a>
          </h4>
        </div>
        <div id="womens" class="panel-collapse collapse">
          <div class="panel-body">
            <ul>
              <li><a href="#">Fendi</a></li>
              <li><a href="#">Guess</a></li>
              <li><a href="#">Valentino</a></li>
              <li><a href="#">Dior</a></li>
              <li><a href="#">Versace</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title"><a href="#">Kids</a></h4>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title"><a href="#">Fashion</a></h4>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title"><a href="#">Households</a></h4>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title"><a href="#">Interiors</a></h4>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title"><a href="#">Clothing</a></h4>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title"><a href="#">Bags</a></h4>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title"><a href="#">Shoes</a></h4>
        </div>
      </div> -->

      <div
        class="panel panel-default"
        v-for="category in getCategories"
        :key="category.id"
      >
        <div class="panel-heading">
          <h4 class="panel-title">
            <router-link :to="{ path: '/shop/' + category.id }">{{
              category.category_name
            }}</router-link>
          </h4>
        </div>
      </div>
    </div>
    <!--/category-products-->

    <div class="brands_products">
      <!--brands_products-->
      <h2>Brands</h2>
      <!-- <template v-if="getBrands">{{ getBrands }}</template> -->
      <div class="brands-name">
        <ul class="nav nav-pills nav-stacked">
          <li v-for="(brand, index) in getBrands" :key="index">
            <a href="javascript:void(0)">
              <span class="pull-right">({{ brand.brand_count }})</span
              >{{ brand.brand_name }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!--/brands_products-->

    <!--price-range-->
    <!-- <div class="price-range">
      <h2>Price Range</h2>
      <div class="well text-center">
        <input
          type="range"
          class="span2"
          value=""
          data-slider-min="0"
          data-slider-max="600"
          data-slider-step="5"
          data-slider-value="[250,450]"
          id="sl2"
        /><br />
        <b class="pull-left">$ 0</b> <b class="pull-right">$ 600</b>
      </div>
    </div> -->
    <!--/price-range-->

    <!--shipping-->
    <!-- <div class="shipping text-center">
      
      <img src="images/home/shipping.jpg" alt="" />
    </div> -->
    <!--/shipping-->
  </div>
</template>

<script>
import {
  getAllCategory,
  getAllProductAssocDefault,
} from "../../common/service";

export default {
  name: "Sidebar",
  data() {
    return {
      categories: [],
      productAssocs: [],
      brands: [],
    };
  },
  methods: {
    fetchAllCategory() {
      getAllCategory()
        .then((res) => {
          this.categories = res.data.categories;
          // console.log(this.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    fetchAllProductAssocDefault() {
      getAllProductAssocDefault()
        .then((res) => {
          this.productAssocs = res.data.productAssocs;
          // console.log(this.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    getCategories() {
      return this.categories;
    },

    getBrands() {
      // this.fetchAllProductAssocDefault();
      let productAssocs = this.productAssocs;
      // console.log(this.productAssocs);
      let listAllBrands = [];
      // console.log(brands);

      productAssocs.forEach((pa) => {
        listAllBrands.push(pa.brand);
      });

      let brands = listAllBrands.reduce(
        (b, c) => (
          (
            b[b.findIndex((d) => d.brand_name === c)] ||
            b[b.push({ brand_name: c, brand_count: 0 }) - 1]
          ).brand_count++,
          b
        ),
        []
      );

      // console.log(brands);
      return brands;
    },
  },
  mounted() {
    this.fetchAllCategory();
    this.fetchAllProductAssocDefault();
    // this.getBrands();
  },
  // created() {
  //   this.fetchAllCategory();
  //   this.fetchAllProductAssocDefault();
  //   // this.getBrands();
  // },
};
</script>

<style></style>
