import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Eye, EyeOff, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('System Engineer');
  const [showPassword, setShowPassword] = useState(false);
  const [operatorId, setOperatorId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [buildHash, setBuildHash] = useState('');

  // Uptime counter
  const [uptime, setUptime] = useState('942:48:44:12');

  useEffect(() => {
    // Generate random build hash on mount
    setBuildHash('#' + Math.random().toString(16).substr(2, 7));

    // Uptime interval
    const interval = setInterval(() => {
      setUptime(prev => {
        let parts = prev.split(':').map(Number);
        parts[3]++;
        if (parts[3] > 59) { parts[3] = 0; parts[2]++; }
        if (parts[2] > 59) { parts[2] = 0; parts[1]++; }
        if (parts[1] > 23) { parts[1] = 0; parts[0]++; }
        return parts.map(p => p.toString().padStart(2, '0')).join(':');
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerGridEntry = () => {
    setIsEntering(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000); // Wait for the zoom-in animation
  };

  const handleLogin = (e) => {
    e.preventDefault();
    triggerGridEntry();
  };

  const handleBiometric = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScanComplete(true);
      setTimeout(() => {
        triggerGridEntry();
      }, 500); // Slight delay after verification before zooming in
    }, 2500); // 2.5s scanning effect
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const isGuest = role === 'Guest / Judge';
  const isIntegrityPassed = operatorId.length > 0;

  return (
    <div className={`login-container ${isEntering ? 'entering-grid' : ''}`}>
      {/* LEFT COLUMN: System Core */}
      <div className="login-col left-col">
        <div className="panel system-core">
          <div className="panel-header">
            <h3>SYSTEM CORE</h3>
            <div className="status-dot"></div>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">UPTIME</span>
              <span className="stat-value">{uptime}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">BUILD HASH</span>
              <span className="stat-value">{buildHash}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">ENVIRONMENT</span>
              <span className="stat-value cyan-text">PRODUCTION</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">INTEGRITY</span>
              {isIntegrityPassed ? (
                <span className="stat-value green-text">PASSED</span>
              ) : (
                <span className="stat-value yellow-text">VERIFYING...</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="panel boot-sequence">
          <div className="panel-header">
            <h3>BOOT SEQUENCE</h3>
          </div>
          <div className="terminal-text">
            <p>&gt; Initializing kernel...</p>
            <p>&gt; Loading modules... OK</p>
            <p>&gt; Mounting filesystems... OK</p>
            {isIntegrityPassed && <p className="green-text">&gt; Integrity checks passed.</p>}
            <p className="blink">&gt; Awaiting handshake_</p>
          </div>
        </div>
      </div>

      {/* MIDDLE COLUMN: Sphere */}
      <div className="login-col middle-col">
        <div className={`sphere-container ${isEntering ? 'zoom-active' : ''}`}>
          <div className="wireframe-sphere"></div>
          <div className="sphere-text">
            <h2>CONTROL GRID</h2>
            <p className="subtitle">
              {isEntering ? 'HANDSHAKE ESTABLISHED' : 'AWAITING HANDSHAKE'}
            </p>
          </div>
          <div className="temp-badge">
            TEMP: <span className="yellow-text">NOMINAL</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Login Form */}
      <div className="login-col right-col">
        <div className="panel login-panel">
          <div className="auth-header">
            <Fingerprint className="fingerprint-icon" size={48} />
            <h2>OPERATOR IDENTITY</h2>
            <p>Please authenticate to access the grid.</p>
          </div>

          <div className="quick-access-buttons">
            <button className="sso-btn" type="button" title="Corporate ID compatible">
              <ShieldCheck size={18} /> SSO BADGE LOGIN
            </button>
            <button 
              type="button" 
              className={`prominent-scan-btn ${isScanning ? 'scanning' : ''} ${scanComplete ? 'success' : ''}`}
              onClick={handleBiometric}
              disabled={isScanning || scanComplete}
            >
              <Fingerprint size={18} />
              {scanComplete ? 'VERIFIED' : isScanning ? 'VERIFYING BIOMETRICS...' : 'SCAN FINGERPRINT'}
            </button>
          </div>

          <div className="divider">
            <span>OR MANUAL OVERRIDE</span>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>ROLE SELECTOR</label>
              <select className="cyber-input" value={role} onChange={handleRoleChange}>
                <option value="Admin">Admin (Full Access)</option>
                <option value="System Engineer">System Engineer</option>
                <option value="Operator">Operator (Shift-level)</option>
                <option value="Guest / Judge">Guest / Judge (View-only)</option>
              </select>
            </div>

            <div className="form-group">
              <label>OPERATOR ID / EMAIL</label>
              <input 
                type="text" 
                className="cyber-input" 
                placeholder="Enter ID string..." 
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                required={!isGuest}
              />
            </div>

            <div className="form-group">
              <label>ACCESS CODE</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="cyber-input" 
                  placeholder={isGuest ? "Not required for Guest" : "••••••••••••"} 
                  required={!isGuest}
                  disabled={isGuest}
                />
                {!isGuest && (
                  <button 
                    type="button" 
                    className="eye-btn" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
              </div>
            </div>

            <div className="mfa-row">
              <label>REQUIRE MFA PROTOCOL</label>
              <div className="toggle-switch">
                <input type="checkbox" id="mfa" defaultChecked />
                <label htmlFor="mfa"></label>
              </div>
            </div>

            <div className="action-buttons">
              <button type="submit" className="enter-btn">
                ENTER CONTROL GRID <ChevronRight size={18} />
              </button>
            </div>
          </form>

          {isScanning && (
            <div className="scan-overlay">
              <div className="scanner-line"></div>
              <Fingerprint className="large-fingerprint" size={80} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
