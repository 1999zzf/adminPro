<template>
  <div class="wrapper">
    <div class="headerTop">
      <div style="margin-left: 10px;">
        <el-button
          v-if="showZJ"
          @click="showAddToast()"
          type="primary"
          icon="el-icon-circle-plus"
        >增加</el-button>
      </div>
      <div v-if="showDW">
        <el-button @click="getDownLoad()" icon="el-icon-download" type="primary"></el-button>
      </div>
      <div v-if="showUP">
        <el-button @click="getUpLoad()" icon="el-icon-upload2" type="primary"></el-button>
      </div>

      <div>
        <el-select clearable v-model="jcglx" placeholder="进出港类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-input placeholder="格口编号" v-model="gkbh" autocomplete="off"></el-input>
      </div>
      <div>
        <el-input placeholder="网点编码" v-model="wdbm" autocomplete="off"></el-input>
      </div>
      <div>
        <el-select clearable v-model="sfsc" placeholder="是否上传">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="sfpj" placeholder="是否派件">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="sffb" placeholder="是否分部">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="sfjb" placeholder="是否建包">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-input placeholder="一段码" v-model="ydm" autocomplete="off"></el-input>
      </div>
      <div>
        <el-input placeholder="二段码" v-model="edm" autocomplete="off"></el-input>
      </div>
      <div>
        <el-input placeholder="三段码" v-model="sdm" autocomplete="off"></el-input>
      </div>
      <div>
        <el-input placeholder="四段码" v-model="Sdm" autocomplete="off"></el-input>
      </div>

      <div>
        <el-button @click="showSearchToast()" type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div>
        <el-button type="info" icon="el-icon-delete" @click="clearAll()"></el-button>
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
        :data="tableData"
        border
        stripe
        style="width: 100%; overflow: auto"
        :height='bodyHeight - 100'

      >
        <el-table-column
          fixed="left"
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
          align="center"
        ></el-table-column>

        <el-table-column align="center" prop="flowDirectionName" label="进出港类型"></el-table-column>
        <el-table-column align="center" prop="latticeNo" label="格口编号"></el-table-column>
        <el-table-column align="center" prop="nodeName" label="网点名称"></el-table-column>
        <el-table-column align="center" prop="nodeCode" label="网点编码"></el-table-column>
        <el-table-column align="center" prop="collectFlagName" label="是否上传(揽收)"></el-table-column>
        <el-table-column align="center" prop="dispatchFlagName" label="是否派件(揽收)"></el-table-column>
        <el-table-column align="center" prop="boardingFlagName" label="是否分部(上车)"></el-table-column>
        <el-table-column align="center" prop="packagesFlagName" label="是否建包"></el-table-column>
        <el-table-column align="center" prop="code1" label="一段码"></el-table-column>
        <el-table-column align="center" prop="code2" label="二段码"></el-table-column>
        <el-table-column align="center" prop="code3" label="三段码"></el-table-column>
        <el-table-column align="center" prop="code4" label="四段码"></el-table-column>
        <el-table-column align="center" prop="completionCode" label="补码编码"></el-table-column>
        <el-table-column align="center" prop="areaNo" label="分区编号"></el-table-column>
        <el-table-column align="center" prop="sortingPlanNum" label="分拣方案编号"></el-table-column>
        <el-table-column align="center" prop="actualOrgCode" label="实际目的网点"></el-table-column>

        <el-table-column fixed="right" align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="showBJ"
              type="warning"
              @click="handleClickEdit(scope.row)"
              size="mini"
            >编辑</el-button>
            <el-button
              v-if="showSC"
              type="danger"
              @click="handleClickDelete(scope.row)"
              size="mini"
            >删除</el-button>
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
          <el-form-item label="进出港类型" :label-width="formLabelWidth" prop="flowDirection">
            <el-select style="width: 100%" v-model="form.flowDirection" placeholder="请选择">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="latticeNo" label="格口编号" :label-width="formLabelWidth">
            <el-input placeholder="请输入格口编号" v-model="form.latticeNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="nodeName" label="网点名称" :label-width="formLabelWidth">
            <el-input placeholder="请输入网点名称" v-model="form.nodeName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="nodeCode" label="网点编码" :label-width="formLabelWidth">
            <el-input placeholder="请输入网点编码" v-model="form.nodeCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否上传" :label-width="formLabelWidth" prop="collectFlag">
            <el-select style="width: 100%" v-model="form.collectFlag" placeholder="请选择">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否派件" :label-width="formLabelWidth" prop="dispatchFlag">
            <el-select style="width: 100%" v-model="form.dispatchFlag" placeholder="请选择">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否分部" :label-width="formLabelWidth" prop="boardingFlag">
            <el-select style="width: 100%" v-model="form.boardingFlag" placeholder="请选择">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否建包" :label-width="formLabelWidth" prop="packagesFlag">
            <el-select style="width: 100%" v-model="form.packagesFlag" placeholder="请选择">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="code1" label="一段码" :label-width="formLabelWidth">
            <el-input placeholder="请输入一段码" v-model="form.code1" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="code2" label="二段码" :label-width="formLabelWidth">
            <el-input placeholder="请输入二段码" v-model="form.code2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="code3" label="三段码" :label-width="formLabelWidth">
            <el-input placeholder="请输入三段码" v-model="form.code3" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="code4" label="四段码" :label-width="formLabelWidth">
            <el-input placeholder="请输入四段码" v-model="form.code4" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="completionCode" label="补码编码" :label-width="formLabelWidth">
            <el-input placeholder="请输入补码编码" v-model="form.completionCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="areaNo" label="分区编码" :label-width="formLabelWidth">
            <el-input placeholder="请输入分区编码" v-model="form.areaNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="sortingPlanNum" label="分拣方案编号" :label-width="formLabelWidth">
            <el-input placeholder="请输入分拣方案编号" v-model="form.sortingPlanNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="actualOrgCode" label="实际目的网点" :label-width="formLabelWidth">
            <el-input placeholder="请输入实际目的网点" v-model="form.actualOrgCode" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="showEditToast">
      <el-dialog title="编辑" width="40%" :visible.sync="dialogFormVisible2">
        <el-form :rules="form2.rules" ref="form2" :model="form2">
          <el-form-item label="进出港类型" :label-width="formLabelWidth" prop="flowDirection">
            <el-select style="width: 100%" v-model="form2.flowDirection" placeholder="请选择">
              <el-option
                v-for="item in form2.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="latticeNo" label="格口编号" :label-width="formLabelWidth">
            <el-input placeholder="请输入格口编号" v-model="form2.latticeNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="nodeName" label="网点名称" :label-width="formLabelWidth">
            <el-input placeholder="请输入网点名称" v-model="form2.nodeName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="nodeCode" label="网点编码" :label-width="formLabelWidth">
            <el-input placeholder="请输入网点编码" v-model="form2.nodeCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否上传" :label-width="formLabelWidth" prop="collectFlag">
            <el-select style="width: 100%" v-model="form2.collectFlag" placeholder="请选择">
              <el-option
                v-for="item in form2.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否派件" :label-width="formLabelWidth" prop="dispatchFlag">
            <el-select style="width: 100%" v-model="form2.dispatchFlag" placeholder="请选择">
              <el-option
                v-for="item in form2.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否分部" :label-width="formLabelWidth" prop="boardingFlag">
            <el-select style="width: 100%" v-model="form2.boardingFlag" placeholder="请选择">
              <el-option
                v-for="item in form2.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否建包" :label-width="formLabelWidth" prop="packagesFlag">
            <el-select style="width: 100%" v-model="form2.packagesFlag" placeholder="请选择">
              <el-option
                v-for="item in form2.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="code1" label="一段码" :label-width="formLabelWidth">
            <el-input placeholder="请输入一段码" v-model="form2.code1" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="code2" label="二段码" :label-width="formLabelWidth">
            <el-input placeholder="请输入二段码" v-model="form2.code2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="code3" label="三段码" :label-width="formLabelWidth">
            <el-input placeholder="请输入三段码" v-model="form2.code3" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="code4" label="四段码" :label-width="formLabelWidth">
            <el-input placeholder="请输入四段码" v-model="form2.code4" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="completionCode" label="补码编码" :label-width="formLabelWidth">
            <el-input placeholder="请输入补码编码" v-model="form2.completionCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="areaNo" label="分区编码" :label-width="formLabelWidth">
            <el-input placeholder="请输入分区编码" v-model="form2.areaNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="sortingPlanNum" label="分拣方案编号" :label-width="formLabelWidth">
            <el-input placeholder="请输入分拣方案编号" v-model="form2.sortingPlanNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="actualOrgCode" label="实际目的网点" :label-width="formLabelWidth">
            <el-input placeholder="请输入实际目的网点" v-model="form2.actualOrgCode" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm2('form2')">确 定</el-button>
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
          <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过10M</div>
        </el-upload>
        <br />
        <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
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
      showDW:false,
      showUP:false,
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
      jcglx: "",
      gkbh: "",
      wdbm: "",
      sfsc: "",
      sfpj: "",
      sffb: "",
      sfjb: "",
      ydm: "",
      edm: "",
      sdm: "",
      Sdm: "",
      formLabelWidth: "110px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      showUpLoad: false,
      visible: false,
      type: "",
      form: {
        flowDirection: "",
        latticeNo: "",
        nodeName: "",
        nodeCode: "",
        collectFlag: "",
        dispatchFlag: "",
        boardingFlag: "",
        packagesFlag: "",
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        completionCode: "",
        areaNo: "",
        sortingPlanNum: "",
        actualOrgCode: "",
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
          flowDirection: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          latticeNo: [
            { required: true, message: "请输入格口编号", trigger: "blur" },
          ],
          nodeName: [
            { required: true, message: "请输入网点名称", trigger: "blur" },
          ],
          nodeCode: [
            { required: true, message: "请输入网点编码", trigger: "blur" },
          ],
          collectFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          dispatchFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          boardingFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          packagesFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          code1: [{ required: true, message: "请输入一段码", trigger: "blur" }],
          code2: [{ required: true, message: "请输入二段码", trigger: "blur" }],
          code3: [{ required: true, message: "请输入三段码", trigger: "blur" }],
          code4: [{ required: true, message: "请输入四段码", trigger: "blur" }],
          completionCode: [
            { required: true, message: "请输入补码编码", trigger: "blur" },
          ],
          areaNo: [
            { required: true, message: "请输入分区编码", trigger: "blur" },
          ],
          sortingPlanNum: [
            { required: true, message: "请输入分拣方案编号", trigger: "blur" },
          ],
          actualOrgCode: [
            { required: true, message: "请输入实际目的网点", trigger: "blur" },
          ],
        },
      },
      form2: {
        flowDirection: "",
        latticeNo: "",
        nodeName: "",
        nodeCode: "",
        collectFlag: "",
        dispatchFlag: "",
        boardingFlag: "",
        packagesFlag: "",
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        completionCode: "",
        areaNo: "",
        sortingPlanNum: "",
        actualOrgCode: "",
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
          flowDirection: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          latticeNo: [
            { required: true, message: "请输入格口编号", trigger: "blur" },
          ],
          nodeName: [
            { required: true, message: "请输入网点名称", trigger: "blur" },
          ],
          nodeCode: [
            { required: true, message: "请输入网点编码", trigger: "blur" },
          ],
          collectFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          dispatchFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          boardingFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          packagesFlag: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          code1: [{ required: true, message: "请输入一段码", trigger: "blur" }],
          code2: [{ required: true, message: "请输入二段码", trigger: "blur" }],
          code3: [{ required: true, message: "请输入三段码", trigger: "blur" }],
          code4: [{ required: true, message: "请输入四段码", trigger: "blur" }],
          completionCode: [
            { required: true, message: "请输入补码编码", trigger: "blur" },
          ],
          areaNo: [
            { required: true, message: "请输入分区编码", trigger: "blur" },
          ],
          sortingPlanNum: [
            { required: true, message: "请输入分拣方案编号", trigger: "blur" },
          ],
          actualOrgCode: [
            { required: true, message: "请输入实际目的网点", trigger: "blur" },
          ],
        },
      },
      thisRowId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
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
                url: sessionStorage.getItem("IP") + "sortingPlanSto/import",
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
      if(that.tableData){
        that
        .$confirm("点击确定将下载文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          window.location.href =
            sessionStorage.getItem("IP") +
            "sortingPlanSto/export" +
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
      }else{
        that.$message({
          message:'当前展示的数据为空,不能下载',
          type:'warning'
        })
      }
    },
    getUpLoad() {
      that.showUpLoad = true;
    },
    clearAll() {
      that.jcglx = "";
      that.gkbh = "";
      that.wdbm = "";
      that.sfsc = "";
      that.sfpj = "";
      that.sffb = "";
      that.sfjb = "";
      that.ydm = "";
      that.edm = "";
      that.sdm = "";
      that.Sdm = "";
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
        .$post("sortingPlanSto/getSortingPlanStoPage", {
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
            .$post("sortingPlanSto/editSortingPlanSto", {
              id: that.thisRowId,

              flowDirection: that.form.flowDirection == "是" ? 1 : 0,
              latticeNo: that.form.latticeNo,
              nodeName: that.form.nodeName,
              nodeCode: that.form.nodeCode,
              collectFlag: that.form.collectFlag == "是" ? 1 : 0,

              dispatchFlag: that.form.dispatchFlag == "是" ? 1 : 0,
              boardingFlag: that.form.boardingFlag == "是" ? 1 : 0,
              packagesFlag: that.form.packagesFlag == "是" ? 1 : 0,
              code1: that.form.code1,
              code2: that.form.code2,
              code3: that.form.code3,
              code4: that.form.code4,
              completionCode: that.form.completionCode,
              areaNo: that.form.areaNo,
              sortingPlanNum: that.form.sortingPlanNum,
              actualOrgCode: that.form.actualOrgCode,
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
            .$post("sortingPlanSto/delete", {
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
      that.form2.flowDirection = row.flowDirection == 1 ? "是" : "否";
      that.form2.latticeNo = row.latticeNo;
      that.form2.nodeName = row.nodeName;
      that.form2.nodeCode = row.nodeCode;
      that.form2.collectFlag = row.collectFlag == 1 ? "是" : "否";

      that.form2.dispatchFlag = row.dispatchFlag == 1 ? "是" : "否";
      that.form2.boardingFlag = row.boardingFlag == 1 ? "是" : "否";
      that.form2.packagesFlag = row.packagesFlag == 1 ? "是" : "否";
      that.form2.code1 = row.code1;
      that.form2.code2 = row.code2;
      that.form2.code3 = row.code3;
      that.form2.code4 = row.code4;
      that.form2.completionCode = row.completionCode;
      that.form2.areaNo = row.areaNo;
      that.form2.sortingPlanNum = row.sortingPlanNum;
      that.form2.actualOrgCode = row.actualOrgCode;

      that.dialogFormVisible2 = true;
    },
    submitForm2(form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          that
            .$post("sortingPlanSto/editSortingPlanSto", {
              id: that.thisRowId,

              flowDirection: that.form2.flowDirection == "是" ? 1 : 0,
              latticeNo: that.form2.latticeNo,
              nodeName: that.form2.nodeName,
              nodeCode: that.form2.nodeCode,
              collectFlag: that.form2.collectFlag == "是" ? 1 : 0,

              dispatchFlag: that.form2.dispatchFlag == "是" ? 1 : 0,
              boardingFlag: that.form2.boardingFlag == "是" ? 1 : 0,
              packagesFlag: that.form2.packagesFlag == "是" ? 1 : 0,
              code1: that.form2.code1,
              code2: that.form2.code2,
              code3: that.form2.code3,
              code4: that.form2.code4,
              completionCode: that.form2.completionCode,
              areaNo: that.form2.areaNo,
              sortingPlanNum: that.form2.sortingPlanNum,
              actualOrgCode: that.form2.actualOrgCode,
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
    showSearchToast() {
      that
        .$post("sortingPlanSto/getSortingPlanStoPage", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          flowDirection: that.jcglx,
          latticeNo: that.gkbh,
          nodeCode: that.wdbm,
          collectFlag: that.sfsc,
          dispatchFlag: that.sfpj,
          boardingFlag: that.sffb,
          packagesFlag: that.sfjb,
          code1: that.ydm,
          code2: that.edm,
          code3: that.sdm,
          code4: that.Sdm,
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "stGridScheme")
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
              }if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "上传"
              ) {
                that.showUP = true;
              }
              if (
                that.asideData[ti].chrildList[tis].buttonList[tiss].menuName ==
                "下载"
              ) {
                that.showDW = true;
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
@import "../../assets/css/adminpages/stGridScheme.scss";
</style>