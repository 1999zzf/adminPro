<template>
  <div class="wrapper">
    <div :style="{ height: body_index_height + 'px' }" class="body_index">
      <div class="aside_left">
        <v_aside
          ref="getchildFun"
          :message="parentMsg"
          @geturl="getMsgFormSon"
        />
      </div>
      <div
        :style="{ width: content_width + 'px' }"
        style="transition: 0.4s"
        class="body_right"
      >
        <v_header />
        <div style="display: flex">
          <div style="width: 100%" ref="getThisWidthOut" class="scroll-wrapper">
            <div @click="moveToLeft" v-show="hasLongLength" class="moveleft">
              <i class="el-icon-caret-left"></i>
            </div>
            <div v-show="hasLongLength" class="moveBg"></div>
            <div @click="moveToRight" v-show="hasLongLength" class="moveright">
              <i class="el-icon-caret-right"></i>
            </div>
            <div
              :style="[
                { transform: 'translateX(-' + transWidthBasic + 'px)' },
                { transition: '.1s' },
              ]"
              ref="getThisWidth"
              class="aside_list scroll-content"
            >
              <div
                style="transition: 0.2s"
                class="flex_list"
                :class="{
                  onActive: i.pageUrl === router_name,
                  onActive2: index1 === choose_title,
                }"
                v-show="i.title"
                @click="chooseTitle(i, index1)"
                v-for="(i, index1) in getchange_list"
                :key="index1"
              >
                {{ i.title }}
              </div>
            </div>
          </div>
        </div>
        <!-- 嵌套路由 -->
        <router-view
          :style="{
            height: body_index_height - 124 + 'px',
            background: '#f5f5f5',
            padding: '10px 0',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
let that;
import v_header from "../commen/header.vue";
import v_aside from "../commen/aside.vue";

import BScroll from "@better-scroll/core";

export default {
  components: {
    v_header,
    v_aside,
  },
  props: {},
  data() {
    return {
      body_index_height: "", //body自适应高度
      msgFormSon: "",
      title_list: [
        {
          title: "运单信息",
          pageUrl: "waybillLnformation",
          out: 0,
          in: 0,
          child: 0,
        },
      ],
      getchange_list: [
        {
          title: "运单信息",
          pageUrl: "waybillLnformation",
          out: 0,
          in: 0,
          child: 0,
        },
      ],
      choose_title: -1,

      router_name: "",

      parentMsg: "",

      ruleList: [],
      transWidthBasic: 0, //基准
      transWidth: 0, //平移
      transWidthLeft: 0,
      left: false,
      right: false,
      hasLongLength: false,
    };
  },
  watch: {},
  computed: {
    content_width() {
      if (this.$store.state.isopen) {
        return window.innerWidth - 260;
      } else {
        return window.innerWidth - 70;
      }
    },
  },
  methods: {
    //移动title背景板
    moveToLeft() {
      that.transWidthBasic = 0;
    },
    moveToRight() {
      that.transWidthBasic = that.transWidth;
    },
    //小title滚动
    init() {
      // this.bs = new BScroll(this.$refs.scroll, {
      //   scrollX: true,
      //   probeType: 4, // listening scroll hook
      // });
      // this._registerHooks(["scroll", "scrollEnd"], (pos) => {
      //   // console.log('done')
      // });
    },
    _registerHooks(hookNames, handler) {
      hookNames.forEach((name) => {
        this.bs.on(name, handler);
      });
    },

    chooseTitle(i, index1) {
      // this.$refs.getchildFun.getThisAside(i.pageUrl, i.out);

      // console.log(i)
      // if(i.in != ''){
      //   this.$refs.getchildFun.choosechild(i.in,i.out,i.url);
      // }else{
      //   this.$refs.getchildFun.getThisAside(i.url,i.out);
      // }
      that.parentMsg = i.title;
      that.router_name = "";
      that.choose_title = index1;
      that.$router.push({
        name: i.pageUrl,
      });
    },
    getMsgFormSon(data) {
      that.ruleList = data[0].buttonList;
      //往头部添加小项
      that.choose_title = "";
      if (data[0].chrildList && data[0].chrildList.length == 0) {
        if (that.title_list.length) {
          if (data.length === 2) {
            that.title_list.push({
              title: data[0].menuName,
              pageUrl: data[0].pageUrl,
              out: data[1],
              in: "",
              child: "",
            });
          } else if (data.length === 3) {
            that.title_list.push({
              title: data[0].menuName,
              pageUrl: data[0].pageUrl,
              out: data[1],
              in: data[2],
              child: "",
            });
          } else if (data.length === 4) {
            that.title_list.push({
              title: data[0].menuName,
              pageUrl: data[0].pageUrl,
              out: data[1],
              in: data[2],
              child: data[3],
            });
          }
        }
      }
      let obj = {};
      let peon = that.title_list.reduce((cur, next) => {
        obj[next.title] ? "" : (obj[next.title] = true && cur.push(next));
        return cur;
      }, []); //初始值为空
      that.getchange_list = peon;
      that.msgFormSon = data[0].pageUrl;

      if (
        that.getchange_list.length * 80 +
          that.getchange_list.length * 3 -
          this.$refs.getThisWidthOut.clientWidth >
        0
      ) {
        that.hasLongLength = true;
        that.transWidth =
          that.getchange_list.length * 80 +
          that.getchange_list.length * 3 -
          this.$refs.getThisWidthOut.clientWidth +
          40;
        that.transWidthBasic = that.transWidth;
      }

      that.init();

      that.$router.push({
        name: that.msgFormSon,
      });
      that.router_name = data[0].pageUrl;
    },
  },
  created() {
    that = this;
    if (window.innerWidth > 900) {
      //根据屏幕宽度判断是否需要展开侧边栏
      that.$store.commit({
        type: "change_isopen",
        isopen: true,
      });
    } else {
      that.$store.commit({
        type: "change_isopen",
        isopen: false,
      });
    }
  },
  mounted() {
    that.body_index_height = window.innerHeight; //body高度===减去header组件的高度
  },
  // beforeDestroy() {
  //     this.bs.destroy()
  //   },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/index.scss";
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: #f5f5f5;
}
</style>