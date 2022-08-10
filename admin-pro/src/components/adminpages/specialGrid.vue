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
          prop="specialValue"
          label="格口号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="specialDescribe"
          label="格口描述"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="expressTypeName"
          label="快递类型"
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
            prop="specialValue"
            label="格口号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入格口号"
              v-model="form.specialValue"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="specialDescribe"
            label="格口描述"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入格口描述"
              v-model="form.specialDescribe"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="快递类型"
            :label-width="formLabelWidth"
            prop="expressType"
          >
            <el-select
              style="width: 100%"
              v-model="form.expressType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in errList"
                :key="item.dictionaryKey"
                :label="item.dictionaryDes"
                :value="item.dictionaryKey"
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
      <el-dialog title="编辑" width="40%" :visible.sync="dialogFormVisible2">
        <el-form :rules="form2.rules" ref="form2" :model="form2">
          <el-form-item
            prop="specialValue"
            label="格口号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入格口号"
              v-model="form2.specialValue"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="specialDescribe"
            label="格口描述"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入格口描述"
              v-model="form2.specialDescribe"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="快递类型"
            :label-width="formLabelWidth"
            prop="expressTypeName"
          >
            <el-select
              style="width: 100%"
              v-model="form2.expressType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in errList"
                :key="item.dictionaryKey"
                :label="item.dictionaryDes"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
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
        specialValue: "",
        specialDescribe: "",
        expressType: "",
        expressTypeName: "",
        expressList: [],
        rules: {
          specialValue: [
            { required: true, message: "请输入格口号", trigger: "blur" },
          ],
          expressType: [
            { required: true, message: "请选择快递类型", trigger: "change" },
          ],
        },
      },
      form2: {
        specialValue: "",
        specialDescribe: "",
        expressType: "",
        expressTypeName: "",
        expressList: [],
        rules: {
          specialValue: [
            { required: true, message: "请输入格口号", trigger: "blur" },
          ],
          expressTypeName: [
            { required: true, message: "请选择快递类型", trigger: "change" },
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
        .$post("specialLattice/getSpecialLatticePage", {
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
      that.getData();
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      that.getData();
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
            .$post("specialLattice/editSpecialLattice", {
              specialValue: that.form.specialValue,
              specialDescribe: that.form.specialDescribe,
              expressType: that.form.expressType,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "添加",
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
            .$post("specialLattice/delete", {
              id: row.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
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
        })
        .catch(() => {});
    },
    handleClickEdit(row) {
      that.thisRowId = row.id;
      that.form2.specialValue = row.specialValue;
      that.form2.specialDescribe = row.specialDescribe;
      that.form2.expressTypeName = row.expressTypeName;
      that.form2.gmtCreate = row.gmtCreate;
      that.form2.creator = row.creator;
      that.form2.gmtModified = row.gmtModified;
      that.form2.modifier = row.modifier;
      that.form2.expressType = row.expressType;
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
            .$post("specialLattice/editSpecialLattice", {
              id: that.thisRowId,
              specialValue: that.form2.specialValue,
              specialDescribe: that.form2.specialDescribe,
              expressType: that.form2.expressType,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "修改成功",
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "specialGrid")
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