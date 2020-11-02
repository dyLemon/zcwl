<template>
  <div  class="more" @click="to">
    MORE
    <span>/</span>
    <i class="el-icon-arrow-right"></i>
  </div>
</template>

<script>
export default {
  props: ["route"],
  created() {
    console.log(this.route);
  },
  methods: {
    to() {
      console.log(this.route);
      this.$router.push({ path: this.route });
    },
  },
};
</script>

<style scoped>
.more {
  width: 160px;
  height: 30px;
  border-bottom: 0.5px solid #959ea2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.more i {
  display: none;
}
.more:hover {
  color: #1d97cf;
  border-color: #1d97cf;
}
.more:hover i {
  display: inline;
}
.more:hover span {
  display: none;
}
</style>