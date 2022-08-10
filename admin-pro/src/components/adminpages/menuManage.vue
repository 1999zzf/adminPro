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
            名称:
            <el-input
              placeholder="请输入名称"
              style="width: 65%"
              v-model="form3.menuName"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            层级:
            <el-input
              placeholder="请输入层级"
              style="width: 65%"
              v-model="form3.menuLevel"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            类型:
            <el-select
              style="width: 65%"
              v-model="form3.menuType"
              placeholder="请选择类型"
              clearable
            >
              <el-option
                v-for="item in form3.options"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            父级id:
            <el-input
              placeholder="请输入父级id"
              style="width: 65%"
              v-model="form3.parentId"
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
        :height="bodyHeight - 150"
      >
        <el-table-column
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column align="center" prop="id" label="Id"></el-table-column>
        <el-table-column
          align="center"
          prop="menuName"
          label="名字"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="menuDesc"
          label="描述"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="menuLevel"
          label="层级"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="menuType"
          label="类型"
          width="120"
        >
          <template slot-scope="scope">
            <span
              v-show="scope.row.menuType == 0"
              :style="{
                color: '#303133',
              }"
              >管理模块</span
            >
            <span
              v-show="scope.row.menuType == 1"
              :style="{
                color: '#606266',
              }"
              >页面</span
            >
            <span
              v-show="scope.row.menuType == 2"
              :style="{
                color: '#909399',
              }"
              >按钮</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="pageUrl"
          label="路由地址"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.menuType == 2 ? "-" : scope.row.pageUrl }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          prop="parentId"
          label="父级Id"
          width="180"
        >
          <template slot-scope="scope">
            <span
              :style="{
                color: scope.row.menuType == 2 ? '#909399' : '#67C23A',
              }"
              >{{ scope.row.menuType == 2 ? "-" : scope.row.parentId }}</span
            >
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          prop="parentId"
          label="父级Id"
          width="180"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="showBJ"
              type="warning"
              @click="handleClick(scope.row)"
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
          <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入名称"
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="menuDesc"
            label="描述"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入描述"
              v-model="form.menuDesc"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="menuLevel"
            label="层级"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入层级(如1,2,3)"
              v-model="form.menuLevel"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="menuType"
            label="类型"
            :label-width="formLabelWidth"
          >
            <el-select
              style="width: 100%"
              v-model="form.menuType"
              placeholder="请选择类型"
              clearable
            >
              <el-option
                v-for="item in form3.options"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="pageUrl"
            label="路由地址"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入路由地址"
              v-model="form.pageUrl"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="parentId"
            label="父级Id"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入父级Id(如是2级就填1级的Id)"
              v-model="form.parentId"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="webUrl"
            label="接口地址"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入接口地址"
              v-model="form.webUrl"
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
          <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入名称"
              v-model="form2.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="menuDesc"
            label="描述"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入描述"
              v-model="form2.menuDesc"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="menuLevel"
            label="层级"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入层级(如1,2,3)"
              v-model="form2.menuLevel"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="menuType"
            label="类型"
            :label-width="formLabelWidth"
          >
            <el-select
              style="width: 100%"
              v-model="form2.menuType"
              placeholder="请选择类型"
              clearable
            >
              <el-option
                v-for="item in form3.options"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="pageUrl"
            label="路由地址"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入路由地址"
              v-model="form2.pageUrl"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="parentId"
            label="父级Id"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入父级Id(如是2级就填1级的Id)"
              v-model="form2.parentId"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="webUrl"
            label="接口地址"
            :label-width="formLabelWidth"
          >
            <el-input
              placeholder="请输入接口地址"
              v-model="form2.webUrl"
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
  inject: ["reload"],
  components: {},
  props: {},
  data() {
    return {
      showZJ: false,
      showSC: false,
      showBJ: false,
      bodyHeight: "",
      tableData: [],
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 15, //每页显示条目数
      count: 0,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: "",
        menuDesc: "",
        menuLevel: "",
        menuType: "",
        pageUrl: "",
        parentId: "",
        webUrl: "",
        rules: {
          name: [{ required: true, message: "请输入名称", trigger: "blur" }],
          menuDesc: [
            { required: true, message: "请输入描述", trigger: "blur" },
          ],
          menuLevel: [
            { required: true, message: "请输入层级", trigger: "blur" },
          ],
          menuType: [
            { required: true, message: "请输入类型", trigger: "blur" },
          ],
          pageUrl: [
            { required: true, message: "请输入路由地址", trigger: "blur" },
          ],
          parentId: [
            { required: true, message: "请输入父级Id", trigger: "blur" },
          ],
          webUrl: [
            { required: true, message: "请输入接口地址", trigger: "blur" },
          ],
        },
      },
      formLabelWidth: "80px",
      form2: {
        name: "",
        menuDesc: "",
        menuLevel: "",
        menuType: "",
        pageUrl: "",
        parentId: "",
        webUrl: "",
        rules: {
          name: [{ required: true, message: "请输入名称", trigger: "blur" }],
          menuDesc: [
            { required: true, message: "请输入描述", trigger: "blur" },
          ],
          menuLevel: [
            { required: true, message: "请输入层级", trigger: "blur" },
          ],
          menuType: [
            { required: true, message: "请输入类型", trigger: "blur" },
          ],
          pageUrl: [
            { required: true, message: "请输入路由地址", trigger: "blur" },
          ],
          parentId: [
            { required: true, message: "请输入父级Id", trigger: "blur" },
          ],
          webUrl: [
            { required: true, message: "请输入接口地址", trigger: "blur" },
          ],
        },
      },
      thisScopeId: "",
      form3: {
        menuName: "",
        menuLevel: "",
        menuType: "",
        parentId:"",
        options: [],

        rules: {
          menuName: [
            { required: false, message: "请输入名称", trigger: "blur" },
          ],
          menuLevel: [
            { required: false, message: "请输入层级", trigger: "blur" },
          ],
          menuType: [
            { required: false, message: "请输入类型", trigger: "blur" },
          ],
          parentId: [
            { required: false, message: "请输入父级Id", trigger: "blur" },
          ],
        },
      },
      dialogFormVisible3: false,

      showRef: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    geteer(){
      that.$post("dictionary/getDictionaryList",{
        dictionaryType:"menu_type",
      }).then(function(data){
        if(data&&data.code=="0000"){
          that.form3.options =data.data;
        }else{
          that.$message({
            message:data.msg,
            type:"warning"
          })
        }
      })
    },
    getData() {
      that
        .$post("menu/getMenuList", {
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
    clearAll() {
      that.form3.menuName = "";
      that.form3.menuLevel = "";
      that.form3.parentId="";
      that.form3.menuType = "";
      that.pageNum = 1;
      that.currentPage = 1;
      that.getData();
    },
    showSearchToast() {
      that.pageNum = 1;
      that.currentPage = 1;
      that.search();
    },
    search() {
      that
        .$post("menu/getMenuList", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          menuName: that.form3.menuName,
          menuLevel: that.form3.menuLevel,
          parentId:that.form3.parentId,
          menuType: that.form3.menuType,
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
    handleClick(row) {
      that.dialogFormVisible2 = true;
      that.thisScopeId = row.id;
      that.form2.name = row.menuName;
      that.form2.menuDesc = row.menuDesc;
      that.form2.menuLevel = row.menuLevel;
      that.form2.menuType = row.menuType;
      that.form2.pageUrl = row.pageUrl;
      that.form2.parentId = row.parentId;
      that.form2.webUrl = row.webUrl;
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
            .$post("menu/delete", {
              id: row.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                that.reload();
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
    handleSizeChange(val) {
      that.pageSize = val;
      that.getData();
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.form3.menuName || that.form3.menuLevel || that.form3.menuType) {
        that.search();
      } else {
        that.getData();
      }
    },
    showAddToast() {
      that.dialogFormVisible = true;
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          that
            .$post("menu/editMenu", {
              menuName: that.form.name,
              menuDesc: that.form.menuDesc,
              menuLevel: that.form.menuLevel,
              menuType: that.form.menuType,
              pageUrl: that.form.pageUrl,
              parentId: that.form.parentId,
              webUrl: that.form.webUrl,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
                that.dialogFormVisible = false;
                that.reload();
              } else {
                that.$message({
                  message: data.msg,
                  type: "warning",
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm2(form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          that
            .$post("menu/editMenu", {
              id: that.thisScopeId,
              menuName: that.form2.name,
              menuDesc: that.form2.menuDesc,
              menuLevel: that.form2.menuLevel,
              menuType: that.form2.menuType,
              pageUrl: that.form2.pageUrl,
              parentId: that.form2.parentId,
              webUrl: that.form2.webUrl,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                that.dialogFormVisible2 = false;
                that.reload();
              } else {
                that.$message({
                  message: data.msg,
                  type: "warning",
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
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
          if (that.asideData[ti].chrildList[tis].pageUrl == "menuManage")
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
    that.geteer();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/menuManage.scss";
</style>