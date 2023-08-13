
const { VITE_HTTP_BASE, VITE_DEV } = import.meta.env
const PROD = VITE_DEV === 'false'
const isDevelopment = !PROD

const CONFIG = {
  isProduction: PROD,
  isDevelopment,
  // 路由 basename
  baseURL: '/',
  // 网页标题
  title: '小慧管理系统',
  http: {
    baseURL: VITE_HTTP_BASE as string
  },
  github: {
    clientId: PROD ? '736a77b74280ce7f52f2' : '37f60764673e98049f3f',
    // callbackURL 不可随意更改, 否则需要与服务端配置文件一同修改
    callbackURL: `${PROD ? 'http://www.arterning.site' : window.location.origin}/api/passport/github/callback`,

    // 可忽略，只是用于页面展示
    repositoryUrl: 'https://google.com',
    bug: 'https://google.com'
  }
}

export default CONFIG
