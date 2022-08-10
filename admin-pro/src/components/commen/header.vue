<template>
  <div class="wrapper_h">
    <div style="flex: 2">
      <span
        style="zoom: 150%; cursor: pointer"
        v-if="isshowasidefalse"
        @click="changeisopen"
      >
        <i class="el-icon-s-fold"></i>
      </span>
      <span
        style="zoom: 150%; cursor: pointer"
        v-if="!isshowasidefalse"
        @click="changeisopen"
      >
        <i class="el-icon-s-unfold"></i>
      </span>
    </div>
    <div style="flex: 6"></div>
    <div class="logout">
      <span class="logout_btn" style="margin-right: 10px" @click="setup()">
        分拣设置
      </span>
      <span @click="get_logout()" class="logout_btn"> 退出 </span>
    </div>
    <div class="steup">
      <el-dialog title="分拣设置" width="40%" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="进出港:">
            <el-radio-group v-model="radio" size="small">
              <el-radio
                border
                v-for="item in option"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="快递选择:">
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                :label="item.dictionaryValue"
                v-for="item in option1"
                :key="item.dictionaryKey"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="分拣方案:">
            <el-radio-group v-model="plan" size="small">
              <el-radio
                border
                v-for="item in option2"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure()">确 定</el-button>
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
      checkList: [],
      option: "",
      option1: "",
      option2: "",
      radio: "",
      plan: "",
      chose: "",
      id: "",
      chose1: "",
      id1: "",
      chose2: "",
      id2: "",
      formLabelWidth: "80px",
      userInfo: [],
      dialogFormVisible: false,
    };
  },
  watch: {},
  computed: {
    isshowasidefalse() {
      return this.$store.state.isopen;
    },
  },
  methods: {
    sure() {
      if (this.radio === "出港") {
        this.chose[0].flag = 1;
        this.chose[1].flag = 0;
      } else {
        (this.chose[0].flag = 0), (this.chose[1].flag = 1);
      }
      if (this.plan === "方案1") {
        this.chose2[0].flag = 1;
        this.chose2[1].flag = 0;
      } else {
        (this.chose2[0].flag = 0), (this.chose2[1].flag = 1);
      }
      for (let jj = 0; jj < this.chose1.length; jj++) {//判断所选的快递跟总的有哪些相等
        this.chose1[jj].flag=0
        for (let ii = 0; ii < this.checkList.length; ii++) {
          if (this.checkList[ii] === this.chose1[jj].dictionaryValue) {
            this.chose1[jj].flag = 1;
          }
        }
      }
      this.$axios({
        url: sessionStorage.getItem("IP") + "/property/editSortingProperty",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: [
          {
            id: this.id,
            propertyCheckedDTOStr: JSON.stringify(this.chose),
          },
          {
            id: this.id1,
            propertyCheckedDTOStr: JSON.stringify(this.chose1),
          },
          {
            id: this.id2,
            propertyCheckedDTOStr: JSON.stringify(this.chose2),
          },
        ],
      }).then(function (data) {
        console.log(data);
        if (data && data.data.code == "0000") {
          that.$message({
            message: "修改成功",
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
    },
    getter() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "flow_direction",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.option = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    getter1() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "express_type",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.option1 = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    getter2() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "plan_group",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.option2 = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    setup() {
      that
        .$post("property/getPropertyList", {
          pageSize: 10,
          currentPage: 1,
          group: "sortingProperty",
        })
        .then(function (data) {
          for (
            let j = 0;
            j < data.page.list[0].propertyCheckedDTOS.length;
            j++
          ) {
            if (data.page.list[0].propertyCheckedDTOS[j].flag == 1) {
              that.radio =
                data.page.list[0].propertyCheckedDTOS[j].dictionaryValue;
              that.chose = data.page.list[0].propertyCheckedDTOS;
              that.id = data.page.list[0].id;
            }
          }
          for (
            let j = 0;
            j < data.page.list[1].propertyCheckedDTOS.length;
            j++
          ) {
            if (data.page.list[1].propertyCheckedDTOS[j].flag == 1) {
              that.checkList.push(
                data.page.list[1].propertyCheckedDTOS[j].dictionaryValue
              );
              that.chose1 = data.page.list[1].propertyCheckedDTOS;
              that.id1 = data.page.list[1].id;
            }
          }
          for (
            let j = 0;
            j < data.page.list[2].propertyCheckedDTOS.length;
            j++
          ) {
            if (data.page.list[2].propertyCheckedDTOS[j].flag == 1) {
              that.plan =
                data.page.list[2].propertyCheckedDTOS[j].dictionaryValue;
              that.chose2 = data.page.list[2].propertyCheckedDTOS;
              that.id2 = data.page.list[2].id;
            }
          }
        });
      this.dialogFormVisible = true;
    },
    changeisopen() {
      if (that.$store.state.isopen) {
        that.$store.commit({
          type: "change_isopen",
          isopen: false,
        });
        that.$store.commit({
          type: "change_isshowaside",
          isshowaside: false,
        });
      } else {
        that.$store.commit({
          type: "change_isopen",
          isopen: true,
        });
        that.$store.commit({
          type: "change_isshowaside",
          isshowaside: true,
        });
      }
    },
    //退出账号
    get_logout() {
      that
        .$confirm("此操作将退出账号, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          // that.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
          sessionStorage.removeItem("token");
          // that.reload();
          // sessionStorage.clear();
          that.$router.push({
            path: "/components/commen/login",
          });
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {
    that = this;
    that.getter();
    that.getter1();
    that.getter2();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/commen/header.scss";
</style>