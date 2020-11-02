<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide class="myslide" v-for="item in swiperList" :key="item.id">
      <img :src="item.image" alt />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  props: {
    swiperList: Array,
  },
  name: "carrousel",
  data() {
    return {
      swiperOptions: {
        autoplay: {
          delay:5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
        // Some Swiper option/callback...
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.myslide img {
  width: 100%;
  height: 800px;
  object-fit: cover;
}
</style>