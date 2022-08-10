<template>
  <div class="wrapper">
    <el-container>
      <el-aside
        width="300px"
        style="background: black; color: white; overflow: auto; height: 100vh"
        ><div
          style="
            height: 35px;
            line-height: 35px;
            display: flex;
            padding: 15px 10px;
            border-bottom: 1px solid #4b545c;
          "
        >
          <el-image
            :src="url"
            style="background-size: 40px; height:40px;margin-left: 5px"
          ></el-image>
          <div
            style="
              margin: 0 0 0 10px;
              width: 100%;
              font-size: 18px;
              line-height: 40px;
            "
          >
            <span>易丰智能</span>
          </div>
        </div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="black"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>运单信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1" @click="check()"
                >华勤运单管理</el-menu-item
              >
              <el-menu-item index="2" @click="check1()"
                >华勤运输单记录</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header></el-header>
        <el-main><div style="z-index:100000;width:100px;height:100px;background-color:blue">1111111</div></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: require("../assets/image/yflogo.png"),
    };
  },
  methods: {
    check() {
      this.$router.push("/components/hq_waybillManagement");
    },
    check1() {
      this.$router.push("/components/hq_transportation");
    },
  },
};
</script> 