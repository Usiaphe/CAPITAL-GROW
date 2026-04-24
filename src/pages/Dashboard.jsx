import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import styles from '../styles/Dashboard.module.css'

const WITHDRAW_METHODS = [
  'BITCOIN',
  'ETHEREUM',
  'USDT (TRC20)',
  'USDT (ERC20)',
  'PAYPAL',
  'BANK TRANSFER',
  'CASH APP',
  'ZELLE',
  'WIRE TRANSFER',
]

export default function UserDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [kyc, setKyc] = useState(null)
  const [payments, setPayments] = useState([])
  const [messages, setMessages] = useState([])
  const [tab, setTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  const [docType, setDocType] = useState('')
  const [docFile, setDocFile] = useState(null)
  const [kycSubmitting, setKycSubmitting] = useState(false)
  const [kycMsg, setKycMsg] = useState('')

  const [depAmount, setDepAmount] = useState('')
  const [depFile, setDepFile] = useState(null)
  const [depNote, setDepNote] = useState('')
  const [depSubmitting, setDepSubmitting] = useState(false)
  const [depMsg, setDepMsg] = useState('')

  const [wFullName, setWFullName] = useState('')
  const [wEmail, setWEmail] = useState('')
  const [wMethod, setWMethod] = useState('')
  const [wMethodDetails, setWMethodDetails] = useState('')
  const [wAmount, setWAmount] = useState('')
  const [wSubmitting, setWSubmitting] = useState(false)
  const [wMsg, setWMsg] = useState('')

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { navigate('/login'); return }
      const authUser = session.user
      setUser(authUser)

      let prof = null
      for (let attempt = 0; attempt < 3; attempt++) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()
        if (data) { prof = data; break }
        if (error?.code === 'PGRST116') {
          await new Promise(r => setTimeout(r, 700))
        } else { break }
      }

      if (!prof) {
        await supabase.from('profiles').upsert(
          { id: authUser.id, email: authUser.email, full_name: authUser.user_metadata?.full_name || '', role: 'user' },
          { onConflict: 'id' }
        )
        prof = { id: authUser.id, email: authUser.email, role: 'user', investment: 0, total_earning: 0 }
      }

      const role = prof?.role?.trim?.()?.toLowerCase()
      if (role === 'admin') { navigate('/admin'); return }

      setProfile(prof)

      if (prof) {
        setWFullName(prof.full_name || '')
        setWEmail(prof.email || '')
      }

      const { data: k } = await supabase
        .from('kyc_submissions').select('*').eq('user_id', authUser.id)
        .order('submitted_at', { ascending: false }).limit(1).single()
      setKyc(k)

      const { data: p } = await supabase
        .from('payments').select('*').eq('user_id', authUser.id)
        .order('created_at', { ascending: false })
      setPayments(p || [])

      const { data: m } = await supabase
        .from('messages').select('*').eq('to_user_id', authUser.id)
        .order('created_at', { ascending: false })
      setMessages(m || [])

      setLoading(false)
    }
    init()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  async function submitKYC(e) {
    e.preventDefault()
    if (!docFile || !docType) return
    setKycSubmitting(true); setKycMsg('')
    const ext = docFile.name.split('.').pop()
    const path = `${user.id}/${Date.now()}.${ext}`
    const { error: uploadErr } = await supabase.storage.from('kyc-documents').upload(path, docFile)
    if (uploadErr) { setKycMsg('Upload failed: ' + uploadErr.message); setKycSubmitting(false); return }
    const { data: { publicUrl } } = supabase.storage.from('kyc-documents').getPublicUrl(path)
    const { error } = await supabase.from('kyc_submissions').insert({
      user_id: user.id, document_type: docType, document_url: publicUrl, status: 'under_review'
    })
    if (error) setKycMsg('Submission failed: ' + error.message)
    else {
      setKycMsg('KYC submitted! Under review.')
      const { data: k } = await supabase.from('kyc_submissions').select('*').eq('user_id', user.id).order('submitted_at', { ascending: false }).limit(1).single()
      setKyc(k)
    }
    setKycSubmitting(false)
  }

  async function submitDeposit(e) {
    e.preventDefault()
    if (!depAmount) return
    setDepSubmitting(true); setDepMsg('')
    let proofUrl = null
    if (depFile) {
      const ext = depFile.name.split('.').pop()
      const path = `${user.id}/${Date.now()}.${ext}`
      const { error: uploadErr } = await supabase.storage.from('payment-proofs').upload(path, depFile)
      if (!uploadErr) {
        const { data: { publicUrl } } = supabase.storage.from('payment-proofs').getPublicUrl(path)
        proofUrl = publicUrl
      }
    }
    const { error } = await supabase.from('payments').insert({
      user_id: user.id, type: 'deposit', amount: parseFloat(depAmount),
      proof_url: proofUrl, note: depNote, status: 'pending'
    })
    if (error) setDepMsg('Failed: ' + error.message)
    else {
      setDepMsg('Deposit request submitted successfully!')
      setDepAmount(''); setDepNote(''); setDepFile(null)
      const { data: p } = await supabase.from('payments').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      setPayments(p || [])
    }
    setDepSubmitting(false)
  }

  async function submitWithdrawal(e) {
    e.preventDefault()
    if (!wAmount || !wMethod || !wMethodDetails) return
    setWSubmitting(true); setWMsg('')
    const { error } = await supabase.from('payments').insert({
      user_id: user.id,
      type: 'withdrawal',
      amount: parseFloat(wAmount),
      note: JSON.stringify({ full_name: wFullName, email: wEmail, method: wMethod, method_details: wMethodDetails }),
      status: 'pending'
    })
    if (error) setWMsg('Failed: ' + error.message)
    else {
      setWMsg('Withdrawal order submitted! Pending admin approval.')
      setWAmount(''); setWMethodDetails(''); setWMethod('')
      const { data: p } = await supabase.from('payments').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      setPayments(p || [])
    }
    setWSubmitting(false)
  }

  function statusBadge(status) {
    const map = {
      pending: ['#F59E0B', 'Pending'],
      under_review: ['#3B82F6', 'Under Review'],
      approved: ['#10B981', 'Successful'],
      rejected: ['#EF4444', 'Rejected'],
    }
    const [color, label] = map[status] || ['#888', status]
    return <span style={{ background: color, color: '#fff', padding: '3px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>{label}</span>
  }

  function kycBadge(status) {
    const map = { pending: ['#F59E0B', 'Pending'], under_review: ['#3B82F6', 'Under Review'], approved: ['#10B981', 'Approved'], rejected: ['#EF4444', 'Rejected'] }
    const [color, label] = map[status] || ['#888', status]
    return <span style={{ background: color + '22', color, border: `1px solid ${color}44`, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{label}</span>
  }

  function parseNote(note) { try { return JSON.parse(note || '{}') } catch { return {} } }

  const withdrawals = payments.filter(p => p.type === 'withdrawal')
  const deposits = payments.filter(p => p.type === 'deposit')

  if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoIcon}>◈</span>
          <span>CAPITAL GROW</span>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{(profile?.full_name || 'U').charAt(0).toUpperCase()}</div>
          <div style={{ minWidth: 0 }}>
            <p className={styles.userName}>{profile?.full_name || 'User'}</p>
            <p className={styles.userEmail}>{profile?.email}</p>
          </div>
        </div>
        <nav className={styles.nav}>
          {[
            ['overview', '◉', 'Overview'],
            ['kyc', '🪪', 'KYC Verification'],
            ['deposit', '💰', 'Deposit'],
            ['withdraw', '💸', 'Withdrawal'],
            ['messages', '✉', `Messages${messages.filter(m => !m.read).length > 0 ? ` (${messages.filter(m => !m.read).length})` : ''}`],
          ].map(([id, icon, label]) => (
            <button key={id} className={`${styles.navItem} ${tab === id ? styles.navActive : ''}`} onClick={() => setTab(id)}>
              <span className={styles.navIcon}>{icon}</span>{label}
            </button>
          ))}
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>⏻ Sign out</button>
      </aside>

      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1 className={styles.pageTitle}>
            {tab === 'overview' && 'Overview'}
            {tab === 'kyc' && 'KYC Verification'}
            {tab === 'deposit' && 'Make Deposit'}
            {tab === 'withdraw' && 'Make Withdrawal'}
            {tab === 'messages' && 'Messages'}
          </h1>
          <span className={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        {tab === 'overview' && (
          <div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}><p className={styles.statLabel}>Investment</p><p className={styles.statValue}>${(profile?.investment || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p></div>
              <div className={styles.statCard}><p className={styles.statLabel}>Total Earnings</p><p className={styles.statValue} style={{ color: '#10B981' }}>${(profile?.total_earning || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p></div>
              <div className={styles.statCard}><p className={styles.statLabel}>KYC Status</p><div style={{ marginTop: 6 }}>{kyc ? kycBadge(kyc.status) : kycBadge('pending')}</div></div>
              <div className={styles.statCard}><p className={styles.statLabel}>Package</p><p className={styles.statValue} style={{ fontSize: 18 }}>{profile?.package || 'NONE'}</p></div>
            </div>
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Account Information</h3>
              <div className={styles.infoGrid}>
                {[['Full Name', profile?.full_name], ['Username', profile?.username || '—'], ['Email', profile?.email], ['Phone', profile?.phone || '—'], ['Country', profile?.country || '—'], ['Registered', profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '—'], ['Package', profile?.package || 'NONE'], ['Signal', profile?.signal || 'NONE']].map(([k, v]) => (
                  <div key={k} className={styles.infoRow}><span className={styles.infoKey}>{k}</span><span className={styles.infoVal}>{v}</span></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'kyc' && (
          <div>
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>KYC Verification Status</h3>
              {kyc ? (
                <div className={styles.kycStatus}>
                  <div className={styles.kycStatusRow}><span>Status:</span>{kycBadge(kyc.status)}</div>
                  <div className={styles.kycStatusRow}><span>Document Type:</span><span>{kyc.document_type}</span></div>
                  <div className={styles.kycStatusRow}><span>Submitted:</span><span>{new Date(kyc.submitted_at).toLocaleString()}</span></div>
                  {kyc.admin_note && <div className={styles.adminNote}><strong>Admin note:</strong> {kyc.admin_note}</div>}
                </div>
              ) : <p style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>No KYC submission yet. Please submit a valid ID below.</p>}
            </div>
            {(!kyc || kyc.status === 'rejected') && (
              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>Submit KYC Document</h3>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>Our support team reviews documents within 24 hours. You will be notified via email once verified.</p>
                <form onSubmit={submitKYC} className={styles.form}>
                  <div className={styles.formField}><label>Document Type</label>
                    <select value={docType} onChange={e => setDocType(e.target.value)} required>
                      <option value="">— Select Document Type —</option>
                      <option>National ID</option><option>Passport</option><option>Driver's License</option><option>Utility Bill</option>
                    </select>
                  </div>
                  <div className={styles.formField}><label>Upload Document</label><input type="file" accept="image/*,.pdf" onChange={e => setDocFile(e.target.files[0])} required /></div>
                  {kycMsg && <p className={kycMsg.includes('failed') ? styles.errorMsg : styles.successMsg}>{kycMsg}</p>}
                  <button type="submit" className={styles.btnPrimary} disabled={kycSubmitting}>{kycSubmitting ? 'Uploading…' : 'Submit for Verification'}</button>
                </form>
              </div>
            )}
          </div>
        )}

        {tab === 'deposit' && (
          <div>
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Make Deposit</h3>
              <form onSubmit={submitDeposit} className={styles.form}>
                <div className={styles.formField}>
                  <label>Amount ($) <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="number" min="1" step="0.01" placeholder="Enter amount" value={depAmount} onChange={e => setDepAmount(e.target.value)} required />
                </div>
                <div className={styles.formField}>
                  <label>Payment Proof (screenshot / receipt)</label>
                  <input type="file" accept="image/*,.pdf" onChange={e => setDepFile(e.target.files[0])} />
                </div>
                <div className={styles.formField}>
                  <label>Note (optional)</label>
                  <input type="text" placeholder="Add a note..." value={depNote} onChange={e => setDepNote(e.target.value)} />
                </div>
                {depMsg && <p className={depMsg.includes('Failed') ? styles.errorMsg : styles.successMsg}>{depMsg}</p>}
                <button type="submit" className={styles.btnPrimary} disabled={depSubmitting}>{depSubmitting ? 'Submitting…' : 'Submit Deposit'}</button>
              </form>
            </div>
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Deposit History</h3>
              {deposits.length === 0 ? <p style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>You have not made any deposit.</p> : (
                <div className={styles.historyTable}>
                  <div className={styles.historyHeader}><span>#</span><span>Amount</span><span>Date</span><span>Status</span></div>
                  {deposits.map((p, i) => (
                    <div key={p.id} className={styles.historyRow}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{i + 1}</span>
                      <span style={{ fontWeight: 600, color: '#10B981' }}>${p.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      <span style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>{new Date(p.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      <span>{statusBadge(p.status)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'withdraw' && (
          <div>
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Make Withdrawal</h3>
              <form onSubmit={submitWithdrawal} className={styles.form}>

                <div className={styles.formField}>
                  <label>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" placeholder="Your full name" value={wFullName} onChange={e => setWFullName(e.target.value)} required />
                </div>

                <div className={styles.formField}>
                  <label>Email <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="email" placeholder="your@email.com" value={wEmail} onChange={e => setWEmail(e.target.value)} required />
                </div>

                <div className={styles.formField}>
                  <label>Withdrawal Method <span style={{ color: '#ef4444' }}>*</span></label>
                  <select value={wMethod} onChange={e => { setWMethod(e.target.value); setWMethodDetails('') }} required>
                    <option value="">— Select Withdrawal Method —</option>
                    {WITHDRAW_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {wMethod && (
                  <div className={styles.formField}>
                    <label>
                      Method Details <span style={{ color: '#ef4444' }}>*</span>
                      <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400, fontSize: 11, marginLeft: 6 }}>
                        {['BITCOIN','ETHEREUM','USDT (TRC20)','USDT (ERC20)'].includes(wMethod) ? '(wallet address)'
                          : wMethod === 'PAYPAL' ? '(PayPal email / username)'
                          : wMethod === 'CASH APP' ? '($cashtag)'
                          : wMethod === 'ZELLE' ? '(phone number or email)'
                          : '(account number / routing)'}
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        ['BITCOIN','ETHEREUM','USDT (TRC20)','USDT (ERC20)'].includes(wMethod)
                          ? 'e.g. bc1qqgxff3sfzfu2p8eg9q6lh9v3wx24xgv2juwx96'
                          : wMethod === 'PAYPAL' ? 'e.g. adamjgreen43@gmail.com'
                          : wMethod === 'CASH APP' ? 'e.g. $adamgreen'
                          : 'Enter your account details...'
                      }
                      value={wMethodDetails}
                      onChange={e => setWMethodDetails(e.target.value)}
                      required
                      className={styles.textarea}
                    />
                  </div>
                )}

                <div className={styles.formField}>
                  <label>Amount ($) <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="number" min="1" step="0.01" placeholder="0.00" value={wAmount} onChange={e => setWAmount(e.target.value)} required />
                </div>

                {wMsg && <p className={wMsg.includes('Failed') ? styles.errorMsg : styles.successMsg}>{wMsg}</p>}

                <button type="submit" className={styles.withdrawBtn} disabled={wSubmitting}>
                  {wSubmitting ? 'Submitting…' : 'WITHDRAW ORDER'}
                </button>
              </form>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Withdrawal History</h3>
              {withdrawals.length === 0 ? (
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>You have not made any withdrawal.</p>
              ) : (
                <div className={styles.historyTable}>
                  <div className={`${styles.historyHeader} ${styles.withdrawHeader}`}>
                    <span>#</span><span>Withdrawal Gateway</span><span>Amount</span><span>Date</span><span>Status</span>
                  </div>
                  {withdrawals.map((p, i) => {
                    const info = parseNote(p.note)
                    return (
                      <div key={p.id} className={`${styles.historyRow} ${styles.withdrawRow}`}>
                        <span style={{ color: 'var(--color-text-secondary)' }}>{i + 1}</span>
                        <span style={{ fontWeight: 600, color: '#10B981' }}>{info.method || '—'}</span>
                        <span style={{ fontWeight: 600 }}>${p.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>{new Date(p.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span>{statusBadge(p.status)}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div>
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Inbox</h3>
              {messages.length === 0 ? <p style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>No messages yet.</p> : (
                messages.map(msg => (
                  <div key={msg.id} className={`${styles.messageItem} ${!msg.read ? styles.unread : ''}`}
                    onClick={async () => {
                      await supabase.from('messages').update({ read: true }).eq('id', msg.id)
                      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m))
                    }}>
                    <div className={styles.msgHeader}>
                      <span className={styles.msgSubject}>{msg.subject}</span>
                      <span className={styles.msgDate}>{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className={styles.msgBody}>{msg.body}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}