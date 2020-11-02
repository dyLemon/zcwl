var api={
    wxlogin:'/api/wx/account/wx_login',//微信登录
    modifypatient:'/api/wx/patient/modify_patient',//修改患者信息
    querypatientplan:'/api/wx/query_train_plan_patient',//查询查询患者方案
    queryplaninformation:'/api/wx/training/get_train_actor_all',//查询方案详情 ，主要处理日期
    queryplandetail:'/api/wx/training/query_plan_detail',//查询方案视频
    querypaystate:'/api/wx/pay/get_pay_state',//查询支付状态
    setrefundtag:'/api/wx/pay/set_refund_tag',//退款允许
    getplanendtime:'/api/wx/training/get_study_end_time',//获取方案结束时间   用于锻炼按钮显示
    accomplishsport:'/api/wx/training/increases_train_num',//完成此次运动
    getplantime:'/api/wx/feedback/feedback_finish',//查询方案始末时间
    feedbackcommit:'/api/wx/feedback/feedback_commit',//反馈提交
    getquestionnaire:'/api/wx/questionnaire/list_all',//获取调查表
    questionnairecommit:'/api/wx/questionnaire/commit',//提交调查表
    querypaystatelist:'/api/wx/pay/get_pay_state_list',//获取支付状态表 传的一个病例id表
    payoder:'/api/wx/generate',//支付订单
    closeoder:'/api/wx/close', //关闭订单
    querypatientplanlist:'/api/wx/pay/get_patient_study_pay_state_list', //获取患者历史订单
    refund:'/api/wx/refund', //退款
    getdoclist:'/api/wx/background/get_user_list', //获取医生列表
    getattentionstate:'/api/wx/account/query_union_id',//union_id_state  false没有关注，true已关注 
    querypatientdetail: '/api/wx/patient/patient_information', //查询患者详细信息
    seeadoctor:'/api/wx/patient/doctor_bind_patient',  //就诊某医生
    querydoctorinfo:'/api/wx/account/query_doctor_details',//查询医生详情
    querydochistlist:'/api/wx/chat/get_doctor_info',//查询我的医生聊天历史列表
    getqrdoctor:'/api/wx/account/unionid_get_doctor_id',//获取扫码医生医生
    upavatar:'/api/wx/background/patient_img',//上传头像
    getavatar:'/api/wx/patient/patient_avatar',//查询头像
  }
  module.exports= api