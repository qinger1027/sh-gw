const apply_order_list_info = [
  {
    key: "createTime",
    label: "创建时间",
    require: true,
    placeholder: "",
    type: "input",
    desc: "",
    width: "166",
  },
  {
    key: "applyNo",
    label: "工单号",
    require: true,
    placeholder: "",
    type: "input",
    desc: "",
    width: "180",
  },
  {
    key: "customerCode",
    label: "客户号",
    require: true,
    placeholder: "",
    type: "input",
    desc: "",
    width: "180",
  },
  {
    key: "custName",
    label: "姓名",
    require: true,
    placeholder: "",
    type: "input",
    desc: "",
    width: "80",
  },
  {
    key: "mobile",
    label: "手机号",
    require: true,
    placeholder: "",
    type: "input",
    desc: "",
    width: "120",
  },
  {
    key: "applyAmount",
    label: "借款金额（元）",
    require: true,
    placeholder: "",
    type: "input",
    desc: "",
    width: "130",
  },

  // {
  //     "key": "productCode",
  //     "label": "产品代码",
  //     "require": true,
  //     "placeholder": "请输入产品代码",
  //     "type": "input",
  //     "desc": "产品代码"
  // },
  // {
  //     "key": "custType",
  //     "label": "客户类型",
  //     "require": true,
  //     "placeholder": "请输入客户类型",
  //     "type": "input",
  //     "desc": "客户类型"
  // },
  // {
  //     "key": "indCustType",
  //     "label": "个人客户类型",
  //     "require": true,
  //     "placeholder": "请输入个人客户类型",
  //     "type": "input",
  //     "desc": "个人客户类型"
  // },
  // {
  //     "key": "partnerCode",
  //     "label": "合作机构号",
  //     "require": true,
  //     "placeholder": "请输入合作机构号",
  //     "type": "input",
  //     "desc": "合作机构号"
  // },
  // {
  //     "key": "partnerProductCode",
  //     "label": "合作机构产品号",
  //     "require": true,
  //     "placeholder": "请输入合作机构产品号",
  //     "type": "input",
  //     "desc": "合作机构产品号"
  // },
  // {
  //     "key": "loanPurpose",
  //     "label": "借款用途",
  //     "require": true,
  //     "placeholder": "请输入借款用途",
  //     "type": "input",
  //     "desc": "借款用途"
  // },
  // {
  //     "key": "loanType",
  //     "label": "借款类型",
  //     "require": true,
  //     "placeholder": "请输入借款类型",
  //     "type": "input",
  //     "desc": "借款类型 (00循环额度/01单笔授信 )"
  // },
  // {
  //     "key": "bankCreditStatus",
  //     "label": "资方授信申请状态",
  //     "require": true,
  //     "placeholder": "请输入",
  //     "type": "input",
  //     "desc": "资方授信申请状态01-审批中,02-审批通过, 03审批拒绝,04 风控审核中，05风控拒绝"
  // },
  {
    key: "bankCreditAmount",
    label: "授信额度（元）",
    require: true,
    placeholder: "请输入资方授信额度",
    type: "input",
    desc: "资方授信额度",
    width: "130",
  },
  // {
  //     "key": "bankYearRate",
  //     "label": "年利率",
  //     "require": true,
  //     "placeholder": "请输入年利率",
  //     "type": "input",
  //     "desc": "年利率"
  // },
  //   {
  //     key: "applyAmount",
  //     label: "客户申请额度（元）",
  //     require: true,
  //     placeholder: "请输入客户申请额度",
  //     type: "input",
  //     desc: "客户申请额度",
  //     width: "180",
  //   },
  // {
  //     "key": "payType",
  //     "label": "还款方式",
  //     "require": true,
  //     "placeholder": "请输入还款方式",
  //     "type": "input",
  //     "desc": "还款方式    分期-等额本息    分期-等额本金    分期-按期还息到期还本    不分期一次性还本付息（算好到期本息）    不分期-随借随还（每天更新）"
  // },
  {
    key: "guestStatus",
    label: "对客状态",
    require: true,
    placeholder: "请输入",
    type: "input",
    desc: "对客状态 01审核中 02审核通过 03审核拒绝",
    width: "100",
  },
  {
    key: "applyStatus",
    label: "工单状态",
    require: true,
    placeholder: "请输入",
    type: "input",
    desc: "工单状态 01资料审核中 02下户审核中 03店长复核中 04资产端审核通过",
    width: "130",
  },
  // {
  //     "key": "creditStagingUnits",
  //     "label": "分期周期单位",
  //     "require": true,
  //     "placeholder": "请输入分期周期单位",
  //     "type": "input",
  //     "desc": "分期周期单位"
  // },
  // {
  //     "key": "agrTerm",
  //     "label": "申请期限（月）",
  //     "require": true,
  //     "placeholder": "请输入",
  //     "type": "input",
  //     "desc": "申请期限（月）"
  // },
  // {
  //     "key": "rateType",
  //     "label": "利率类型",
  //     "require": true,
  //     "placeholder": "请输入利率类型",
  //     "type": "input",
  //     "desc": "利率类型"
  // },
  // {
  //     "key": "rate",
  //     "label": "利率",
  //     "require": true,
  //     "placeholder": "请输入利率",
  //     "type": "input",
  //     "desc": "利率"
  // },
  // {
  //     "key": "custRate",
  //     "label": "对客利率",
  //     "require": true,
  //     "placeholder": "请输入对客利率",
  //     "type": "input",
  //     "desc": "对客利率"
  // },
  {
    key: "uumCustNo",
    label: "门店",
    require: true,
    placeholder: "请输入客户中心编号",
    type: "input",
    desc: "客户中心编号",
    width: "120",
  },
  // {
  //     "key": "salesPersonId",
  //     "label": "销售人员编号",
  //     "require": true,
  //     "placeholder": "请输入销售人员编号",
  //     "type": "input",
  //     "desc": "销售人员编号"
  // },
  {
    key: "applySource",
    label: "工单来源",
    require: true,
    placeholder: "",
    type: "input",
    desc: "",
    width: "80",
  },
  {
    key: "remark",
    label: "备注",
    require: true,
    placeholder: "",
    type: "input",
    desc: "",
    width: "180",
  },
];
export default apply_order_list_info;
