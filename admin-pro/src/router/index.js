import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

  const routes = [
  {
    path: '/components/commen/login',
    name: 'login',
    meta:{
      islogin:false,
      title:'登录页面'
    },
    component: () => import('../components/login.vue')
  },
  {
    path: '/components/hq_waybillManagement',
    name: 'hq_waybillManagement',
    meta:{
      islogin:true,
      title:'华勤运单管理'
    },
    component: () => import('../components/hq_waybillManagement.vue')
  },
  {
    path: '/components/hq_transportation',
    name: 'hq_transportation',
    meta:{
      islogin:true,
      title:'华勤运单单记录'
    },
    component: () => import('../components/hq_transportation.vue')
  },
  // {path:'/components/adminpages/myWaterfall',name:'myWaterfall',meta:{islogin:false,title:'参数配置'},children:[
  //   {path:'myWaterfallOn',name:'myWaterfallOn',meta:{islogin:false},component:()=>import('@/components/commen/myWaterfallOn')}
  // ],component:()=>import('@/components/adminpages/myWaterfall')},

  {
    path:'/components/adminpages/index',
    // name:'/index',
    meta:{
      islogin:true,
      title:'主页'
    },
    component:()=>import('../components/adminpages/index.vue'),
    children: [
      {path: 'WaybillTest',name:'WaybillTest',meta:{islogin:true,title:'运单测试'}, component: ()=>import('@/components/adminpages/WaybillTest')},
      {path: 'menuManage',name:'menuManage',meta:{islogin:true,title:'页面管理'}, component: ()=>import('@/components/adminpages/menuManage')},
      {path: 'departmentManage',name:'departmentManage',meta:{islogin:true,title:'部门管理'}, component: ()=>import('@/components/adminpages/departmentManage')},
      {path: 'roleManage',name:'roleManage',meta:{islogin:true,title:'角色管理'}, component: ()=>import('@/components/adminpages/roleManage')},
      {path: 'userManage',name:'userManage',meta:{islogin:true,title:'用户管理'}, component: ()=>import('@/components/adminpages/userManage')},
      {path:'dictionaryManage',name:'dictionaryManage',meta:{islogin:true,title:'字典管理'},component:()=>import('@/components/adminpages/dictionaryManage')},
      {path:'planningTasks',name:'planningTasks',meta:{islogin:true,title:'计划任务'},children:[
        {path:'/secondAndMinute',name:'/secondAndMinute',meta:{islogin:true},component:()=>import('@/components/commen/secondAndMinute')},
        {path:'/hour',name:'/hour',meta:{islogin:true},component:()=>import('@/components/commen/hour')},
        {path:'/day',name:'/day',meta:{islogin:true},component:()=>import('@/components/commen/day')},
        {path:'/month',name:'/month',meta:{islogin:true},component:()=>import('@/components/commen/month')},
        {path:'/week',name:'/week',meta:{islogin:true},component:()=>import('@/components/commen/week')},
        {path:'/year',name:'/year',meta:{islogin:true},component:()=>import('@/components/commen/year')},
      ],component:()=>import('@/components/adminpages/planningTasks')},
      {path:'myWaterfall',name:'myWaterfall',meta:{islogin:true,title:'参数配置'},children:[
        {path:'/myWaterfallOn',name:'myWaterfallOn',meta:{islogin:true},component:()=>import('@/components/commen/myWaterfallOn')}
      ],component:()=>import('@/components/adminpages/myWaterfall')},
      {path:'mployeeAccount',name:'mployeeAccount',meta:{islogin:true,title:'员工账户'},component:()=>import('@/components/adminpages/mployeeAccount')},
      {path:'gridState',name:'gridState',meta:{islogin:true,title:'格口状态'},component:()=>import('@/components/adminpages/gridState')},
      {path:'specialGrid',name:'specialGrid',meta:{islogin:true,title:'特殊格口'},component:()=>import('@/components/adminpages/specialGrid')},
      {path:'packetBindingLog',name:'packetBindingLog',meta:{islogin:true,title:'格口绑包日志'},component:()=>import('@/components/adminpages/packetBindingLog')},
      {path:'listOfLoadingStations',name:'listOfLoadingStations',meta:{islogin:true,title:'上包台列表'},component:()=>import('@/components/adminpages/listOfLoadingStations')},
      {path:'bsGridScheme',name:'bsGridScheme',meta:{islogin:true,title:'百世分拣方案'},component:()=>import('@/components/adminpages/bsGridScheme')},
      {path:'stGridScheme',name:'stGridScheme',meta:{islogin:true,title:'申通分拣方案'},component:()=>import('@/components/adminpages/stGridScheme')},
      {path:'ytGridScheme',name:'ytGridScheme',meta:{islogin:true,title:'圆通分拣方案'},component:()=>import('@/components/adminpages/ytGridScheme')},
      {path:'jtGridScheme',name:'jtGridScheme',meta:{islogin:true,title:'极兔分拣方案'},component:()=>import('@/components/adminpages/jtGridScheme')},
      {path:'sortingScheme',name:'sortingScheme',meta:{islogin:true,title:'分拣方案'},component:()=>import('@/components/adminpages/sortingScheme')},
      {path:'gpGridScheme',name:'gpGridScheme',meta:{islogin:true,title:'共配分拣方案'},component:()=>import('@/components/adminpages/gpGridScheme')},
      {path:'hqGridScheme',name:'hqGridScheme',meta:{islogin:true,title:'华勤分拣方案'},component:()=>import('@/components/adminpages/hqGridScheme')},
      {path:'',name:'waybillLnformation',meta:{islogin:true,title:'运单信息'},component:()=>import('@/components/adminpages/waybillLnformation')},
      {path:'jd_waybillManagement',name:'jd_waybillManagement',meta:{islogin:true,title:'京东运单管理'},component:()=>import('@/components/adminpages/jd_waybillManagement')},
      // {path:'hq_waybillManagement',name:'hq_waybillManagement',meta:{islogin:true,title:'华勤运单管理'},component:()=>import('@/components/adminpages/hq_waybillManagement')},
      {path:'regionalManagement',name:'regionalManagement',meta:{islogin:true,title:'区域管理'},component:()=>import('@/components/adminpages/regionalManagement')},
      {path:'cameraManagement',name:'cameraManagement',meta:{islogin:true,title:'相机管理'},component:()=>import('@/components/adminpages/cameraManagement')},
      {path:'gridManagement',name:'gridManagement',meta:{islogin:true,title:'格口管理'},component:()=>import('@/components/adminpages/gridManagement')},
      {path:'gridlightManagement',name:'gridlightManagement',meta:{islogin:true,title:'格口指示灯管理'},component:()=>import('@/components/adminpages/gridlightManagement')},
      {path:'Materialquotation',name:'Materialquotation',meta:{islogin:true,title:'物料报价'},component:()=>import('@/components/adminpages/Materialquotation')},
      {path:'Quotationscheme',name:'Quotationscheme',meta:{islogin:true,title:'报价方案'},component:()=>import('@/components/adminpages/Quotationscheme')},
      {path:'ioManagement',name:'ioManagement',meta:{islogin:true,title:'格口I/O管理'},component:()=>import('@/components/adminpages/ioManagement')},
      {path:'new',name:'new',meta:{islogin:true,title:'新增报价方案'},component:()=>import('@/components/adminpages/new')},
    ]
  },
  {
    path:'/',
    name:'/SbtTest',
    meta:{
      islogin:false,
      title:'上包台'
    },
    component:()=>import('../components/commen/SbtTest.vue')
  },
  {
    path:'/error',
    name:'error',
    meta:{
      islogin:false,
      title:'错误页面'
    },
    component:()=>import('../components/commen/error.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
