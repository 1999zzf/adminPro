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
            员工编号:
            <el-input
              placeholder="请输入员工编号"
              style="width: 65%"
              v-model="ygbh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            登陆账号:
            <el-input
              style="width: 65%"
              placeholder="请输入上包台登陆账号"
              v-model="sbtzh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            快递类型
            <el-select
              clearable
              style="width: 65%"
              v-model="kdlx"
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
          prop="employeeCode"
          label="员工编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="employeeName"
          label="员工姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="employeePassword"
          label="员工密码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="expressTypeName"
          label="快递类型"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="tableAccount"
          label="上包台登陆账号"
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
      <el-dialog title="添加" width="40%" :visible.sync="dialogFormVisible">
        <el-form :rules="form.rules" ref="form" :model="form">
          <el-form-item
            prop="employeeCode"
            label="员工编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入员工编号"
              v-model="form.employeeCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="employeeName"
            label="员工姓名"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入员工姓名"
              v-model="form.employeeName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="employeePassword"
            label="员工密码"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入员工密码"
              v-model="form.employeePassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="选择类型"
            :label-width="formLabelWidth"
            prop="expressType"
          >
            <el-select
              style="width: 100%"
              v-model="form.expressType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in form.expressList"
                :key="item.dictionaryKey"
                :label="item.dictionaryDes"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="tableAccount"
            label="登陆账号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入上包台登陆账号"
              v-model="form.tableAccount"
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
            prop="employeeCode"
            label="员工编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入员工编号"
              v-model="form2.employeeCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="employeeName"
            label="员工姓名"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入员工姓名"
              v-model="form2.employeeName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="employeePassword"
            label="员工密码"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入员工密码"
              v-model="form2.employeePassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="选择类型"
            :label-width="formLabelWidth"
            prop="expressType"
          >
            <el-select
              style="width: 100%"
              v-model="form2.expressType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in form.expressList"
                :key="item.dictionaryKey"
                :label="item.dictionaryDes"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="tableAccount"
            label="登陆账号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入上包台登陆账号"
              v-model="form2.tableAccount"
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
        .$post("employeeInfo/getEmployeeInfoPage", {
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

    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          that
            .$post("employeeInfo/editEmployeeInfo", {
              employeeCode: that.form.employeeCode,
              employeeName: that.form.employeeName,
              employeePassword: that.form.employeePassword,
              expressType: that.form.expressType,
              tableAccount: that.form.tableAccount,
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
            .$post("employeeInfo/delete", {
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
      that.form2.employeeCode = row.employeeCode;
      that.form2.employeeName = row.employeeName;
      that.form2.employeePassword = row.employeePassword;
      that.form2.expressType = row.expressTypeName;
      that.form2.tableAccount = row.tableAccount;
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
            .$post("employeeInfo/editEmployeeInfo", {
              id: that.thisRowId,
              employeeCode: that.form2.employeeCode,
              employeeName: that.form2.employeeName,
              employeePassword: that.form2.employeePassword,
              expressType: that.form2.expressType,
              tableAccount: that.form2.tableAccount,
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "mployeeAccount")
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
@import "../../assets/css/adminpages/mployeeAccount.scss";
</style>