<template>
  <div class="wrapper">
    <div class="headerTop">
      <el-row>
        <el-col :span="24">
          <!-- <el-button
            v-if="showZJ"
            @click="showAddToast()"
            type="primary"
            icon="el-icon-circle-plus"
            >增加</el-button
          > -->
          <el-button
            @click="getDownLoad()"
            icon="el-icon-download"
            type="primary"
          >下载</el-button>
          <el-button
            @click="showSearchToast()"
            type="primary"
            icon="el-icon-search"
            >搜索</el-button
          >
          <el-button type="info" icon="el-icon-delete" @click="clearAll()"
            >清除</el-button
          >
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6">
          <div>
            运单号:
            <el-input
              style="width: 65%"
              placeholder="运单号"
              v-model="ydh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            下一站网点:
            <el-input
              style="width: 65%"
              placeholder="下一站网点"
              v-model="xyzwd"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            上包台号:
            <el-input
              style="width: 65%"
              placeholder="上包台号"
              v-model="sbth"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            序列号:
            <el-input
              style="width: 65%"
              placeholder="序列号"
              v-model="xlh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6">
          <div>
            包袋号:
            <el-input
              style="width: 65%"
              placeholder="包袋号"
              v-model="bdh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            运单状态:
            <el-select
              style="width: 65%"
              clearable
              v-model="ydzt"
              placeholder="运单状态"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            进出港类型:
            <el-select
              style="width: 65%"
              clearable
              v-model="jcg"
              placeholder="进出港类型"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            指定格口:
            <el-input
              style="width: 65%"
              placeholder="指定格口"
              v-model="zdgk"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6">
          <div>
            实际格口:
            <el-input
              style="width: 65%"
              placeholder="实际格口"
              v-model="sjgk"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            快递类型:
            <el-select
              style="width: 65%"
              clearable
              v-model="kdlx"
              placeholder="快递类型"
            >
              <el-option
                v-for="item in errList"
                :key="item.dictionaryKey"
                :label="item.dictionaryDes"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            时间段:
            <el-date-picker
              v-model="lrsj"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
    </div>
    <div :style="{ height: bodyHeight - 250 + 'px' }" class="contentBody">
      <el-table
        :style="{ height: bodyHeight - 250 + 'px' }"
        :data="tableData"
        border
        stripe
        style="width: 100%; overflow: auto"
        :height="bodyHeight - 250"
      >
        <el-table-column
          fixed="left"
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
          align="center"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="waybillNo"
          label="运单号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="destNodeCode"
          label="下一站网点"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="weight"
          label="重量(kg)"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="tableNo"
          label="上包台号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="gmtCreate"
          label="录入时间"
        ></el-table-column>
        <el-table-column align="center" prop="gmtModified" label="落格时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.gmtModified !== null ? scope.row.gmtModified : "-"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="employeeNo"
          label="操作人员编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="employeeName"
          label="操作人员姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="serialNo"
          label="序列号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="packageCode"
          label="包袋号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="carNo"
          label="小车号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="sortingOrderStateName"
          label="运单状态"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="flowDirectionName"
          label="进出港"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="subSysDaTouBi"
          label="子系统三段码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="latticeNo"
          label="指定格口"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="actualLatticNo"
          label="实际格口"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="expressTypeName"
          label="快递类型"
        ></el-table-column>
        <el-table-column align="center" label="图像追溯">
          <template v-slot="scope">
            <el-button type="warning" @click="look(scope.row)" size="mini"
              >显示</el-button
            ><el-dialog
              :visible.sync="dialogVisible"
              width="47%"
              :append-to-body="true"
            >
              <img :src="url" alt="" width="100%" height="100%" />
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageCurrent">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 15, 25, 35, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
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
      showZJ: false,
      showBJ: false,
      showSC: false,
      showRef: false,
      bodyHeight: "",
      tableData: [],
      currentPage: 1,
      dialogVisible: false,
      pageNum: 1, //当前页
      pageSize: 50, //每页显示条目数
      count: 0,

      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表

      errList: [],
      options: [
        {
          value: "1",
          label: "进港",
        },
        {
          value: "0",
          label: "出港",
        },
      ],
      options2: [
        {
          value: "0",
          label: "落格完成",
        },
        {
          value: "1",
          label: "待分拣",
        },
        {
          value: "2",
          label: "查询格口失败",
        },
        {
          value: "3",
          label: "匹配格口失败",
        },
        {
          value: "4",
          label: "分拣中",
        },
        {
          value: "5",
          label: "锁格异常",
        },
        {
          value: "6",
          label: "补码异常",
        },
        {
          value: "7",
          label: "上传运单完成",
        },
        {
          value: "8",
          label: "上传运单失败",
        },
        {
          value: "9",
          label: "齐格上传完成",
        },
      ],
      ydh: "",
      xyzwd: "",
      sbth: "",
      lrsj: "",
      xlh: "",
      bdh: "",
      ydzt: "",
      jcg: "",
      zdgk: "",
      sjgk: "",
      kdlx: "",
      formLabelWidth: "110px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      showUpLoad: false,
      visible: false,
      type: "",
      url: "",
      thisRowId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    //
    look(row) {
      console.log(row);
      that.dialogVisible = true;
      that.url = row.imgUrl;
      console.log(that.url)
    },
    getDownLoad() {
      if (that.tableData) {
        that
          .$confirm("点击确定将下载文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            console.log(that.lrsj);
            if (that.lrsj) {
              window.location.href =
                sessionStorage.getItem("IP") +
                "sortingOrderInfo/export" +
                "?waybillNo=" +
                that.ydh +
                "&destNodeCode=" +
                that.xyzwd +
                "&tableNo=" +
                that.sbth +
                "&startTime=" +
                that.lrsj[0] +
                "&endTime=" +
                that.lrsj[1] +
                "&serialNo=" +
                that.xlh +
                "&packageCode=" +
                that.bdh +
                "&sortingState=" +
                that.ydzt +
                "&flowDirection=" +
                that.jcg +
                "&latticeNo=" +
                that.zdgk +
                "&actualLatticNo=" +
                that.sjgk +
                "&expressType=" +
                that.kdlx;
            } else {
              window.location.href =
                sessionStorage.getItem("IP") +
                "sortingOrderInfo/export" +
                "?waybillNo=" +
                that.ydh +
                "&destNodeCode=" +
                that.xyzwd +
                "&tableNo=" +
                that.sbth +
                "&startTime=" +
                "" +
                "&endTime=" +
                "" +
                "&serialNo=" +
                that.xlh +
                "&packageCode=" +
                that.bdh +
                "&sortingState=" +
                that.ydzt +
                "&flowDirection=" +
                that.jcg +
                "&latticeNo=" +
                that.zdgk +
                "&actualLatticNo=" +
                that.sjgk +
                "&expressType=" +
                that.kdlx;
            }
          })
          .catch(() => {});
      } else {
        that.$message({
          message: "当前展示的数据为空,不能下载",
          type: "warning",
        });
      }
    },

    clearAll() {
      that.ydh = "";
      that.xyzwd = "";
      that.sbth = "";
      that.xlh = "";
      that.bdh = "";
      that.ydzt = "";
      that.jcg = "";
      that.zdgk = "";
      that.sjgk = "";
      that.kdlx = "";
      that.pageNum = 1;
      that.currentPage = 1;
      that.getData();
    },
    geterr() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "express_type",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.errList = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    getData() {
      that
        .$post("sortingOrderInfo/getSortingOrderInfoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          // startTime: that.changeData(that.lrsj[0]),
          // endTime: that.changeData(that.lrsj[1]),
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.count = data.page.count;
            that.tableData = data.page.list;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    handleSizeChange(val) {
      that.pageSize = val;
      if (that.lrsj == null) {
        that.$message({
          message: "请选择一段日期时间",
        });
      } else {
        if (
          that.ydh ||
          that.xyzwd ||
          that.sbth ||
          that.changeData(that.lrsj[0]) ||
          that.changeData(that.lrsj[1]) ||
          that.xlh ||
          that.bdh ||
          that.ydzt ||
          that.jcg ||
          that.zdgk ||
          that.sjgk ||
          that.kdlx
        ) {
          that.search(
            that.changeData(that.lrsj[0]),
            that.changeData(that.lrsj[1])
          );
        } else {
          that.getData();
        }
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.lrsj == null) {
        that.$message({
          message: "请选择一段日期时间",
        });
      } else {
        if (
          that.ydh ||
          that.xyzwd ||
          that.sbth ||
          that.changeData(that.lrsj[0]) ||
          that.changeData(that.lrsj[1]) ||
          that.xlh ||
          that.bdh ||
          that.ydzt ||
          that.jcg ||
          that.zdgk ||
          that.sjgk ||
          that.kdlx
        ) {
          that.search(
            that.changeData(that.lrsj[0]),
            that.changeData(that.lrsj[1])
          );
        } else {
          that.getData();
        }
      }
    },

    showSearchToast() {
      if (that.lrsj == null) {
        that.$message({
          message: "请选择一段日期时间",
        });
      } else {
        let st = that.changeData(that.lrsj[0]);
        let et = that.changeData(that.lrsj[1]);
        that.pageNum = 1;
        that.currentPage = 1;
        that.search(st, et);
      }
    },
    search(st, et) {
      console.log(that.ydh);
      if (st === "NaN-NaN-NaN NaN:NaN:NaN") {
        st = "";
      }
      if (et === "NaN-NaN-NaN NaN:NaN:NaN") {
        et = "";
      }
      console.log(that.lrsj[0]);
      that
        .$post("sortingOrderInfo/getSortingOrderInfoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          waybillNo: that.ydh,
          destNodeCode: that.xyzwd,
          tableNo: that.sbth,
          startTime: st,
          endTime: et,
          serialNo: that.xlh,
          packageCode: that.bdh,
          sortingState: that.ydzt,
          flowDirection: that.jcg,
          latticeNo: that.zdgk,
          actualLatticNo: that.sjgk,
          expressType: that.kdlx,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.count = data.page.count;
            that.tableData = data.page.list;
            // that.geterr();
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    changeData(dataWord) {
      var str = dataWord;
      var d = new Date(str);
      var a = [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ];
      for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] < 10) {
          a[i] = "0" + a[i];
        }
      }
      str =
        a[0] + "-" + a[1] + "-" + a[2] + " " + a[3] + ":" + a[4] + ":" + a[5];
      return str;
    },
  },
  created() {},
  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth();
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf =
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes();
    let ss =
      new Date().getSeconds() < 10
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds();
    // that.Etime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    // that.lrsj = [
    //   new Date(yy, mm, dd - 3, hh, mf, ss),
    //   new Date(yy, mm, dd, hh, mf, ss),
    // ];

    // that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    // if (that.asideData) {
    //   for (var ti = 0; ti < that.asideData.length; ti++) {
    //     for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
    //       if (
    //         that.asideData[ti].chrildList[tis].pageUrl == "waybillLnformation"
    //       )
    //         for (
    //           var tiss = 0;
    //           tiss < that.asideData[ti].chrildList[tis].buttonList.length;
    //           tiss++
    //         ) {
    //           if (
    //             that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
    //             "增加"
    //           ) {
    //             that.showZJ = true;
    //           }
    //           if (
    //             that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
    //             "删除"
    //           ) {
    //             that.showSC = true;
    //           }
    //           if (
    //             that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
    //             "编辑"
    //           ) {
    //             that.showBJ = true;
    //           }
    //         }
    //     }
    //   }
    // }
    that.getData();
    that.geterr();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/waybillLnformation.scss";
</style>