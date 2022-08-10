<template>
  <div class="wrapper">
    <div class="headerTop">
      <el-row>
        <el-col :span="24">
          <el-button
            v-if="showZJ"
            @click="showAddToast()"
            type="primary"
            icon="el-icon-circle-plus"
            >增加</el-button
          >
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
            格口号:
            <el-input
              placeholder="请输入格口号"
              style="width: 65%"
              v-model="gkbh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <div :style="{ height: bodyHeight - 150 + 'px' }" class="contentBody">
      <el-table
        :style="{ height: bodyHeight - 150 + 'px' }"
        :data="tableData"
        border
        stripe
        style="width: 100%; overflow: auto"
        :height="bodyHeight - 150"
      >
        <el-table-column
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
          align="center"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="latticeNo"
          label="格口号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="latticeStatusName"
          label="格口状态"
        ></el-table-column>
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
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,

      gkbh: "",

      errList: [],
      ygbh: "",
      kdlx: "",
      sbtzh: "",
      formLabelWidth: "80px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form: {
        employeeCode: "",
        employeeName: "",
        employeePassword: "",
        expressType: "",
        tableAccount: "",
        expressList: [],
        rules: {
          employeeCode: [
            { required: true, message: "请输入员工编号", trigger: "blur" },
          ],
          employeeName: [
            { required: true, message: "请输入员工姓名", trigger: "blur" },
          ],
          expressType: [
            { required: true, message: "请选择快递类型", trigger: "change" },
          ],
          tableAccount: [
            {
              required: true,
              message: "请输入上包台登陆账号",
              trigger: "blur",
            },
          ],
        },
      },
      form2: {
        employeeCode: "",
        employeeName: "",
        employeePassword: "",
        expressType: "",
        tableAccount: "",
        expressList: [],
        rules: {
          employeeCode: [
            { required: true, message: "请输入员工编号", trigger: "blur" },
          ],
          employeeName: [
            { required: true, message: "请输入员工姓名", trigger: "blur" },
          ],
          expressType: [
            { required: true, message: "请选择快递类型", trigger: "change" },
          ],
          tableAccount: [
            {
              required: true,
              message: "请输入上包台登陆账号",
              trigger: "blur",
            },
          ],
        },
      },
      thisRowId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    clearAll() {
      that.gkbh = "";
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
        .$post("latticeList/getLatticeListPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
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
      if (that.gkbh) {
        that.search();
      } else {
        that.getData();
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.gkbh) {
        that.search();
      } else {
        that.getData();
      }
    },

    showSearchToast() {
      that.pageNum = 1;
      that.currentPage = 1;
      that.search();
    },
    search() {
      that
        .$post("latticeList/getLatticeListPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          latticeNo: that.gkbh,
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
    // that.isRule = JSON.parse(sessionStorage.getItem("rule"));
    // if (that.isRule) {
    //   for (var t = 0; t < that.isRule.length; t++) {
    //     if (that.isRule[t].menuName == "增加") {
    //       that.showZJ = true;
    //     }
    //     if (that.isRule[t].menuName == "删除") {
    //       that.showSC = true;
    //     }
    //     if (that.isRule[t].menuName == "编辑") {
    //       that.showBJ = true;
    //     }
    //   }
    // }
    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "gridState")
            for (
              var tiss = 0;
              tiss < that.asideData[ti].chrildList[tis].buttonList.length;
              tiss++
            ) {
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "增加"
              ) {
                that.showZJ = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "删除"
              ) {
                that.showSC = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "编辑"
              ) {
                that.showBJ = true;
              }
            }
        }
      }
    }
    that.getData();
    // that.geterr();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/gridState.scss";
</style>