export const customer_info_enterprise = [
    // {
    //     "key": "mobile",
    //     "label": "手机号",
    //     "require": true,
    //     "placeholder": "请输入手机号",
    //     "type": "input",
    //     "desc": "手机号"
    // },
    
    // {
    //     "key": "businessTerm",
    //     "label": "营业期限",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "营业期限"
    // },
    {
        "key": "entId",
        "label": "统一社会信用代码",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "统一社会信用代码"
    },
    // {
    //     "key": "workAddrAddress",
    //     "label": "单位地址（详细地址）",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "单位地址（详细地址）"
    // },
    // {
    //     "key": "workDist",
    //     "label": "单位所在地行政区划分",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "单位所在地行政区划分"
    // },
    // {
    //     "key": "industry",
    //     "label": "单位所属行业/所属行业",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "单位所属行业/所属行业"
    // },
    // {
    //     "key": "workBeginDate",
    //     "label": "本单位工作起始日期",
    //     "require": false,
    //     "placeholder": "请输入本单位工作起始日期（YYYY-MM-DD）",
    //     "type": "input",
    //     "desc": "本单位工作起始日期（YYYY-MM-DD）"
    // },
    // {
    //     "key": "workYear",
    //     "label": "工作年限",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "工作年限"
    // },
    // {
    //     "key": "dept",
    //     "label": "所在部门",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "所在部门"
    // },
    {
        "key": "applyRef",
        "label": "借款人与企业关系",
        "require": false,
        "placeholder": "请选择",
        "type": "select",
        "selectData":[
            {"value":"10","text":"法人"},
            {"value":"20","text":"%5以上股东"},
            {"value":"30","text":"董事"},
            {"value":"40","text":"实控人"},
            {"value":"50","text":"高管"},
            {"value":"90","text":"其他"},
        ],
        "desc": "applyRef"
    },
    {
        "key": "entName",
        "label": "企业名称",
        "require": false,
        "placeholder": "请输入企业名称",
        "type": "input",
        "desc": "企业名称"
    },
    // {
    //     "key": "entCertificateNo",
    //     "label": "企业中征码",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "企业中征码"
    // },
    // {
    //     "key": "taxPayerId",
    //     "label": "企业纳税号",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "企业纳税号"
    // },
    {
        "key": "companyMonthlyTax",
        "label": "企业月缴税额",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "企业月缴税额"
    },
    // {
    //     "key": "orgBranchCode",
    //     "label": "企业组织机构代码",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "企业组织机构代码"
    // },
    // {
    //     "key": "businRegiDate",
    //     "label": "企业注册时间",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "企业注册时间"
    // },
    {
        "key": "fundingAmt", 
        "label": "注册资本金",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "注册资本金"
    },
    {
        "key": "enterpriseScale",
        "label": "企业规模",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "企业规模"
    },
    {
        "key": "entCreateDate",
        "label": "成立日期",
        "require": false,
        "placeholder": "请输入成立日期",
        "type": "input",
        "desc": "成立日期"
    },
    {
        "key": "legalName",
        "label": "法定代表人",
        "require": false,
        "placeholder": "请输入法定代表人",
        "type": "input",
        "desc": "法定代表人"
    },
    {
        "key": "entType",
        "label": "企业类型",
        "require": false,
        "placeholder": "请输入企业类型",
        "type": "select",
        "selectData":[
            {"value":"01","text":"企业法人"},
            {"value":"02","text":"政府机关、事业单位、社会团体"},
            {"value":"03","text":"新型农业经营主体"},
            {"value":"04","text":"农户"},
            {"value":"05","text":"个体工商户、小微企业主"},
            {"value":"06","text":"个人"},
        ],
        "desc": "企业类型"
    },
    // {
    //     "key": "businessManager",
    //     "label": "经营者",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "经营者"
    // },
    {
        "key": "paidupCapital",
        "label": "实收资本(万元)",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "实收资本(万元)"
    },
    // {
    //     "key": "licenseNo",
    //     "label": "营业执照编码",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "营业执照编码"
    // },
    // {
    //     "key": "dobusinessIdentity",
    //     "label": "营业执照身份",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "营业执照身份"
    // },
    // {
    //     "key": "dobusinessCity",
    //     "label": "营业执照地级市",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "营业执照地级市"
    // },
    // {
    //     "key": "dobusinessStatus",
    //     "label": "营业执照登记状态",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "营业执照登记状态"
    // },
    {
        "key": "dom",
        "label": "企业注册详细地址",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "住所(企业注册详细地址)"
    },
    {
        "key": "officeAddress",
        "label": "企业经营详细地址",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "企业经营详细地址"
    },
    // {
    //     "key": "loanPurpose",
    //     "label": "贷款用途",
    //     "require": true,
    //     "placeholder": "请输入贷款用途",
    //     "type": "input",
    //     "desc": "贷款用途"
    // },
    // {
    //     "key": "remark",
    //     "label": "备注",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "备注"
    // },
];
