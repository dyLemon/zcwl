import request from '@/utils/request'

export default {

  // 获取首页banner列表
  getBannerList(plat) {
    return request({
      url: '/api/index/getBannerList',
      method: 'post',
      data:plat
    })
  },

  //获取首页最新新闻12条
  getIndexNews(data) {
    return request({
      url: '/api/index/getIndexNews',
      method: 'post',
      data
    })
  },

  //获取网站配置
  getWebConfig() {
    return request({
      url: '/api/common/getWebConfig',
      method: 'post'
    })
  },

  //获取五板块列表
  getFiveList() {
    return request({
      url: '/api/common/getFiveList',
      method: 'post'
    })
  },

  //获取公司简介
  getCompanyIntro() {
    return request({
      url: '/api/index/getCompanyIntro',
      method: 'post'
    })
  },

  //获取关于我们
  getAboutUs() {
    return request({
      url: '/api/common/getAboutUs',
      method: 'post'
    })
  },

  //获取合作伙伴列表
  getPartnerList() {
    return request({
      url: '/api/common/getPartnerList',
      method: 'post'
    })
  },

  //根据资讯类型获取资讯列表
  getNewsLists(page, limit) {
    return request({
      url: '/api/news/getNewsLists',
      method: 'post',
      data: {
        page,
        limit
      }
    })
  },

  //获取资讯详情
  getNewsDetail(id) {
    return request({
      url: '/api/news/getNewsDetail',
      method: 'post',
      data: {
        id
      }
    })
  },


  //获取研究院成就文字及顶部横幅
  getInstituteDetail() {
    return request({
      url: '/api/index/getInstituteDetail',
      method: 'post'
    })
  },

  //获取产品理念
  getProductIdea() {
    return request({
      url: '/api/index/getProductIdea',
      method: 'post'
    })
  },

  //获取专家团队列表
  getExpertTeam() {
    return request({
      url: '/api/index/getExpertTeam',
      method: 'post'
    })
  },

  //获取成就荣誉图列表
  getHonorList() {
    return request({
      url: '/api/index/getHonorList',
      method: 'post'
    })
  },

  //留言表单接口
  leaveMessage(message) {
    return request({
      url: '/api/common/leaveMessage',
      method: 'post',
      data: message
    })
  },

  //获取招贤纳士介绍及分类
  getRecruit() {
    return request({
      url: '/api/common/getRecruit',
      method: 'post'
    })
  },

  //根据招聘分类id获取职位列表
  getPositionList(cate_id) {
    return request({
      url: '/api/common/getPositionList',
      method: 'post',
      data: {
        cate_id
      }
    })
  },

  //根据职位id获取职位详情
  getPositionDetail(id) {
    return request({
      url: '/api/common/getPositionDetail',
      method: 'post',
      data: {
        id
      }
    })
  },

  //上传简历  ---file 要改
  upload_resume(resume) {
    return request({
      url: '/api/upload/upload_resume',
      method: 'post',
      data: {
        resume
      }
    })
  },

  //职位申请验证码
  getVerifyCode() {
    return request({
      url: '/api/common/getVerifyCode',
      method: 'post'
    })
  },

  //申请职位
  applyPosition(params) {
    return request({
      url: '/api/common/applyPosition',
      method: 'post',
      data: params
    })
  },
  //申请职位
  getVerifyCode(params) {
    return request({
      url: '/api/common/getVerifyCode',
      method: 'post',
    })
  },
  //根据五板块id获取详细页面信息（此接口数据层级较深，对接时请直接与文档编写人联系）
  operationDetail(id) {
    return request({
      url: '/api/common/operationDetail',
      method: 'post',
      data: {
        id
      }
    })
  }
}
