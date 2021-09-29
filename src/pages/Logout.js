import Auth from "@aws-amplify/auth"
import { useEffect } from "react"
import { useHistory } from "react-router"
import { useUser } from "../context/userContext"

const Logout = () => {

    const history = useHistory()
    const {setUser} = useUser()

    useEffect(() =>{
        setUser(null)
        logout()
        // eslint-disable-next-line
    },[])

    const logout = async () => {
        Auth.signOut()
        history.replace("/")
    }

    return null
}

export default Logout