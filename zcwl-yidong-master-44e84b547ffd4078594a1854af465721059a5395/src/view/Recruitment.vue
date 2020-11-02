<template>
  <div>
    <div class="container1">
      <div class="news">
        <!-- <img style=" height: 3.5rem;width: 100%;" :src="detail.top_image" alt /> -->
        <img style=" height: 3.5rem;
    width: 100%;
   " src="../assets/zpBg.png" alt />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/home";
export default {
  data() {
    return {
      detail: {},
      recruitList: [],
    };
  },
  methods: {
    getRecruit() {
      api.getRecruit().then((res) => {
        this.detail = res.data.detail;
      });
    },
  },
  created() {
    this.getRecruit();
  },
};
</script>