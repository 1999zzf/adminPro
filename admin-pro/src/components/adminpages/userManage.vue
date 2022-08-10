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
            账号名:
            <el-input
              placeholder="请输入账号名"
              style="width: 65%"
              v-model="form3.userName"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            所属部门:
            <el-select
              @input="getThisDid()"
              style="width: 65%"
              v-model="form3.value"
              placeholder="请选择所属部门"
              clearable
            >
              <el-option
                v-for="item in form3.getDepartmentList"
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
            prop="userName"
            label="账号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="roleNameList"
            label="所属角色名称"
          >
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" placement="left">
                <div
                  v-for="(item, index) in scope.row.roleNameList"
                  slot="content"
                  :key="index"
                >
                  {{ item }}
                </div>
                <div>
                  <span
                    @click="getThisScope(scope)"
                    v-for="(item1, index1) in scope.row.roleNameList"
                    :key="index1"
                    v-show="index1 == 0"
                    >{{ item1 }}</span
                  >
                  <span
                    @click="getThisScope(scope)"
                    v-for="(item2, index2) in scope.row.roleNameList"
                    :key="item2.id"
                    v-show="index2 == 1"
                    >...</span
                  >
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="departmentName"
            label="所属部门名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="realName"
            label="真实姓名"
          ></el-table-column>
          <el-table-column align="center" prop="email" label="邮箱">
            <template slot-scope="scope">
              <span>{{ scope.row.email ? scope.row.email : "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="phoneNum" label="电话号码">
            <template slot-scope="scope">
              <span>{{
                scope.row.phoneNum.length === 11 ? scope.row.phoneNum : "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="warning"
                v-if="showBJ"
                @click="editClick(scope.row)"
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
            prop="value"
            label="所属部门"
            :label-width="formLabelWidth"
          >
            <el-select
              @input="getRoleList()"
              style="width: 100%"
              v-model="form.value"
              placeholder="请选择所属部门"
            >
              <el-option
                v-for="item in form.getDepartmentList"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="isAddData == false"
            prop="value2"
            label="所属角色"
            :label-width="formLabelWidth"
          >
            <span style="color: #66b1ff">请先选择部门</span>
          </el-form-item>
          <el-form-item
            v-if="isAddData == true"
            prop="value2"
            label="所属角色"
            :label-width="formLabelWidth"
          >
            <el-checkbox-group v-model="form.value2">
              <el-checkbox
                v-for="(item, index) in form.getRoleList"
                :key="index"
                :label="item.id"
                >{{ item.roleName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>

          <el-form-item
            prop="userName"
            label="账号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入账号名"
              v-model="form.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="realName"
            label="真实姓名"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入真实姓名"
              v-model="form.realName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入邮箱"
              v-model="form.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="phoneNum"
            label="联系电话"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入联系电话"
              v-model="form.phoneNum"
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
      <el-dialog title="修改" width="40%" :visible.sync="dialogFormVisible2">
        <el-form :rules="form2.rules" ref="form2" :model="form2">
          <el-form-item
            prop="value"
            label="所属部门"
            :label-width="formLabelWidth"
          >
            <el-select
              @input="getChangeRoleList()"
              style="width: 100%"
              v-model="form2.value"
              placeholder="请选择所属部门"
            >
              <el-option
                v-for="item in form2.getDepartmentList"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="isCheckData == true"
            prop="value2"
            label="所属角色"
            :label-width="formLabelWidth"
          >
            <el-checkbox-group v-model="form2.value2">
              <el-checkbox
                v-for="(item, index) in valueEditList"
                :key="index"
                :label="item.id"
                >{{ item.roleName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            v-if="isCheckData == false"
            prop="value2"
            label="所属角色"
            :label-width="formLabelWidth"
          >
            <span style="color: #66b1ff">暂无数据哦</span>
          </el-form-item>
          <el-form-item
            prop="userName"
            label="账号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入账号名"
              v-model="form2.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="realName"
            label="真实姓名"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入真实姓名"
              v-model="form2.realName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入密码"
              v-model="form2.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入邮箱"
              v-model="form2.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="phoneNum"
            label="联系电话"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入联系电话"
              v-model="form2.phoneNum"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="actionFalse()">取 消</el-button>
          <el-button type="primary" @click="submitForm2('form2')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="showSearchToast">
      <el-dialog title="搜索" width="40%" :visible.sync="dialogFormVisible3">
        <el-form :rules="form3.rules" ref="form3" :model="form3">
          <el-form-item
            prop="value"
            label="所属部门"
            :label-width="formLabelWidth"
          >
            <el-select
              @input="getThisDid()"
              style="width: 100%"
              v-model="form3.value"
              placeholder="请选择所属部门"
            >
              <el-option
                v-for="item in form3.getDepartmentList"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            prop="userName"
            label="账号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入账号名"
              v-model="form3.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm3('form3')"
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
      manyCheck: [],
      bodyHeight: "",
      tableData: [],
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,

      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        userName: "",
        roleName: "",
        realName: "",
        password: "",
        email: "",
        phoneNum: "",
        getDepartmentList: [],
        getRoleList: [],
        value: "",
        value2: [],
        rules: {
          value: [
            { required: true, message: "请选择所属部门", trigger: "change" },
          ],
          value2: [
            { required: true, message: "请勾选所属角色", trigger: "change" },
          ],
          userName: [
            { required: true, message: "请输入账号名", trigger: "blur" },
          ],
          roleName: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
          ],
          realName: [
            { required: true, message: "请输入真实姓名", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
          ],
          email: [{ required: false, message: "请输入邮箱", trigger: "blur" }],
          phoneNum: [
            { required: false, message: "请输入电话号码", trigger: "blur" },
          ],
        },
      },
      isAddData: false,
      form2: {
        userName: "",
        // roleName: "",
        roleName: [],
        realName: "",
        password: "",
        email: "",
        phoneNum: "",
        getDepartmentList: [],
        getRoleList: [],
        value: [],
        // value2: "",
        value2: [],
        rules: {
          value: [
            { required: true, message: "请选择所属部门", trigger: "change" },
          ],
          value2: [
            { required: true, message: "请勾选所属角色", trigger: "blur" },
          ],
          userName: [
            { required: true, message: "请输入账号名", trigger: "blur" },
          ],
          roleName: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
          ],
          realName: [
            { required: true, message: "请输入真实姓名", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
          ],
          email: [{ required: false, message: "请输入邮箱", trigger: "blur" }],
          phoneNum: [
            { required: false, message: "请输入电话号码", trigger: "blur" },
          ],
        },
      },
      valueEditList: [],
      isCheckData: true,
      noClick: [],
      isClickUp: false,

      formLabelWidth: "80px",

      departmentId: "",
      // roleId: '',
      roleId: [],
      editId: "",

      showRef: false,
      dialogFormVisible3: false,
      form3: {
        userName: "",
        getDepartmentList: [],
        getRoleList: [],
        value: "",
        value2: "",
        rules: {
          value: [
            { required: false, message: "请选择所属部门", trigger: "change" },
          ],
          value2: [
            { required: false, message: "请选择所属角色", trigger: "change" },
          ],
          userName: [
            { required: false, message: "请输入账号名", trigger: "blur" },
          ],
        },
      },
      searchRid: "",
      searchDid: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    //获取列表缩放内容
    getThisScope(scope) {
      console.log(scope);
      console.log("1");
    },
    getData() {
      that
        .$post("userInfo/getUserInfoPage", {
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
      that.form3.userName = "";
      that.form3.value = "";
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
        .$post("userInfo/getUserInfoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          userName: that.form3.userName,
          roleId: that.searchRid,
          departmentId: that.searchDid,
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
    getThisDid() {
      that.searchDid = that.form3.value;
      that
        .$post("role/getRoleList", {
          departmentId: that.form3.value,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.form3.getRoleList = data.data;
            that.form3.value2 = "";
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    getThisRid() {
      that.searchRid = that.form3.value2;
    },
    refSearchToast() {
      that.showRef = false;
      that.searchDid = "";
      that.searchRid = "";
      that.getData();
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
            .$post("userInfo/delete", {
              id: row.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                if (that.form3.userName || that.searchRid || that.searchDid) {
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
    editClick(row) {
      that.form2.value2 = [];
      that.form2.password = "";
      that.changeRole = false;
      that.valueEditList = row.roleNameList.map((roleName, i) => ({
        roleName,
        id: row.roleIdList[i],
      }));
      that.editId = row.id;
      that.isCheckData = true;

      // that.roleId = row.roleId;
      that.roleId = row.roleIdList;
      that.departmentId = row.departmentId;
      that.form2.value = row.departmentName;
      // that.form2.value2 = row.roleName;
      that.form2.value2 = row.roleIdList;
      that.form2.userName = row.userName;
      that.form2.realName = row.realName;
      that.form2.email = row.email;
      that.form2.phoneNum = row.phoneNum;
      that.dialogFormVisible2 = true;
      that.getChangeDlist();
    },
    getChangeDlist() {
      that.$post("department/getDepartmentList", {}).then(function (data) {
        if (data && data.code == "0000") {
          that.form2.getDepartmentList = data.data;
        } else {
          that.$message({
            message: data.msg,
            type: "warning",
          });
        }
      });
    },
    getChangeRoleList() {
      that
        .$post("role/getRoleList", {
          departmentId: that.form2.value,
        })
        .then(function (data) {
          console.log(data);
          if (data && data.code == "0000") {
            that.form2.getRoleList = data.data;
            that.departmentId = that.form2.value;
            if (data.data && data.data != null) {
              that.isCheckData = true;
              that.valueEditList = data.data;
              that.form2.value2 = [];
            } else {
              that.isCheckData = false;
              that.valueEditList = [];
              that.form2.value2 = [];
            }

            that.changeRole = true;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    changeRoleId() {
      that.roleId = that.form2.value2;
    },
    handleSizeChange(val) {
      that.pageSize = val;
      if (that.form3.userName || that.searchRid || that.searchDid) {
        that.search();
      } else {
        that.getData();
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.form3.userName || that.searchRid || that.searchDid) {
        that.search();
      } else {
        that.getData();
      }
    },
    showAddToast() {
      that.$post("department/getDepartmentList", {}).then(function (data) {
        if (data && data.code == "0000") {
          that.form.getDepartmentList = data.data;

          that.dialogFormVisible = true;
        } else {
          that.$message({
            message: data.msg,
            type: "warning",
          });
        }
      });
      that.dialogFormVisible = true;
    },
    getRoleList() {
      that
        .$post("role/getRoleList", {
          departmentId: that.form.value,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.isAddData = true;
            that.form.getRoleList = data.data;
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
            .$post("userInfo/editUserInfo", {
              id: that.editId,
              departmentId: that.departmentId,
              roleIdList: that.form2.value2,
              userName: that.form2.userName,
              realName: that.form2.realName,
              password: that.form2.password,
              email: that.form2.email,
              phoneNum: that.form2.phoneNum,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.dialogFormVisible2 = false;
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                if (that.form3.userName || that.searchRid || that.searchDid) {
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
    actionFalse() {
      that.dialogFormVisible2 = false;
      that.form2.value2 = [];
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          that
            .$post("userInfo/editUserInfo", {
              departmentId: that.form.value,
              roleIdList: that.form.value2,
              userName: that.form.userName,
              realName: that.form.realName,
              password: that.form.password,
              email: that.form.email,
              phoneNum: that.form.phoneNum,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.dialogFormVisible = false;
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
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
  },
  created() {},
  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;

    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "userManage")
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
    that.$post("department/getDepartmentList", {}).then(function (data) {
      if (data && data.code == "0000") {
        that.form3.getDepartmentList = data.data;
      } else {
        that.$message({
          message: data.msg,
          type: "warning",
        });
      }
    });
    that.$post("role/getRoleList", {}).then(function (data) {
      if (data && data.code == "0000") {
        that.form3.getRoleList = data.data;
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
@import "../../assets/css/adminpages/userManage.scss";
</style>