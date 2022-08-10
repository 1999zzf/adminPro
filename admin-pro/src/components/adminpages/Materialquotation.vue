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
            物料名称:
            <el-input
              placeholder="物料名称"
              style="width: 65%"
              v-model="wlmc"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            物料类型:
            <el-select
              style="width: 65%"
              clearable
              v-model="wllx"
              placeholder="物料类型"
            >
              <el-option
                v-for="item in options1"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
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
          prop="code"
          label="物料型号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="物料名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="物料说明"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="物料类型"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="unit"
          label="物料单位"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="price"
          label="价格(单位:分)"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="typeName"
          label="物料类型"
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
            prop="code"
            label="物料型号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入物料型号"
              v-model="form.code"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="name"
            label="物料名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入物料名称"
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="remark"
            label="物料说明"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入物料说明"
              v-model="form.remark"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="物料类型"
            :label-width="formLabelWidth"
            prop="type"
          >
            <el-select
              style="width: 100%"
              v-model="form.type"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options1"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
         <el-form-item
            label="物料单位"
            :label-width="formLabelWidth"
            prop="unit"
          >
            <el-select
              style="width: 100%"
              v-model="form.unit"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options2"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="price"
            label="价格(单位:分)"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入价格"
              v-model="form.price"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="typeName"
            label="物料类型"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入物料类型"
              v-model="form.typeName"
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
            prop="code"
            label="物料型号"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入物料型号"
              v-model="form2.code"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="name"
            label="物料名称"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入物料名称"
              v-model="form2.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="remark"
            label="物料说明"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入物料说明"
              v-model="form2.remark"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="物料类型"
            :label-width="formLabelWidth"
            prop="type"
          >
            <el-select
              style="width: 100%"
              v-model="form2.type"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options1"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="物料单位"
            :label-width="formLabelWidth"
            prop="unit"
          >
            <el-select
              style="width: 100%"
              v-model="form2.unit"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options2"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="price"
            label="价格(单位:分)"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入价格"
              v-model="form2.price"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="typeName"
            label="物料类型"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入物料类型"
              v-model="form2.typeName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm2()"
            >确 定</el-button
          >
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
      showRef: false,
      showdown:false,
      bodyHeight: "",
      tableData: [],
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,

      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表

      errList: [],
      options1:[],
      options2:[],
      options3:[],
      jcglx: "",
      gkbh: "",
      wdbm: "",
      sfsc: "",
      sfpj: "",
      sffb: "",
      sfjb: "",
      fzfa:'',
      ydm: "",
      edm: "",
      sdm: "",
      Sdm: "",
      wlmc:"",
      wllx:"",
      formLabelWidth: "110px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      showUpLoad: false,
      visible: false,
      type: "",
      form: {
        code:"",
        name:"",
        remark:"",
        type:"",
        unit:"",
        price:"",
        typeName:"",
        rules: {
          code: [
            { required: true, message: "请输入物料类型", trigger: "blur" },
          ],
          name: [
            { required: true, message: "请输入物料名称", trigger: "blur" },
          ],
          remark: [
            { required: true, message: "请输入物料说明", trigger: "blur" },
          ],
          type: [
            { required: true, message: "请选择", trigger: "blur" },
          ],
          unit: [
            { required: true, message: "请选择", trigger: "blur" },
          ],
          price: [
            { required: true, message: "请输入物料价格", trigger: "blur" },
          ],
          typeName: [
            { required: true, message: "请输入物料类型", trigger: "blur" },
          ],
        },
      },
      form2: {
        code: "",
        name: "",
        remark: "",
        unit: "",
        price: "",
        typeName: "",
        type:"",
        rules: {
          code: [
            { required: true, message: "请输入物料型号", trigger: "change" },
          ],
          name: [
            { required: true, message: "请输入物料名称", trigger: "blur" },
          ],
          remark: [
            { required: true, message: "请输入物料说明", trigger: "blur" },
          ],
          type: [
            { required: true, message: "请选择", trigger: "blur" },
          ],
          unit: [
            { required: true, message: "请输入物料单位", trigger: "blur" },
          ],
          price: [
            { required: true, message: "请输入价格", trigger: "blur" },
          ],
          typeName: [
            { required: true, message: "请输入物料类型", trigger: "blur" },
          ],
        },
      },
      thisRowId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    geteer1(){
      that.$post("dictionary/getDictionaryList",{
        dictionaryType:"material_type",
      }).then(function(data){
          console.log(data)
        if(data&&data.code=="0000"){
          that.options1 =data.data;
        }else{
          that.$message({
            message:data.msg,
            type:"warning"
          })
        }
      })
    },
    geteer2(){
      that.$post("dictionary/getDictionaryList",{
        dictionaryType:"unit_type",
      }).then(function(data){
          console.log(data)
        if(data&&data.code=="0000"){
          that.options2 =data.data;
        }else{
          that.$message({
            message:data.msg,
            type:"warning"
          })
        }
      })
    },
    // geteer3(){
    //   that.$post("dictionary/getDictionaryList",{
    //     dictionaryType:"belt_type",
    //   }).then(function(data){
    //       console.log(data)
    //     if(data&&data.code=="0000"){
    //       that.options3 =data.data;
    //     }else{
    //       that.$message({
    //         message:data.msg,
    //         type:"warning"
    //       })
    //     }
    //   })
    // },
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
                url: sessionStorage.getItem("IP") + "sortingPlanJt/importSortingPlanJt",
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
              sessionStorage.getItem("IP") +
              "sortingPlanJt/getExcelTemplate" +
              "?flowDirection=" +
              that.jcglx +
              "&latticeNo=" +
              that.gkbh +
              "&nodeCode=" +
              that.wdbm +
              "&collectFlag=" +
              that.sfsc +
              "&dispatchFlag=" +
              that.sfpj +
              "&boardingFlag=" +
              that.sffb +
              "&packagesFlag=" +
              that.sfjb +
              "&code1=" +
              that.ydm +
              "&code2=" +
              that.edm +
              "&code3=" +
              that.sdm +
              "&code4=" +
              that.Sdm;
          })
          .catch(() => {});
      } else {
        that.$message({
          message: "当前展示的数据为空,不能下载",
          type: "warning",
        });
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
              sessionStorage.getItem("IP") +
              "sortingPlanJt/exportSortingPlanJt" +
              "?flowDirection=" +
              that.jcglx +
              "&latticeNo=" +
              that.gkbh +
              "&nodeCode=" +
              that.wdbm +
              "&collectFlag=" +
              that.sfsc +
              "&dispatchFlag=" +
              that.sfpj +
              "&boardingFlag=" +
              that.sffb +
              "&packagesFlag=" +
              that.sfjb +
              "&code1=" +
              that.ydm +
              "&code2=" +
              that.edm +
              "&code3=" +
              that.sdm +
              "&code4=" +
              that.Sdm;
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
      that.wlmc='';
      that.wllx='';
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
        .$post("materialInfo/getMaterialInfoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.count = data.page.count;
            that.tableData = data.page.list;
            that.$nextTick(() => {
              that.$refs.table.doLayout();
            });
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
            .$post("materialInfo/editMaterialInfo", {
              code:that.form.code,
              name:that.form.name,
              remark:that.form.remark,
              type:that.form.type,
              unit:that.form.unit,
              price:that.form.price,
              typeName:that.form.typeName
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
            .$post("sortingPlanBs/delete", {
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
      that.form2.code=row.code;
      that.form2.name=row.name;
      that.form2.remark=row.remark;
      that.form2.type=row.type;
      that.form2.unit=row.unit;
      that.form2.price=row.price;
      that.form2.typeName=row.typeName
      that.dialogFormVisible2 = true;
    },
    submitForm2() {
          that
            .$post("materialInfo/editMaterialInfo", {
              id: that.thisRowId,
              code:that.form2.code,
              name:that.form2.name,
              remark:that.form2.remark,
              type:that.form2.type,
              unit:that.form2.unit,
              price:that.form2.price,
              typeName:that.form2.typeName
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
        .$post("materialInfo/getMaterialInfoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          name:that.wlmc,
          type:that.wllx,
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "Materialquotation")
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
    that.geteer1();
    that.geteer2();
    // that.geteer3();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/gridState.scss";
</style>