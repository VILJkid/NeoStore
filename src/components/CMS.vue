<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="blog-post-area">
              <h2 class="title text-center">Latest From our CMS</h2>
              <div
                class="single-blog-post"
                v-for="ccms in computedCMS"
                :key="ccms.id"
              >
                <h3>{{ ccms.cms_title }}</h3>
                <div class="post-meta">
                  <ul>
                    <li><i class="fa fa-user"></i> {{ ccms.cms_author }}</li>
                    <li>
                      <i class="fa fa-clock-o"></i>
                      {{
                        convertToNormal(ccms.updated_at).toLocaleString(
                          "default",
                          { hour12: true, hour: "numeric", minute: "numeric" }
                        )
                      }}
                    </li>

                    <li>
                      <i class="fa fa-calendar"></i>
                      {{
                        convertToNormal(ccms.updated_at).toLocaleString(
                          "default",
                          { month: "short" }
                        ) +
                        " " +
                        convertToNormal(ccms.updated_at).toLocaleString(
                          "default",
                          { day: "numeric" }
                        ) +
                        ", " +
                        convertToNormal(ccms.updated_at).toLocaleString(
                          "default",
                          { year: "numeric" }
                        )
                      }}
                    </li>
                  </ul>
                  <!-- <span>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half-o"></i>
                  </span> -->
                </div>
                <a v-bind:href="ccms.cms_url" target="_blank">
                  <img
                    v-bind:src="image_url + ccms.cms_image"
                    alt="Image not found"
                  />
                </a>
                <p>
                  {{ ccms.cms_desc }}
                </p>
                <a
                  class="btn btn-primary"
                  v-bind:href="ccms.cms_url"
                  target="_blank"
                  >Read More</a
                >
              </div>
              <!-- <div class="pagination-area">
                <ul class="pagination">
                  <li><a href="" class="active">1</a></li>
                  <li><a href="">2</a></li>
                  <li><a href="">3</a></li>
                  <li>
                    <a href=""><i class="fa fa-angle-double-right"></i></a>
                  </li>
                </ul>
              </div> -->
            </div>
            <div class="mb-5"><p></p></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getCMS } from "../common/service";
import { IMAGE_URL } from "../common/Url";

export default {
  name: "CMS",
  data() {
    return {
      cms: [],
      image_url: `${IMAGE_URL}`,
    };
  },
  methods: {
    fetchAllCMS() {
      getCMS()
        .then((res) => {
          // console.log(res.data.productAssocs);
          this.cms = res.data.cms;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    convertToNormal(timestamp) {
      // console.log(timestamp);
      let date = new Date(timestamp);
      // console.log(date);
      return date;
    },
  },

  computed: {
    computedCMS() {
      let tempCMS = this.cms;
      return tempCMS;
    },
  },

  mounted() {
    this.fetchAllCMS();
  },
};
</script>

<style></style>
