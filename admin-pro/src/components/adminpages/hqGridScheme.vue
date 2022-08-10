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
            出口编号:
            <el-input
              placeholder="请输入出口编号"
              style="width: 65%"
              v-model="ckbh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            格口编号:
            <el-input
              placeholder="请输入格口编号"
              style="width: 65%"
              v-model="gkbh"
              autocomplete="off"
            ></el-input>
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
        style="width: 150%; overflow: auto"
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
          prop="outPort"
          label="出口编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="latticeNo"
          label="格口编号"
        ></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="150">
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
            prop="outPort"
            label="出口编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入出口编号"
              v-model="form.outPort"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="latticeNo"
            label="格口编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入格口编号"
              v-model="form.latticeNo"
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
            prop="outPort"
            label="出口编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入出口编号"
              v-model="form2.outPort"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="latticeNo"
            label="格口编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入格口编号"
              v-model="form2.latticeNo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm2()">确 定</el-button>
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
      gkbh: "",
      ckbh: "",
      formLabelWidth: "110px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      visible: false,
      type: "",
      form: {
        outPort: "",
        latticeNo: "",
        rules: {
          outPort: [
            { required: true, message: "请输入出口编号", trigger: "blur" },
          ],
          latticeNo: [
            { required: true, message: "请输入格口编号", trigger: "blur" },
          ],
        },
      },
      form2: {
        outPort: "",
        latticeNo: "",
        rules: {
          outPort: [
            { required: true, message: "请输入出口编号", trigger: "blur" },
          ],
          latticeNo: [
            { required: true, message: "请输入格口编号", trigger: "blur" },
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
      that.ckbh = "";
      that.gkbh = "";
      that.getData();
    },
    getData() {
      that
        .$post("huaQinSortingPlan/getHuaQinSortingPlanPage", {
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
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          that
            .$post("huaQinSortingPlan/editHuaQinSortingPlan", {
              outPort: that.form.outPort,
              latticeNo: that.form.latticeNo,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                that.form.outPort="",
                that.form.latticeNo=""
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
            .$post("huaQinSortingPlan/deleteHuaQinSortingPlan", {
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
      that.form2.outPort = row.outPort;
      that.form2.latticeNo = row.latticeNo;
      that.dialogFormVisible2 = true;
    },
    submitForm2(form2) {
      that
        .$post("huaQinSortingPlan/editHuaQinSortingPlan", {
          id: that.thisRowId,
          outPort: that.form2.outPort,
          latticeNo: that.form2.latticeNo,
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
    },
    showSearchToast() {
      that
        .$post("huaQinSortingPlan/getHuaQinSortingPlanPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          outPort: that.ckbh,
          latticeNo: that.gkbh,
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "hqGridScheme")
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
@import "../../assets/css/adminpages/hqGridScheme.scss";
</style>