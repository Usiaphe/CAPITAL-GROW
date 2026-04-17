import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import './UserDashboard.css';

const Dashboard = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="user-dashboard-page">
            <div className="user-dashboard-container">
                <div className="user-dashboard-header">
                    <div className="user-welcome">
                        <h1>Welcome, {user?.name || 'User'}!</h1>
                        <p>Your investment dashboard</p>
                    </div>
                    <button className="user-action-button logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                <div className="user-stats-grid">
                    <div className="user-stat-card">
                        <p className="user-stat-label">Account Balance</p>
                        <p className="user-stat-value">$0.00</p>
                    </div>
                    <div className="user-stat-card">
                        <p className="user-stat-label">Total Invested</p>
                        <p className="user-stat-value">$0.00</p>
                    </div>
                    <div className="user-stat-card">
                        <p className="user-stat-label">Total Profit</p>
                        <p className="user-stat-value">$0.00</p>
                    </div>
                    <div className="user-stat-card">
                        <p className="user-stat-label">Active Trades</p>
                        <p className="user-stat-value">0</p>
                    </div>
                </div>

                <div className="user-info-section">
                    <h2>Account Information</h2>
                    <div className="user-info-card">
                        <div className="user-info-row">
                            <span className="user-info-label">Name:</span>
                            <span className="user-info-value">{user?.name}</span>
                        </div>
                        <div className="user-info-row">
                            <span className="user-info-label">Email:</span>
                            <span className="user-info-value">{user?.email}</span>
                        </div>
                        <div className="user-info-row">
                            <span className="user-info-label">Account Type:</span>
                            <span className="user-info-value">{user?.isAdmin ? 'Admin' : 'Standard'}</span>
                        </div>
                    </div>
                </div>

                <p className="user-copyright">&copy; 2025 Capital Grow. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Dashboard;
