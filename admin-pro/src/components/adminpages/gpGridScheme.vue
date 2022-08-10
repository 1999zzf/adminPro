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
            v-if="showUP"
            @click="getUpLoad()"
            icon="el-icon-upload2"
            type="primary"
            >导入</el-button
          >
          <el-button
            v-if="showdown"
            @click="getdownLoad()"
            icon="el-icon-download"
            type="primary"
            >导出</el-button
          >
          <el-button
            v-if="showDW"
            @click="getDownLoad()"
            type="primary"
            icon="el-icon-download"
            >下载模板</el-button
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
            易拣通业务员编码:
            <el-input
              placeholder="易拣通业务员编码"
              style="width: 65%"
              v-model="yjtywybm"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            三段码:
            <el-input
              placeholder="三段码"
              style="width: 65%"
              v-model="sdm"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            快递公司类型:
            <el-select
              style="width: 65%"
              clearable
              v-model="kdgslx"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options3"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            指定格口:
            <el-input
              placeholder="指定格口"
              style="width: 65%"
              v-model="zdgk"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6">
          <div>
            分拣方案编号:
            <el-input
              placeholder="分拣方案编号"
              style="width: 65%"
              v-model="fjfabh"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            是否派件:
            <el-select
              style="width: 65%"
              clearable
              v-model="sfpj"
              placeholder="是否派件"
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
        <el-col :span="6">
          <div>
            是否到件:
            <el-select
              style="width: 65%"
              clearable
              v-model="sfdj"
              placeholder="是否到件"
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
    <div :style="{ height: bodyHeight - 250 + 'px' }" class="contentBody">
      <el-table
        ref="table"
        :style="{ height: bodyHeight - 250 + 'px' }"
        :data="tableData"
        border
        stripe
        style="width: 100%; overflow: auto"
        :height="bodyHeight - 250"
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
          prop="employeeNo"
          label="易拣通业务员编码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="dispatchAreaCode"
          label="三段码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="expressCode"
          label="快递公司类型"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="latticeNo"
          label="指定格口"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="collectFlag"
          label="是否到件"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="dispatchFlag"
          label="是否派件"
          width="50"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="areaNo"
          label="分区编号"
          width="50"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="sortingPlanNum"
          label="分拣方案编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="gmtCreate"
          label="增加时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="gmtModified"
          label="修改时间"
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
            prop="employeeNo"
            label="易拣通业务员编码"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入易拣通业务员编码"
              v-model="form.employeeNo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="dispatchAreaCode"
            label="三段码"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入三段码"
              v-model="form.dispatchAreaCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="快递公司类型"
            :label-width="formLabelWidth"
            prop="expressCode"
          >
            <el-select
              style="width: 100%"
              v-model="form.expressCode"
              placeholder="请选择"
            >
              <el-option
                v-for="item in form.options3"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="latticeNo"
            label="指定格口"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入指定格口"
              v-model="form.latticeNo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否派件"
            :label-width="formLabelWidth"
            prop="dispatchFlag"
          >
            <el-select
              style="width: 100%"
              v-model="form.dispatchFlag"
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
          <el-form-item
            label="是否到件"
            :label-width="formLabelWidth"
            prop="collectFlag"
          >
            <el-select
              style="width: 100%"
              v-model="form.collectFlag"
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
          <el-form-item
            prop="areaNo"
            label="分区编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入分区编号"
              v-model="form.areaNo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="sortingPlanNum"
            label="分拣方案编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入分拣方案编号"
              v-model="form.sortingPlanNum"
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
            prop="employeeNo"
            label="易拣通业务员编码"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入易拣通业务员编码"
              v-model="form2.employeeNo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="dispatchAreaCode"
            label="三段码"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入三段码"
              v-model="form2.dispatchAreaCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="快递公司类型"
            :label-width="formLabelWidth"
            prop="expressCode"
          >
            <el-select
              style="width: 100%"
              v-model="form2.expressCode"
              placeholder="请选择"
            >
              <el-option
                v-for="item in form2.options3"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="latticeNo"
            label="指定格口"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入指定格口"
              v-model="form2.latticeNo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否派件"
            :label-width="formLabelWidth"
            prop="dispatchFlag"
          >
            <el-select
              style="width: 100%"
              v-model="form2.dispatchFlag"
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
          <el-form-item
            label="是否到件"
            :label-width="formLabelWidth"
            prop="collectFlag"
          >
            <el-select
              style="width: 100%"
              v-model="form2.collectFlag"
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
          <el-form-item
            prop="areaNo"
            label="分区编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入分区编号"
              v-model="form2.areaNo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="sortingPlanNum"
            label="分拣方案编号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入分拣方案编号"
              v-model="form2.sortingPlanNum"
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
    <div class="showEditToast">
      <el-dialog title="上传" :visible.sync="showUpLoad" width="400px">
        <el-upload
          drag
          :limit="limitNum"
          :auto-upload="false"
          accept=".xlsx"
          :action="UploadUrl()"
          :before-upload="beforeUploadFile"
          :on-change="fileChange"
          :on-exceed="exceedFile"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            只能上传xlsx文件，且不超过10M
          </div>
        </el-upload>
        <br />
        <el-button size="small" type="primary" @click="uploadFile"
          >立即上传</el-button
        >
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
      showUP: false,
      showDW: false,
      showdown: false,
      bodyHeight: "",
      tableData: [],
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,

      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      options3: [],
      options: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      yjtywybm: "",
      sdm: "",
      kdgslx: "",
      zdgk: "",
      sfdj: "",
      sfpj: "",
      fqbh: "",
      fjfabh: "",
      formLabelWidth: "110px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      showUpLoad: false,
      visible: false,
      type: "",
      form: {
        employeeNo: "",
        dispatchAreaCode: "",
        expressCode: "",
        latticeNo: "",
        collectFlag: "",
        dispatchFlag: "",
        areaNo: "",
        sortingPlanNum: "",
        options3: [],
        options: [
          {
            value: "1",
            label: "是",
          },
          {
            value: "0",
            label: "否",
          },
        ],
        rules: {
          employeeNo: [
            {
              required: true,
              message: "请输入易拣通业务员编码",
              trigger: "blur",
            },
          ],
          dispatchAreaCode: [
            { required: true, message: "请输入三段码", trigger: "blur" },
          ],
          expressCode: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          latticeNo: [
            { required: true, message: "请输入指定格口", trigger: "blur" },
          ],
          collectFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          dispatchFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          areaNo: [
            { required: true, message: "请输入分区编号", trigger: "blur" },
          ],
          sortingPlanNum: [
            { required: true, message: "请输入分拣方案编号", trigger: "blur" },
          ],
        },
      },
      form2: {
        employeeNo: "",
        dispatchAreaCode: "",
        expressCode: "",
        latticeNo: "",
        collectFlag: "",
        dispatchFlag: "",
        areaNo: "",
        sortingPlanNum: "",
        options3: [],
        options: [
          {
            value: "1",
            label: "是",
          },
          {
            value: "0",
            label: "否",
          },
        ],
        rules: {
          employeeNo: [
            {
              required: true,
              message: "请输入易拣通业务员编码",
              trigger: "blur",
            },
          ],
          dispatchAreaCode: [
            { required: true, message: "请输入三段码", trigger: "blur" },
          ],
          expressCode: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          latticeNo: [
            { required: true, message: "请输入指定格口", trigger: "blur" },
          ],
          collectFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          dispatchFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          areaNo: [
            { required: true, message: "请输入分区编号", trigger: "blur" },
          ],
          sortingPlanNum: [
            { required: true, message: "请输入分拣方案编号", trigger: "blur" },
          ],
        },
      },
      thisRowId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    geteer1() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "express_type",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.form2.options3 = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    //
    init(params) {
      this.visible = true;
      this.type = params;
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${
          files.length + fileList.length
        } 个`
      );
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.fileList.push(file.raw);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx") {
        this.$message.warning("只能上传后缀是.xlsx的文件");
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M");
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success("文件上传成功");
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");
    },
    UploadUrl: function () {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return "";
    },
    uploadFile: function () {
      if (this.fileList.length === 0) {
        this.$message.warning("请上传文件");
      } else {
        that
          .$confirm("点击确定将上传文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            let form = new FormData();
            form.append("file", this.fileList[0]);
            form.append("type", this.type);
            // that
            //   .$upload("sortingPlanBs/import", {
            //     data:form,
            //   })
            //   .then(function (data) {
            //     if (data && data.code == "0000") {
            //       that.$message({
            //         message: '导入成功',
            //         type: "success",
            //       });
            //       this.visible = false;
            //     } else {
            //       that.$message({
            //         message: data.msg,
            //         type: "warning",
            //       });
            //     }
            //   });
            that
              .$axios({
                method: "post",
                url:
                  sessionStorage.getItem("IP") +
                  "sortingPlanJt/importSortingPlanJt",
                headers: {
                  "Content-type": "multipart/form-data",
                },
                data: form,
              })
              .then(
                (res) => {
                  that.visible = false;
                  that.showUpLoad = false;
                  that.fileList = [];
                  if (res.data.code == "0000") {
                    this.$message({
                      message: "上传成功",
                      type: "success",
                    });
                  }
                },
                (err) => {}
              );
          })
          .catch(() => {
            that.visible = false;
            that.showUpLoad = false;
            that.fileList = [];
          });
      }
    },
    //
    getDownLoad() {
      if (that.tableData) {
        that
          .$confirm("点击确定将下载文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            window.location.href =
              sessionStorage.getItem("IP1") + "getExcelTemplate";
          })
          .catch(() => {});
      }
    },
    getdownLoad() {
      if (that.tableData) {
        that
          .$confirm("点击确定将下载文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            window.location.href =
              sessionStorage.getItem("IP1") +
              "export" +
              "?employeeNo=" +
              that.yjtywybm +
              "&dispatchAreaCode=" +
              that.sdm +
              "&expressCode=" +
              that.kdgslx +
              "&latticeNo=" +
              that.zdgk +
              "&collectFlag=" +
              that.sfdj +
              "&dispatchFlag=" +
              that.sfpj +
              "&sortingPlanNum=" +
              that.fjfabh;
          })
          .catch(() => {});
      } else {
        that.$message({
          message: "当前展示的数据为空,不能下载",
          type: "warning",
        });
      }
    },
    getUpLoad() {
      that.showUpLoad = true;
    },
    clearAll() {
      that.yjtywybm = "";
      that.sdm = "";
      that.kdgslx = "";
      that.zdgk = "";
      that.sfdj = "";
      that.sfpj = "";
      that.fjfabh = "";
      that.getData();
    },
    geterr() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "express_type",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.options3 = data.data;
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
        .$post1("getSortingPlanGpPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.count = data.page.count;
            that.tableData = data.page.list;
            for (let i = 0; i < data.page.list.length; i++) {
              if (data.page.list[i].collectFlag === 1) {
                that.tableData[i].collectFlag = "是";
              } else {
                that.tableData[i].collectFlag = "否";
              }
              if (data.page.list[i].dispatchFlag === 1) {
                that.tableData[i].dispatchFlag = "是";
              } else {
                that.tableData[i].dispatchFlag = "否";
              }
              if (data.page.list[i].expressCode === "yto") {
                that.tableData[i].expressCode = "圆通";
              } else if (data.page.list[i].expressCode === "ems") {
                that.tableData[i].expressCode = "邮政";
              } else if (data.page.list[i].expressCode === "sto") {
                that.tableData[i].expressCode = "申通";
              } else if (data.page.list[i].expressCode === "zto") {
                that.tableData[i].expressCode = "中通";
              } else if (data.page.list[i].expressCode === "bs") {
                that.tableData[i].expressCode = "百世";
              } else if (data.page.list[i].expressCode === "yd") {
                that.tableData[i].expressCode = "韵达";
              } else if (data.page.list[i].expressCode === "jt") {
                that.tableData[i].expressCode = "极兔";
              }
            }
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
            that.form.options3 = data.data;
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
            .$post1("editSortingPlanGp", {
              employeeNo: that.form.employeeNo,
              dispatchAreaCode: that.form.dispatchAreaCode,
              expressCode: that.form.expressCode,
              latticeNo: that.form.latticeNo,
              collectFlag: that.form.collectFlag === "是" ? 1 : 0,
              dispatchFlag: that.form.dispatchFlag === "是" ? 1 : 0,
              areaNo: that.form.areaNo,
              sortingPlanNum: that.form.sortingPlanNum,
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
            .$post1("deleteSortingPlanGp", {
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
      that.dialogFormVisible2 = true;
      console.log(row);
      that.thisRowId = row.id;
      that.form2.employeeNo = row.employeeNo;
      that.form2.dispatchAreaCode = row.dispatchAreaCode;
      that.form2.expressCode = row.expressCode;
      that.form2.latticeNo = row.latticeNo;
      that.form2.collectFlag = row.collectFlag;
      that.form2.dispatchFlag = row.dispatchFlag;
      that.form2.areaNo = row.areaNo;
      that.form2.sortingPlanNum = row.sortingPlanNum;
    },
    submitForm2(form2) {
      that
        .$post1("editSortingPlanGp", {
          id: that.thisRowId,
          employeeNo: that.form2.employeeNo,
          dispatchAreaCode: that.form2.dispatchAreaCode,
          expressCode: that.form2.expressCode,
          latticeNo: that.form2.latticeNo,
          collectFlag: that.form2.collectFlag == "是" ? 1 : 0,
          dispatchFlag: that.form2.dispatchFlag == "是" ? 1 : 0,
          areaNo: that.form2.areaNo,
          sortingPlanNum: that.form2.sortingPlanNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.$message({
              message: "修改成功",
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
    },
    showSearchToast() {
      that
        .$post1("getSortingPlanGpPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          employeeNo: that.yjtywybm,
          dispatchAreaCode: that.sdm,
          expressCode: that.kdgslx,
          latticeNo: that.zdgk,
          collectFlag: that.sfdj,
          dispatchFlag: that.sfpj,
          sortingPlanNum: that.fjfabh,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            if (data.page) {
              that.count = data.page.count;
              that.tableData = data.page.list;
              for (let i = 0; i < data.page.list.length; i++) {
                if (data.page.list[i].collectFlag === 1) {
                  that.tableData[i].collectFlag = "是";
                } else {
                  that.tableData[i].collectFlag = "否";
                }
                if (data.page.list[i].dispatchFlag === 1) {
                  that.tableData[i].dispatchFlag = "是";
                } else {
                  that.tableData[i].dispatchFlag = "否";
                }
                if (data.page.list[i].expressCode === "yto") {
                  that.tableData[i].expressCode = "圆通";
                } else if (data.page.list[i].expressCode === "ems") {
                  that.tableData[i].expressCode = "邮政";
                } else if (data.page.list[i].expressCode === "sto") {
                  that.tableData[i].expressCode = "申通";
                } else if (data.page.list[i].expressCode === "zto") {
                  that.tableData[i].expressCode = "中通";
                } else if (data.page.list[i].expressCode === "bs") {
                  that.tableData[i].expressCode = "百世";
                } else if (data.page.list[i].expressCode === "yd") {
                  that.tableData[i].expressCode = "韵达";
                } else if (data.page.list[i].expressCode === "jt") {
                  that.tableData[i].expressCode = "极兔";
                }
              }
            }else{
              that.tableData=''
            }
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "gpGridScheme")
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
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "导入"
              ) {
                that.showUP = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "导出"
              ) {
                that.showdown = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "下载模板"
              ) {
                that.showDW = true;
              }
            }
        }
      }
    }
    that.getData();
    that.geterr();
    that.geteer1();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/ytGridScheme.scss";
</style>