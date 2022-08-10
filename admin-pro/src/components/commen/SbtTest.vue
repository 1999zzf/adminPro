<template>
  <div class="wrapper">
    <div v-show="isGet" class="body-l">
      <div style="position: absolute; top: 40%; left: 0; right: 0">
        <input
          v-model="inputValue"
          type="text"
          class="input_sbt"
          placeholder="请输入上包台对应的牌号"
        />
        <div @click="getIn()" class="getin_sbt">确定</div>
      </div>
    </div>
    <div v-show="!isGet" class="body-r">
      <div ref="getLeft" class="bodyRLeft">
        <div class="bodyRLeftUp">
          <div id="myChart"></div>
        </div>
        <div class="bodyRLeftDown">
          <div id="myChart2"></div>
        </div>
      </div>
      <div ref="getMid" class="bodyRMid">
        <div id="Home">
          <div class="select">
            <div
              class="select_item"
              v-for="item in mapList"
              :key="item.index"
              @click.stop="changeList(item)"
            >
              <p class="name" :class="item.type == currenIndex ? 'active' : ''">
                {{ item.name }}
              </p>
            </div>
          </div>
          <component :is="currenIndex" v-cloak />
        </div>
      </div>
    </div>
    <div @click="screen()" class="bodyRRight">
      <span style="background: #fff; padding: 5px 10px; border-radius: 5px">{{
        isInFullscreen
      }}</span>
    </div>
    <div
      @click="getLogin()"
      @mouseleave="showFalse()"
      @mouseenter="showTrue()"
      :class="[isshow ? 'outMaskForLogin' : 'outMaskForLoginF']"
      class="outMaskForLogin"
    >
      登录
    </div>
  </div>
</template>

<script>
let that;
import allMap from "../commen/allMap";
import screenfull from "screenfull";

export default {
  components: {
    allMap,
  },
  props: {},
  data() {
    return {
      inputValue: "",
      isGet: false,
      bodyLeftWidth: "",
      bodyLeftHeight: "",
      bodyMidWidth: "",
      bodyMidHeight: "",

      fullscreen: false,
      isInFullscreen: "全屏模式",
      isshow: false,

      currenIndex: "allMap",
      mapList: [
        {
          type: "allMap",
          name: "全国地图",
          index: 1,
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    getIn() {
      if (!that.inputValue) {
        that.$message({
          message: "请填写上包台牌号",
          type: "warning",
        });
      } else {
        that.isGet = true;
      }
    },
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = that.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      let option = {
        title: {
          text: "上包台数据",
          left: "left",
          top: 20,
          textStyle: {
            color: "#ccc",
          },
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: "实时数据",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "上包台1" },
              { value: 310, name: "上包台2" },
              { value: 274, name: "上包台3" },
              { value: 235, name: "上包台4" },
              { value: 400, name: "上包台5" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              normal: {
                formatter: "{b|{b}：}{c}  {per|{d}%}  ",
                rich: {
                  b: {},
                  per: {},
                },
                color: "rgba(255, 255, 255, 0.3)",
              },
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      };
      myChart.setOption(option);
      // 先自定义高宽
      myChart.getDom().style.height = that.bodyLeftWidth + "px";
      myChart.getDom().style.height = that.bodyLeftHeight + "px";
      myChart.resize();
      // 高宽变化自适应变化
      window.onresize = function () {
        myChart.getDom().style.height = that.bodyLeftWidth + "px";
        myChart.getDom().style.height = that.bodyLeftHeight + "px";
        myChart.resize();
      };
    },
    drawLine() {
      let myChartLine = that.$echarts.init(document.getElementById("myChart2"));
      let option = {
        title: {
          text: "小时数据",
          left: "left",
          top: 10,
          textStyle: {
            color: "#ccc",
          },
        },
        grid: {
          left: "12%",
          top: "10%",
          bottom: "12%",
          right: "8%",
        },
        xAxis: {
          data: [
            "上包台1",
            "上包台2",
            "上包台3",
            "上包台4",
            "上包台5",
            "上包台6",
            "上包台7",
            "上包台8",
          ],
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255, 129, 109, 0.1)",
              width: 1, //这里是为了突出显示加上的
            },
          },
          axisLabel: {
            textStyle: {
              color: "#999",
              fontSize: 12,
            },
          },
        },
        yAxis: [
          {
            splitNumber: 2,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 129, 109, 0.1)",
                width: 1, //这里是为了突出显示加上的
              },
            },
            axisLabel: {
              textStyle: {
                color: "#999",
              },
            },
            splitArea: {
              areaStyle: {
                color: "rgba(255,255,255,.5)",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 129, 109, 0.1)",
                width: 0.5,
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            name: "hill",
            type: "pictorialBar",
            barCategoryGap: "0%",
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            label: {
              show: true,
              position: "top",
              distance: 15,
              color: "#DB5E6A",
              fontWeight: "bolder",
              fontSize: 20,
            },
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(232, 94, 106, .8)", //  0%  处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(232, 94, 106, .1)", //  100%  处的颜色
                    },
                  ],
                  global: false, //  缺省为  false
                },
              },
              emphasis: {
                opacity: 1,
              },
            },
            data: [1231, 600, 2522, 1800, 1288, 900, 2666, 1098],
            z: 10,
          },
        ],
      };
      myChartLine.setOption(option);
      // 先自定义高宽
      myChartLine.getDom().style.height = that.bodyLeftWidth + "px";
      myChartLine.getDom().style.height = that.bodyLeftHeight + "px";
      myChartLine.resize();
      // 高宽变化自适应变化
      window.onresize = function () {
        myChartLine.getDom().style.height = that.bodyLeftWidth + "px";
        myChartLine.getDom().style.height = that.bodyLeftHeight + "px";
        myChartLine.resize();
      };
    },

    changeList(val) {
      if (val.type == this.currenIndex) {
        return;
      }
      this.currenIndex = val.type;
    },
    screen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        that.isInFullscreen = "全屏模式";
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          that.isInFullscreen = "退出全屏";
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    showTrue() {
      that.isshow = true;
    },
    showFalse() {
      that.isshow = false;
    },
    getLogin() {
      let element = document.documentElement;
      if (this.fullscreen) {
        that.isInFullscreen = "全屏模式";
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      if (that.isshow) {
        that.$router.push({
          path: "/components/commen/login",
        });
      }
    },
  },
  created() {},
  mounted() {
    that = this;
    //左侧高宽
    that.bodyLeftWidth = Math.floor(that.$refs.getLeft.clientWidth);
    that.bodyLeftHeight = Math.floor(that.$refs.getLeft.clientHeight / 2);
    //中间高宽
    that.bodyMidWidth = Math.floor(that.$refs.getMid.clientWidth);
    that.bodyMidHeight = Math.floor(that.$refs.getMid.clientHeight);
    that.drawPie();
    that.drawLine();
    // that.drawMap();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/commen/sbttest.scss";
#Home {
  width: 100%;
  height: 100%;
  position: relative;

  .select {
    position: absolute;
    left: 1%;
    top: 15%;
    z-index: 15;

    .select_item {
      padding: 6px 25px;
      color: rgb(179, 239, 255);
      background: rgba(147, 235, 248, 0.35);
      border-radius: 15px;
      margin: 25px 0;
      cursor: pointer;

      .active {
        color: rgb(254, 217, 50);
      }
    }
  }
}
</style>