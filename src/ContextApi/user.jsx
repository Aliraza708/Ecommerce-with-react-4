import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import { Spin } from "antd";

export const UserContext = createContext()

function UserContextprovider({ children }) {
 
    const [usershow, setuser] = useState({
        isLogin: false,
        userInfo: {}
    })
    const [loading, setLoading] = useState(false);
 console.log(usershow)
    useEffect(() => {
        setLoading(true)
        const subract = onAuthStateChanged(auth, (user) => {
            if (user) {
                setuser({
                    isLogin: true,
                    userInfo: {
                        email: user.email,
                        name: user.displayName,
                        photoUrl: user.photoURL,
                        id : user.uid
                    }
                })
            } else {
                setuser({
                    isLogin: false,
                    userInfo: {},
                });
                console.log("User is not logged In");
            }
            setLoading(false);

        })
        return subract
    }, [])
    return (
        <UserContext.Provider value={{ usershow, setuser }} >
            {loading ? <div className="flex justify-center items-center h-screen"><Spin size="large" /></div> : children}
        </UserContext.Provider>
    );

}
export default UserContextprovider;