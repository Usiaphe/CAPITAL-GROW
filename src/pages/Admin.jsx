import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Admin.module.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [kycList, setKycList] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editMsg, setEditMsg] = useState("");

  const [msgTarget, setMsgTarget] = useState("");
  const [msgSubject, setMsgSubject] = useState("");
  const [msgBody, setMsgBody] = useState("");
  const [msgSending, setMsgSending] = useState(false);
  const [msgResult, setMsgResult] = useState("");

  useEffect(() => {
    async function init() {
      // 1. Check session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      console.log("Session:", session);
      console.log("Session error:", sessionError);

      if (!session) {
        console.log("No session, redirecting to login");
        navigate("/login");
        return;
      }

      // 2. Fetch profile with retries
      let prof = null;
      for (let attempt = 0; attempt < 5; attempt++) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        console.log(`Attempt ${attempt + 1} - Profile:`, data, "Error:", error);

        if (data) {
          prof = data;
          break;
        }

        if (error?.code === "PGRST116") {
          // Row not found yet, wait and retry
          await new Promise((r) => setTimeout(r, 800));
        } else {
          console.error("Profile fetch failed:", error);
          break;
        }
      }

      console.log("Final profile:", prof);
      console.log("Role:", prof?.role);

      // 3. Check role
      if (!prof) {
        console.log("No profile found, redirecting to login");
        navigate("/login");
        return;
      }

      const role = prof?.role?.trim?.()?.toLowerCase();
      console.log("Trimmed role:", role);

      if (role !== "admin") {
        console.log("Not admin, redirecting to dashboard");
        navigate("/dashboard");
        return;
      }

      // 4. Load data
      setAdmin(prof);
      await loadAll();
      setLoading(false);
    }
    init();
  }, []);

  async function loadAll() {
    const { data: u, error: uError } = await supabase
      .from("profiles")
      .select("*")
      .neq("role", "admin")
      .order("created_at", { ascending: false });
    console.log("Users loaded:", u, uError);
    setUsers(u || []);

    const { data: k, error: kError } = await supabase
      .from("kyc_submissions")
      .select("*, profiles(full_name, email)")
      .order("submitted_at", { ascending: false });
    console.log("KYC loaded:", k, kError);
    setKycList(k || []);

    const { data: p, error: pError } = await supabase
      .from("payments")
      .select("*, profiles(full_name, email)")
      .order("created_at", { ascending: false });
    console.log("Payments loaded:", p, pError);
    setPayments(p || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  async function updateKYC(id, status, note = "") {
    await supabase
      .from("kyc_submissions")
      .update({
        status,
        admin_note: note,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);
    await loadAll();
  }

  async function updatePayment(id, status) {
    await supabase
      .from("payments")
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq("id", id);
    await loadAll();
  }

  function openEditUser(user) {
    setSelectedUser(user);
    setEditForm({ ...user });
    setEditMsg("");
  }

  async function saveUser(e) {
    e.preventDefault();
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: editForm.full_name,
        username: editForm.username,
        phone: editForm.phone,
        country: editForm.country,
        package: editForm.package,
        signal: editForm.signal,
        investment: parseFloat(editForm.investment) || 0,
        total_earning: parseFloat(editForm.total_earning) || 0,
        role: editForm.role,
      })
      .eq("id", editForm.id);

    if (error) {
      setEditMsg("Error: " + error.message);
    } else {
      setEditMsg("User updated successfully!");
      await loadAll();
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!msgTarget || !msgSubject || !msgBody) return;
    setMsgSending(true);
    const { error } = await supabase.from("messages").insert({
      from_admin_id: admin.id,
      to_user_id: msgTarget,
      subject: msgSubject,
      body: msgBody,
    });
    if (error) setMsgResult("Failed: " + error.message);
    else {
      setMsgResult("Message sent!");
      setMsgSubject("");
      setMsgBody("");
    }
    setMsgSending(false);
  }

  function statusBadge(status, small = false) {
    const map = {
      pending: ["#F59E0B", "Pending"],
      under_review: ["#3B82F6", "Under Review"],
      approved: ["#10B981", "Approved"],
      rejected: ["#EF4444", "Rejected"],
    };
    const [color, label] = map[status] || ["#888", status];
    const sz = small ? 11 : 12;
    return (
      <span
        style={{
          background: color + "22",
          color,
          border: `1px solid ${color}44`,
          padding: small ? "2px 7px" : "3px 10px",
          borderRadius: 20,
          fontSize: sz,
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    );
  }

  if (loading)
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoIcon}>◈</span>
          <span>CAPITAL GROW</span>
        </div>
        <div className={styles.adminBadge}>Admin Panel</div>

        <nav className={styles.nav}>
          {[
            ["users", "👥", `Users (${users.length})`],
            [
              "kyc",
              "🪪",
              `KYC (${kycList.filter((k) => k.status === "under_review").length} pending)`,
            ],
            [
              "payments",
              "💳",
              `Payments (${payments.filter((p) => p.status === "pending").length} pending)`,
            ],
            ["messages", "✉", "Send Message"],
          ].map(([id, icon, label]) => (
            <button
              key={id}
              className={`${styles.navItem} ${tab === id ? styles.navActive : ""}`}
              onClick={() => {
                setTab(id);
                setSelectedUser(null);
              }}
            >
              <span className={styles.navIcon}>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className={styles.adminInfo}>
          <p style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
            Signed in as
          </p>
          <p style={{ fontSize: 13, fontWeight: 500 }}>
            {admin?.full_name || admin?.email}
          </p>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          ⏻ Sign out
        </button>
      </aside>

      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1 className={styles.pageTitle}>
            {tab === "users" &&
              (selectedUser ? `Edit: ${selectedUser.full_name}` : "All Users")}
            {tab === "kyc" && "KYC Verifications"}
            {tab === "payments" && "Payment Requests"}
            {tab === "messages" && "Send Message"}
          </h1>
          {selectedUser && (
            <button
              className={styles.backBtn}
              onClick={() => setSelectedUser(null)}
            >
              ← Back to users
            </button>
          )}
        </div>

        {!selectedUser && (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Total Users</p>
              <p className={styles.statValue}>{users.length}</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Pending KYC</p>
              <p className={styles.statValue} style={{ color: "#3B82F6" }}>
                {kycList.filter((k) => k.status === "under_review").length}
              </p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Pending Payments</p>
              <p className={styles.statValue} style={{ color: "#F59E0B" }}>
                {payments.filter((p) => p.status === "pending").length}
              </p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Approved KYC</p>
              <p className={styles.statValue} style={{ color: "#10B981" }}>
                {kycList.filter((k) => k.status === "approved").length}
              </p>
            </div>
          </div>
        )}

        {tab === "users" && !selectedUser && (
          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Investment</th>
                    <th>Earnings</th>
                    <th>Package</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          textAlign: "center",
                          color: "var(--color-text-secondary)",
                          padding: 32,
                        }}
                      >
                        No users yet
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <div className={styles.miniAvatar}>
                              {(u.full_name || "U").charAt(0).toUpperCase()}
                            </div>
                            <span style={{ fontWeight: 500 }}>
                              {u.full_name || "—"}
                            </span>
                          </div>
                        </td>
                        <td style={{ color: "var(--color-text-info)" }}>
                          {u.email}
                        </td>
                        <td>{u.phone || "—"}</td>
                        <td>${(u.investment || 0).toLocaleString()}</td>
                        <td style={{ color: "#10B981" }}>
                          ${(u.total_earning || 0).toLocaleString()}
                        </td>
                        <td>{u.package || "NONE"}</td>
                        <td>
                          <button
                            className={styles.editBtn}
                            onClick={() => openEditUser(u)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "users" && selectedUser && (
          <div className={styles.editCard}>
            <form onSubmit={saveUser} className={styles.form}>
              <div className={styles.formGrid}>
                {[
                  ["full_name", "Full Name", "text"],
                  ["username", "Username", "text"],
                  ["phone", "Phone", "text"],
                  ["country", "Country", "text"],
                  ["investment", "Investment ($)", "number"],
                  ["total_earning", "Total Earnings ($)", "number"],
                ].map(([key, label, type]) => (
                  <div key={key} className={styles.formField}>
                    <label>{label}</label>
                    <input
                      type={type}
                      value={editForm[key] || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
                <div className={styles.formField}>
                  <label>Package</label>
                  <select
                    value={editForm.package || "NONE"}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        package: e.target.value,
                      }))
                    }
                  >
                    {[
                      "NONE",
                      "STARTER",
                      "BASIC",
                      "STANDARD",
                      "PREMIUM",
                      "VIP",
                    ].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formField}>
                  <label>Signal</label>
                  <select
                    value={editForm.signal || "NONE"}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        signal: e.target.value,
                      }))
                    }
                  >
                    {["NONE", "BASIC", "PRO", "ELITE"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formField}>
                  <label>Role</label>
                  <select
                    value={editForm.role || "user"}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, role: e.target.value }))
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              {editMsg && (
                <p
                  className={
                    editMsg.includes("Error")
                      ? styles.errorMsg
                      : styles.successMsg
                  }
                >
                  {editMsg}
                </p>
              )}
              <button type="submit" className={styles.btnPrimary}>
                Save Changes
              </button>
            </form>
          </div>
        )}

        {tab === "kyc" && (
          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Document</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {kycList.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          textAlign: "center",
                          color: "var(--color-text-secondary)",
                          padding: 32,
                        }}
                      >
                        No KYC submissions yet
                      </td>
                    </tr>
                  ) : (
                    kycList.map((k) => (
                      <tr key={k.id}>
                        <td style={{ fontWeight: 500 }}>
                          {k.profiles?.full_name || "—"}
                        </td>
                        <td style={{ color: "var(--color-text-info)" }}>
                          {k.profiles?.email}
                        </td>
                        <td>{k.document_type}</td>
                        <td>{statusBadge(k.status)}</td>
                        <td
                          style={{
                            fontSize: 12,
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {new Date(k.submitted_at).toLocaleDateString()}
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              gap: 6,
                              flexWrap: "wrap",
                            }}
                          >
                            {k.document_url && (
                              <a
                                href={k.document_url}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.viewBtn}
                              >
                                View Doc
                              </a>
                            )}
                            {k.status !== "approved" && (
                              <button
                                className={styles.approveBtn}
                                onClick={() => updateKYC(k.id, "approved")}
                              >
                                Approve
                              </button>
                            )}
                            {k.status !== "rejected" && (
                              <button
                                className={styles.rejectBtn}
                                onClick={() => {
                                  const note = prompt(
                                    "Rejection reason (optional):",
                                  );
                                  updateKYC(k.id, "rejected", note || "");
                                }}
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "payments" && (
          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Note</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        style={{
                          textAlign: "center",
                          color: "var(--color-text-secondary)",
                          padding: 32,
                        }}
                      >
                        No payments yet
                      </td>
                    </tr>
                  ) : (
                    payments.map((p) => {
                      let wInfo = {};
                      if (p.type === "withdrawal") {
                        try {
                          wInfo = JSON.parse(p.note || "{}");
                        } catch {}
                      }
                      return (
                        <tr key={p.id}>
                          <td style={{ fontWeight: 500 }}>
                            {p.profiles?.full_name || "—"}
                          </td>
                          <td
                            style={{
                              color: "var(--color-text-info)",
                              fontSize: 12,
                            }}
                          >
                            {p.profiles?.email}
                          </td>
                          <td
                            style={{
                              textTransform: "capitalize",
                              fontWeight: 500,
                              color:
                                p.type === "deposit" ? "#10B981" : "#EF4444",
                            }}
                          >
                            {p.type}
                          </td>
                          <td style={{ fontWeight: 600 }}>
                            ${p.amount.toLocaleString()}
                          </td>
                          <td>{statusBadge(p.status, true)}</td>
                          <td
                            style={{
                              fontSize: 12,
                              color: "var(--color-text-secondary)",
                              maxWidth: 180,
                            }}
                          >
                            {p.type === "withdrawal" ? (
                              <div>
                                <div
                                  style={{ fontWeight: 600, color: "#10B981" }}
                                >
                                  {wInfo.method || "—"}
                                </div>
                                <div
                                  style={{
                                    wordBreak: "break-all",
                                    marginTop: 2,
                                  }}
                                >
                                  {wInfo.method_details || "—"}
                                </div>
                              </div>
                            ) : (
                              p.note || "—"
                            )}
                          </td>
                          <td
                            style={{
                              fontSize: 12,
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {new Date(p.created_at).toLocaleDateString()}
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: 6 }}>
                              {p.proof_url && (
                                <a
                                  href={p.proof_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={styles.viewBtn}
                                >
                                  Proof
                                </a>
                              )}
                              {p.status === "pending" && (
                                <>
                                  <button
                                    className={styles.approveBtn}
                                    onClick={() =>
                                      updatePayment(p.id, "approved")
                                    }
                                  >
                                    Approve
                                  </button>
                                  <button
                                    className={styles.rejectBtn}
                                    onClick={() =>
                                      updatePayment(p.id, "rejected")
                                    }
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div className={styles.editCard}>
            <form onSubmit={sendMessage} className={styles.form}>
              <div className={styles.formField}>
                <label>Send To</label>
                <select
                  value={msgTarget}
                  onChange={(e) => setMsgTarget(e.target.value)}
                  required
                >
                  <option value="">— Select User —</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.full_name || u.email} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formField}>
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Message subject..."
                  value={msgSubject}
                  onChange={(e) => setMsgSubject(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formField}>
                <label>Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  value={msgBody}
                  onChange={(e) => setMsgBody(e.target.value)}
                  required
                  style={{
                    resize: "vertical",
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "0.5px solid var(--color-border-secondary)",
                    background: "var(--color-background-primary)",
                    color: "var(--color-text-primary)",
                    fontSize: 14,
                  }}
                />
              </div>
              {msgResult && (
                <p
                  className={
                    msgResult.includes("Failed")
                      ? styles.errorMsg
                      : styles.successMsg
                  }
                >
                  {msgResult}
                </p>
              )}
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={msgSending}
              >
                {msgSending ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
