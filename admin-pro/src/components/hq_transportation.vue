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
              >华勤运输单记录</span
            >
          </div></el-header
        >
        <el-main>
          <div class="headerTop" style="margin-top: 50px">
            <el-row>
              <el-col :span="24">
                <el-button @click="New()" type="primary" icon="el-icon-search"
                  >查询</el-button
                >
                <el-button
                  type="warning"
                  @click="get_logout()"
                  style="margin-left: 10px"
                  >退出</el-button
                >
              </el-col>
            </el-row>
          </div>

          <div :style="{ height: bodyHeight - 160 + 'px' }" class="contentBody">
            <el-table
              :style="{ height: bodyHeight - 160 + 'px' }"
              :data="tableData"
              border
              style="width: 100%; overflow: auto"
              :height="bodyHeight - 160"
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
                prop="state"
                label="状态"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="barcodeCount"
                label="标签数量"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="groupCount"
                label="箱数"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="latticeNo"
                label="格口"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="remark"
                label="备注"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="gmtCreate"
                label="生成时间"
              ></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >明细</el-button
                  >
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
  inject: ["reload"],
  components: {
    Left: left,
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
    handleClick(row) {
      that
        .$confirm("点击确定将下载文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          window.location.href =
            sessionStorage.getItem("IP") +
            "huaQinTransportRecord/getDetail" +
            "?id=" +
            row.id;
        })
        .catch(() => {});
    },
    get_logout() {
      that
        .$confirm("此操作将退出账号, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          // that.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
          // that.reload();
          // sessionStorage.clear();
          that.$router.push({
            path: "/components/commen/login",
          });
        })
        .catch(() => {});
    },
    New() {
      this.reload();
    },
    getData() {
      that
        .$post("huaQinTransportRecord/getTransportRecordPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            for (let i = 0; i < data.page.list.length; i++) {
              if (data.page.list[i].state === 1) {
                data.page.list[i].state = "成功";
              } else {
                data.page.list[i].state = "失败";
              }
            }
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
      that.getData();
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      that.getData();
    },
  },
  created() {},
  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;
    that.getData();
  },
};
</script>
<style>
.headerTop {
  height: 100px;
  margin-left: 10px;
}
.loginA {
  position: absolute;
  right: 0;
}
.contentBody {
  margin: auto auto;
  padding: 0 10px;
}
.pageCurrent {
  text-align: left;
  padding: 0 10px;
  margin-top: 10px;
}
.cron {
  text-align: left;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
</style> 