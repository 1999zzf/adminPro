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
            相机IP:
            <el-input
              style="width: 65%"
              placeholder="请输入相机IP"
              v-model="xjip"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            相机区域编号:
            <el-input
              style="width: 65%"
              placeholder="请输入相机区域编号"
              v-model="tdbh"
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
          prop="cameraIp"
          label="相机IP"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="camAreaNo"
          label="相机区域编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="gmtCreate"
          label="添加时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="gmtModified"
          label="修改时间"
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
            prop="xjip"
            label="相机IP"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入相机IP"
              v-model="form.xjip"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="tdbh"
            label="相机区域编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入相机区域编号"
              v-model="form.tdbh"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item prop="gkh" label="格口号" :label-width="formLabelWidth">
            <el-cascader
              clearable
              filterable
              :show-all-levels="false"
              style="width: 100%"
              v-model="form.gkh"
              :options="form.options"
            >
              <template slot="empty"
                ><div>暂无该格口,可前往格口管理页面添加</div></template
              ></el-cascader
            >
          </el-form-item> -->
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
            prop="xjip"
            label="相机IP"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入相机IP"
              v-model="form2.xjip"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="tdbh"
            label="相机区域编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入相机区域编号"
              v-model="form2.tdbh"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item prop="gkh" label="格口号" :label-width="formLabelWidth">
            <el-cascader
              clearable
              filterable
              :show-all-levels="false"
              style="width: 100%"
              v-model="form2.gkh"
              :options="form2.options"
              ><template slot="empty"
                ><div>暂无该格口,可前往格口管理页面添加</div></template
              ></el-cascader
            >
          </el-form-item> -->
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
      xjip: "",
      tdbh: "",
      gkh: "",
      form: {
        xjip: "",
        tdbh: "",
        gkh: [],
        gkhCopy: [],
        options: [],
        rules: {
          xjip: [{ required: true, message: "请输入相机IP", trigger: "blur" }],
          tdbh: [
            { required: true, message: "请输入相机区域编号", trigger: "blur" },
          ],
          // gkh: [{ required: true, message: "请输入格口号", trigger: "blur" }],
        },
      },
      form2: {
        xjip: "",
        tdbh: "",
        gkh: [],
        options: [],
        rules: {
          xjip: [{ required: true, message: "请输入相机IP", trigger: "blur" }],
          tdbh: [
            { required: true, message: "请输入相机区域编号", trigger: "blur" },
          ],
          // gkh: [{ required: true, message: "请输入格口号", trigger: "blur" }],
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
      that.xjip = "";
      that.tdbh = "";
      that.gkh = "";
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
        .$post("cameraArea/getCameraAreaPage", {
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
      that.$post("areaLattice/latticeAreaFind", {}).then((res) => {
        that.setOptions = [];
        for (let i = 0; i < res.length; i++) {
          that.setOptions.push({
            label: "区域" + res[i].areaNo,
            value: res[i].areaNo,
            children: [],
          });
          for (let ii = 0; ii < res[i].latticeList.length; ii++) {
            that.setOptions[i].children.push({
              label: "格口" + res[i].latticeList[ii],
              value: res[i].latticeList[ii],
            });
          }
        }
        that.form.options = that.setOptions;
        that.form2.options = that.setOptions;
      });
    },
    handleSizeChange(val) {
      that.pageSize = val;
      if (that.xjip || that.tdbh || that.gkh) {
        that.search();
      } else {
        that.getData();
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.xjip || that.tdbh || that.gkh) {
        that.search();
      } else {
        that.getData();
      }
    },

    showAddToast() {
      that.dialogFormVisible = true;
      that.form.xjip = "";
      that.form.tdbh = "";
      that.form.gkh = [];
      that.getOptions();
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          that
            .$post("cameraArea/editCameraArea", {
              cameraIp: that.form.xjip,
              camAreaNo: that.form.tdbh,
              // latticeNo: that.form.gkh[1],
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
            .$post("cameraArea/delete", {
              id: row.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                if (that.xjip || that.tdbh || that.gkh) {
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
      that.form2.gkhCopy = [];
      that.thisRowId = row.id;
      that.form2.xjip = row.cameraIp;
      that.form2.tdbh = row.camAreaNo;
      that.form2.gkhCopy.push(row.latticeNo);
      that.form2.gkh = that.form2.gkhCopy[0];
      that.dialogFormVisible2 = true;
      that.getOptions();
    },
    submitForm2(form2) {
      console.log(typeof that.form2.gkh)
      this.$refs[form2].validate((valid) => {
        if (valid) {
          that
            .$post("cameraArea/editCameraArea", {
              id: that.thisRowId,
              cameraIp: that.form2.xjip,
              camAreaNo: that.form2.tdbh,
              // latticeNo: typeof that.form2.gkh == 'string'?that.form2.gkh:that.form2.gkh[1],
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                that.dialogFormVisible2 = false;
                if (that.xjip || that.tdbh || that.gkh) {
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
        .$post("cameraArea/getCameraAreaPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          cameraIp: that.xjip,
          camAreaNo: that.tdbh,
          // latticeNo: that.gkh,
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "cameraManagement")
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