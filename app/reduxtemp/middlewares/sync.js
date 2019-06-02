// redux中间件做一层拦截(免的每次异步请求都需要REQUEST SUCCESS FAILURE)
export default function () {
  return next => action => {
    const { sync, types, ...payload } = action;
    // 如果没有一步请求，直接next
    if (!sync) return next({ type: types, ...payload });
    // 解构出三个状态
    const [REQUEST, SUCCESS, FAILURE] = types;
    // 有异步请求则先发送请求，然后next对应的action
    next({ type: REQUEST, ...payload });
    
    return sync()
      .then(result => next({ type: SUCCESS, ...payload, result }))
      .catch(error => next({ type: FAILURE, ...payload, error }))
  }
}
