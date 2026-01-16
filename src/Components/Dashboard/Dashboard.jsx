import {useContext} from 'react';
import {userContext} from "../../Context/userContext";

const Dashboard = () => {
    const {user} = useContext(userContext)
  return (
    <>
    <h1>dashboard</h1>
    {!!user &&(<h1>h1 {user.name}!</h1>)}
    </>
  )
}

export default Dashboard