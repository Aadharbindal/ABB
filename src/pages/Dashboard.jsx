import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Map, Bell, Activity, History, 
  Wind, Zap, Droplets, Search, Maximize, AlertTriangle, 
  Cpu, CheckCircle2, Wrench, RefreshCw, Power, Link,
  TrendingUp, AlertOctagon, BatteryCharging, Target, ShieldAlert,
  ArrowUp, ArrowDown
} from 'lucide-react';

export default function Dashboard() {
  const [time, setTime] = useState(new Date().toUTCString());
  const [uptime, setUptime] = useState('942:48:44:12');
  const [buildHash, setBuildHash] = useState('');

  // Map scatter dots generation for realistic factory floor look
  const activeNodes = [
    { top: '20%', left: '15%' }, { top: '35%', left: '25%' }, { top: '15%', left: '45%' },
    { top: '50%', left: '10%' }, { top: '45%', left: '35%' }, { top: '25%', left: '70%' },
    { top: '60%', left: '20%' }, { top: '80%', left: '15%' }, { top: '75%', left: '40%' },
    { top: '85%', left: '60%' }, { top: '55%', left: '80%' }, { top: '30%', left: '85%' },
    { top: '15%', left: '90%' }, { top: '40%', left: '60%' }, { top: '70%', left: '90%' }
  ];

  useEffect(() => {
    setBuildHash('#' + Math.random().toString(16).substr(2, 7));

    const timer = setInterval(() => {
      setTime(new Date().toUTCString());
    }, 1000);

    const upTimer = setInterval(() => {
      setUptime(prev => {
        let parts = prev.split(':').map(Number);
        parts[3]++;
        if (parts[3] > 59) { parts[3] = 0; parts[2]++; }
        if (parts[2] > 59) { parts[2] = 0; parts[1]++; }
        if (parts[1] > 23) { parts[1] = 0; parts[0]++; }
        return parts.map(p => p.toString().padStart(2, '0')).join(':');
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(upTimer);
    };
  }, []);

  return (
    <div className="dense-dashboard-container">
      <div className="vignette-overlay"></div>
      
      {/* LEFT SIDE PANEL (Consolidated & Dense) */}
      <aside className="dense-sidebar">
        <div className="sidebar-scroll-area">
          {/* Top Stack: System Core & Boot Sequence */}
          <div className="sidebar-module">
          <div className="module-header">SYSTEM CORE</div>
          <div className="core-stats">
            <div className="core-row"><span>UP:</span> <span className="cyan-text">{uptime}</span></div>
            <div className="core-row"><span>BLD:</span> <span>{buildHash}</span></div>
            <div className="core-row"><span>INT:</span> <span className="green-text breathing-glow">PASSED</span></div>
          </div>
        </div>

        <div className="sidebar-module">
          <div className="module-header">BOOT SEQUENCE</div>
          <div className="boot-terminal">
            <p>&gt; Kernel init... OK</p>
            <p>&gt; Mounting FS... OK</p>
            <p className="green-text">&gt; Grid synced.</p>
          </div>
        </div>

        {/* Middle Stack: Navigation */}
        <div className="sidebar-module nav-module">
          <div className="module-header">OPERATOR VIEW</div>
          <nav className="dense-nav">
            <div className="nav-item active"><LayoutDashboard size={14} /> Dashboard</div>
            <div className="nav-item"><Map size={14} /> Plant Layout</div>
            <div className="nav-item">
              <Bell size={14} /> Alarms
              <span className="cyber-badge red-badge" style={{ marginLeft: 'auto' }}>3</span>
            </div>
            <div className="nav-item"><Activity size={14} /> System Health</div>
            <div className="nav-item"><History size={14} /> History Log</div>
          </nav>
        </div>

        <div className="sidebar-module nav-module">
          <div className="module-header">SUBSYSTEMS</div>
          <nav className="dense-nav">
            <div className="nav-item"><Wind size={14} /> HVAC Control</div>
            <div className="nav-item"><Zap size={14} /> Power Grid</div>
            <div className="nav-item"><Droplets size={14} /> Fluid Dynamics</div>
          </nav>
        </div>
        </div>

        {/* Bottom Stack: Profile */}
        <div className="dense-profile">
          <img src="/profile.png" className="avatar-micro" alt="Alex Vance" />
          <div className="profile-text">
            <span className="name">Alex Vance</span>
            <span className="role">Lead Operator - Shift B</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="dense-main">
        
        {/* COMPACT HEADER */}
        <header className="dense-header">
          <div className="header-brand">
            <LayoutDashboard className="cyan-glow" size={16} />
            <span className="brand-text">CONTROL GRID</span>
          </div>
          
          <div className="header-center">
            <span className="status-dot green-glow"></span>
            <span>SYS: ONLINE</span>
            <span className="separator">|</span>
            <span className="clock">{time}</span>
            <span className="separator">|</span>
            <span className="latency">LATENCY: <span className="green-text">12ms</span></span>
          </div>
          
          <div className="header-right">
            <div className="dense-search">
              <Search size={14} className="cyan-text" />
              <input type="text" placeholder="Search grid..." />
            </div>
          </div>
        </header>

        {/* DENSE CONTENT GRID */}
        <div className="dense-content-grid">
          <div className="scroll-wrapper">
            
            {/* Top: Smart Alert */}
            <div className="dense-panel alert-panel">
              <div className="alert-left">
                <ShieldAlert size={24} className="alert-icon" />
                <div className="alert-text">
                  <div className="alert-title">
                    SMART ALERT: Root Cause Identified <span className="tag-critical">CRITICAL</span>
                  </div>
                  <div className="alert-desc">
                    Motor C (Zone 4) overheating (142°C). Predictive failure: <span className="text-red font-bold">14 mins</span>. [AI Conf: 98% | 42 alarms suppressed]
                  </div>
                </div>
              </div>
              <div className="alert-right">
                <button className="dense-btn">ACKNOWLEDGE</button>
                <button className="dense-btn btn-danger pulse-emergency"><Power size={14}/> EMERGENCY SHUTDOWN</button>
              </div>
            </div>

            {/* Middle: Map & Resolution Log */}
            <div className="middle-row">
              
              {/* Seamless Map */}
              <div className="dense-panel map-panel">
                <div className="panel-label">FACILITY OVERVIEW // 2D SCHEMATIC</div>
                <div className="map-seamless-container">
                  <div className="grid-overlay"></div>
                  
                  {/* Dim Active Nodes */}
                  {activeNodes.map((pos, i) => (
                    <div key={i} className="map-node node-dim" style={{ top: pos.top, left: pos.left }}></div>
                  ))}

                  {/* Node Critical (Motor C) */}
                  <div className="map-node node-critical" style={{ top: '65%', left: '55%' }}>
                    <div className="ping-ring ring-1"></div>
                    <div className="ping-ring ring-2"></div>
                    <div className="ping-ring ring-3"></div>
                    <div className="cyber-popover">
                      <div className="popover-header"><span className="text-red">Motor C</span></div>
                      <div className="popover-body">T: 142°C | V: 4.2mm/s</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolution Log */}
              <div className="dense-panel log-panel">
                <div className="panel-label flex-between">
                  <span>RESOLUTION LOG</span>
                  <span className="cyan-text cursor-pointer">VIEW ALL</span>
                </div>
                <div className="log-scroll-area">
                  <div className="dense-log-list">
                    <div className="dense-log-item">
                      <CheckCircle2 size={16} className="log-icon-green" />
                      <div className="log-details">
                        <div className="log-title">Valve B Recalibrated</div>
                        <div className="log-meta">10m ago • Auto</div>
                      </div>
                    </div>
                    <div className="dense-log-item">
                      <Wrench size={16} className="log-icon-cyan" />
                      <div className="log-details">
                        <div className="log-title">Filter Replacement Z2</div>
                        <div className="log-meta">45m ago • M. Chen</div>
                      </div>
                    </div>
                    <div className="dense-log-item">
                      <RefreshCw size={16} className="log-icon-gray" />
                      <div className="log-details">
                        <div className="log-title">Sync Restored</div>
                        <div className="log-meta">2h ago • IT Dept</div>
                      </div>
                    </div>
                    <div className="dense-log-item">
                      <Activity size={16} className="log-icon-gray" />
                      <div className="log-details">
                        <div className="log-title">Daily Diagnostics</div>
                        <div className="log-meta">6h ago • System</div>
                      </div>
                    </div>
                    <div className="dense-log-item">
                      <CheckCircle2 size={16} className="log-icon-gray" />
                      <div className="log-details">
                        <div className="log-title">Ventilation Check</div>
                        <div className="log-meta">8h ago • System</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Bottom Strip: Stats & Quick Commands */}
            <div className="bottom-strip">
              
              {/* Quick Commands */}
              <div className="dense-panel quick-commands">
                <div className="panel-label">QUICK CMDS</div>
                <div className="cmd-grid">
                  <button className="cmd-tile">
                    <RefreshCw size={18} className="cmd-icon cyan-text" />
                    <span>RESTART SEQ</span>
                  </button>
                  <button className="cmd-tile">
                    <Wrench size={18} className="cmd-icon cyan-text" />
                    <span>VALVE OVR</span>
                  </button>
                  <button className="cmd-tile">
                    <Droplets size={18} className="cmd-icon cyan-text" />
                    <span>PUMP FLUSH</span>
                  </button>
                  <button className="cmd-tile tile-warning">
                    <Power size={18} className="cmd-icon yellow-text" />
                    <span className="yellow-text">LOCKOUT</span>
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="dense-panel stat-card">
                <div className="stat-label"><TrendingUp size={14}/> OEE</div>
                <div className="stat-value-container">
                  <span className="stat-number">92.4</span>
                  <span className="stat-symbol">%</span>
                </div>
                <div className="stat-trend green-text"><ArrowUp size={10}/> 1.2%</div>
              </div>

              <div className="dense-panel stat-card alert-stat">
                <div className="stat-label"><AlertOctagon size={14}/> ALARMS</div>
                <div className="stat-value-container text-red">
                  <span className="stat-number">3</span>
                </div>
                <div className="stat-trend text-red">Critical</div>
              </div>

              <div className="dense-panel stat-card">
                <div className="stat-label"><BatteryCharging size={14}/> ENERGY</div>
                <div className="stat-value-container">
                  <span className="stat-number">420</span>
                  <span className="stat-symbol">kW</span>
                </div>
                <div className="stat-trend cyan-text"><ArrowDown size={10}/> 5.4%</div>
              </div>

              <div className="dense-panel stat-card">
                <div className="stat-label"><Target size={14}/> YIELD</div>
                <div className="stat-value-container">
                  <span className="stat-number">98.1</span>
                  <span className="stat-symbol">%</span>
                </div>
                <div className="stat-trend green-text">Optimal</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
