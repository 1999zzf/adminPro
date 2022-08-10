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
            角色名称:
            <el-input
              style="width: 65%"
              placeholder="请输入角色名称"
              v-model="form4.roleName"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            部门:
            <el-select
              style="width: 65%"
              v-model="value3"
              placeholder="请选择部门"
            >
              <el-option
                v-for="item in options3"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div :style="{ height: bodyHeight - 150 + 'px' }" class="contentBody">
      <div>
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
            prop="roleName"
            label="角色名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="departmentName"
            label="所属部门名称"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="215">
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
              <el-button
                v-if="showQX"
                type="danger"
                @click="handleClickAllow(scope.row)"
                size="mini"
                >权限</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
            prop="roleName"
            label="角色名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入角色名称"
              v-model="form.roleName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="departmentName"
            label="部门名称"
            :label-width="formLabelWidth"
          >
            <el-select style="width: 100%" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
              ></el-option>
            </el-select>
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
      <el-dialog title="权限" width="40%" :visible.sync="dialogFormVisible2">
        <el-tree
          :data="data"
          :show-checkbox="true"
          default-expand-all
          node-key="id"
          ref="tree"
          :check-strictly="true"
          highlight-current
          :props="defaultProps"
          :default-checked-keys="checkedArr"
        ></el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm2()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="showEditToast2">
      <el-dialog title="编辑" width="40%" :visible.sync="dialogFormVisible3">
        <el-form :rules="form2.rules" ref="form2" :model="form2">
          <el-form-item
            prop="roleName"
            label="角色名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入角色名称"
              v-model="form2.roleName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="departmentName"
            label="部门名称"
            :label-width="formLabelWidth"
          >
            <el-select
              style="width: 100%"
              v-model="value2"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm3('form2')"
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
  inject: ["reload"],
  components: {},
  props: {},
  data() {
    return {
      showZJ: false,
      showBJ: false,
      showSC: false,
      showQX: false,
      bodyHeight: "",
      tableData: [],
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      formLabelWidth: "80px",
      allowId: "",

      form: {
        departmentName: "",
        roleName: "",
        rules: {
          departmentName: [
            { required: true, message: "请选择所属部门名称", trigger: "blur" },
          ],
          roleName: [
            { required: true, message: "请输入用户名称", trigger: "blur" },
          ],
        },
      },
      options: [],
      value: "",

      form2: {
        departmentName: "",
        roleName: "",
        rules: {
          departmentName: [
            { required: true, message: "请选择所属部门名称", trigger: "blur" },
          ],
          roleName: [
            { required: true, message: "请输入用户名称", trigger: "blur" },
          ],
        },
      },
      options2: [],
      value2: "",
      departmentId: "",

      options3: [],
      value3: "",

      data: [],
      defaultProps: {
        children: "chrildList",
        label: "menuName",
      },
      checkedArr: [],
      postCheckArr: [],

      form4: {
        departmentId: "",
        roleName: "",
        rules: {
          departmentId: [
            { required: false, message: "请选择所属部门名称", trigger: "blur" },
          ],
          roleName: [
            { required: false, message: "请输入用户名称", trigger: "blur" },
          ],
        },
      },
      showRef: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    getData() {
      that
        .$post("role/getRolePage", {
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
    clearAll() {
      that.value3 = "";
      that.form4.roleName = "";
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
        .$post("role/getRolePage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          departmentId: that.value3,
          roleName: that.form4.roleName,
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
    refSearchToast() {
      that.getData();
      that.showRef = false;
    },
    handleSizeChange(val) {
      that.pageSize = val;
      if (that.value3 || that.form4.roleName) {
        that.search();
      } else {
        that.getData();
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.value3 || that.form4.roleName) {
        that.search();
      } else {
        that.getData();
      }
    },
    showAddToast() {
      that.dialogFormVisible = true;
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
    handleClickDelete(row) {
      that
        .$confirm("删除该条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that
            .$post("role/delete", {
              id: row.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                if (that.value3 || that.form4.roleName) {
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
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (that.value) {
          that
            //修改角色
            .$post("role/editRole", {
              roleName: that.form.roleName,
              departmentId: that.value,
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClickAllow(row) {
      that.dialogFormVisible2 = true;
      that.allowId = row.id;
      that
        .$post("roleMenu/getTreeRoleMenuList", {
          roleId: row.id,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.data = data.data.menuList;
            that.checkedArr = data.data.menuIdList;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    handleClick(row) {
      that.$post("department/getDepartmentList", {}).then(function (data) {
        if (data && data.code == "0000") {
          that.options2 = data.data;
          that.dialogFormVisible3 = true;
          that.allowId = row.id;
          that.form2.roleName = row.roleName;
          that.value2 = row.departmentName;
          that.departmentId = row.departmentId;
        } else {
          that.$message({
            message: data.msg,
            type: "warning",
          });
        }
      });
    },
    submitForm3(form2) {
      this.$refs[form2].validate((valid) => {
        if (that.value2) {
          that
            //修改角色
            .$post("role/editRole", {
              id: that.allowId,
              roleName: that.form2.roleName,
              departmentId: that.departmentId,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                that.dialogFormVisible3 = false;
                if (that.value3 || that.form4.roleName) {
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

    submitForm2() {
      for (var l = 0; l < that.$refs.tree.getCheckedNodes().length; l++) {
        that.postCheckArr.push(that.$refs.tree.getCheckedNodes()[l].id);
      }
      that
        .$post("roleMenu/editRoleMenu", {
          roleId: that.allowId,
          menuIdList: that.postCheckArr,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.dialogFormVisible2 = false;
            that.getAsideList();
            // that.isRule = JSON.parse(sessionStorage.getItem("rule"));
            that.$message({
              message: "权限修改成功",
              type: "success",
            });
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    getAsideList() {
      that.$post("menu/getTreeMenuList", {}).then(function (data) {
        if (data && data.code == "0000") {
          sessionStorage.setItem("asideData", JSON.stringify(data.data));
          that.reload();
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "roleManage")
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
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "权限"
              ) {
                that.showQX = true;
              }
            }
        }
      }
    }
    that.$post("department/getDepartmentList", {}).then(function (data) {
      if (data && data.code == "0000") {
        that.options3 = data.data;
        // that.value3 = "";
      } else {
        that.$message({
          message: data.msg,
          type: "warning",
        });
      }
    });
    that.getData();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/roleManage.scss";
</style>