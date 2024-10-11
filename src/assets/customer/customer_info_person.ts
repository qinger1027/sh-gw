export const customer_info_person = [
    {
        "key": "mobile",
        "label": "手机号",
        "require": true,
        "placeholder": "请输入手机号",
        "type": "input",
        "desc": "手机号"
    },
    // {
    //     "key": "postAddr",
    //     "label": "通讯地址",
    //     "require": false,
    //     "placeholder": "请输入通讯地址",
    //     "type": "input",
    //     "desc": "通讯地址"
    // },
    {
        "key": "custName",
        "label": "申请人姓名",
        "require": true,
        "placeholder": "请输入客户姓名",
        "type": "input",
        "desc": "客户姓名"
    },
    {
        "key": "certType",
        "label": "证件类型",
        "require": true,
        "placeholder": "请输入证件类型",
        "type": "select",
        "desc": "证件类型",
        "defaultVal":"0",
        "selectData":[
            { value: "0", text: "身份证" },
            { value: "1", text: "户口簿" },
            { value: "2", text: "护照" },
            { value: "3", text: "军官证" },
            { value: "4", text: "士兵证" },
            { value: "5", text: "港澳居民来往内地通行证" },
            { value: "6", text: "台湾居民来往内地通行证" },
            { value: "7", text: "临时身份证" },
            { value: "8", text: "外国人居留证" },
            { value: "9", text: "警官证" },
            { value: 'A', text: "香港身份证" },
            { value: 'B', text: "澳门身份证" },
            { value: 'C', text: "台湾身份证" },
            { value: 'X', text: "其他证件" },
        ],
    },
    {
        "key": "certNo",
        "label": "证件号码",
        "require": true,
        "placeholder": "请输入证件号码",
        "type": "input",
        "desc": "证件号码"
    },
    {
        "key": "birthday",
        "label": "出生日期",
        "require": false,
        "placeholder": "请输入出生日期",
        "type": "input",
        "desc": "出生日期"
    },
    {
        "key": "sex",
        "label": "性别",
        "require": false,
        "placeholder": "请选择性别",
        "type": "select",
        "selectData":[
            { value: "F", text: "女" },
            { value: "M", text: "男" },
        ],
        "desc": "性别"
    },
    {
        "key": "nationality",
        "label": "国籍",
        "require": false,
        "placeholder": "请输入国籍",
        "type": "input",
        "desc": "国籍"
    },
    {
        "key": "nation",
        "label": "民族",
        "require": false,
        "placeholder": "请输入民族",
        "type": "input",
        "desc": "民族"
    },
    {
        "key": "certDate",
        "label": "证件有效期",
        "require": false,
        "placeholder": "请输入证件有效开始日期",
        "type": "date",
        "desc": "证件有效开始日期"
    },
    {
        "key": "signOffice",
        "label": "签发机关",
        "require": false,
        "placeholder": "请输入签发机关",
        "type": "input",
        "desc": "签发机关"
    },
    {
        "key": "certAddress",
        "label": "户籍地址",
        "require": false,
        "placeholder": "请输入户籍详细地址",
        "type": "input",
        "desc": "户籍地址"
    },
    {
        "key": "liveAddressDetail",
        "label": "居住地址",
        "require": false,
        "placeholder": "请输入居住详细地址",
        "type": "input",
        "desc": "居住地址"
    },
    {
        "key": "liveTime",
        "label": "居住年限",
        "require": false,
        "placeholder": "请输入居住年限整数",
        "type": "input",
        "desc": "居住年限"
    },
    {
        "key": "liveHouseCondition",
        "label": "住房条件",
        "require": false,
        "placeholder": "请输入住房条件",
        "type": "select",
        "desc": "住房条件",
        "selectData":[
            { value: 1, text: "自有住房，无贷款" },
            { value: 2, text: "自有住房，有按揭贷款" },
            { value: 3, text: "自有住房，已抵押" },
            { value: 4, text: "租房" },
            { value: 5, text: "其它" },
        ],
    },
    {
        "key": "liveCarCondition",
        "label": "名下车",
        "require": false,
        "placeholder": "请输入名下车",
        "type": "select",
        "selectData":[
            { value: 1, text: "无车" },
            { value: 2, text: "本人名下有车,无贷款" },
            { value: 3, text: "本人名下有车，有按揭贷款" },
            { value: 4, text: "本人名下有车，已抵押" },
            { value: 5, text: "其它" },
        ],
        "desc": "名下车"
    },
    {
        "key": "eduLevel",
        "label": "学历",
        "require": false,
        "placeholder": "请输入学历",
        "type": "select",
        "selectData":[
            { value: "研究生及以上", text: "研究生及以上" },
            { value: "大学本科", text: "大学本科" },
            { value: "大专", text: "大专" },
            { value: "中专", text: "中专" },
            { value: "技术学校", text: "技术学校" },
            { value: "高中", text: "高中" },
            { value: "初中", text: "初中" },
            { value: "小学", text: "小学" },
            { value: "文盲或半文盲", text: "文盲或半文盲" },
            { value: "未知", text: "未知" },
        ],
        "desc": "学历"
    },
    {
        "key": "highestDegree",
        "label": "学位",
        "require": false,
        "placeholder": "请输入学位",
        "type": "input",
        "desc": "学位"
    },
    {
        "key": "gradSchool",
        "label": "毕业学校",
        "require": false,
        "placeholder": "请输入毕业学校",
        "type": "input",
        "desc": "毕业学校"
    },
    // {
    //     "key": "gradYear",
    //     "label": "毕业年份",
    //     "require": false,
    //     "placeholder": "请输入毕业年份（YYYY-MM-DD）",
    //     "type": "input",
    //     "desc": "毕业年份"
    // },
    {
        "key": "marryStatus",
        "label": "婚姻状况",
        "require": false,
        "placeholder": "请输入",
        "type": "select",
        "selectData":[
            { value: "10", text: "未婚" },
            { value: "20", text: "已婚" },
            { value: "30", text: "丧偶" },
            { value: "40", text: "离异" },
            { value: "50", text: "未知" },
        ],
        "desc": "婚姻状况"
    },
    {
        "key": "hasChildren",
        "label": "是否有子女",
        "require": false,
        "placeholder": "请选择",
        "type": "select",
        "selectData":[
            { value: "Y", text: "有" },
            { value: "N", text: "无" },
        ],
        "desc": "是否有子女"
    },
    {
        "key": "familyAddressDetail",
        "label": "家庭详细地址",
        "require": false,
        "placeholder": "家庭详细地址",
        "type": "input",
        "desc": "子女状况"
    },
    // {
    //     "key": "urgentLinkMan",
    //     "label": "紧急联系人",
    //     "require": true,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "紧急联系人"
    // },
    // {
    //     "key": "urgentLinkRelation",
    //     "label": "紧急联系人关系",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "select",
    //     "desc": "紧急联系人关系",
    //     "selectData":[
    //         { value: 'R01', text: "父母" },
    //         { value: 'R02', text: "配偶" },
    //         { value: 'R03', text: "亲戚" },
    //         { value: 'R04', text: "家人" },
    //         { value: 'R05', text: "子女" },
    //         { value: 'R06', text: "朋友" },
    //         { value: 'R07', text: "同事" },
    //         { value: 'R08', text: "兄弟姐妹" },
    //         { value: 'R09', text: "同学" },
    //         { value: 'R99', text: "其他" },
    //     ]
    // },
    // {
    //     "key": "urgentLinkMobile",
    //     "label": "紧急联系人电话",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "紧急联系人电话"
    // },
    // {
    //     "key": "localHouse",
    //     "label": "有无本地房产",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "select",
    //     "desc": "有无本地房产:1-有2-无3-未知",
    //     "selectData":[
    //         { value: "1", text: "有" },
    //         { value: "2", text: "无" },
    //         { value: "3", text: "未知" }
    //     ],
    // },
    {
        "key": "isPaySecurity",
        "label": "是否缴纳社保",
        "require": false,
        "placeholder": "请选择",
        "type": "select",
        "desc": "是否缴纳社保",
        "selectData":[
            { value: "Y", text: "是" },
            { value: "N", text: "否" }
        ],
    },
    {
        "key": "oftenEmail",
        "label": "常用邮箱",
        "require": false,
        "placeholder": "请输入常用邮箱",
        "type": "input",
        "desc": "常用邮箱"
    },
    {
        "key": "workUnitName",
        "label": "单位名称",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "单位名称"
    },
    {
        "key": "workUnitTelphone",
        "label": "单位电话",
        "require": false,
        "placeholder": "请输入单位电话",
        "type": "input",
        "desc": "单位电话"
    },
    {
        "key": "workYears",
        "label": "工作年限",
        "require": false,
        "placeholder": "请输入工作年限",
        "type": "input",
        "desc": "工作年限"
    },
    {
        "key": "workAddressDetail",
        "label": "现在的工作地址",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "现在的工作地址"
    },
    {
        "key": "monthIncome",
        "label": "月收入",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "月收入"
    },
    // {
    //     "key": "otherIncome",
    //     "label": "其他收入",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "其他收入"
    // },
    // {
    //     "key": "familyAnnualIncome",
    //     "label": "家庭年收入",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "家庭年收入"
    // },
    {
        "key": "vocation",
        "label": "职业",
        "require": false,
        "placeholder": "请输入",
        "type": "select",
        "selectData":[
            { value: "01", text: "党政机关/事业单位" },
            { value: "02", text: "企业职员" },
            { value: "03", text: "工人/服务人员" },
            { value: "04", text: "生意人/个体户" },
            { value: "05", text: "学生" },
            { value: "06", text: "自由职业" },
            { value: "07", text: "其他" },
            { value: "08", text: "律师/会计师等专业技术人员" },
            { value: "09", text: "金融行业从业人员" },
            { value: "10", text: "农/林/牧/渔从业人员" },
        ],
        "desc": "职业"
    },
    // {
    //     "key": "post",
    //     "label": "职务",
    //     "require": false,
    //     "placeholder": "请输入",
    //     "type": "input",
    //     "desc": "职务"
    // },
    {
        "key": "loanUse",
        "label": "借款用途",
        "require": true,
        "placeholder": "请选择借款用途",
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
        "desc": "借款用途"
    },
    {
        "key": "loanAmt",
        "label": "借款金额",
        "require": true,
        "placeholder": "请输入借款金额",
        "type": "input",
        "desc": "借款金额"
    },
    {
        "key": "loanPeriod",
        "label": "借款期限",
        "require": true,
        "placeholder": "请输入借款期限",
        "type": "input",
        "desc": "借款期限"
    },
    {
        "key": "remark",
        "label": "备注",
        "require": false,
        "placeholder": "请输入",
        "type": "input",
        "desc": "备注"
    }
];
/**
 * 联系人信息
 * desc暂时没用
 */
