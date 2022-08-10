<template>
  <div class="wrapper">
    <div class="headerTop">
      <div>
        <el-button
          v-if="showZJ"
          @click="showAddToast()"
          type="primary"
          icon="el-icon-circle-plus"
        >增加</el-button>
      </div>
      <div>
        <el-button @click="showSearchToast()" type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div>
        <el-button
          v-if="showRef"
          @click="refSearchToast()"
          type="warning"
          icon="el-icon-refresh-left"
        >重置搜索条件</el-button>
      </div>
    </div>
    <div :style="{ height: bodyHeight - 100 + 'px' }" class="contentBody">
      <el-table
        :style="{ height: bodyHeight - 100 + 'px' }"
        :data="tableData2"
        border
        stripe
        style="width: 100%; overflow: auto"
        :height='bodyHeight - 100'

      >
        <el-table-column label="序号" type="index" show-overflow-tooltip width="50" align="center"></el-table-column>

        <el-table-column align="center" prop="methodName" label="方法名称"></el-table-column>
        <el-table-column align="center" prop="taskGroup" label="组"></el-table-column>
        <el-table-column align="center" prop="enable" label="是否启动">
          <template slot-scope="scope">
            <span
              :style="{ color: scope.row.enable == true ? '#67C23A' : '#909399' }"
            >{{ scope.row.enable == 1 ? "已启动" : "未启动" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="autoEnable" label="是否自启">
          <template slot-scope="scope">
            <span
              :style="{ color: scope.row.autoEnable == true ? '#67C23A' : '#909399' }"
            >{{ scope.row.autoEnable == 1 ? "是" : "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="cronExpression" label="cron参数"></el-table-column>
        <el-table-column align="center" prop="remarks" label="备注"></el-table-column>

        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="showBJ"
              type="warning"
              @click="handleClickEdit(scope.row)"
              size="mini"
            >编辑</el-button>
            <el-button v-if="showSC" type="danger" @click="delt(scope.row)" size="mini">删除</el-button>
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

    <div class="showEditToast">
      <el-dialog title="添加" width="40%" :visible.sync="showEditToast2">
        <el-form :rules="form2.rules" ref="form2" :model="form2">
          <el-form-item prop="methodName" label="方法名称" :label-width="formLabelWidth">
            <el-input placeholder="请输入方法名称" v-model="form2.methodName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="taskGroup" label="组" :label-width="formLabelWidth">
            <el-input placeholder="请输入所属组" v-model="form2.taskGroup" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="enable" label="是否启动" :label-width="formLabelWidth">
            <el-radio-group v-model="form2.enable">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="autoEnable" label="是否自启" :label-width="formLabelWidth">
            <el-radio-group v-model="form2.autoEnable">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="cronExpression" label="cron参数" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入cron参数"
              v-on:click.native="openCronEdit"
              v-model="form2.cronExpression"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="remarks" label="备注" :label-width="formLabelWidth">
            <el-input placeholder="请输入备注" v-model="form2.remarks" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showEditToast2 = false">取 消</el-button>
          <el-button type="primary" @click="submitFormEdit2('form2')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="showEditToast">
      <el-dialog title="编辑" width="40%" :visible.sync="showEditToast">
        <el-form :rules="form.rules" ref="form" :model="form">
          <el-form-item prop="methodName" label="方法名称" :label-width="formLabelWidth">
            <el-input placeholder="请输入方法名称" v-model="form.methodName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="taskGroup" label="组" :label-width="formLabelWidth">
            <el-input placeholder="请输入所属组" v-model="form.taskGroup" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="enable" label="是否启动" :label-width="formLabelWidth">
            <el-radio-group v-model="form.enable">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="autoEnable" label="是否自启" :label-width="formLabelWidth">
            <el-radio-group v-model="form.autoEnable">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="cronExpression" label="cron参数" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入cron参数"
              v-on:click.native="openCronEdit"
              v-model="form.cronExpression"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="remarks" label="备注" :label-width="formLabelWidth">
            <el-input placeholder="请输入备注" v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showEditToast = false">取 消</el-button>
          <el-button type="primary" @click="submitFormEdit('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="showEditCron">
      <el-dialog title="编辑" width="70%" :visible.sync="showEditCron">
        <div class="cron" :val="value_">
          <el-tabs v-model="activeName">
            <el-tab-pane label="秒" name="s">
              <second-and-minute v-model="sVal" lable="秒"></second-and-minute>
            </el-tab-pane>
            <el-tab-pane label="分" name="m">
              <second-and-minute v-model="mVal" lable="分"></second-and-minute>
            </el-tab-pane>
            <el-tab-pane label="时" name="h">
              <hour v-model="hVal" lable="时"></hour>
            </el-tab-pane>
            <el-tab-pane label="日" name="d">
              <day v-model="dVal" lable="日"></day>
            </el-tab-pane>
            <el-tab-pane label="月" name="month">
              <month v-model="monthVal" lable="月"></month>
            </el-tab-pane>
            <el-tab-pane label="周" name="week">
              <week v-model="weekVal" lable="周"></week>
            </el-tab-pane>
            <el-tab-pane label="年" name="year">
              <year v-model="yearVal" lable="年"></year>
            </el-tab-pane>
          </el-tabs>
          <!-- table -->
          <el-table :data="tableData" size="mini" border style="width: 100%;">
            <el-table-column prop="sVal" label="秒" width="70"></el-table-column>
            <el-table-column prop="mVal" label="分" width="70"></el-table-column>
            <el-table-column prop="hVal" label="时" width="70"></el-table-column>
            <el-table-column prop="dVal" label="日" width="70"></el-table-column>
            <el-table-column prop="monthVal" label="月" width="70"></el-table-column>
            <el-table-column prop="weekVal" label="周" width="70"></el-table-column>
            <el-table-column prop="yearVal" label="年"></el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showEditCron = false">取 消</el-button>
          <el-button type="primary" @click="submitFormEditCron">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
let that;
import secondAndMinute from "../commen/secondAndMinute";
import hour from "../commen/hour";
import day from "../commen/day";
import month from "../commen/month";
import week from "../commen/week";
import year from "../commen/year";
export default {
  components: {
    secondAndMinute,
    hour,
    day,
    month,
    week,
    year,
  },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      showZJ: false,
      showBJ: false,
      showSC: false,
      showRef: false,
      bodyHeight: "",
      tableData2: [],
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,

      //cron
      activeName: "s",
      sVal: "",
      mVal: "",
      hVal: "",
      dVal: "",
      monthVal: "",
      weekVal: "",
      yearVal: "",

      //
      showEditToast: false,
      showEditToast2:false,
      showEditCron: false,
      formLabelWidth: "100px",
      form: {
        methodName: "",
        taskGroup: "",
        enable: "",
        autoEnable: "",
        cronExpression: "",
        remarks: "",
        rules: {
          methodName: [
            { required: true, message: "请输入方法名称", trigger: "blur" },
          ],
          taskGroup: [
            { required: true, message: "请输入组名称", trigger: "blur" },
          ],
          enable: [
            { required: true, message: "请选择是否启动", trigger: "change" },
          ],
          autoEnable: [
            { required: true, message: "请选择是否自启", trigger: "change" },
          ],
          cronExpression: [
            { required: true, message: "请输入cron参数", trigger: "blur" },
          ],
          remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
        },
      },
      form2: {
        methodName: "",
        taskGroup: "",
        enable: "",
        autoEnable: "",
        cronExpression: "",
        remarks: "",
        rules: {
          methodName: [
            { required: true, message: "请输入方法名称", trigger: "blur" },
          ],
          taskGroup: [
            { required: true, message: "请输入组名称", trigger: "blur" },
          ],
          enable: [
            { required: true, message: "请选择是否启动", trigger: "change" },
          ],
          autoEnable: [
            { required: true, message: "请选择是否自启", trigger: "change" },
          ],
          cronExpression: [
            { required: true, message: "请输入cron参数", trigger: "blur" },
          ],
          remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
        },
      },
    };
  },
  watch: {
    value(a, b) {
      this.updateVal();
    },
  },
  computed: {
    tableData() {
      return [
        {
          sVal: this.sVal,
          mVal: this.mVal,
          hVal: this.hVal,
          dVal: this.dVal,
          monthVal: this.monthVal,
          weekVal: this.weekVal,
          yearVal: this.yearVal,
        },
      ];
    },
    value_() {
      if (!this.dVal && !this.weekVal) {
        return "";
      }
      if (this.dVal === "?" && this.weekVal === "?") {
        this.$message.error("日期与星期不可以同时为“不指定”");
      }
      if (this.dVal !== "?" && this.weekVal !== "?") {
        this.$message.error("日期与星期必须有一个为“不指定”");
      }
      let v = `${this.sVal} ${this.mVal} ${this.hVal} ${this.dVal} ${this.monthVal} ${this.weekVal} ${this.yearVal}`;
      if (v !== this.value) {
        this.$emit("input", v);
      }
      return v;
    },
  },
  methods: {
    showAddToast() {
      that.showEditToast2 = true;
    },
    delt(item) {
      console.log(item);
      that
        .$confirm("删除该条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that
            .$post("task/delete", {
              id: item.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.showEditToast = false;
                that.$emit("fatherMethod");
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
    getData() {
      that
        .$post("task/getTaskListByExample", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.count = data.page.count;
            that.tableData2 = data.page.list;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    updateVal() {
      if (!this.value) {
        return;
      }
      let arrays = this.value.split(" ");
      this.sVal = arrays[0];
      this.mVal = arrays[1];
      this.hVal = arrays[2];
      this.dVal = arrays[3];
      this.monthVal = arrays[4];
      this.weekVal = arrays[5];
      this.yearVal = arrays[6];
    },
    handleSizeChange(val) {
      that.pageSize = val;
      that.getData();
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      that.getData();
    },
    //编辑
    handleClickEdit(data) {
      that.showEditToast = true;
      that.form.methodName = data.methodName;
      that.form.taskGroup = data.taskGroup;
      if (data.enable == true) {
        that.form.enable = "是";
      } else {
        that.form.enable = "否";
      }
      if (data.autoEnable == true) {
        that.form.autoEnable = "是";
      } else {
        that.form.autoEnable = "否";
      }
      that.form.cronExpression = data.cronExpression;
      that.form.remarks = data.remarks;
    },
    openCronEdit() {
      that.showEditCron = true;
    },
    submitFormEditCron() {
      that.form.cronExpression =
        that.tableData[0].sVal +
        " " +
        that.tableData[0].mVal +
        " " +
        that.tableData[0].hVal +
        " " +
        that.tableData[0].dVal +
        " " +
        that.tableData[0].monthVal +
        " " +
        that.tableData[0].weekVal +
        " " +
        that.tableData[0].yearVal;
      that.showEditCron = false;
    },
    submitFormEdit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // that
          //   .$post("dictionary/editDictionary", {
          //     id: that.thisRowId,
          //     dictionaryType: that.form2.dictionaryType,
          //     dictionaryTypeDes: that.form2.dictionaryTypeDes,
          //     dictionaryKey: that.form2.dictionaryKey,
          //     dictionaryValue: that.form2.dictionaryValue,
          //     dictionaryDes: that.form2.dictionaryDes,
          //   })
          //   .then(function (data) {
          //     if (data && data.code == "0000") {
          //       that.$message({
          //         message: "修改成功",
          //         type: "success",
          //       });
          //       that.dialogFormVisible2 = false;
          //       that.form.dictionaryType = "";
          //       that.form.dictionaryTypeDes = "";
          //       that.form.dictionaryKey = "";
          //       that.form.dictionaryValue = "";
          //       that.form.dictionaryDes = "";
          //       that.getData();
          //     } else {
          //       that.$message({
          //         message: data.msg,
          //         type: "warning",
          //       });
          //     }
          //   });
        } else {
          console.log(that.form.enable);
          return false;
        }
      });
    },
    submitFormEdit2(form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          // that
          //   .$post("dictionary/editDictionary", {
          //     id: that.thisRowId,
          //     dictionaryType: that.form2.dictionaryType,
          //     dictionaryTypeDes: that.form2.dictionaryTypeDes,
          //     dictionaryKey: that.form2.dictionaryKey,
          //     dictionaryValue: that.form2.dictionaryValue,
          //     dictionaryDes: that.form2.dictionaryDes,
          //   })
          //   .then(function (data) {
          //     if (data && data.code == "0000") {
          //       that.$message({
          //         message: "修改成功",
          //         type: "success",
          //       });
          //       that.dialogFormVisible2 = false;
          //       that.form.dictionaryType = "";
          //       that.form.dictionaryTypeDes = "";
          //       that.form.dictionaryKey = "";
          //       that.form.dictionaryValue = "";
          //       that.form.dictionaryDes = "";
          //       that.getData();
          //     } else {
          //       that.$message({
          //         message: data.msg,
          //         type: "warning",
          //       });
          //     }
          //   });
        } else {
          console.log(that.form.enable);
          return false;
        }
      });
    },
  },
  created() {
    this.updateVal();
  },
  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;
    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "planningTasks")
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
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/planningTasks.scss";
</style>