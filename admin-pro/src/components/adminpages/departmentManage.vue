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
            部门名称:
            <el-input
              style="width: 65%"
              placeholder="请输入部门名称"
              v-model="form4.departmentName"
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
          prop="departmentName"
          label="所属部门名称"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="showBJ"
              type="warning"
              @click="handleClick(scope.row)"
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
    <div class="showEditToast">
      <el-dialog title="编辑" width="40%" :visible.sync="dialogFormVisible">
        <el-form :rules="form.rules" ref="form" :model="form">
          <el-form-item
            prop="departmentName"
            label="部门名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入所属部门名称"
              v-model="form.departmentName"
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
    <div class="showAddToast">
      <el-dialog title="增加" width="40%" :visible.sync="dialogFormVisible2">
        <el-form :rules="form2.rules" ref="form2" :model="form2">
          <el-form-item
            prop="departmentName"
            label="部门名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入所属部门名称"
              v-model="form2.departmentName"
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
      bodyHeight: "",
      tableData: [],
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,
      options: [],
      value: "",

      dialogFormVisible: false,
      dialogFormVisible2: false,
      getThisRowId: "",
      form: {
        departmentName: "",
        rules: {
          departmentName: [
            { required: true, message: "请输入所属部门名称", trigger: "blur" },
          ],
        },
      },
      form2: {
        departmentName: "",
        rules: {
          departmentName: [
            { required: true, message: "请输入所属部门名称", trigger: "blur" },
          ],
        },
      },
      formLabelWidth: "80px",

      showRef: false,
      dialogFormVisible4: false,
      form4: {
        departmentName: "",
        rules: {
          departmentName: [
            { required: false, message: "请输入所属部门名称", trigger: "blur" },
          ],
        },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    getData() {
      that
        .$post("department/getDepartmentPage", {
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
    getCdata() {
      that.$post("department/getDepartmentList", {}).then(function (data) {
        if (data && data.code == "0000") {
          that.options = data.data;
        } else {
          that.$message({
            message: data.msg,
            type: "warning",
          });
        }
      });
    },
    clearAll() {
      that.form4.departmentName = "";
      that.pageNum = 1;
      that.currentPage = 1;
      that.getData();
    },
    showSearchToast() {
      that.pageNum = 1;
      that.currentPage = 1;
      that.search();
    },
    search() {
      that
        .$post("department/getDepartmentPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          departmentName: that.form4.departmentName,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.count = data.page.count;
            that.tableData = data.page.list;
            that.dialogFormVisible4 = false;
            that.showRef = true;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    refSearchToast() {
      that.getData();
      that.showRef = false;
    },

    handleSizeChange(val) {
      that.pageSize = val;
      if (that.form4.departmentName) {
        that.search();
      } else {
        that.getData();
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.form4.departmentName) {
        that.search();
      } else {
        that.getData();
      }
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          that
            .$post("department/editDepartment", {
              id: that.getThisRowId,
              departmentName: that.form.departmentName,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                if (that.form4.departmentName) {
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm2(form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          that
            .$post("department/editDepartment", {
              departmentName: that.form2.departmentName,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
                that.dialogFormVisible2 = false;
                that.getData();
              } else {
                that.$message({
                  message: data.msg,
                  type: "warning",
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick(row) {
      that.dialogFormVisible = true;
      that.getThisRowId = row.id;
      that.form.departmentName = row.departmentName;
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
            .$post("department/delete", {
              id: row.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                if (that.form4.departmentName) {
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
    showAddToast() {
      that.dialogFormVisible2 = true;
      that.form2.departmentName = "";
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
    //     }if (that.isRule[t].menuName == "删除") {
    //       that.showSC = true;
    //     }if (that.isRule[t].menuName == "编辑") {
    //       that.showBJ = true;
    //     }
    //   }
    // }
    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "departmentManage")
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
    that.getCdata();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/departmentManage.scss";
</style>