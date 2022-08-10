<template>
  <div class="wrapper">
    <div class="headerTop">
      <div>
        <el-button
          v-if="showZJ"
          @click="showAddToast()"
          type="primary"
          icon="el-icon-circle-plus"
          >增加</el-button
        >
      </div>
    </div>
    <div :style="{ height: bodyHeight - 100 + 'px' }" class="contentBody">
      <el-table
        :style="{ height: bodyHeight - 100 + 'px' }"
        :data="tableData"
        border
        stripe
        style="width: 100%; overflow: auto"
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
          prop="areaName"
          label="区域名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="areaNo"
          label="区域编号"
        ></el-table-column>

        <el-table-column align="center" label="操作" width="150">
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
              >删除</el-button
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
      ></el-pagination>
    </div>
    <div class="showAddToast">
      <el-dialog title="增加" width="40%" :visible.sync="dialogFormVisible">
        <el-form :rules="form.rules" ref="form" :model="form">
          <el-form-item
            prop="qymc"
            label="区域名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入区域名称"
              v-model="form.qymc"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="qybh"
            label="区域编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入区域编号"
              v-model="form.qybh"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="showEditToast">
      <el-dialog title="编辑" width="40%" :visible.sync="dialogFormVisible2">
        <el-form :rules="form2.rules" ref="form2" :model="form2">
          <el-form-item
            prop="qymc"
            label="区域名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入格口号"
              v-model="form2.qymc"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="qybh"
            label="区域编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入格口描述"
              v-model="form2.qybh"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm2('form2')"
            >确 定</el-button
          >
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
      showRef: false,
      bodyHeight: "",
      tableData: [],
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,

      errList: [],
      ygbh: "",
      kdlx: "",
      sbtzh: "",
      formLabelWidth: "80px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form: {
        qymc: "",
        qybh: "",
        rules: {
          qymc: [
            { required: true, message: "请输入区域名称", trigger: "blur" },
          ],
          qybh: [
            { required: true, message: "请输入区域编号", trigger: "blur" },
          ],
        },
      },
      form2: {
        qymc: "",
        qybh: "",
        rules: {
          qymc: [
            { required: true, message: "请输入区域名称", trigger: "blur" },
          ],
          qybh: [
            { required: true, message: "请输入区域编号", trigger: "blur" },
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
      that.ygbh = "";
      that.kdlx = "";
      that.sbtzh = "";
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
        .$post("monitorArea/getMonitorAreaPage", {
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
      if (that.ygbh || that.kdlx || that.sbtzh) {
        that.search();
      } else {
        that.getData();
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.ygbh || that.kdlx || that.sbtzh) {
        that.search();
      } else {
        that.getData();
      }
    },

    showAddToast() {
      that.dialogFormVisible = true;
      //   that
      //     .$post("dictionary/getDictionaryList", {
      //       dictionaryType: "express_type",
      //     })
      //     .then(function (data) {
      //       if (data && data.code == "0000") {
      //         that.form.expressList = data.data;
      //       } else {
      //         that.$message({
      //           message: data.msg,
      //           type: "warning",
      //         });
      //       }
      //     });
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          that
            .$post("monitorArea/editMonitorArea", {
              areaName: that.form.qymc,
              areaNo: that.form.qybh,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                that.getData();
              } else {
                that.$message({
                  message: data.msg,
                  type: "warning",
                });
              }
            });
        } else {
          return false;
        }
      });
    },

    handleClickDelete(row) {
      that
        .$confirm("删除该条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that
            .$post("monitorArea/delete", {
              id: row.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                if (that.ygbh || that.kdlx || that.sbtzh) {
                  that.search();
                } else {
                  that.getData();
                }
              } else {
                that.$message({
                  message: data.msg,
                  type: "warning",
                });
              }
            });
        })
        .catch(() => {});
    },
    handleClickEdit(row) {
      that.thisRowId = row.id;
      that.form2.qymc = row.areaName;
      that.form2.qybh = row.areaNo;
      that.dialogFormVisible2 = true;
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "express_type",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.form.expressList = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    submitForm2(form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          that
            .$post("monitorArea/editMonitorArea", {
              id: that.thisRowId,
              areaName: that.form2.qymc,
              areaNo: that.form2.qybh,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                that.dialogFormVisible2 = false;
                if (that.ygbh || that.kdlx || that.sbtzh) {
                  that.search();
                } else {
                  that.getData();
                }
              } else {
                that.$message({
                  message: data.msg,
                  type: "warning",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    showSearchToast() {
      that.pageNum = 1;
      that.currentPage = 1;
      that.search();
    },
    search() {
      that
        .$post("employeeInfo/getEmployeeInfoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          employeeCode: that.ygbh,
          expressType: that.kdlx,
          tableAccount: that.sbtzh,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.count = data.page.count;
            that.tableData = data.page.list;
            that.geterr();
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
          if (
            that.asideData[ti].chrildList[tis].pageUrl == "regionalManagement"
          )
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
    that.geterr();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/specialGrid.scss";
</style>