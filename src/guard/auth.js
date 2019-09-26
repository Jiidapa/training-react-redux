import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
    let isAuthenticated =  false;
  
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) { //ถ้ามีtoken
      isAuthenticated = true 
    }
  
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : ( //ถ้าไม่เป็นจริงให้redirect ไปยังหน้า...
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }