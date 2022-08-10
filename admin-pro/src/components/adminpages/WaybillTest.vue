<template>
  <div ref="getThisHeight" class="wrapper">
    <div class="headerTop">
      <div><el-button type="primary" @click="uploadExcel" icon="el-icon-plus">导入</el-button></div>
      <div v-if="showZJ">
        <el-button type="primary" icon="el-icon-circle-plus">增加</el-button>
      </div>
      <div class="loginA">
        <el-button type="primary" @click="getLogin()" icon="el-icon-user"
          >登录</el-button
        >
      </div>
    </div>
    <div :style="{ height: bodyHeight - 100 + 'px' }" class="contentBody">
      <div >
        <el-table
        :style="{ height: bodyHeight - 100 + 'px' }"
        :data="tableData"
        border
        stripe
        style="width: 100%; overflow: auto"
        :height='bodyHeight - 100'

      >
        <el-table-column
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
          align="center"
        >
        </el-table-column>
        <el-table-column align="center" prop="date" label="Id">
        </el-table-column>
        <el-table-column align="center" prop="name" label="运单编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="province"
          label="快递类型"
          width="120"
        >
        </el-table-column>
        <el-table-column align="center" prop="city" label="进出港" width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="测试状态"
          width="120"
        >
          <template slot-scope="scope">
            <span
              :style="{ color: scope.row.address == 1 ? '#67C23A' : '#909399' }"
            >
              {{ scope.row.address == 1 ? "已测试" : "未测试" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="zip" label="测试时间" width="180">
          <template slot-scope="scope">
            <span>
              {{ scope.row.zip ? scope.row.zip : "-" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="Cdata"
          label="分拣结果"
          width="100"
        >
          <template slot-scope="scope">
            <span
              :style="{ color: scope.row.Cdata == 1 ? '#67C23A' : '#F56C6C' }"
            >
              {{ scope.row.Cdata == 1 ? "分拣完成" : "分拣失败" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="215">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.address == 1"
              type="primary"
              @click="handleClick(scope.row)"
              size="mini"
              >详情</el-button
            >
            <el-button
              v-if="scope.row.address == 0"
              type="primary"
              disabled
              size="mini"
              >详情</el-button
            >
            <el-button @click="deleteThisScope(scope)" type="danger" size="mini"
              >删除</el-button
            >

            <el-button
              v-if="!isThisPagesLogin"
              disabled
              @click="testThisScope(scope.row)"
              type="success"
              size="mini"
              >测试</el-button
            >
            <el-button
              v-if="isThisPagesLogin"
              @click="testThisScope(scope.row)"
              type="success"
              style="background: #67c23a"
              size="mini"
              >测试</el-button
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
        :current-page="currentPage"
        :page-sizes="[5, 15, 25, 35]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
    <div class="showUploadToast">
      <el-dialog title="上传" width="40%" style="text-align:left" :visible.sync="dialogFormVisible">
        <el-upload
        style="text-align:center"
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')"
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
      bodyHeight: "",
      isThisPagesLogin: false,
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,
      tableData: [
        {
          date: "xaa0930213",
          name: "yt-12321321",
          province: "yt",
          city: "in",
          address: "0",
          zip: "",
          Cdata: "1",
        },
        {
          date: "xsafdfdsf12",
          name: "zt-21312",
          province: "zt",
          city: "in",
          address: "0",
          zip: "",
          Cdata: "1",
        },
        {
          date: "21321323dd",
          name: "st-das21321",
          province: "st",
          city: "out",
          address: "1",
          zip: "2020-10-01",
          Cdata: "1",
        },
        {
          date: "dsadsadsad21",
          name: "yd-213213",
          province: "td",
          city: "out",
          address: "1",
          zip: "2020-10-10",
          Cdata: "1",
        },
        {
          date: "dasdasd123213",
          name: "sf-213",
          province: "sf",
          city: "in",
          address: "0",
          zip: "",
          Cdata: "0",
        },
        {
          date: "21321323dd",
          name: "st-das21321",
          province: "st",
          city: "out",
          address: "1",
          zip: "2020-10-01",
          Cdata: "1",
        },
        {
          date: "dsadsadsad21",
          name: "yd-213213",
          province: "td",
          city: "out",
          address: "1",
          zip: "2020-10-10",
          Cdata: "1",
        },
        {
          date: "dasdasd123213",
          name: "sf-213",
          province: "sf",
          city: "in",
          address: "0",
          zip: "",
          Cdata: "0",
        },
        {
          date: "21321323dd",
          name: "st-das21321",
          province: "st",
          city: "out",
          address: "1",
          zip: "2020-10-01",
          Cdata: "1",
        },
        {
          date: "dsadsadsad21",
          name: "yd-213213",
          province: "td",
          city: "out",
          address: "1",
          zip: "2020-10-10",
          Cdata: "1",
        },
        {
          date: "dasdasd123213",
          name: "sf-213",
          province: "sf",
          city: "in",
          address: "0",
          zip: "",
          Cdata: "0",
        },
        {
          date: "21321323dd",
          name: "st-das21321",
          province: "st",
          city: "out",
          address: "1",
          zip: "2020-10-01",
          Cdata: "1",
        },
        {
          date: "dsadsadsad21",
          name: "yd-213213",
          province: "td",
          city: "out",
          address: "1",
          zip: "2020-10-10",
          Cdata: "1",
        },
        {
          date: "dasdasd123213",
          name: "sf-213",
          province: "sf",
          city: "in",
          address: "0",
          zip: "",
          Cdata: "0",
        },
        {
          date: "21321323dd",
          name: "st-das21321",
          province: "st",
          city: "out",
          address: "1",
          zip: "2020-10-01",
          Cdata: "1",
        },
        {
          date: "dsadsadsad21",
          name: "yd-213213",
          province: "td",
          city: "out",
          address: "1",
          zip: "2020-10-10",
          Cdata: "1",
        },
        {
          date: "dasdasd123213",
          name: "sf-213",
          province: "sf",
          city: "in",
          address: "0",
          zip: "",
          Cdata: "0",
        },
      ],

      isRule: [],
      showZJ: false,

      dialogFormVisible: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    getData() {},
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      that.pageSize = val;
      that.getData();
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      that.getData();
    },
    testThisScope(scope) {
      if (!that.isThisPagesLogin) {
        that.$message({
          message: "请点上方登录",
          type: "warning",
        });
      }
    },
    getLogin() {
      that.isThisPagesLogin = true;
      that.$message({
        message: "登录成功",
        type: "success",
      });
    },
    deleteThisScope(scope) {
      that
        .$confirm("删除该条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => {});
    },
    uploadExcel(){
      that.dialogFormVisible = true;
    },
  },
  created() {},
  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;
    that.isRule = JSON.parse(sessionStorage.getItem("rule"));
    if (that.isRule) {
      for (var t = 0; t < that.isRule.length; t++) {
        if (that.isRule[t].menuName == "增加") {
          that.showZJ = true;
        }
      }
    }
    that.getData();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/WaybillTest.scss";
.wrapper {
  text-align: center;
}
</style>