const apply_order = [
    {
        "key": "productCode",
        "label": "产品代码",
        "require": true,
        "placeholder": "请输入产品代码",
        "type": "input",
        "desc": "产品代码",
        "disabled":true
    },
    {
        "key": "custType",
        "label": "客户类型",
        "require": true,
        "placeholder": "请输入客户类型",
        "type": "input",
        "desc": "客户类型",
        "disabled":true
    },
    // {
    //     "key": "indCustType",
    //     "label": "个人客户类型",
    //     "require": true,
    //     "placeholder": "请输入个人客户类型",
    //     "type": "input",
    //     "desc": "个人客户类型"
    // },
    {
        "key": "partnerCode",
        "label": "合作机构号",
        "require": true,
        "placeholder": "请输入合作机构号",
        "type": "input",
        "desc": "合作机构号",
        "disabled":true
    },
    {
        "key": "partnerProductCode",
        "label": "合作机构产品号",
        "require": true,
        "placeholder": "请输入合作机构产品号",
        "type": "input",
        "desc": "合作机构产品号",
        "disabled":true
    },
    {
        "key": "loanType",
        "label": "借款类型",
        "require": true,
        "placeholder": "请输入借款类型",
        "type": "select",
        "selectData":[
            { value: "00", text: "循环额度" },
            { value: "01", text: "单笔授信" },
        ],
        "desc": "借款类型 (00循环额度/01单笔授信 )",
        "disabled":true
    },
    // {
    //     "key": "bankCreditStatus",
    //     "label": "资方授信申请状态",
    //     "require": true,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "资方授信申请状态01-审批中,02-审批通过, 03审批拒绝,04 风控审核中，05风控拒绝"
    // },
    // 默认为0
    // {
    //     "key": "bankCreditAmount",
    //     "label": "资方授信额度",
    //     "require": true,
    //     "placeholder": "请输入资方授信额度",
    //     "type": "input",
    //     "desc": "资方授信额度"
    // },
    
    {
        "key": "payType",
        "label": "还款方式",
        "require": true,
        "placeholder": "请输入还款方式",
        "type": "select",
        "selectData":[
            { value: "C1001", text: "分期-等额本息" },
        ],
        "desc": "还款方式    分期-等额本息    分期-等额本金    分期-按期还息到期还本    不分期一次性还本付息（算好到期本息）    不分期-随借随还（每天更新）",
        "disabled":false
    },
    // 编辑的时候需要
    // {
    //     "key": "guestStatus",
    //     "label": "对客状态",
    //     "require": true,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "对客状态 01审核中 02审核通过 03审核拒绝"
    // },
    // {
    //     "key": "applyStatus",
    //     "label": "工单状态",
    //     "require": true,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "工单状态 01资料审核中 02下户审核中 03店长复核中 04资产端审核通过"
    // },
    {
        "key": "creditStagingUnits",
        "label": "分期周期单位",
        "require": true,
        "placeholder": "请输入分期周期单位",
        "type": "input",
        "desc": "分期周期单位",
        "disabled":true
    },
    {
        "key": "loanPurpose",
        "label": "借款用途",
        "require": true,
        "placeholder": "请输入借款用途",
        "type": "select",
        "selectData":[
            { value: "01", text: "消费" },
            { value: "02", text: "装修" },
            { value: "03", text: "旅游" },
            { value: "04", text: "教育" },
            { value: "05", text: "医疗" },
            { value: "06", text: "经营周转" },
            { value: "07", text: "其他" },
            { value: "18", text: "小微企业经营" },
        ],
        "desc": "借款用途",
        "disabled":true
    },
    {
        "key": "applyAmount",
        "label": "客户申请金额",
        "require": true,
        "placeholder": "请输入客户申请金额",
        "type": "input",
        "desc": "客户申请金额",
        "disabled":true
    },
    {
        "key": "agrTerm",
        "label": "申请期限（月）",
        "require": true,
        "placeholder": "请输入",
        "type": "input",
        "desc": "申请期限（月）",
        "disabled":true
    },
    {
        "key": "remark",
        "label": "备注",
        "require": false,
        "placeholder": "请输入备注",
        "type": "input",
        "desc": "备注",
        "disabled":false
    },
]
export default apply_order;