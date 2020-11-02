 <template>
  <div class="container">
    <div class="news">{{detail.title}}</div>
    <div class="sub1">{{detail.rel_time}}</div>
    <div class="linear"></div>
    <div class="clearfix content">
      <div v-html="detail.content"></div>
    </div>
    <!-- 11111111 -->
    <div class="next xybtn">
      <div v-if="detail.prev_news" @click="getNewsDetail(detail.prev_news.id)">上一篇</div>
      <div v-if="detail.next_news" @click="getNewsDetail(detail.next_news.id)">下一篇</div>
    </div>
    <!-- 222222 -->
    <div class="linear2"></div>
    <div class="recommend xybtn">
      <div class="left" v-if="detail.prev_news">
        <img
          :src="detail.prev_news.image"
          alt
        />
        <div class="mytime">{{detail.prev_news.rel_time}}</div>
        <div class="sub5">{{detail.prev_news.title}}</div>
      </div>

      <div class="right" v-if="detail.next_news">
        <img
          :src="detail.next_news.image"
          alt
        />
        <div class="mytime">{{detail.next_news.rel_time}}</div>
        <div class="sub5 myover">{{detail.next_news.rel_time}}</div>
      </div>
    </div>
  </div>
</template>
 <script>
import api from "@/api/home";
export default {
  data() {
    return {
      detail:{}
    };
  },
  methods: {
    getNewsDetail(id) {
      api.getNewsDetail(id).then((res) => {
        this.detail=res.data;
      });
    },
  },
  created() {
    let id = this.$route.params.id;
    this.getNewsDetail(id);
  },
};
</script>
 <style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.news {
  margin-top: 120px;
  margin-bottom: 16px;
  font-weight: 800;
  font-size: 34px;
  text-align: center;
}
.sub1 {
  margin-bottom: 38px;
  font-size: 14px;
  color: rgba(149, 158, 162, 1);
  text-align: center;
}
.linear {
  width: 1200px;
  height: 1px;
  background: rgba(76, 79, 80, 1);
  opacity: 1;
  margin: 0 auto;
  margin-bottom: 40px;
}
.content {
  text-align: center;
  img {
    max-width: 540px;
    object-fit: contain;
    margin-bottom: 35px;
  }
  div {
    margin-bottom: 35px;
    font-size: 18px;
  }
}
.next {
  width: 1200px;
  margin: 0 auto;
  div {
    font-size: 18px;
  }
}
.linear2 {
  width: 1200px;
  height: 1px;
  background: rgba(76, 79, 80, 1);
  margin-top: 17px;
  margin-bottom: 70px;
}
.recommend {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 120px;
}
.left,
.right {
  width: 560px;
  height: 420px;
  img {
    width: 560px;
    height: 330px;
    margin-bottom: 28px;
  }
  .mytime {
    font-size: 14px;
    color: rgba(149, 158, 162, 1);
    margin-bottom: 18px;
  }
  .sub5 {
    font-size: 22px;
    font-weight: 500;
  }
}
</style>