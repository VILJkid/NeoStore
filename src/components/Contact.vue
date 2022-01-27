<template>
  <div>
    <div id="contact-page" class="container">
      <div class="bg">
        <div class="row">
          <div class="col-sm-12">
            <h2 class="title text-center">Contact <strong>Us</strong></h2>
            <!-- <div id="gmap" class="contact-map"></div> -->
          </div>
        </div>
        <div class="row">
          <div class="col-sm-8">
            <div class="contact-form">
              <h2 class="title text-center">Get In Touch</h2>
              <!-- <div
                class="status alert alert-success"
                style="display: none"
              ></div> -->
              <div
                v-if="detailsContact.successContact"
                class="alert alert-success"
              >
                {{ detailsContact.successContact }}
              </div>
              <div v-if="detailsContact.errorsContact.length > 0">
                <div
                  v-for="(error, index) in detailsContact.errorsContact"
                  :key="index"
                  class="alert alert-danger"
                >
                  {{ error }}
                </div>
              </div>
              <form class="contact-form row" @submit.prevent="contactUs">
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    required="required"
                    placeholder="Name"
                    v-model="detailsContact.name"
                  />
                </div>
                <div class="form-group col-md-6">
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    required="required"
                    placeholder="Email"
                    v-model="detailsContact.email"
                  />
                </div>
                <div class="form-group col-md-12">
                  <input
                    type="text"
                    name="subject"
                    class="form-control"
                    required="required"
                    placeholder="Subject"
                    v-model="detailsContact.subject"
                  />
                </div>
                <div class="form-group col-md-12">
                  <textarea
                    name="message"
                    id="message"
                    required="required"
                    class="form-control"
                    rows="8"
                    placeholder="Your Message Here"
                    v-model="detailsContact.message"
                  ></textarea>
                </div>
                <div class="form-group col-md-12">
                  <button type="submit" class="btn btn-primary pull-right">
                    Submit
                  </button>
                  <!-- <input
                    type="submit"
                    name="submit"
                    class="btn btn-primary pull-right"
                    value="Submit"
                  /> -->
                </div>
              </form>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="contact-info">
              <h2 class="title text-center">Contact Info</h2>
              <address>
                <p>Ecommerce Application</p>
                <p>NeoSOFT Technologies</p>
                <p>Planet Earth</p>
                <p>Mobile: +1234 56 78 90</p>
                <p>Fax: 1-234-567-8900</p>
                <p>Email: info@ecommerceapplication.com</p>
              </address>
              <div class="social-networks">
                <h2 class="title text-center">Social Networking</h2>
                <ul>
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
                  <!-- <li>
                    <a href="#"><i class="fa fa-google-plus"></i></a>
                  </li> -->
                  <li>
                    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank"
                      ><i class="fa fa-youtube"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/#contact-page-->
  </div>
</template>

<script>
import { contact } from "../common/service";

export default {
  name: "Contact",
  data() {
    return {
      detailsContact: {
        name: null,
        email: null,
        subject: null,
        message: null,
        errorsContact: [],
        successContact: null,
      },
    };
  },
  methods: {
    contactUs() {
      this.detailsContact.errorsContact = [];
      this.detailsContact.successContact = "";

      if (!this.detailsContact.name) {
        this.detailsContact.errorsContact.push("Name is required");
      }

      if (!this.detailsContact.email) {
        this.detailsContact.errorsContact.push("Email is required");
      }

      if (!this.detailsContact.subject) {
        this.detailsContact.errorsContact.push("Subject is required");
      }

      if (!this.detailsContact.message) {
        this.detailsContact.errorsContact.push("Message is required");
      }

      if (this.detailsContact.errorsContact.length == 0) {
        let formData = {
          name: this.detailsContact.name,
          email: this.detailsContact.email,
          subject: this.detailsContact.subject,
          message: this.detailsContact.message,
        };

        contact(formData)
          .then(() => {
            // console.log(res.data);

            this.$swal("Success", `Message sent successfully!`, "success");
            this.$router.push("/").catch(() => {});
          })
          .catch((error) => {
            this.$swal("Oops!", "Something went wrong.", "error");
            if (error.response) {
              if (error.response.status == 401) {
                console.log(error.response.data.error);
                this.detailsContact.errorsContact.push(
                  error.response.data.error
                );
              }
              if (error.response.status == 422) {
                if (error.response.data.name) {
                  console.log(error.response.data.name[0]);
                  this.detailserrorsContact.errorserrorsContact.push(
                    error.response.data.name[0]
                  );
                }

                if (error.response.data.email) {
                  console.log(error.response.data.email[0]);
                  this.detailserrorsContact.errorserrorsContact.push(
                    error.response.data.email[0]
                  );
                }

                if (error.response.data.subject) {
                  console.log(error.response.data.subject[0]);
                  this.detailserrorsContact.errorserrorsContact.push(
                    error.response.data.subject[0]
                  );
                }

                if (error.response.data.message) {
                  console.log(error.response.data.message[0]);
                  this.detailserrorsContact.errorserrorsContact.push(
                    error.response.data.message[0]
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
  },
};
</script>

<style></style>
