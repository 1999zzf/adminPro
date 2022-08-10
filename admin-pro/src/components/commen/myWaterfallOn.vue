<template>
  <div>
    <div v-if="!data" style="text-align: center; width: 100%">无数据</div>
    <waterfall v-if="data" :col="col" :data="data">
      <!-- @loadmore="loadmore"
      @scroll="scroll"-->
      <template>
        <div class="cell-item" v-for="(item, index) in data" :key="index">
          <div class="item-body">
            <div class="item-desc">
              <div>{{ item.description }}</div>
              <div class="edait">
                <el-button
                  v-if="showBJ"
                  @click="edit(item)"
                  type="warning"
                  size="mini"
                  >编辑</el-button
                >
                <el-button
                  v-if="showSC"
                  @click="delt(item)"
                  type="danger"
                  size="mini"
                  >删除</el-button
                >
              </div>
            </div>
            <div class="item-footer">
              <div class="footer-left">
                <div v-show="item.dataType == 'checkbox'" class="name">
                  <el-checkbox
                    style="margin: 2px 3px"
                    border
                    :disabled="true"
                    :checked="item2.flag == 1"
                    v-for="item2 in item.propertyCheckedDTOS"
                    :key="item2.dictionaryKey"
                    :label="item2.dictionaryValue"
                  ></el-checkbox>
                </div>
                <div v-show="item.dataType == 'radio'" class="name">
                  <el-radio
                    border
                    :disabled="true"
                    v-for="item2 in item.propertyCheckedDTOS"
                    :key="item2.dictionaryKey"
                    :label="
                      item2.flag == 1 ? item2.dictionaryValue : item2.flag
                    "
                    v-model="item2.dictionaryValue"
                    >{{ item2.dictionaryValue }}</el-radio
                  >
                </div>
                <div v-show="item.dataType == 'input'" class="name">
                  <el-input v-model="item.value" :disabled="true"></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="showEditToast">
          <el-dialog title="编辑" width="40%" :visible.sync="showEditToast">
            <el-form>
              <el-form-item
                label="组名"
                :label-width="formLabelWidth"
                prop="group"
              >
                <el-select
                  style="width: 100%"
                  v-model="form3.group"
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

            <el-form
              :rules="form.rules"
              ref="form"
              :model="form"
              v-if="form.itemType == 'checkbox'"
            >
              <el-form-item
                label="必须项"
                prop="checkList"
                :label-width="formLabelWidth"
              >
                <el-checkbox-group v-model="form.checkList">
                  <el-checkbox
                    style="margin: 2px 3px"
                    border
                    size="mini"
                    :checked="item.flag == 1"
                    v-for="item in form.checkbox"
                    :key="item.dictionaryKey"
                    :label="item.dictionaryValue"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>

            <el-form v-if="form2.itemType == 'radio'">
              <el-form-item label="必选项">
                <el-radio-group v-model="form2.checkList">
                  <el-radio
                    border
                    size="mini"
                    v-for="item2 in form2.checkbox"
                    :key="item2.dictionaryKey"
                    :label="item2.dictionaryValue"
                  ></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>

            <el-form v-if="form3.itemType == 'input'">
              <el-form-item
                label="必填项"
                :label-width="formLabelWidth"
                prop="inputValue"
              >
                <el-input v-model="form3.inputValue"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="showEditToast = false">取 消</el-button>
              <el-button
                v-if="form.itemType == 'checkbox'"
                type="primary"
                @click="submitFormEdit('form')"
                >确 定</el-button
              >
              <el-button
                v-if="form2.itemType == 'radio'"
                type="primary"
                @click="submitFormEdit2('form2')"
                >确 定</el-button
              >
              <el-button
                v-if="form2.itemType == 'input'"
                type="primary"
                @click="submitFormEdit3('form3')"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </div>
      </template>
    </waterfall>
  </div>
