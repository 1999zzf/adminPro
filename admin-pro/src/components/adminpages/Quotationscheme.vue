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
            名称:
            <el-input
              placeholder="名称"
              style="width: 65%"
              v-model="wlmc"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            报价状态:
            <el-select
              style="width: 65%"
              clearable
              v-model="bjzt"
              placeholder="报价状态"
            >
              <el-option
                v-for="item in options1"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div :style="{ height: bodyHeight - 150 + 'px' }" class="contentBody">
      <el-table
        ref="table"
        :style="{ height: bodyHeight - 150 + 'px' }"
        :data="tableData"
        border
        stripe
        style="width: 100%; overflow: auto"
        :height="bodyHeight - 150"
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
          prop="name"
          label="名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="totalPrice"
          label="方案总价"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="报价状态"
        ></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              v-if="showBJ"
              type="warning"
              @click="handleClickEdit(scope.row)"
              size="mini"
              >编辑</el-button
            >
            <el-button
              v-if="showSC"
              type="danger"
              @click="handleClickDelete(scope.row)"
              size="mini"
              >详情</el-button
            >
            <el-button
              v-if="showEX"
              type="danger"
              @click="getdownLoad(scope.row)"
              size="mini"
              >导出</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageCurrent">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 15, 25, 35]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
    <div class="showAddToast">
      <el-dialog title="添加" width="40%" :visible.sync="dialogFormVisible">
        <el-form :rules="form.rules" ref="form" :model="form">
          <el-form-item
            prop="code"
            label="方案名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入方案名称"
              v-model="form.code"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="code"
            label="方案类型"
            :label-width="formLabelWidth"
          >
            <el-select v-model="form.falx" placeholder="请选择方案类型">
              <el-option
                v-for="item in options2"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </div>
      </el-dialog>
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
      showEX: false,
      showUP: false,
      showDW: false,
      showRef: false,
      showdown: false,
      bodyHeight: "",
      tableData: [],
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,
      bjzt: "",
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      List: [],
      errList: [],
      options1: [],
      options2: [],
      options3: [],
      chooselist: [],
      chooselist1: [],
      jcglx: "",
      gkbh: "",
      wdbm: "",
      sfsc: "",
      sfpj: "",
      sffb: "",
      sfjb: "",
      fzfa: "",
      ydm: "",
      edm: "",
      sdm: "",
      Sdm: "",
      wlmc: "",
      falx: "",
      wllx: "",
      formLabelWidth: "110px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      showUpLoad: false,
      visible: false,
      type: "",
      form: {
        code: "",
        falx: "",
        rules: {
          code: [
            { required: true, message: "请输入方案名称", trigger: "blur" },
          ],
          falx: [{ required: true, message: "请选择", trigger: "blur" }],
        },
      },
      thisRowId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    geteer1() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "proposal_status",
        })
        .then(function (data) {
          // console.log(data);
          if (data && data.code == "0000") {
            that.options1 = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    geteer2() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "proposal_type",
        })
        .then(function (data) {
          // console.log(data);
          if (data && data.code == "0000") {
            that.options2 = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    getUpLoad() {
      that.showUpLoad = true;
    },
    clearAll() {
      that.wlmc = "";
      that.wllx = "";
      that.getData();
    },
    getData() {
      that
        .$post("pricingProposal/getPricingProposalPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            // console.log(data)
            that.count = data.page.count;
            that.tableData = data.page.list;
            that.$nextTick(() => {
              that.$refs.table.doLayout();
            });
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

    showAddToast() {
      that.dialogFormVisible = true;
    },
    submitForm() {
      sessionStorage.setItem("btn", 0);
      that
        .$post("pricingProposal/editPricingProposal", {
          name: that.form.code,
          type: that.form.falx,
          // beltInfoDTOList:""
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            // sessionStorage.setItem("name",that.form.code)
            // sessionStorage.setItem("name",that.form.code)
            that.$router.push({
              name: "new",
              query: {
                name: that.form.code,
                type: that.form.falx,
                id: data.data.id,
              },
            });

            sessionStorage.setItem("show", 2);
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    getdownLoad(row) { 
      if (that.tableData) {
        that
          .$confirm("点击确定将下载文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            window.location.href =
              sessionStorage.getItem("IP") +
              "pricingProposal/exportProposalDetail" +
              "?id=" +row.id
          })
          .catch(() => {});
      } else {
        that.$message({
          message: "当前展示的数据为空,不能下载",
          type: "warning",
        });
      }
    },
    handleClickDelete(row) {
      sessionStorage.setItem("btn", 1);
      that
        .$post("pricingProposal/getPricingProposalDetail", {
          id: row.id,
        })
        .then(function (data) {
          // console.log(data.data);
          if (data && data.code == "0000") {
            if (data.data.beltInfoDTOList) {
              for (let i = 0; i < data.data.beltInfoDTOList.length; i++) {
                sessionStorage.setItem("obj", JSON.stringify(data.data));
                sessionStorage.setItem("show", 3);
              }
            } else {
              sessionStorage.setItem("obj", JSON.stringify(data.data));
              sessionStorage.setItem("show", 3);
            }
            that.$router.push({
              name: "new",
              query: {
                list: that.List,
                proposalId: data.data.id,
              },
            });
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    handleClickEdit(row) {
      sessionStorage.setItem("btn", 0);
      that
        .$post("pricingProposal/getPricingProposalDetail", {
          id: row.id,
        })
        .then(function (data) {
          // console.log(data.data.beltInfoDTOList.length);
          if (data && data.code == "0000") {
            if (data.data.beltInfoDTOList.length !== 0) {
              for (let i = 0; i < data.data.beltInfoDTOList.length; i++) {
                sessionStorage.setItem("obj", JSON.stringify(data.data));
                sessionStorage.setItem("show", 3);
              }
            } else {
              sessionStorage.setItem("obj", JSON.stringify(data.data));
              sessionStorage.setItem("show", 3);
            }
            that.$router.push({
              name: "new",
              query: {
                list: that.List,
                proposalId: data.data.id,
                id: row.id,
              },
            });
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    showSearchToast() {
      that
        .$post("pricingProposal/getPricingProposalPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          name: that.wlmc,
          type: that.wllx,
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
  },
  created() {},
  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;
    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "Quotationscheme")
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
                "详情"
              ) {
                that.showSC = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "编辑"
              ) {
                that.showBJ = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "导出"
              ) {
                that.showEX = true;
              }
            }
        }
      }
    }
    that.getData();
    that.geteer1();
    that.geteer2();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/gridState.scss";
</style>