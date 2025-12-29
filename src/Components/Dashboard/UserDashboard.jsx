import { useUser } from "@clerk/clerk-react";
import "./UserDashboard.css";

export default function UserDashboard() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="user-dashboard-page">
        <div style={{ textAlign: "center", padding: "100px", fontSize: "24px" }}>
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="user-dashboard-page">
        <div style={{ textAlign: "center", padding: "100px", fontSize: "24px" }}>
          Please log in to view your dashboard.
        </div>
      </div>
    );
  }

  const displayName =
    user.username ||
    user.firstName ||
    user.emailAddresses[0]?.emailAddress ||
    "User";

  return (
    <div className="user-dashboard-page">
      <div className="user-dashboard-container">
        <div className="user-welcome">
          <h1>Welcome back, {displayName}!</h1>
          <p>Your Capital Grow trading account</p>
        </div>

        <div className="user-stats-grid">
          <div className="user-stat-card">
            <div className="user-stat-label">Account Balance</div>
            <div className="user-stat-value">$0.00</div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-label">Total Profit</div>
            <div className="user-stat-value">$0.00</div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-label">Active Trade</div>
            <div className="user-stat-value">$0.00</div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-label">Pending Withdrawal</div>
            <div className="user-stat-value">$0.00</div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-label">Total Deposit</div>
            <div className="user-stat-value">$0.00</div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-label">Total Withdrawal</div>
            <div className="user-stat-value">$0.00</div>
          </div>
        </div>

        <div className="user-actions">
          <button className="user-action-button">Deposit Funds</button>
          <button className="user-action-button">Withdraw Funds</button>
          <button className="user-action-button">Start Trading</button>
        </div>

        <p className="user-copyright">
          © 2018 auto-capital.ltd. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
