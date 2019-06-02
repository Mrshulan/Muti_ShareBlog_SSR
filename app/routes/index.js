import adminRoutes from './admin'
import homeRoutes from './home'

let routes = [
  // adminRoutes,
  homeRoutes,
]


function handleIndexRoute(route) {
  if(!route.routes || !route.routes.length) return
}

routes.forEach(handleIndexRoute)

export default routes