import Vue from 'vue'
import Router from 'vue-router'
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
const originalReplace2 = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalReplace2.call(this, location).catch(err => err)
}

Vue.use(Router)
let arr = [{
    path: '/',
    name: '首页',
    component: resolve => require(['@/view/Index'], resolve),
  },
  {
    path: '/medicalCenter',
    name: '智慧医疗中心',
    redirect: '/medicalCenter/medicalIndx',
    component: resolve => require(['@/view/medicalCenter'], resolve),
    meta: {
      id: 1
    },
    children: [{
        path: '/medicalCenter/medicalIndx',
        name: '/medicalCenter/medicalIndx',
        component: () => import('../view/medicalDetails/medicalIndx.vue')
      },
      {
        path: '/medicalCenter/medicalDetails1',
        name: 'medicalDetails1',
        component: () => import('../view/medicalDetails/medicalDetails1.vue')
      },
      {
        path: '/medicalCenter/medicalDetails2',
        name: 'medicalDetails2',
        component: () => import('../view/medicalDetails/medicalDetails2.vue')
      },
      {
        path: '/medicalCenter/medicalDetails3',
        name: 'medicalDetails3',
        component: () => import('../view/medicalDetails/medicalDetails3.vue')
      },
      {
        path: '/medicalCenter/medicalDetails4',
        name: 'medicalDetails4',
        component: () => import('../view/medicalDetails/medicalDetails4.vue')
      },
      {
        path: '/medicalCenter/medicalDetails5',
        name: 'medicalDetails5',
        component: () => import('../view/medicalDetails/medicalDetails5.vue')
      },


    ]

  },
  {
    path: '/research',
    name: '研究院',
    redirect:'/research/index',
    component: resolve => require(['@/view/reserchIndex'], resolve),
    meta:{
      id:2
    },
    children:[{
      path:'/research/index',
      name:'/research/index',
      component:()=>import('../view/Research.vue')
    },
    {
      path:'/research/ResearchItem',
      name:'/research/ResearchItem',
      component: resolve => require(['@/view/reserch/ResearchItem'], resolve)
    },
  ]

  },
  {
    path: '/news',
    name: '新闻动态',
    redirect:'/news/index',
    component: resolve => require(['@/view/newsIndex'], resolve),
    children:[{
      path: '/news/index',
      name: 'newsDetails',
      component: resolve => require(['@/view/News'], resolve)
    }, {
      path: '/news/newsDetails/:id',
      name: 'newsDetails',
      component: resolve => require(['@/view/reserch/newsDetails'], resolve)
    }]
   
  },
  {
    path: '/recruitment',
    name: '招纳贤士',
    redirect: '/recruitment/recruitItem',
    component: resolve => require(['@/view/Recruitment'], resolve),
    children: [{
        path: '/recruitment/recruitItem',
        name: 'recruitItem',
        component: () => import('../view/recruit/recruit.vue')
      },
      {
        path: '/recruitment/recruitList',
        name: 'recruitList',
        component: () => import('../view/recruit/recruitList.vue')
      },
      {
        path: '/recruitment/recruitDetails/:id',
        name: 'recruit',
        component: () => import('../view/recruit/recruitDetails.vue')
      },
    ]
  },
 

  {
    path: '/aboutUs',
    name: '关于我们',
    component: resolve => require(['@/view/About'], resolve)
  },
  {
    path: '/contactUS',
    name: '联系我们',
    component: resolve => require(['@/view/Contact'], resolve)
  },



]
arr.forEach((val, index) => {
  // console.log(val)
  // console.log(11111111)
  val.meta = val.meta || {}
  val.meta.id = index
  if (val.children && val.children.length > 0) {
    val.children.forEach(value => {
      value.meta = val.meta || {}
      value.meta.id = index
    })
  }
})
export default new Router({
  mode: 'history',
  routes: arr
})