</template>
<script>
let that;
export default {
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      col: 2,
      showZJ: false,
      showBJ: false,
      showSC: false,
      showRef: false,
      bodyHeight: "",
      showEditToast: false,
      formLabelWidth: "100px",
      form: {
        itemType: "",
        checkbox: [],
        checkList: [],
        options:[],
        rules: {
          checkList: [
            {
              type: "array",
              required: true,
              message: "请选择",
              trigger: "change",
            },
          ],
        },
      },
      form2: {
        itemType: "",
        checkbox: [],
        checkList: [],
        rules: {
          checkList: [
            {
              required: true,
              message: "请选择",
              trigger: "change",
            },
          ],
        },
      },
      form3: {
        itemType: "",
        inputValue: "",
        group:"",
        rules: {
          inputValue: [
            {
              required: true,
              message: "请填写",
              trigger: "blur",
            },
          ],
        },
      },
      itemId: "",
      // changeList: [],
    };
  },
  methods: {
    getter(){
      that.$post("dictionary/getDictionaryList",{
        dictionaryType:"property_group",
      }).then(function(data){
        if(data&&data.code=="0000"){
          that.form.options=data.data;
        }else{
          that.$message({
            message:data.msg,
            type:"warning"
          })
        }
      })
    },
    edit(item) {
      console.log(item)
      that.showEditToast = true;
      that.form.itemType = item.dataType;
      that.form.checkbox = item.propertyCheckedDTOS;
      that.form2.itemType = item.dataType;
      that.form2.checkbox = item.propertyCheckedDTOS;
      that.form3.itemType = item.dataType;
      that.form3.inputValue = item.value;
      that.form3.group=item.groupName
      that.itemId = item.id;
      if (item.dataType == "radio") {
        for (var i = 0; i < item.propertyCheckedDTOS.length; i++) {
          if (item.propertyCheckedDTOS[i].flag == 1) {
            that.form2.checkList = item.propertyCheckedDTOS[i].dictionaryValue;
          }
        }
      }
    },
    delt(item) {
      that
        .$confirm("删除该条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that
            .$post("property/delete", {
              id: item.id,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.showEditToast = false;
                that.$emit("fatherMethod");
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
    submitFormEdit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // let arrPost = {};
          for (var i = 0; i < that.form.checkbox.length; i++) {
            that.form.checkbox[i].flag = 0;
            // console.log(that.form.checkbox[i])
            for (var ii = 0; ii < that.form.checkList.length; ii++) {
              // console.log(that.form.checkList[ii])
              if (
                that.form.checkList[ii] == that.form.checkbox[i].dictionaryValue
              ) {
                that.form.checkbox[i].flag = 1;
              }
            }
          }
          that
            .$post("property/editProperty", {
              id: that.itemId,
              group:that.form3.group,
              propertyCheckedDTOStr: JSON.stringify(that.form.checkbox),
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                that.showEditToast = false;
                that.$emit("fatherMethod");
              } else {
                that.$message({
                  message: data.msg,
                  type: "warning",
                });
              }
            });
        } else {
          console.log(that.form.enable);
          return false;
        }
      });
    },
    submitFormEdit2(form2) {
      for (let ii = 0; ii < that.form2.checkbox.length; ii++) {
        that.form2.checkbox[ii].flag = 0;
        if (that.form2.checkList == that.form2.checkbox[ii].dictionaryValue) {
          that.form2.checkbox[ii].flag = 1;
        } else {
          that.form2.checkbox[ii].flag = 0;
        }
      }
      that
        .$post("property/editProperty", {
          id: that.itemId,
          group:that.form3.group,
          propertyCheckedDTOStr: JSON.stringify(that.form2.checkbox),
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.$message({
              message: "修改成功",
              type: "success",
            });
            that.showEditToast = false;
            that.$emit("fatherMethod");
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    submitFormEdit3(form3) {
      if (!that.form3.inputValue) {
        that.$message({
          message: "此项必填!",
          type: "warning",
        });
      } else {
        that
          .$post("property/editProperty", {
            id: that.itemId,
            group:that.form3.group,
            value: that.form3.inputValue,
          })
          .then(function (data) {
            if (data && data.code == "0000") {
              that.$message({
                message: "修改成功",
                type: "success",
              });
              that.showEditToast = false;
              that.$emit("fatherMethod");
            } else {
              that.$message({
                message: data.msg,
                type: "warning",
              });
            }
          });
      }
    },
  },
  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;
    that.asideData = JSON.parse(sessionStorage.getItem("asideData"));
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
    that.getter()
  },
};
</script>
<style lang="scss" scoped>
.item-body {
  margin: 9px;
  .item-desc {
    text-align: left;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 40px;
    color: #000;
    display: flex;
    justify-content: space-between;
    .edait {
      font-size: 16px;
    }
  }
  .item-footer {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    height: 60px;
    .footer-left {
      display: flex;
      align-items: center;
      font-family: SF Pro Display;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
.cell-item {
  width: 100%;
  margin-bottom: 6px;
  background: #ffffff;
  border: 2px solid #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
  box-sizing: border-box;
  img {
    width: 100%;
    // height: auto;
    display: block;
  }
  input[type="checkbox"]:checked + label {
    font-weight: bold;
  }

  input[type="checkbox"]:disabled + label {
    color: #ccc;
  }
}
.el-radio.is-bordered {
  padding: 12px 20px 0 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  height: 40px;
  margin: 2px 5px !important;
}
</style>
