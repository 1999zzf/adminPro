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
        <el-col :span="5">
          <div>
            格口号:
            <el-input
              style="width: 65%"
              placeholder="请输入格口号"
              v-model="gkh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            快递类型:
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
        <el-col :span="5">
          <div>
            包袋号:
            <el-input
              placeholder="包袋号"
              style="width: 65%"
              v-model="bdh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="9">
          <div>
            时间段:
            <el-date-picker
              v-model="timeValue"
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
          prop="lattice"
          label="格口号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="packageCode"
          label="包袋号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="ecoPackageCode"
          label="环保袋号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="employeeCode"
          label="集包人员编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="employeeName"
          label="集包人员姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="gmtCreate"
          label="添加时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="expressTypeName"
          label="快递类型"
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

      errList: [],
      gkh: "",
      kdlx: "",
      bdh: "",
      timeValue: "",

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
      that.gkh = "";
      that.kdlx = "";
      that.bdh = "";
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
        .$post("bindPackageLog/getBindPackageLogPage", {
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
      if (
        that.gkh ||
        that.kdlx ||
        that.bdh ||
        that.timeValue[0] ||
        that.timeValue[1]
      ) {
        that.search();
      } else {
        that.getData();
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (
        that.gkh ||
        that.kdlx ||
        that.bdh ||
        that.timeValue[0] ||
        that.timeValue[1]
      ) {
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
                // that.form.dictionaryType = "";
                // that.form.dictionaryTypeDes = "";
                // that.form.dictionaryKey = "";
                // that.form.dictionaryValue = "";
                // that.form.dictionaryDes = "";
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
    getTimeValue() {},
    showSearchToast() {
      that.pageNum = 1;
      that.currentPage = 1;
      that.search();
    },
    search() {
      that
        .$post("bindPackageLog/getBindPackageLogPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          lattice: that.gkh,
          expressType: that.kdlx,
          ecoPackageCode: that.bdh,
          startTime: that.timeValue[0] ? that.timeValue[0] : "",
          endTime: that.timeValue[1] ? that.timeValue[1] : "",
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "packetBindingLog")
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
@import "../../assets/css/adminpages/packetBindingLog.scss";
</style>