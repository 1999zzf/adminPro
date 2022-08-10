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
            相机区域编号:
            <el-input
              style="width: 65%"
              placeholder="请输入区域编号"
              v-model="qybh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
          <div>
            格口区域编号:
            <el-input
              style="width: 65%"
              placeholder="请输入格口号"
              v-model="gkqy"
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
          prop="camAreaNo"
          label="相机区域编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="latticeNo"
          label="格口号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="latticeAreaNo"
          label="格口区域编号"
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
            prop="qybh"
            label="相机区域编号"
            :label-width="formLabelWidth"
          >
            <el-select
              style="width: 100%"
              v-model="form.qybh"
              placeholder="请选择"
            >
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="gkh" label="格口号" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入通道编号"
              v-model="form.gkh"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="gkqy"
            label="格口区域号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入通道编号"
              v-model="form.gkqy"
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
            prop="qybh"
            label="区域编号"
            :label-width="formLabelWidth"
          >
            <el-select
              style="width: 100%"
              v-model="form2.qybh"
              placeholder="请选择"
            >
              <el-option
                v-for="item in form2.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="gkh" label="格口号" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入格口号"
              v-model="form2.gkh"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="gkqy"
            label="格口区域编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入格口区域编号"
              v-model="form2.gkqy"
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
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      qybh: "",
      gkh: "",
      gkqy: "",
      form: {
        qybh: "",
        gkh: "",
        gkqy: "",
        options: [],
        setOptions: [],
        rules: {
          qybh: [
            { required: true, message: "请选择区域编号", trigger: "blur" },
          ],
          gkh: [{ required: true, message: "请输入格口号", trigger: "blur" }],
          gkqy: [
            { required: true, message: "请输入格口区域编号", trigger: "blur" },
          ],
        },
      },
      form2: {
        qybh: "",
        gkh: "",
        gkqy: "",
        options: [],
        setOptions: [],
        rules: {
          qybh: [
            { required: true, message: "请选择区域编号", trigger: "blur" },
          ],
          gkh: [{ required: true, message: "请输入格口号", trigger: "blur" }],
          gkqy: [
            { required: true, message: "请输入格口区域编号", trigger: "blur" },
          ],
        },
      },

      setOptions: [],

      thisRowId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    clearAll() {
      that.qybh = "";
      that.gkh = "";
      that.gkqy="";
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
        .$post("areaLattice/getAreaLatticePage", {
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
    getOptions() {
      that.$post("monitorArea/monitorAreaList", {}).then((res) => {
        that.form.setOptions = [];
        that.form2.setOptions = [];
        for (let i = 0; i < res.length; i++) {
          that.form.setOptions.push({ label: "区域" + res[i], value: res[i] });
          that.form2.setOptions.push({ label: "区域" + res[i], value: res[i] });
        }
        that.form.options = that.form.setOptions;
        that.form2.options = that.form2.setOptions;
      });
    },
    handleSizeChange(val) {
      that.pageSize = val;
      if (that.qybh || that.gkh) {
        that.search();
      } else {
        that.getData();
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.qybh || that.gkh) {
        that.search();
      } else {
        that.getData();
      }
    },

    showAddToast() {
      that.dialogFormVisible = true;
      that.form.qybh = "";
      that.form.gkh = "";
      that.form.gkqy = "";
      that.getOptions();
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          that
            .$post("areaLattice/editAreaLattice", {
              camAreaNo: that.form.qybh,
              latticeNo: that.form.gkh,
              latticeAreaNo: that.form.gkqy,
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
            .$post("areaLattice/delete", {
              id: row.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                if (that.qybh || that.gkh) {
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
      that.form2.qybh = row.camAreaNo;
      that.form2.gkh = row.latticeNo;
      that.form2.gkqy=row.latticeAreaNo
      that.dialogFormVisible2 = true;
      that.getOptions();
    },
    submitForm2(form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          that
            .$post("areaLattice/editAreaLattice", {
              id: that.thisRowId,
              camAreaNo: that.form2.qybh,
              latticeNo: that.form2.gkh,
              latticeAreaNo:that.form2.gkqy
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                that.dialogFormVisible2 = false;

                if (that.qybh || that.gkh) {
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
        .$post("areaLattice/getAreaLatticePage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          latticeAreaNo: that.gkqy,
          latticeNo: that.gkh,
          camAreaNo:that.qybh
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
  },
  created() {},
  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;

    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "gridManagement")
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
@import "../../assets/css/adminpages/cameraManagement.scss";
</style>