<template>
  <div
    @mouseenter="false_showaside()"
    @mouseleave="false_closeaside()"
    :class="[carousel ? 'wrapper_a' : 'wrapper_a_false']"
  >
    <div class="aside_header_title">
      <i class="admin_hengl"></i>
      <div :class="[carousel ? 'admin_word_a' : 'admin_word_false']">
        <span :class="[carousel ? 'span_word_a' : 'span_word_false']">易丰科技</span>
        <!-- <span :class="[carousel ? 'span_word_a' : 'span_word_false']">欣浩凯科技</span> -->

      </div>
    </div>
    <div class="aside_header_title">
      <i class="admin_logo"></i>
      <div :class="[carousel ? 'admin_word_a' : 'admin_word_false']">
        <span :class="[carousel ? 'span_word_a' : 'span_word_false']">{{userInfo.realName}}</span>
      </div>
    </div>

    <div v-for="(i1, index1) in list" :key="index1" class="aside_header_item">
      <div
        @click="getThisAside(i1, index1)"
        @mouseenter="changeActive(index1)"
        @mouseleave="removeActive(index1)"
        :class="[{ test: index1 === basicindex }, { op: needsop === index1 }]"
        class="aside_header_item_up"
      >
        <i v-if="i1.menuName == '系统管理'" class="admin_xtgl"></i>
        <i v-if="i1.menuName == '员工管理'" class="admin_yggl"></i>
        <i v-if="i1.menuName == '格口管理'" class="admin_gklb"></i>
        <i v-if="i1.menuName == '上包台管理'" class="admin_sbtgl"></i>
        <i v-if="i1.menuName == '分拣方案'" class="admin_gkfa"></i>
        <i v-if="i1.menuName == '运单信息管理'" class="admin_ydxxgl"></i>
        <i v-if="i1.menuName == '监控管理'" class="admin_jkgl"></i>
        <i v-if="i1.menuName == '物料管理'" class="admin_wlbj"></i>
        <i v-if="i1.menuName == 'I/O管理'" class="admin_i/ogl"></i>
        <div :class="[carousel ? 'admin_word_a' : 'admin_word_false']">
          <span style="line-height:30px" :class="[carousel ? 'span_word_a' : 'span_word_false']">
            {{
            i1.menuName
            }}
          </span>
        </div>
        <i
          v-if="i1.chrildList && i1.chrildList.length > 0"
          :class="[
            showaside === index1 ? 'admin_item_down' : 'admin_item_left',
          ]"
        ></i>
      </div>
      <collapse>
        <div v-if="showaside === index1">
          <div v-for="(i2, index2) in i1.chrildList" :key="index2">
            <div
              @click="choosechild(index2, index1, i2)"
              @mouseenter="choosechildenter(index2)"
              @mouseleave="choosechildlever(index2)"
              :class="[
                {
                  aside_header_item_conetnt_hover: index2 === choosechildindex,
                },
                {
                  childbg:
                    index2 === childbasicindex && index1 === childonlyindex,
                },
              ]"
              class="aside_header_item_conetnt"
            >
              <i
                v-if="i2.menuName == '运单测试'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_ydcs_choose'
                    : 'admin_item_ydcs',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '页面管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_ymgl_choose'
                    : 'admin_item_ymgl',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '角色管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_jsgl_choose'
                    : 'admin_item_jsgl',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '部门管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_bmgl_choose'
                    : 'admin_item_bmgl',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '用户管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_yhgl_choose'
                    : 'admin_item_yhgl',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '字典管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_zdgl_choose'
                    : 'admin_item_zdgl',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '计划任务'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_jhrw_choose'
                    : 'admin_item_jhrw',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '参数配置'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_cspz_choose'
                    : 'admin_item_cspz',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '员工账户'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_ygzh_choose'
                    : 'admin_item_ygzh',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '格口状态'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_gkzt_choose'
                    : 'admin_item_gkzt',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '特殊格口'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_tsgk_choose'
                    : 'admin_item_tsgk',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '格口绑包日志'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_gkbbrz_choose'
                    : 'admin_item_gkbbrz',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '上包台列表'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_sbtlb_choose'
                    : 'admin_item_sbtlb',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '百世分拣方案'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_bskd_choose'
                    : 'admin_item_bskd',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '申通分拣方案'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_stkd_choose'
                    : 'admin_item_stkd',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '圆通分拣方案'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_ytkd_choose'
                    : 'admin_item_ytkd',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '分拣方案'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_fjfa_choose'
                    : 'admin_item_fjfa',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '极兔分拣方案'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_jtfj_choose'
                    : 'admin_item_jtfj',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '共配分拣方案'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_gpfj_choose'
                    : 'admin_item_gpfj',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '华勤分拣方案'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_hqfj_choose'
                    : 'admin_item_hqfj',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '运单信息'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_ydxx_choose'
                    : 'admin_item_ydxx',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '京东运单管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_jdyd_choose'
                    : 'admin_item_jdyd',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '华勤运单管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_hqyd_choose'
                    : 'admin_item_hqyd',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '区域管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_qygl_choose'
                    : 'admin_item_qygl',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '相机管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_xjgl_choose'
                    : 'admin_item_xjgl',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '格口管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_gkgl_choose'
                    : 'admin_item_gkgl',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '物料报价'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_wlbj_choose'
                    : 'admin_item_wlbj',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '报价方案'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_bjfa_choose'
                    : 'admin_item_bjfa',
                ]"
              ></i>
              <i
                v-if="i2.menuName == '格口I/O管理'"
                :class="[
                  index2 === childbasicindex && index1 === childonlyindex
                    ? 'admin_item_bjfa_choose'
                    : 'admin_item_bjfa',
                ]"
              ></i>
              <div :class="[carousel ? 'admin_word_a' : 'admin_word_false']">
                <span
                  :style="{
                    color:
                      index2 === childbasicindex && index1 === childonlyindex
                        ? '#000'
                        : '#f5f5f5',
                  }"
                  :class="[carousel ? 'span_word_a' : 'span_word_false']"
                >{{ i2.menuName }}</span>
              </div>
              <i
                v-if="i2.chrildList && i2.chrildList.length > 0"
                :class="[
                  showinchild === index2
                    ? 'admin_item_down_black' 
                    : 'admin_item_left_black',
                ]"
              ></i>
            </div>

            <collapse>
              <div v-if="showinchild === index2">
                <div
                  v-for="(i3, index3) in i2.chrildList"
                  :key="index3"
                  style="
                    height: 40px;
                    line-height: 40px;
                    transition: 1s;
                    padding: 1px 0;
                    margin-bottom: 10px;
                  "
                >
                  <div
                    @click="inchoosechild(index3, index2, index1, i3)"
                    @mouseenter="inchoosechildenter(index3)"
                    @mouseleave="inchoosechildlever(index3)"
                    :class="[
                      {
                        aside_header_item_conetnt_child_hover:
                          index3 === inchoosechildindex,
                      },
                      {
                        childbg:
                          index3 === inchildbasicindex &&
                          index2 === inchildonlyindex &&
                          index1 === infirstIndex,
                      },
                    ]"
                    class="aside_header_item_conetnt_child"
                  >
                    <i
                      :class="[
                        index3 === inchildbasicindex &&
                        index2 === inchildonlyindex &&
                        index1 === infirstIndex
                          ? 'admin_item_content_logo_choose'
                          : 'admin_item_content_logo',
                      ]"
                    ></i>
                    <div :class="[carousel ? 'admin_word_a' : 'admin_word_false']">
                      <span
                        :style="{
                          color:
                            index3 === inchildbasicindex &&
                            index2 === childbasicindex &&
                            index1 === infirstIndex
                              ? '#000'
                              : '#f5f5f5',
                        }"
                        :class="[carousel ? 'span_word_a' : 'span_word_false']"
                      >{{ i3.menuName }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </collapse>
          </div>
        </div>
      </collapse>
    </div>
  </div>
</template>

<script>
let that;

import collapse from "../../utils/col.js";
export default {
  components: {
    collapse,
  },
  props: ["message"],
  data() {
    return {
      isopen: "",
      showaside: false,
      showinchild: false,
      basicindex: 0,
      childbasicindex: -1,
      choosechildindex: -1,
      childonlyindex: -1,
      inchildbasicindex: -1,
      inchoosechildindex: -1,
      inchildonlyindex: -1,
      infirstIndex: -1,
      needsop: -1,
      false_isshow: false,
      list: [],

      userInfo: [],
    };
  },
  watch: {},
  computed: {
    carousel() {
      return this.$store.state.isopen;
    },
    getNewList() {
      if (this.$store.state.isChangeAsideList) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    getData() {
      that.$post("menu/getTreeMenuList", {}).then(function (data) {
        if (data && data.code == "0000") {
          that.list = data.data;
          sessionStorage.setItem("asideData", JSON.stringify(data.data));
        } else {
          that.$message({
            message: data.msg,
            type: "warning",
          });
        }
      });
    },
    //外层点击
    getThisAside(i1, index1) {
      that.basicindex = index1;
      that.needsop = false;
      that.showinchild = false;
      // that.childbasicindex=-1;

      if (i1.chrildList && i1.chrildList.length > 0) {
        if (that.showaside === index1) {
          that.showaside = false;
        } else {
          that.showaside = index1;
        }
      } else {
        that.showaside = false;
        this.$emit("geturl", [i1, index1]);
      }
    },
    //外面鼠标划入
    changeActive(index1) {
      if (that.basicindex != index1) {
        that.needsop = index1;
      } else if (that.basicindex === index1) {
        that.name = false;
      }
    },
    //外面鼠标离开
    removeActive() {
      that.needsop = false;
    },
    //内层点击
    choosechild(index2, index1, i2) {
      console.log(i2);
      if (i2.chrildList && i2.chrildList.length > 0) {
        if (that.showinchild === index2) {
          that.choosechildindex = -1;
          that.childbasicindex = index2;
          that.childonlyindex = index1;
          // that.sendMsg(i2,index1,index2)
          that.showinchild = false;
        } else {
          that.choosechildindex = -1;
          that.childbasicindex = index2;
          that.childonlyindex = index1;
          // that.sendMsg(i2,index1,index2)
          that.showinchild = index2;
        }
      } else {
        (that.infirstIndex = -1), (that.showinchild = false);
        that.choosechildindex = -1;
        that.childbasicindex = index2;
        that.childonlyindex = index1;
        this.$emit("geturl", [i2, index1, index2]);

        // that.sendMsg(i2, index1, index2);
      }
    },
    //3层点击
    inchoosechild(index3, index2, index1, i3) {
      // console.log(i3);
      that.inchoosechildindex = -1;
      that.inchildbasicindex = index3;
      that.inchildonlyindex = index2;
      that.infirstIndex = index1;
      this.$emit("geturl", [i3, index1, index2, index3]);
    },
    //3层鼠标划入
    inchoosechildenter(index3) {
      that.inchoosechildindex = index3;
    },
    //3层鼠标离开
    inchoosechildlever(index3) {
      that.inchoosechildindex = -1;
    },
    sendMsg(i2, index1, index2) {
      //geturl: 是父组件指定的传数据绑定的函数
      this.$emit("geturl", [i2, index1, index2]);
    },
    //内层划入
    choosechildenter(index2) {
      that.choosechildindex = index2;
      // console.log(index2)
    },
    //内层离开
    choosechildlever() {
      that.choosechildindex = -1;
    },
    //最外层判断是否需要展开
    false_showaside() {
      if (window.innerWidth > 900 && !this.$store.state.isshowaside) {
        that.$store.commit({
          type: "change_isopen",
          isopen: true,
        });
      }
    },
    //最外层判断是否需要关闭
    false_closeaside() {
      if (window.innerWidth > 900 && !this.$store.state.isshowaside) {
        that.$store.commit({
          type: "change_isopen",
          isopen: false,
        });
      }
    },
  },
  created() {},
  mounted() {
    that = this;
    that.isopen = that.$store.state.isopen;
    that.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    that.getData();
    // console.log(that.message)
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/commen/aside.scss";
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: #f5f5f5;
}
</style>