import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <Auth0Provider
  //   domain="dev-rx8s3631j4tlt3t2.us.auth0.com"
  //   clientId={"rn5406P5qAyO0nX20oVjCpjrX6shmS0j"}
  //   authorizationParams={{
  //     redirect_uri: "http://localhost:5173"
  //   }}
  //   cacheLocation="localstorage"
  // >
  <Auth0Provider
    domain="dev-rx8s3631j4tlt3t2.us.auth0.com"
    clientId="zYTupko8NalkX5xkyeakc9MqT4lfuSK9"
    // domain="dev-rx8s3631j4tlt3t2.us.auth0.com"
    // clientId="ci7aUlHypXq4ARVV1ETMBIusPFOh1fmW"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation="localstorage"

  >
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </Auth0Provider>,
)
