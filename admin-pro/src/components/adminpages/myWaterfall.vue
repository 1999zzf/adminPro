<!--  -->
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
              v-model="mc"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            code:
            <el-input
              placeholder="请输入名称"
              style="width: 65%"
              v-model="cd"
              autocomplete="off"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            group:
            <el-select
              style="width: 65%"
              v-model="group"
              placeholder="请选择类型"
              clearable
            >
              <el-option
                v-for="item in form.options"
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
      <div :style="{ height: bodyHeight - 150 + 'px' }" class="waterfall">
        <myWaterfallOn
          v-if="hackReset"
          @fatherMethod="fatherMethod"
          :data="cardList"
        />
      </div>
    </div>
    <div class="pageCurrent">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>

    <div class="showAddToast">
      <el-dialog title="添加" width="40%" :visible.sync="dialogFormVisible">
        <el-form :rules="form.rules" ref="form" :model="form">
          <el-form-item
            label="配置名称"
            :label-width="formLabelWidth"
            prop="firstInputValue"
          >
            <el-input
              placeholder="请输入内容"
              v-model="form.firstInputValue"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="code"
            :label-width="formLabelWidth"
            prop="secInputValue"
          >
            <el-input
              placeholder="请输入内容"
              v-model="form.secInputValue"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="部门"
            :label-width="formLabelWidth"
            prop="depValue"
          >
            <el-select
              style="width: 100%"
              v-model="form.depValue"
              placeholder="请选择部门"
            >
              <el-option
                v-for="item in form.selectDep"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="数据类型"
            :label-width="formLabelWidth"
            prop="selectValue"
          >
            <el-select
              @input="getSelectValue()"
              style="width: 100%"
              v-model="form.selectValue"
              placeholder="请选择配置类型"
            >
              <el-option
                v-for="item in form.selectDown"
                :key="item.id"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            v-show="isInput"
            label="输入内容"
            :label-width="formLabelWidth"
            prop="inputValue"
          >
            <el-input
              placeholder="请输入内容"
              v-model="form.inputValue"
            ></el-input>
          </el-form-item>

          <el-form-item
            v-show="selectRadio"
            label="选择类型"
            :label-width="formLabelWidth"
            prop="radioValue"
          >
            <el-select
              @input="getSelectRadio()"
              style="width: 100%"
              v-model="form.radioValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in form.selectRadio"
                :key="item.dictionaryType"
                :label="item.dictionaryTypeDes"
                :value="item.dictionaryType"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            v-show="radio"
            label="单选框"
            prop="radioList"
            :label-width="formLabelWidth"
          >
            <el-radio-group v-model="form.radioList">
              <el-radio
                border
                size="mini"
                v-for="item2 in form.radio"
                :key="item2.dictionaryKey"
                :label="item2.dictionaryValue"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-show="checkbox"
            label="复选框"
            prop="checkList"
            :label-width="formLabelWidth"
          >
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox
                border
                size="mini"
                v-for="item2 in form.radio"
                :key="item2.dictionaryKey"
                :label="item2.dictionaryValue"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            label="组名"
            :label-width="formLabelWidth"
            prop="group"
          >
            <el-select
              style="width: 100%"
              v-model="form.group"
              placeholder="请选择类型"
              clearable
            >
              <el-option
                v-for="item in form.options"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
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
  </div>
</template>

