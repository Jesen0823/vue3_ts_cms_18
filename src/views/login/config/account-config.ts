// 表单规则
export const accountRules = {
  name: [
    {
      required: true,
      message: '用户名是必传',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,}$/,
      message: '密码不能少于5个字母或数字',
      trigger: 'blur'
    }
  ]
}

// 表单规则
export const phoneRules = {
  phone: [
    {
      required: true,
      message: '手机号是必传',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{11}$/,
      message: '手机号必须是11位数字',
      trigger: 'blur'
    }
  ],
  verify_code: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5}$/,
      message: '验证码格式不正确',
      trigger: 'blur'
    }
  ]
}
