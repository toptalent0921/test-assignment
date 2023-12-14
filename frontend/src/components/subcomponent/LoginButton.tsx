import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../ui/button';

const Login = () => {
    const { loginWithRedirect, logout, isAuthenticated, } = useAuth0();

    if (isAuthenticated) {
        return (
            <div className="flex justify-center items-center  bg-slate-200">
                <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} >
                    Log Out
                </Button>
            </div>
        )
    } else {

        return (
            <div className="flex justify-center items-center  bg-slate-200">

                <Button onClick={() => loginWithRedirect()} >
                    Log In
                </Button>
            </div>
        )
    }
};

export default Login;