export const customer_info_contacts={
    '0':[
        {
            "key": "name",
            "label": "紧急联系人姓名",
            "require": false,
            "placeholder": "请输入紧急联系人姓名",
            "type": "input",
            "desc": "亲属联系人姓名"
        },
        {
            "key": "relation",
            "label": "紧急联系人关系",
            "require": false,
            "placeholder": "请选择紧急联系人关系",
            "type": "select",
            "desc": "紧急联系人关系",
            "selectData":[
                { value: 'R00', text: "紧急联系人" },
                { value: 'R01', text: "父母" },
                { value: 'R02', text: "配偶" },
                { value: 'R04', text: "家人" },
                { value: 'R05', text: "子女" },
                { value: 'R06', text: "朋友" },
                { value: 'R07', text: "同事" },
                { value: 'R09', text: "同学" },
                { value: 'R99', text: "其他" },
            ]
        },
        {
            "key": "mobile",
            "label": "紧急联系人手机号",
            "require": false,
            "placeholder": "请输入紧急联系人手机号",
            "type": "input",
            "desc": "紧急联系人手机号"
        }
    ], 
    '1':[
        {
            "key": "name",
            "label": "联系人1姓名",
            "require": false,
            "placeholder": "请输入",
            "type": "input",
            "desc": "亲属联系人姓名"
        },
        {
            "key": "relation",
            "label": "联系人1关系",
            "require": false,
            "placeholder": "请输入",
            "type": "select",
            "desc": "亲属联系人关系",
            "selectData":[
                { value: 'R00', text: "紧急联系人" },
                { value: 'R01', text: "父母" },
                { value: 'R02', text: "配偶" },
                { value: 'R04', text: "家人" },
                { value: 'R05', text: "子女" },
                { value: 'R06', text: "朋友" },
                { value: 'R07', text: "同事" },
                { value: 'R09', text: "同学" },
                { value: 'R99', text: "其他" },
            ]
        },
        {
            "key": "mobile",
            "label": "联系人1手机号",
            "require": false,
            "placeholder": "请输入",
            "type": "input",
            "desc": "亲属联系人手机号"
        }
    ]
}
