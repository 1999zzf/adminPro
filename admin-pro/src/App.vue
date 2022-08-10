<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
    export default {
        name: 'App',
        provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
            return {
                reload: this.reload                                              
            }
        },
        data() {
            return{
                isRouterAlive: true                    //控制视图是否显示的变量
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                }) 
            }
        },
    }
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
.el-loading-mask{
  background-color: none!important;
}

.el-form-item__label {
    color: #000!important
}
.el-table thead {
    color: rgb(26, 25, 25)!important;
    
}
.el-input.is-disabled .el-input__inner {
    color: #000!important;
}
.el-input.is-disabled .el-input__inner::placeholder {
    color: #000!important;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #dbd8d8;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: rgb(151, 147, 147);
}
</style>
