const { renderToString } = require('react-dom/server')
const serialize = require('serialize-javascript')
// 在模板中使用注释当做占位符，抛弃了花括号，这样前后端就可以共用一个模板了
function templating(template) {
    return props => template.replace(/<!--([\s\S]*?)-->/g, (_, key) => props[key.trim()]);
}

module.exports = async function(ctx, serverBundle, template) {
    try {
        const render = templating(template)
        const jsx = await serverBundle(ctx)
        const html = renderToString(jsx)
        // 最终返回整的
        const body = render({
            html,
            store: `<script type="application/json" id="SSR_HYDRATED_DATA">${serialize(ctx.store.getState())}</script>`,
        });
        ctx.body = body;
        ctx.type = 'text/html';
    }
    catch (err) {
        console.error(err);
        ctx.body = err.message;
        ctx.type = 'text/html';
    }
}