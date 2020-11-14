const Mock = require("mockjs");

Mock.mock("http://localhost:8080/mockApi/importConfig", function() {
  return {
    code: 200,
    data: {
      page: [
        {
          type: "form",
          belong: "normal",
          config: { editable: true, prop: "form_1605337210747_41338" },
          columns: [
            {
              type: "action",
              belong: "normal",
              config: { prop: "action_1605337210747_35938" },
              columns: [
                {
                  type: "button",
                  belong: "normal",
                  config: {
                    prop: "button_1605337210747_66742",
                    label: "返回",
                    icon: "el-icon-back",
                    url: "action://back",
                    btnStyle: "ghost",
                    condition: "",
                    role: "",
                    btnType: "button",
                    isCircle: false,
                    plain: false,
                    valid: false
                  },
                  key: "button_1605337210747_66742"
                },
                {
                  type: "button",
                  belong: "normal",
                  config: {
                    prop: "button_1605337210748_77638",
                    label: "保存",
                    icon: "el-icon-circle-check",
                    url: "",
                    btnStyle: "ghost",
                    condition: "",
                    role: "",
                    btnType: "button",
                    isCircle: false,
                    plain: false,
                    valid: true
                  },
                  key: "button_1605337210748_77638"
                },
                {
                  type: "button",
                  belong: "normal",
                  config: {
                    prop: "button_1605337210748_38518",
                    label: "提交",
                    icon: "el-icon-top",
                    url: "",
                    btnStyle: "ghost",
                    condition: "",
                    role: "",
                    btnType: "button",
                    isCircle: false,
                    plain: false,
                    valid: true
                  },
                  key: "button_1605337210748_38518"
                },
                {
                  type: "button",
                  belong: "normal",
                  config: {
                    prop: "button_1605337210748_1387",
                    label: "编辑",
                    icon: "el-icon-edit",
                    url: "",
                    btnStyle: "ghost",
                    condition: "",
                    role: "",
                    btnType: "button",
                    isCircle: false,
                    plain: false,
                    valid: false
                  },
                  key: "button_1605337210748_1387"
                },
                {
                  type: "button",
                  belong: "normal",
                  config: {
                    prop: "button_1605337210748_1522",
                    label: "清空",
                    icon: "el-icon-delete",
                    url: "action://clear",
                    btnStyle: "ghost",
                    condition: "",
                    role: "",
                    btnType: "button",
                    isCircle: false,
                    plain: false,
                    valid: false
                  },
                  key: "button_1605337210748_1522"
                }
              ],
              key: "action_1605337210747_35938"
            },
            {
              type: "header",
              belong: "normal",
              config: { label: "基础信息", prop: "header_1605337210748_38463" },
              key: "header_1605337210748_38463"
            },
            {
              type: "grid",
              belong: "normal",
              config: { prop: "grid_1605337210748_45116" },
              columns: [
                {
                  type: "col",
                  columns: [
                    {
                      type: "input",
                      belong: "",
                      config: {
                        prop: "nickname",
                        label: "昵称",
                        required: false,
                        disabled: false,
                        textual: false,
                        maxLength: 50,
                        minLength: 1,
                        placeholder: "",
                        defaultValue: "",
                        pattern: []
                      },
                      key: "input_1605337210748_2300"
                    },
                    {
                      type: "color-picker",
                      belong: "",
                      config: {
                        prop: "color",
                        label: "颜色选择器",
                        required: false,
                        disabled: false,
                        defaultValue: "rgb(255,0,0)",
                        isOpacity: false
                      },
                      key: "color-picker_1605337210748_65601"
                    },
                    {
                      type: "switch",
                      belong: "",
                      config: {
                        prop: "use",
                        label: "使用",
                        required: false,
                        disabled: false,
                        activeText: "开启",
                        inactiveText: "关闭",
                        activeColor: "#04f",
                        inactiveColor: "#f00",
                        defaultValue: true
                      },
                      key: "switch_1605337210748_64267"
                    },
                    {
                      type: "date-picker",
                      belong: "",
                      config: {
                        prop: "date",
                        label: "日期选择器",
                        required: false,
                        disabled: false,
                        defaultValue: "",
                        type: "date",
                        typeOptions: [
                          "year",
                          "month",
                          "date",
                          "daterange",
                          "monthrange"
                        ],
                        format: "yyyy-MM-dd"
                      },
                      key: "date-picker_1605337210748_22634"
                    }
                  ],
                  key: "col_1605337210748_4391"
                },
                {
                  type: "col",
                  columns: [
                    {
                      type: "number",
                      belong: "",
                      config: {
                        prop: "num",
                        label: "数量",
                        required: false,
                        disabled: false,
                        textual: false,
                        max: 50,
                        min: 1,
                        placeholder: "",
                        defaultValue: 1,
                        step: 1,
                        precision: 0
                      },
                      key: "number_1605337210748_81943"
                    },
                    {
                      type: "time-picker",
                      belong: "",
                      config: {
                        prop: "time",
                        label: "时间选择器",
                        required: false,
                        disabled: false,
                        defaultValue: "",
                        isRange: false
                      },
                      key: "time-picker_1605337210748_28605"
                    },
                    {
                      type: "cascader",
                      belong: "",
                      config: {
                        prop: "addressSelect",
                        label: "省市区",
                        required: false,
                        disabled: false,
                        textual: false,
                        defaultValue: "",
                        dynamic: true,
                        multiple: false,
                        filterable: false,
                        lazy: false,
                        checkStrictly: false,
                        showAllLevels: false,
                        dynamicUrl: "request://-X post /api/getOptions"
                      },
                      key: "cascader_1605337210748_59407"
                    },
                    {
                      type: "date-time-picker",
                      belong: "",
                      config: {
                        prop: "dateTime",
                        label: "日期时间选择器",
                        required: false,
                        disabled: false,
                        defaultValue: "",
                        isRange: false
                      },
                      key: "date-time-picker_1605337210748_17248"
                    }
                  ],
                  key: "col_1605337210748_22882"
                }
              ],
              key: "grid_1605337210748_45116"
            },
            {
              type: "grid",
              belong: "normal",
              config: { prop: "grid_1605337210748_82175" },
              columns: [
                {
                  type: "col",
                  columns: [
                    {
                      type: "rate",
                      belong: "",
                      config: {
                        prop: "rate",
                        label: "评分",
                        required: false,
                        disabled: false,
                        max: 5,
                        defaultValue: 0,
                        allowHalf: false,
                        showScore: false
                      },
                      key: "rate_1605337210748_696"
                    },
                    {
                      type: "checkbox",
                      belong: "",
                      config: {
                        prop: "tag",
                        label: "标签",
                        required: false,
                        disabled: false,
                        textual: false,
                        defaultValue: [],
                        dynamic: false,
                        options: [
                          { value: "hot", label: "热门" },
                          { value: "new", label: "最新" },
                          { value: "normal", label: "综合" }
                        ],
                        dynamicOptions: {
                          url: "/getOptions",
                          value: "value",
                          label: "label"
                        }
                      },
                      key: "checkbox_1605337210748_68189"
                    },
                    {
                      type: "radio",
                      belong: "",
                      config: {
                        prop: "sex",
                        label: "性别",
                        required: false,
                        disabled: false,
                        textual: false,
                        defaultValue: "",
                        dynamic: false,
                        options: [
                          { value: "male", label: "男" },
                          { value: "female", label: "女" }
                        ],
                        dynamicOptions: {
                          url: "/getOptions",
                          value: "value",
                          label: "label"
                        }
                      },
                      key: "radio_1605337210748_95844"
                    }
                  ],
                  key: "col_1605337210748_6381"
                }
              ],
              key: "grid_1605337210748_82175"
            },
            {
              type: "header",
              belong: "normal",
              config: { label: "详细信息", prop: "header_1605337210748_12714" },
              key: "header_1605337210748_12714"
            },
            {
              type: "grid",
              belong: "normal",
              config: { prop: "grid_1605337210748_54787" },
              columns: [
                {
                  type: "col",
                  columns: [
                    {
                      type: "file-upload",
                      belong: "",
                      config: {
                        prop: "file",
                        label: "文件上传框",
                        required: false,
                        disabled: false,
                        placeholder: "",
                        defaultValue: [],
                        limit: 10,
                        multiple: false,
                        sizeLimit: 50,
                        typeLimit: ["word", "excel"],
                        typeOptions: [
                          { value: "all", label: "不限" },
                          { value: "word", label: "word文档" },
                          { value: "excel", label: "excel文件" },
                          { value: "ppt", label: "ppt文件" },
                          { value: "pdf", label: "pdf文件" },
                          { value: "txt", label: "txt文件" }
                        ]
                      },
                      key: "file-upload_1605337210748_29346"
                    },
                    {
                      type: "image-upload",
                      belong: "",
                      config: {
                        prop: "image",
                        label: "图片上传框",
                        required: false,
                        disabled: false,
                        placeholder: "",
                        defaultValue: [],
                        limit: 10,
                        multiple: true,
                        sizeLimit: 50,
                        pattern: ""
                      },
                      key: "image-upload_1605337210748_85618"
                    },
                    {
                      type: "media-upload",
                      belong: "",
                      config: {
                        prop: "media",
                        label: "音视频上传框",
                        required: false,
                        disabled: false,
                        placeholder: "",
                        defaultValue: [],
                        limit: 10,
                        multiple: false,
                        sizeLimit: 50,
                        pattern: ""
                      },
                      key: "media-upload_1605337210748_27795"
                    },
                    {
                      type: "textarea",
                      belong: "",
                      config: {
                        prop: "description",
                        label: "描述",
                        required: false,
                        disabled: false,
                        textual: false,
                        maxLength: 500,
                        minLength: 1,
                        placeholder: "",
                        defaultValue: "",
                        pattern: []
                      },
                      key: "textarea_1605337210748_95749"
                    }
                  ],
                  key: "col_1605337210748_12493"
                }
              ],
              key: "grid_1605337210748_54787"
            }
          ],
          key: "form_1605337210747_41338"
        }
      ],
      config: 'request://-X GET -d "formId={formId}" /mockApi/getFormContext'
    }
  };
});

Mock.mock("http://localhost:8080/mockApi/saveConfig", function(data) {
  console.log(data);
  localStorage.setItem("json", data.body);
  return {
    code: 200,
    msg: "保存成功"
  };
});
export default Mock;
