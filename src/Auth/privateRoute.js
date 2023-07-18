import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Component, auth, ...rest }) {
    return (
      <Route
        {...rest}
        element={auth ? <Component /> : <Navigate to="/login" replace />}
      />
    );
  }

export default PrivateRoute;
