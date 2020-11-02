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


export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'index',
      component: resolve => require(['@/view/Index'], resolve)
    },
    {
      path: '/medicalCenter',
      name: 'medicalCenter',
      component: resolve => require(['@/view/MedicalCenter'], resolve)
    },
    {
      path: '/medicalDetails/1',
      name: 'medicalDetails',
      component: resolve => require(['@/view/MedicalDetails/MedicalDetails1'], resolve)
    },
    {
      path: '/mEdicalDetails/2',
      name: 'mEdicalDetails',
      component: resolve => require(['@/view/MedicalDetails/MedicalDetails2'], resolve)
    },
    {
      path: '/mEdicaDetails/3',
      name: 'mEdicaDetails',
      component: resolve => require(['@/view/MedicalDetails/MedicalDetails3'], resolve)
    },
    {
      path: '/mEdicalDtails/4',
      name: 'mEdicalDtails',
      component: resolve => require(['@/view/MedicalDetails/MedicalDetails4'], resolve)
    },
    {
      path: '/mEdicalDtail/5',
      name: 'mEdicalDtail',
      component: resolve => require(['@/view/MedicalDetails/MedicalDetails5'], resolve)
    },
    {
      path: '/research',
      name: 'research',
      component: resolve => require(['@/view/Research'], resolve)
    },
    {
      path: '/news',
      name: 'news',
      component: resolve => require(['@/view/News'], resolve)
    },
    {
      path: '/newsDetails/:id',
      name: 'newsDetails',
      component: resolve => require(['@/view/newsDetails/newsDetails'], resolve)
    },
    {
      path: '/recruitment',
      name: 'recruitment',
      redirect: '/recruitItem',
      component: resolve => require(['@/view/Recruitment'], resolve),
      children: [
        {
        path: '/recruitItem',
        name: 'recruitItem',
        component: () => import('../view/recruit/recruit.vue')
      },
      {
        path: '/recruitment/recruitList',
        name: 'recruitList',
        component: () => import('../view/recruit/recruit2.vue')
      },
      {
        path: '/recruitment/recruit/:id',
        name: 'recruit',
        component: () => import('../view/recruit/recruit3.vue')
      },
    ]
    },

    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: resolve => require(['@/view/About'], resolve)
    },
    {
      path: '/contactUS',
      name: 'contactUS',
      component: resolve => require(['@/view/Contact'], resolve)
    },
    

   

  ]
})
