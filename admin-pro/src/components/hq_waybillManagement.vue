<template>
  <div class="wrapper">
    <el-container>
      <el-aside>
        <Left></Left>
      </el-aside>
      <el-container>
        <el-header
          ><div
            style="text-align: center; border: 5px solid red; height: 100px"
          >
            <span style="margin-top: 30px; display: block; font-size: 30px"
              >华勤运单管理</span
            >
          </div></el-header
        >
        <el-main>
          <div class="headerTop" style="margin-top: 50px">
            <el-row>
              <el-col :span="24">
                <el-button
                  @click="showSearchToast()"
                  type="primary"
                  icon="el-icon-search"
                  >搜索</el-button
                >
                <el-button type="info" icon="el-icon-delete" @click="clearAll()"
                  >清除</el-button
                >
                <el-button type="primary" @click="dialogVisible1 = true"
                  >生成运输单</el-button
                >
                <el-dialog
                  title="生成运输单"
                  :visible.sync="dialogVisible1"
                  width="30%"
                >
                  <div>
                    格口号:
                    <el-input
                      style="width: 90%"
                      placeholder="请输入格口号"
                      v-model="Gkh"
                      clearable
                      autocomplete="off"
                    ></el-input>
                  </div>
                  <div style="margin-top: 10px">
                    分拣起始时间:
                    <el-date-picker
                      style="width: 82%"
                      v-model="Fjqs"
                      type="datetime"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    >
                    </el-date-picker>
                  </div>
                  <div style="margin-top: 10px">
                    分拣结束时间:
                    <el-date-picker
                      style="width: 82%"
                      v-model="Fjjs"
                      type="datetime"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    >
                    </el-date-picker>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="create()"
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
                <el-button
                  type="warning"
                  @click="get_logout()"
                  style="margin-left: 10px"
                  >退出</el-button
                >
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="6">
                <div>
                  运单编号:
                  <el-input
                    style="width: 49%"
                    placeholder="请输入运单编号"
                    v-model="ydh"
                    clearable
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6"> </el-col>
              <el-col :span="6">
                <div>
                  出口号:
                  <el-input
                    style="width: 49%"
                    placeholder="请输入出口号"
                    v-model="ckh"
                    clearable
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  格口号:
                  <el-input
                    style="width: 49%"
                    placeholder="请输入格口号"
                    v-model="gkh"
                    clearable
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  分拣状态:
                  <el-select
                    style="width: 49%"
                    clearable
                    v-model="fjzt"
                    placeholder="请选择"
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
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="12">
                <div>
                  分拣时间:
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
              <el-col :span="12">
                <div>
                  上传运单时间:
                  <el-date-picker
                    v-model="scydsj"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
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
              style="width: 100%; overflow: auto"
              :row-class-name="tableRowClassName"
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
                prop="requestId"
                label="请求ID"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="serialNo"
                label="运单编号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="outPort"
                label="出口号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="latticeNo"
                label="格口号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="groupNo"
                label="箱号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="creator"
                label="创建人"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="sortingStateName"
                label="分拣状态"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="gmtCreate"
                label="分拣时间"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="gmtModified"
                label="上传运单时间"
              ></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row), (dialogVisible = true)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-dialog
                    title="编辑"
                    :visible.sync="dialogVisible"
                    :append-to-body="true"
                    width="30%"
                  >
                    <div>
                      运单编号:
                      <el-input
                        style="width: 49%"
                        placeholder="请输入运单编号"
                        v-model="Ydh"
                        clearable
                        autocomplete="off"
                      ></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="sure()"
                        >确 定</el-button
                      >
                    </span>
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
              :page-sizes="[5, 15, 25, 35]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="count"
            ></el-pagination></div
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import left from "./left.vue";
let that;
export default {
  components: {
    Left: left
  },
  props: {},
  data() {
    return {
      url: require("../assets/image/yflogo.png"),
      bodyHeight: "",
      tableData: [],
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,
      ydh: "",
      Ydh: "",
      dialogVisible: false,
      dialogVisible1: false,
      Url: "",
      lrsj: [],
      Fjqs: "",
      Fjjs: "",
      scydsj: [],
      Etime: [],
      errList: [],
      xlh: "",
      bdh: "",
      jcg: "",
      ckh: "",
      gkh: "",
      Gkh: "",
      zdgk: "",
      id: "",
      sjgk: "",
      fjzt: "",
      user: "",
      password: "",
      formLabelWidth: "110px",
      showUpLoad: false,
      visible: false,
      type: "",
      thisRowId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    sure() {
      that
        .$post("huaQinOrderInfo/editHuaQinOrderInfo", {
          id: that.id,
          serialNo: that.Ydh,
        }) 
        .then(function (data) {
          if (data && data.code == "0000") {
            that.$message({
              message: data.msg,
              type: "success",
            });
            that.dialogVisible = false;
            that.getData();
          }
        });
    },
    create() {
      if (that.Gkh && that.Fjqs && that.Fjjs) {
        that
          .$post("huaQinOrderInfo/genTransportByLatticeNo", {
            latticeNo: that.Gkh,
            startTime: that.Fjqs,
            endTime: that.Fjjs,
          })
          .then(function (data) {
            if (data && data.code == "0000") {
              that.$message({
                message: data.msg,
                type: "success",
              });
              that.dialogVisible1 = false;
            } else {
              that.$message({
                message: data.msg,
                type: "warning",
              });
            }
          });
      } else {
        that.$message({
          message: "请全部输入",
          type: "warning",
        });
      }
    },
    tableRowClassName(row) {
      if (row.row.sortingState === "0" || row.row.sortingState === "7") {
        return "success-row";
      }
      return "";
    },
    handleClick(row) {
      that.Ydh = row.serialNo;
      that.id = row.id;
    },
    geterr() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "sorting_order_state",
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
    clearAll() {
      that.ydh = "";
      that.ckh = "";
      that.gkh = "";
      that.fjzt = "";
      that.pageNum = 1;
      that.currentPage = 1;
      that.getData();
    },
    get_logout() {
      that
        .$confirm("此操作将退出账号, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that.$router.push({
            path: "/components/commen/login",
          });
        })
        .catch(() => {});
    },
    getData() {
      that
        .$post("huaQinOrderInfo/getHuaQinOrderInfoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            console.log(data);
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
          that.rqbh ||
          that.sbth ||
          that.rfid ||
          that.changeData(that.lrsj[0]) ||
          that.changeData(that.lrsj[1]) ||
          that.changeData(that.scydsj[0]) ||
          that.changeData(that.scydsj[1]) ||
          that.xlh ||
          that.zdgk ||
          that.sjgk ||
          that.ydzt
        ) {
          that.search(
            that.changeData(that.lrsj[0]),
            that.changeData(that.lrsj[1]),
            that.changeData(that.scydsj[0]),
            that.changeData(that.scydsj[1])
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
          that.rqbh ||
          that.sbth ||
          that.rfid ||
          that.changeData(that.lrsj[0]) ||
          that.changeData(that.lrsj[1]) ||
          that.changeData(that.scydsj[0]) ||
          that.changeData(that.scydsj[1]) ||
          that.xlh ||
          that.zdgk ||
          that.sjgk ||
          that.ydzt
        ) {
          that.search(
            that.changeData(that.lrsj[0]),
            that.changeData(that.lrsj[1]),
            that.changeData(that.scydsj[0]),
            that.changeData(that.scydsj[1])
          );
        } else {
          that.getData();
        }
      }
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

    showSearchToast() {
      if (that.lrsj == null) {
        that.$message({
          message: "请选择一段日期时间",
        });
      } else if(that.scydsj==null){
         let st = that.changeData(that.lrsj[0]);
        let et = that.changeData(that.lrsj[1]);
        let st1 = ''
        let et1 = ''
        that.pageNum = 1;
        that.currentPage = 1;
        that.search(st, et, st1, et1);
      }else {
        let st = that.changeData(that.lrsj[0]);
        let et = that.changeData(that.lrsj[1]);
        let st1 = that.changeData(that.scydsj[0]);
        let et1 = that.changeData(that.scydsj[1]);
        that.pageNum = 1;
        that.currentPage = 1;
        that.search(st, et, st1, et1);
      }
    },
    search(st, et, st1, et1) {
      console.log(that.fjzt);
      that
        .$post("huaQinOrderInfo/getHuaQinOrderInfoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          serialNo: that.ydh,
          // packNo: that.tpbh,
          outPort: that.ckh,
          latticeNo: that.gkh,
          sortingState: that.fjzt,
          startTime: st,
          endTime: et,
          finishStartTime: st1,
          finishEndTime: et1,
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
    that.lrsj = [
      new Date(yy, mm, dd - 3, 24, 0, 0),
      new Date(yy, mm, dd, 24, 0, 0),
    ];
    that.scydsj = [
      new Date(yy, mm, dd - 3, 24, 0, 0),
      new Date(yy, mm, dd, 24, 0, 0),
    ];
    that.getData();
    that.geterr();
  },
};
</script>
<style>
.el-table .success-row {
  background: #94e767;
}
</style>
<style lang="scss" scoped>
@import "../assets/css/adminpages/waybillLnformation.scss";
</style> 