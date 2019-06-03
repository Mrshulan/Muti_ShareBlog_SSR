import { renderRoutes } from "react-router-config";
import React from 'react'

const Info = ({route }) => {

  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default Info