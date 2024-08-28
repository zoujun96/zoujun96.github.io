type TranslationResult = {
  from: string
  to: string
  trans_result: Array<{
    src: string
    dst: string
  }>
}

const jsonp = async (
  url: string,
  params: { [key: string]: string | number } = {},
  callbackName = 'callback'
): Promise<TranslationResult> => {
  // 构建查询字符串
  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')

  // 拼接完整的 URL
  const jsonpUrl = `${url}?${queryString}&${callbackName}=__jsonpCallback`

  // 创建一个新的 script 元素
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = jsonpUrl

    // 定义回调函数
    ;(window as any).__jsonpCallback = (data: TranslationResult) => {
      resolve(data) // 成功时返回数据
      document.body.removeChild(script) // 请求完成后移除 script 标签
      delete (window as any).__jsonpCallback // 清理全局回调
    }

    script.onerror = () => {
      reject(new Error('JSONP请求失败')) // 处理请求错误
      document.body.removeChild(script) // 移除 script 标签
      delete (window as any).__jsonpCallback // 清理全局回调
    }

    document.body.appendChild(script) // 将 script 标签插入文档
  })
}

export default jsonp
