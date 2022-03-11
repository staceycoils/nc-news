import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function ManageUser() {
    const {user, setUser} = useContext(UserContext)

    function logoutUser() {
        setUser(null)
        console.log('user logged out')
    }

    function loginUser() {
        setUser('grumpy19')
        console.log('user logged in')
    }


  if (user) return (
    <div>
        Logged in as: {user}<br />
        <button onClick={()=>{logoutUser()}}>LOGOUT</button>
    </div>
  );
  return (
    <div>
        Not logged in<br />
        <button onClick={()=>{loginUser()}}>LOGIN</button>
    </div>
  );
}
