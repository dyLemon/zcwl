<template>
  <div class="newContainer">
    <div class="prev btn-1">
      <img src="@/assets/recrement/19.png" class="left-btn sm-btn btn-1" />
    </div>
    <div class="next btn-2">
      <img src="@/assets/recrement/18.png" class="right-btn sm-btn btn-2" />
    </div>
    <div>
      <swiper ref="mySwiper" :options="swiperOptions">
        <!-- <swiper-slide class="myslide" v-for="(item,index) in swiperList" :key="index">
          <div class="myslide2" @click="jumpurl(swiperList[index].id)">
            <img :src="swiperList[index].image" alt />
            <div class="myslide3">{{swiperList[index].rel_time}}</div>
            <div class="myslide4">{{swiperList[index].title}}</div>
          </div>
        </swiper-slide>-->

        <swiper-slide class="myslide myslide1" v-if="swiperList[0]">
          <div class="myslide2" v-if="swiperList[0]" @click="jumpurl(swiperList[0].id)">
            <img :src="swiperList[0].image" alt />
            <div class="myslide3">{{swiperList[0].rel_time}}</div>
            <div class="myslide4">{{swiperList[0].title}}</div>
          </div>
          <div class="myslide2" v-if="swiperList[1]" @click="jumpurl(swiperList[1].id)">
            <img :src="swiperList[1].image" alt />
            <div class="myslide3">{{swiperList[1].rel_time}}</div>
            <div class="myslide4">{{swiperList[1].title}}</div>
          </div>
          <div class="myslide2" v-if="swiperList[2]" @click="jumpurl(swiperList[2].id)">
            <img :src="swiperList[2].image" alt />
            <div class="myslide3">{{swiperList[2].rel_time}}</div>
            <div class="myslide4">{{swiperList[2].title}}</div>
          </div>
        </swiper-slide>

        <swiper-slide class="myslide myslide1" v-if="swiperList[3]">
          <div class="myslide2" v-if="swiperList[3]" @click="jumpurl(swiperList[3].id)">
            <img :src="swiperList[3].image" alt />
            <div class="myslide3">{{swiperList[3].rel_time}}</div>
            <div class="myslide4">{{swiperList[3].title}}</div>
          </div>
          <div class="myslide2" v-if="swiperList[4]" @click="jumpurl(swiperList[4].id)">
            <img :src="swiperList[4].image" alt />
            <div class="myslide3">{{swiperList[4].rel_time}}</div>
            <div class="myslide4">{{swiperList[4].title}}</div>
          </div>
          <div class="myslide2" v-if="swiperList[5]" @click="jumpurl(swiperList[5].id)">
            <img :src="swiperList[5].image" alt />
            <div class="myslide3">{{swiperList[5].rel_time}}</div>
            <div class="myslide4">{{swiperList[5].title}}</div>
          </div>
        </swiper-slide>

        <swiper-slide class="myslide myslide1" v-if="swiperList[6]">
          <div class="myslide2" v-if="swiperList[6]" @click="jumpurl(swiperList[6].id)">
            <img :src="swiperList[6].image" alt />
            <div class="myslide3">{{swiperList[6].rel_time}}</div>
            <div class="myslide4">{{swiperList[6].title}}</div>
          </div>
          <div class="myslide2" v-if="swiperList[7]" @click="jumpurl(swiperList[7].id)">
            <img :src="swiperList[7].image" alt />
            <div class="myslide3">{{swiperList[7].rel_time}}</div>
            <div class="myslide4">{{swiperList[7].title}}</div>
          </div>
          <div class="myslide2" v-if="swiperList[8]" @click="jumpurl(swiperList[8].id)">
            <img :src="swiperList[8].image" alt />
            <div class="myslide3">{{swiperList[8].rel_time}}</div>
            <div class="myslide4">{{swiperList[8].title}}</div>
          </div>
        </swiper-slide>

        <swiper-slide class="myslide myslide1" v-if="swiperList[9]">
          <div class="myslide2" v-if="swiperList[9]" @click="jumpurl(swiperList[9].id)">
            <img :src="swiperList[9].image" alt />
            <div class="myslide3">{{swiperList[9].rel_time}}</div>
            <div class="myslide4">{{swiperList[9].title}}</div>
          </div>
          <div class="myslide2" v-if="swiperList[10]" @click="jumpurl(swiperList[10].id)">
            <img :src="swiperList[10].image" alt />
            <div class="myslide3">{{swiperList[10].rel_time}}</div>
            <div class="myslide4">{{swiperList[10].title}}</div>
          </div>
          <div class="myslide2" v-if="swiperList[11]" @click="jumpurl(swiperList[11].id)"> 
            <img :src="swiperList[11].image" alt />
            <div class="myslide3">{{swiperList[11].rel_time}}</div>
            <div class="myslide4">{{swiperList[11].title}}</div>
          </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
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
        spaceBetween: 10,
        disabledClass: "my-button-disabled",
        navigation: {
          nextEl: ".next",
          prevEl: ".prev",
          disabledClass: "my-button-disabled",
        },
        pagination: {
          el: ".swiper-pagination",
        },
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
  methods: {
    jumpurl(id) {
      this.$router.push({ path: "/newsDetails/" + id });
    },
  },
};
</script>

<style lang="scss" scoped>
.myslide img {
  width: 434px;
  height: 256px;
  object-fit: cover;
}
.newContainer {
  width: 1920px !important;
  margin: 0 auto;
  height: 400px;
  display: flex;
  overflow: hidden;
  padding-right: 300px;

  //   background-color: pink;
  align-items: center;
  // padding-left: 75px;
}
.myslide1 {
  display: flex;
}
.myslide1 div {
  margin-right: 50px;
}
.aaa {
  width: 120px;
  height: 120px;
  background-color: yellow;
}
.my-button-disabled {
  opacity: 0.2;
  border: none;
}
.btn-1,
.btn-2 {
  width: 91px;
  height: 91px;
}
// .btn-1{
// transform: rotate(270deg);
// transform-origin:center;
// }

.btn-2 {
  margin-right: 75px;
}
.my-button-disabled {
  opacity: 0.2;
}
.myslide2 img {
  // box-sizing: border-box;
  margin-bottom: 20px;
}
.myslide3 {
  color: #959ea2;
  font-size: 14px;
  margin-bottom: 24px;
}
.myslide4 {
  font-size: 22px;
}
</style>
