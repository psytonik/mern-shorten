import Loader from "./components/loader.js";
import NavBar from "./components/navbar.js";
import {AuthContext} from "./context/AuthContext.js";
import {useRoutes} from "./routes.js";
import {useAuth} from "./shared/hooks/auth.hook.js";

function App() {
    const {token,login,logOut,userId,ready} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if(!ready){
        return <Loader />
    }
    return (
        <AuthContext.Provider value={{
            token,login,logOut,userId,isAuthenticated
        }}>
            {isAuthenticated && <NavBar/>}
            <div className="container-fluid">
                {routes}
            </div>
        </AuthContext.Provider>
  );
}

export default App;
