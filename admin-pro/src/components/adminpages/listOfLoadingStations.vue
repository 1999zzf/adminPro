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
          <el-button
            type="info"
            icon="el-icon-delete"
            @click="clearAll()"
          >清除</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6">
          <div>
            上包台名称:
            <el-input
              style="width: 65%"
              placeholder="请输入上包台名称"
              v-model="sbtmc"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            上包台序号:
            <el-input
              style="width: 65%"
              placeholder="请输入上包台序号"
              v-model="sbtxh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            上包台状态:
            <el-select
              style="width: 65%"
              clearable
              v-model="sbtzt"
              placeholder="请选择上包台状态"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
          prop="tableName"
          label="上包台名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="tableSerial"
          label="上包台序号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="firstRankArea"
          label="第一顺位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="secondRankArea"
          label="第二顺位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="thirdRankArea"
          label="第三顺位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="fourthRankArea"
          label="第四顺位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="tableIp"
          label="上包台IP地址"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="tableMac"
          label="上包台MAC地址"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="tableCameraMac"
          label="相机的MAC地址"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="tableStateName"
          label="上包台是否在线"
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
            prop="tableName"
            label="上包台名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入上包台名称"
              v-model="form.tableName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="tableSerial"
            label="上包台序号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入上包台序号"
              v-model="form.tableSerial"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="firstRankArea"
            label="第一顺位"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入第一顺位"
              v-model="form.firstRankArea"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="secondRankArea"
            label="第二顺位"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入第二顺位"
              v-model="form.secondRankArea"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="thirdRankArea"
            label="第三顺位"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入第三顺位"
              v-model="form.thirdRankArea"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="fourthRankArea"
            label="第四顺位"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入第四顺位"
              v-model="form.fourthRankArea"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="tableIp"
            label="上包台IP"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入上包台IP地址"
              v-model="form.tableIp"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="tableMac"
            label="上包台MAC"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入上包台MAC地址"
              v-model="form.tableMac"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="tableCameraMac"
            label="相机MAC"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入相机MAC地址"
              v-model="form.tableCameraMac"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否在线"
            :label-width="formLabelWidth"
            prop="tableStateName"
          >
            <el-select
              style="width: 100%"
              v-model="form.tableStateName"
              placeholder="请选择"
            >
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
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
            prop="tableName"
            label="上包台名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入上包台名称"
              v-model="form2.tableName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="tableSerial"
            label="上包台序号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入上包台序号"
              v-model="form2.tableSerial"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="firstRankArea"
            label="第一顺位"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入第一顺位"
              v-model="form2.firstRankArea"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="secondRankArea"
            label="第二顺位"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入第二顺位"
              v-model="form2.secondRankArea"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="thirdRankArea"
            label="第三顺位"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入第三顺位"
              v-model="form2.thirdRankArea"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="fourthRankArea"
            label="第四顺位"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入第四顺位"
              v-model="form2.fourthRankArea"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="tableIp"
            label="上包台IP"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入上包台IP地址"
              v-model="form2.tableIp"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="tableMac"
            label="上包台MAC"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入上包台MAC地址"
              v-model="form2.tableMac"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="tableCameraMac"
            label="相机MAC"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入相机MAC地址"
              v-model="form2.tableCameraMac"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否在线"
            :label-width="formLabelWidth"
            prop="tableStateName"
          >
            <el-select
              style="width: 100%"
              v-model="form2.tableStateName"
              placeholder="请选择"
            >
              <el-option
                v-for="item in form2.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
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
      options: [
        {
          value: "1",
          label: "在线",
        },
        {
          value: "0",
          label: "不在线",
        },
      ],
      sbtzt: "",
      sbtmc: "",
      sbtxh: "",
      formLabelWidth: "100px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form: {
        tableName: "",
        tableSerial: "",
        firstRankArea: "",
        secondRankArea: "",
        thirdRankArea: "",
        fourthRankArea: "",
        tableIp: "",
        tableMac: "",
        tableCameraMac: "",
        tableState: "",
        tableStateName: "",
        options: [
          {
            value: "1",
            label: "在线",
          },
          {
            value: "0",
            label: "不在线",
          },
        ],
        rules: {
          tableName: [
            { required: true, message: "请输入上包台名称", trigger: "blur" },
          ],
          tableSerial: [
            { required: true, message: "请输入上包台序号", trigger: "blur" },
          ],
          firstRankArea: [
            { required: true, message: "请输入第一顺位", trigger: "blur" },
          ],
          secondRankArea: [
            { required: true, message: "请输入第二顺位", trigger: "blur" },
          ],
          thirdRankArea: [
            { required: true, message: "请输入第三顺位", trigger: "blur" },
          ],
          fourthRankArea: [
            { required: true, message: "请输入第四顺位", trigger: "blur" },
          ],
          tableIp: [
            { required: true, message: "请输入上包台IP", trigger: "blur" },
          ],
          tableMac: [
            { required: true, message: "请输入上包台MAC", trigger: "blur" },
          ],
          tableCameraMac: [
            { required: true, message: "请输入相机MAC", trigger: "blur" },
          ],
          tableStateName: [
            { required: true, message: "请选择状态", trigger: "change" },
          ],
        },
      },
      form2: {
        tableName: "",
        tableSerial: "",
        firstRankArea: "",
        secondRankArea: "",
        thirdRankArea: "",
        fourthRankArea: "",
        tableIp: "",
        tableMac: "",
        tableCameraMac: "",
        tableState: "",
        tableStateName: "",
        options: [
          {
            value: "1",
            label: "在线",
          },
          {
            value: "0",
            label: "不在线",
          },
        ],
        rules: {
          tableName: [
            { required: true, message: "请输入上包台名称", trigger: "blur" },
          ],
          tableSerial: [
            { required: true, message: "请输入上包台序号", trigger: "blur" },
          ],
          firstRankArea: [
            { required: true, message: "请输入第一顺位", trigger: "blur" },
          ],
          secondRankArea: [
            { required: true, message: "请输入第二顺位", trigger: "blur" },
          ],
          thirdRankArea: [
            { required: true, message: "请输入第三顺位", trigger: "blur" },
          ],
          fourthRankArea: [
            { required: true, message: "请输入第四顺位", trigger: "blur" },
          ],
          tableIp: [
            { required: true, message: "请输入上包台IP", trigger: "blur" },
          ],
          tableMac: [
            { required: true, message: "请输入上包台MAC", trigger: "blur" },
          ],
          tableCameraMac: [
            { required: true, message: "请输入相机MAC", trigger: "blur" },
          ],
          tableStateName: [
            { required: true, message: "请选择状态", trigger: "change" },
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
      that.sbtmc = "";
      that.sbtxh = "";
      that.sbtzt = "";
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
        .$post("tableInfo/getTableInfoPage", {
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
      if (that.sbtmc || that.sbtxh || that.sbtzt) {
        that.search();
      } else {
        that.getData();
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.sbtmc || that.sbtxh || that.sbtzt) {
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
            .$post("tableInfo/editTableInfo", {
              id: that.thisRowId,

              tableName: that.form.tableName,
              tableSerial: that.form.tableSerial,
              firstRankArea: that.form.firstRankArea,
              secondRankArea: that.form.secondRankArea,
              thirdRankArea: that.form.thirdRankArea,

              fourthRankArea: that.form.fourthRankArea,
              tableIp: that.form.tableIp,
              tableMac: that.form.tableMac,
              tableCameraMac: that.form.tableCameraMac,
              tableState: that.form.tableStateName == "在线" ? 1 : 0,
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
            .$post("tableInfo/delete", {
              id: row.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                if (that.sbtmc || that.sbtxh || that.sbtzt) {
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
      that.form2.tableName = row.tableName;
      that.form2.tableSerial = row.tableSerial;
      that.form2.firstRankArea = row.firstRankArea;
      that.form2.secondRankArea = row.secondRankArea;
      that.form2.thirdRankArea = row.thirdRankArea;

      that.form2.fourthRankArea = row.fourthRankArea;
      that.form2.tableIp = row.tableIp;
      that.form2.tableMac = row.tableMac;
      that.form2.tableCameraMac = row.tableCameraMac;
      that.form2.tableStateName = row.tableStateName;
      that.form2.tableState = row.tableState;

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
            .$post("tableInfo/editTableInfo", {
              id: that.thisRowId,

              tableName: that.form2.tableName,
              tableSerial: that.form2.tableSerial,
              firstRankArea: that.form2.firstRankArea,
              secondRankArea: that.form2.secondRankArea,
              thirdRankArea: that.form2.thirdRankArea,

              fourthRankArea: that.form2.fourthRankArea,
              tableIp: that.form2.tableIp,
              tableMac: that.form2.tableMac,
              tableCameraMac: that.form2.tableCameraMac,
              tableState: that.form2.tableStateName == "在线" ? 1 : 0,
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
                if (that.sbtmc || that.sbtxh || that.sbtzt) {
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
        .$post("tableInfo/getTableInfoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          tableName: that.sbtmc,
          tableSerial: that.sbtxh,
          tableState: that.sbtzt,
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
          if (
            that.asideData[ti].chrildList[tis].pageUrl ==
            "listOfLoadingStations"
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
@import "../../assets/css/adminpages/listOfLoadingStations.scss";
</style>