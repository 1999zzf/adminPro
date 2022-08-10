<template>
  <div class="wrapper">
    <div style="left: 0; right: 0; text-align: center; position: relative">
      <img src="../../assets/image/500.jpg" />
      <div
        style="position: absolute; z-index: 999; top: 70%; left: 0; right: 0"
      >
        {{ count }}秒后跳转到首页
      </div>
    </div>
  </div>
</template>

<script>
let that;
export default {
  components: {},
  props: {},
  data() {
    return {
      count: "",
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    that = this;
    const TIME_COUNT = 3;
    if (!this.timer) {
      this.count = TIME_COUNT;
      this.show = false;
      this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
        } else {
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
          //跳转的页面写在此处
          this.$router.push({
            path: "/components/commen/login",
          });
        }
      }, 1000);
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/commen/error.scss";
.wrapper {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat center;
}
</style>