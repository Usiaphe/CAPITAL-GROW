import { useContext } from 'react';
import { UserContext } from "../../Context/userContext";

const Dashboard = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <h1>dashboard</h1>
            {!!user && <h1>hi {user.name}!</h1>}
        </>
    );
};

export default Dashboard;