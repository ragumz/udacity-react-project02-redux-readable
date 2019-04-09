import React from 'react'

/**
 * @description Stateless component to warn the user that the URL address is invalid
 */
const NoRouteFound = () => {

  return <div className="center">
          <h2>ERROR HTTP 404</h2>
          <h3>This URL path does not exist or the record you are trying to access was already deleted.</h3>
        </div>;

}

export default NoRouteFound;