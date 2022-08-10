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
      <!-- <div style="margin-left: -2px;">
        <el-button @click="getDownLoad()" icon="el-icon-download" type="primary"></el-button>
      </div>-->
      <el-row style="margin-top: 10px">
        <el-col :span="6">
          <div>
            格口号:
            <el-input
              style="width: 65%"
              placeholder="格口号"
              v-model="gkh"
              clearable
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div>
            容器编号:
            <el-input
              style="width: 65%"
              placeholder="容器编号"
              v-model="rqbh"
              clearable
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            指定格口:
            <el-input
              style="width: 65%"
              placeholder="指定格口"
              v-model="zdgk"
              clearable
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            实际格口:
            <el-input
              style="width: 65%"
              placeholder="实际格口"
              v-model="sjgk"
              clearable
              autocomplete="off"
            ></el-input>
          </div>
        </el-col> -->
      </el-row>
      <!-- <el-row style="margin-top: 10px">
        <el-col :span="6">
          <div>
            RFID编号:
            <el-input
              style="width: 65%"
              placeholder="RFID编号"
              v-model="rfid"
              clearable
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            序列号:
            <el-input
              style="width: 65%"
              placeholder="序列号"
              v-model="xlh"
              clearable
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            上包台号:
            <el-input
              style="width: 65%"
              placeholder="上包台号"
              v-model="sbth"
              clearable
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            运单状态:
            <el-select
              style="width: 65%"
              clearable
              v-model="ydzt"
              placeholder="运单状态"
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
      <el-row style="margin-top: 10px">
        <el-col :span="12">
          <div>
            分拣时间:
            <el-date-picker
              v-model="lrsj"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            落格时间:
            <el-date-picker
              v-model="lgsj"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row> -->
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
          fixed="left"
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="latticeNo"
          label="格口号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="pulse"
          label="脉冲"
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
          <el-form-item prop="pulse" label="脉冲" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入脉冲"
              v-model="form2.pulse"
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

      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表

      errList: [],
      form: {
        latticeNo: "",
      },
      form2: {
        latticeNo: "",
        pulse: "",
      },
      options: [
        {
          value: "1",
          label: "进港",
        },
        {
          value: "0",
          label: "出港",
        },
      ],
      options2: [
        {
          value: "0",
          label: "完成",
        },
        {
          value: "1",
          label: "待完成",
        },
        {
          value: "2",
          label: "待补码",
        },
        {
          value: "3",
          label: "异常",
        },
        {
          value: "4",
          label: "补码异常",
        },
      ],
      gkh: "",
      rqbh: "",
      rfid: "",
      ydzt: "",
      xyzwd: "",
      sbth: "",
      lrsj: [],
      lgsj: [],
      Etime: [],
      xlh: "",
      bdh: "",
      jcg: "",
      zdgk: "",
      sjgk: "",
      kdlx: "",
      formLabelWidth: "110px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      // dialogFormVisible3: false,
      showUpLoad: false,
      visible: false,
      type: "",

      thisRowId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClickDelete(row) {
      that
        .$confirm("删除该条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          // that
          //   .$post("sortingPlanBs/delete", {
          //     id: row.id,
          //   })
          //   .then(function (data) {
          //     if (data && data.code == "0000") {
          //       that.$message({
          //         message: "删除成功",
          //         type: "success",
          //       });
          //       that.dialogFormVisible = false;
          //       that.getData();
          //     } else {
          //       that.$message({
          //         message: data.msg,
          //         type: "warning",
          //       });
          //     }
          //   });
        })
        .catch(() => {});
    },
    //
    showAddToast() {
      //增加
      that.dialogFormVisible = true;
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          that
            .$post("iotLatticeInfo/editIotLatticeInfo", {
              latticeNo: that.form.latticeNo,
              pulse: that.form.pulse,
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
    submitForm2(form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          that
            .$post("iotLatticeInfo/editIotLatticeInfo", {
              id: that.thisRowId,
              latticeNo: that.form2.latticeNo,
              pulse: that.form2.pulse,
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
    handleClickEdit(row) {
      //编辑
      that.thisRowId = row.id;
      that.form2.pulse = row.pulse;
      that.form2.latticeNo = row.latticeNo;
      that.dialogFormVisible2 = true;
    },
    clearAll() {
      that.gkh = "";
      that.pageNum = 1;
      that.currentPage = 1;
      that.getData();
    },
    getData() {
      console.log(that.lrsj);
      that
        .$post("iotLatticeInfo/getIotLatticeInfoPage", {
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
      if (that.lrsj == null) {
        that.$message({
          message: "请选择一段日期时间",
        });
      } else {
        if (
          that.gkh ||
          that.rqbh ||
          that.sbth ||
          that.rfid ||
          that.changeData(that.lrsj[0]) ||
          that.changeData(that.lrsj[1]) ||
          that.lgsj[0] ||
          that.lgsj[1] ||
          that.xlh ||
          that.zdgk ||
          that.sjgk ||
          that.ydzt
        ) {
          that.search(
            that.changeData(that.lrsj[0]),
            that.changeData(that.lrsj[1])
          );
        } else {
          that.getData();
        }
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.lrsj == null) {
        that.$message({
          message: "请选择一段日期时间",
        });
      } else {
        if (
          that.gkh ||
          that.rqbh ||
          that.sbth ||
          that.rfid ||
          that.changeData(that.lrsj[0]) ||
          that.changeData(that.lrsj[1]) ||
          that.lgsj[0] ||
          that.lgsj[1] ||
          that.xlh ||
          that.zdgk ||
          that.sjgk ||
          that.ydzt
        ) {
          that.search(
            that.changeData(that.lrsj[0]),
            that.changeData(that.lrsj[1])
          );
        } else {
          that.getData();
        }
      }
    },
    changeData(dataWord) {
      var str = dataWord;
      var d = new Date(str);
      var a = [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ];
      for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] < 10) {
          a[i] = "0" + a[i];
        }
      }
      str =
        a[0] + "-" + a[1] + "-" + a[2] + " " + a[3] + ":" + a[4] + ":" + a[5];
      return str;
    },

    showSearchToast() {
      that
        .$post("iotLatticeInfo/getIotLatticeInfoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          latticeNo: that.gkh,
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
    // search(st, et) {},
  },
  created() {},
  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth();
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf =
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes();
    let ss =
      new Date().getSeconds() < 10
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds();
    // that.Etime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    that.lrsj = [
      new Date(yy, mm, dd - 3, hh, mf, ss),
      new Date(yy, mm, dd, hh, mf, ss),
    ];

    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "ioManagement")
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
@import "../../assets/css/adminpages/ioManagement.scss";
</style>