<script>
let that;
import myWaterfallOn from "../commen/myWaterfallOn";
export default {
  data() {
    return {
      hackReset: true,
      showZJ: false,
      showBJ: false,
      showSC: false,
      showRef: false,
      bodyHeight: "",
      currentPage: 1,
      pageNum: 1, //当前页
      pageSize: 10, //每页显示条目数
      count: 0,
      mc: "",
      cd:'',
      group:"",
      cardList: [],

      dialogFormVisible: false,
      formLabelWidth: "80px",
      isInput: false,
      selectRadio: false,
      radio: false,
      checkbox: false,
      form: {
        selectValue: "",
        depValue: "",
        selectDown: [],
        selectDep: [],
        selectRadio: [],
        inputValue: "",
        firstInputValue: "",
        secInputValue: "",
        radioValue: "",
        radio: [],
        checkbox: [],
        radioList: "",
        radioListUp: [],
        checkList: [],
        checkListUp: [],
        group:'',
        options:[],
        rules: {
          firstInputValue: [
            { required: true, message: "请输入配置项名称", trigger: "change" },
          ],
          depValue: [
            { required: true, message: "请选择部门", trigger: "change" },
          ],
          secInputValue: [
            { required: true, message: "请输入code", trigger: "change" },
          ],
          selectValue: [
            { required: true, message: "请选择类型", trigger: "change" },
          ],
          radioValue: [
            { required: true, message: "请选择", trigger: "change" },
          ],
          inputValue: [
            { required: true, message: "输入内容", trigger: "change" },
          ],
          radioList: [
            {
              required: true,
              message: "请选择一项",
              trigger: "change",
            },
          ],
          checkList: [
            {
              required: true,
              message: "至少选择一项",
              trigger: "change",
            },
          ],
        },
      },
    };
  },

  components: { myWaterfallOn },

  computed: {},

  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;
    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    console.log(that.asideData.length)
    if (that.asideData) {
      for (var ti = 0; ti < that.asideData.length; ti++) {
        for (var tis = 0; tis < that.asideData[ti].chrildList.length; tis++) {
          if (that.asideData[ti].chrildList[tis].pageUrl == "myWaterfall")
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
    that.getter();
  },

  methods: {
    getter(){
      that.$post("dictionary/getDictionaryList",{
        dictionaryType:"property_group",
      }).then(function(data){
        if(data&&data.code=="0000"){
          console.log(data.data)
          that.form.options=data.data;
        }else{
          that.$message({
            message:data.msg,
            type:"warning"
          })
        }
      })
    },
    showSearchToast() {
      that.pageNum = 1;
      that.currentPage = 1;
      that.search();
    },
    search() {
      that
        .$post("property/getPropertyList", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
          description: that.mc,
          code:that.cd,
          group:that.group
        }) 
        .then(function (data) {
          // console.log(data);
          if (data && data.code == "0000") {
            that.count = data.page.count;
            that.cardList = data.page.list;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    clearAll() {
      that.mc = "";
      that.cd="";
      that.group="";
      that.pageNum = 1;
      that.currentPage = 1;
      that.getData();
    },
    getSelectRadio() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: that.form.radioValue,
        })
        .then(function (data) {
          console.log(data);
          if (data && data.code == "0000") {
            that.form.radio = data.data;
            if (that.form.selectValue == "checkbox") {
              that.checkbox = true;
              that.radio = false;
            }
            if (that.form.selectValue == "radio") {
              that.radio = true;
              that.checkbox = false;
            }
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    getSelectValue() {
      if (that.form.selectValue == "input") {
        that.isInput = true;
        that.selectRadio = false;
        that.radio = false;
        that.checkbox = false;
        that.form.inputValue = "";
        that.form.radioValue = "false";
        that.form.checkList = ["false"];
        that.form.radioList = "false";
        //
        //
      } else if (that.form.selectValue == "checkbox") {
        that.selectRadio = true;
        that.isInput = false;
        that.radio = false;
        that.form.inputValue = "false";
        that.form.radioValue = "";
        that.form.radioList = "false";
        that.form.checkList = [];
        that.$post("dictionary/getDictionaryType", {}).then(function (data) {
          // console.log(data);
          if (data && data.code == "0000") {
            that.form.selectRadio = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
      } else if (that.form.selectValue == "radio") {
        that.selectRadio = true;
        that.isInput = false;
        that.form.radioValue = "";
        that.form.inputValue = "false";
        that.form.radioValue = "";
        that.checkbox = false;
        that.form.checkList = ["false"];
        that.form.radioList = "";
        //
        that.$post("dictionary/getDictionaryType", {}).then(function (data) {
          // console.log(data);
          if (data && data.code == "0000") {
            that.form.selectRadio = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
      }
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (that.form.selectValue == "radio") {
            that.form.radio.forEach((item) => {
              that.form.radioListUp.push({
                dictionaryKey: item.dictionaryKey,
                dictionaryValue: item.dictionaryValue,
              });
            });
            for (var i = 0; i < that.form.radioListUp.length; i++) {
              console.log(that.form.radioListUp[0].dictionaryValue)
              that.form.radioListUp[i].flag = 0;
              if (
                that.form.radioList == that.form.radioListUp[i].dictionaryValue
              ) {
                that.form.radioListUp[i].flag = 1;
              }
            }

            that
              //提交
              .$post("property/editProperty", {
                description: that.form.firstInputValue,
                code: that.form.secInputValue,
                dataType: that.form.selectValue,
                departmentId: that.form.depValue,
                dataKey: that.form.radioValue,
                propertyCheckedDTOStr: JSON.stringify(that.form.radioListUp),
                group:that.form.group
              })
              .then(function (data) {
                if (data && data.code == "0000") {
                  that.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  that.dialogFormVisible = false;
                  that.getData();

                  // that.fatherMethod();
                  that.form.firstInputValue = "";
                  that.form.secInputValue = "";
                  that.form.selectValue = "";
                  that.form.inputValue = "";
                  that.form.depValue = "";
                  that.isInput = "";
                } else {
                  that.$message({
                    message: data.msg,
                    type: "warning",
                  });
                }
              });
          } else if (that.form.selectValue == "input") {
            that
              //提交
              .$post("property/editProperty", {
                description: that.form.firstInputValue,
                code: that.form.secInputValue,
                dataType: that.form.selectValue,
                value: that.form.inputValue,
                departmentId: that.form.depValue,
              })
              .then(function (data) {
                if (data && data.code == "0000") {
                  that.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  that.dialogFormVisible = false;
                  that.getData();
                  // that.fatherMethod();
                  that.form.firstInputValue = "";
                  that.form.secInputValue = "";
                  that.form.selectValue = "";
                  that.form.inputValue = "";
                  that.form.depValue = "";
                  that.isInput = "";
                } else {
                  that.$message({
                    message: data.msg,
                    type: "warning",
                  });
                }
              });
          } else if (that.form.selectValue == "checkbox") {
            that.form.radio.forEach((item) => {
              that.form.checkListUp.push({
                dictionaryKey: item.dictionaryKey,
                dictionaryValue: item.dictionaryValue,
                flag: 0,
              });
            });
            for (var t = 0; t < that.form.checkList.length; t++) {
              for (var m = 0; m < that.form.checkListUp.length; m++) {
                if (
                  that.form.checkList[t] ==
                  that.form.checkListUp[m].dictionaryValue
                ) {
                  that.form.checkListUp[m].flag = 1;
                }
              }
            }
            that
              //提交
              .$post("property/editProperty", {
                description: that.form.firstInputValue,
                code: that.form.secInputValue,
                dataType: that.form.selectValue,
                departmentId: that.form.depValue,
                dataKey: that.form.radioValue,
                propertyCheckedDTOStr: JSON.stringify(that.form.checkListUp),
              })
              .then(function (data) {
                if (data && data.code == "0000") {
                  that.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  that.dialogFormVisible = false;
                  that.getData();
                  // that.fatherMethod();
                  that.form.firstInputValue = "";
                  that.form.secInputValue = "";
                  that.form.selectValue = "";
                  that.form.inputValue = "";
                  that.form.depValue = "";
                  that.isInput = "";
                } else {
                  that.$message({
                    message: data.msg,
                    type: "warning",
                  });
                }
              });
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },

    showAddToast() {
      that.dialogFormVisible = true;
      that.form.firstInputValue = "";
      that.form.secInputValue = "";
      that.form.selectValue = "";
      that.form.inputValue = "";
      that.form.depValue = "";
      that.isInput = false;
      that.checkbox = false;
      that.radio = false;
      that.selectRadio = false;
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "PROPERTY_DATA_TYPE",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.form.selectDown = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
      that.$post("department/getDepartmentList", {}).then(function (data) {
        // console.log(data);
        if (data && data.code == "0000") {
          that.form.selectDep = data.data;
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
        .$post("property/getPropertyList", {
          pageSize: that.pageSize,
          currentPage: that.pageNum,
        })
        .then(function (data) {
          console.log(data);
          if (data && data.code == "0000") {
            that.count = data.page.count;
            that.cardList = data.page.list;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    fatherMethod() {
      if (that.mc) {
        that.search();
      } else {
        that.getData();
      }

      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    handleSizeChange(val) {
      that.pageSize = val;
      if (that.mc) {
        that.search();
      } else {
        that.getData();
      }
    },
    handleCurrentChange(val) {
      that.pageNum = val;
      if (that.mc) {
        that.search();
      } else {
        that.getData();
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import "../../assets/css/adminpages/myWaterfall.scss";
.el-radio--mini.is-bordered {
  padding: 6px 15px 0 10px;
  border-radius: 3px;
  height: 28px;
  margin: 2px 10px;
}
</style>