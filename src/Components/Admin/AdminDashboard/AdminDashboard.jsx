import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../../Context/userContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loadingUsers, setLoadingUsers] = useState(true);

    const fetchUsers = useCallback(async () => {
        try {
            const res = await axios.get('/admin/users');
            setUsers(res.data);
        } catch (error) {
            console.log(error);
            toast.error('Failed to load users');
        } finally {
            setLoadingUsers(false);
        }
    }, []);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await axios.delete(`/admin/users/${id}`);
            toast.success('User deleted');
            setUsers(users.filter(u => u._id !== id));
            if (selectedUser?._id === id) setSelectedUser(null);
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete user');
        }
    };

    const handleToggleAdmin = async (id) => {
        try {
            const res = await axios.put(`/admin/users/${id}/toggle-admin`);
            toast.success(res.data.message);
            fetchUsers();
            if (selectedUser?._id === id) {
                setSelectedUser(res.data.user);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to update user role');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="admin-page">
            <div className="admin-sidebar">
                <div className="admin-logo">
                    <h2>CAPITAL <span>GROW</span></h2>
                    <p>Admin Panel</p>
                </div>
                <nav className="admin-nav">
                    <button className="admin-nav-btn active" onClick={() => setSelectedUser(null)}>
                        Users
                    </button>
                    <button className="admin-nav-btn" onClick={() => navigate('/')}>
                        View Site
                    </button>
                    <button className="admin-nav-btn logout" onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            </div>

            <div className="admin-main">
                <div className="admin-header">
                    <h1>{selectedUser ? 'User Details' : 'All Users'}</h1>
                    <p>Welcome, {user?.name} (Admin)</p>
                </div>

                {selectedUser ? (
                    <div className="admin-user-detail">
                        <button className="back-btn" onClick={() => setSelectedUser(null)}>
                            &larr; Back to Users
                        </button>
                        <div className="detail-card">
                            <div className="detail-avatar">
                                {selectedUser.name?.charAt(0).toUpperCase()}
                            </div>
                            <h2>{selectedUser.name}</h2>
                            <p className="detail-email">{selectedUser.email}</p>
                            <p className="detail-role">
                                Role: <strong>{selectedUser.isAdmin ? 'Admin' : 'User'}</strong>
                            </p>
                            <p className="detail-date">
                                Joined: {new Date(selectedUser.createdAt).toLocaleDateString()}
                            </p>
                            <div className="detail-actions">
                                <button
                                    className="toggle-admin-btn"
                                    onClick={() => handleToggleAdmin(selectedUser._id)}
                                >
                                    {selectedUser.isAdmin ? 'Remove Admin' : 'Make Admin'}
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteUser(selectedUser._id)}
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="admin-users-section">
                        <div className="admin-stats">
                            <div className="admin-stat-card">
                                <p className="admin-stat-value">{users.length}</p>
                                <p className="admin-stat-label">Total Users</p>
                            </div>
                            <div className="admin-stat-card">
                                <p className="admin-stat-value">
                                    {users.filter(u => u.isAdmin).length}
                                </p>
                                <p className="admin-stat-label">Admins</p>
                            </div>
                            <div className="admin-stat-card">
                                <p className="admin-stat-value">
                                    {users.filter(u => !u.isAdmin).length}
                                </p>
                                <p className="admin-stat-label">Regular Users</p>
                            </div>
                        </div>

                        {loadingUsers ? (
                            <p style={{ textAlign: 'center', padding: '40px' }}>Loading users...</p>
                        ) : (
                            <div className="users-table-wrapper">
                                <table className="users-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Joined</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u._id}>
                                                <td>
                                                    <button
                                                        className="user-name-btn"
                                                        onClick={() => setSelectedUser(u)}
                                                    >
                                                        {u.name}
                                                    </button>
                                                </td>
                                                <td>{u.email}</td>
                                                <td>
                                                    <span className={`role-badge ${u.isAdmin ? 'admin' : 'user'}`}>
                                                        {u.isAdmin ? 'Admin' : 'User'}
                                                    </span>
                                                </td>
                                                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                                <td className="table-actions">
                                                    <button
                                                        className="action-btn view"
                                                        onClick={() => setSelectedUser(u)}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={() => handleDeleteUser(u._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
