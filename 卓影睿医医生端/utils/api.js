var api={
    wxlogin: '/api/wx/account/doc_wx_login', //微信注册登录
    login: '/api/account/login', //账号登录
    getphone: '/api/wx/get_phone', //获取微信手机号
    querypaientlist: '/api/wx/patient/self_patient_list', //患者列表,具有搜索功能
    createpatient: '/api/wx/patient/create_def_patient', //创建空信息患者
    modifypatient: '/api/wx/patient/modify_patient', //患者信息提交
    checkplanonpatient: '/api/wx/account/query_union_id', //查询方案有没有绑定患者
    querypatientdetail: '/api/wx/patient/patient_information', //查询患者详细信息
    querypatientplanlist: '/api/wx/training/train_record_page', //查询患者方案
    querypaystatelist: '/api/wx/pay/get_pay_state_list', //查询支付状态列表
    querypatientdoingplan: '/api/wx/training/query_train_plan', //查询当前方案
    deleteplan: '/api/wx/training/delete_train', //删除方案
    queryfeedbacklist: '/api/wx/feedback/feedback_query', //查询反馈
    queryvideolist: '/api/wx/background/query_actor_list', //查询视频列表
    createplan: '/api/wx/training/create_train', //创建方案
    getplanvideoclassify: '/api/wx/background/get_template_part_list', //查询方案视频分类
    querypaystate: '/api/wx/pay/get_pay_state', //查询支付状态
    ocrstate: '/api/wx/ocr/ocr_state', //ocr认证状态查询 -1未认证  1认证成功
    queryoderlist: '/api/wx/pay/get_doctor_study_pay_state_list', //查询医生病例开单列表
    queryplandetail: '/api/wx/training/query_plan_detail', //查询方案详情
    ocrcheck: '/api/wx/ocr', //ocr信息校验
    ocrattest: '/api/wx/ocr/check_state', //ocr认证
    ocrinformation: '/api/wx/ocr/user_ocr', //ocr认证信息查询
    statistics: '/api/wx/background/doctor_web_statistics', //统计
   // querybindstate: '/api/account/get_merge_state', //查询绑定状态
   // bindaccount: '/api/account/account_merge', //绑定账号
    getparice:'/api/wx/pay/get_study_price', //未建方案获取价格
    gethospitallist:'/api/wx/background/get_hospital_list', //获取医院列表
    uploadimg:'/api/wx/upload_picture', //认证图片上传
    doctorcertification:'/api/wx/account/submit_check', //认证信息上传
    certificationstate:'/api/wx/account/get_one_check_state',//账号认证状态  审核状态:默认0 3：待审核 1：已通过 2：未通过
    certificationinfo:'/api/wx/account/get_check_info',//认证信息查询
    goodatmodify:'/api/wx/account/edit_introduce',//擅长描述修改
    goodatquery:'/api/wx/account/query_introduce',//擅长描述查询
    gettaglibrary:'/api/wx/label/list', //查询标签库
    tagselect:'/api/wx/label/update',  //标签选择
    querytagselect:'/api/wx/label/get_label', //查询标签选择
    upavatar:'/api/wx/background/doctor_img',//上传医生头像
    queryavatar:'/api/wx/background/doctor_avatar',//查询医生头像
    getavatar:'/api/wx/patient/patient_avatar',//查询患者头像
    seeadoctorjudgeinfo:'/api/wx/background/get_hospital_map',//查询问诊判断信息，包含位置问诊标记
    getappletscode:'/api/wx/background/send_applets', //获取小程序码传参doctor_id供后续患者扫码处理
    getpublicqr:'/api/wx/scan_qr/qr_code', //获取公众号路径
  }
  module.exports= api