import { useState, useEffect } from 'react';
import { Icon, IC } from '../components/dashboard/Icons';
import api from '../lib/api';

export default function Settings() {
  const [settings, setSettings] = useState({
    preferred_sprint_duration: 25,
    short_break_duration: 5,
    long_break_duration: 15,
    sprints_before_long_break: 4,
    daily_target_minutes: 120,
    weekly_target_minutes: 600,
    default_ambient_sound: 'none',
    default_ambient_volume: 50,
    sound_effects_enabled: true,
    theme: 'dark',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // Load settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        setSettings(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading settings:', err);
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/settings', settings);
      setMessage('✓ Settings saved successfully!');
      setHasChanges(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('✗ Error saving settings');
      console.error(err);
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all settings to defaults?')) return;
    
    setSaving(true);
    try {
      await api.post('/settings/reset');
      const { data } = await api.get('/settings');
      setSettings(data);
      setMessage('✓ Settings reset to defaults!');
      setHasChanges(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('✗ Error resetting settings');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        color: '#e2e8f0',
        minHeight: '100vh',
        padding: '20px 24px 32px',
        background: '#0f1117',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ color: '#2dd4bf', fontSize: 16 }}>Loading settings...</div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      color: '#e2e8f0',
      minHeight: '100vh',
      padding: '20px 24px 32px',
      background: '#0f1117',
    }}>
      {/* HEADER */}
      <div style={{ marginBottom: 32, maxWidth: 900, margin: '0 auto 32px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', margin: '0 0 8px 0' }}>Settings</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
          Customize your focus experience
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* FOCUS SESSION */}
          <SettingsCard title="Focus Session" description="Configure your Pomodoro timer">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <SettingInput
                label="Sprint Duration"
                value={settings.preferred_sprint_duration}
                onChange={(val) => handleChange('preferred_sprint_duration', val)}
                min={5}
                max={60}
                unit="minutes"
                description="Length of each focus session"
              />
              <SettingInput
                label="Short Break"
                value={settings.short_break_duration}
                onChange={(val) => handleChange('short_break_duration', val)}
                min={1}
                max={30}
                unit="minutes"
                description="Quick break between sprints"
              />
              <SettingInput
                label="Long Break"
                value={settings.long_break_duration}
                onChange={(val) => handleChange('long_break_duration', val)}
                min={5}
                max={60}
                unit="minutes"
                description="Extended break after long sprint cycles"
              />
              <SettingInput
                label="Sprints Before Long Break"
                value={settings.sprints_before_long_break}
                onChange={(val) => handleChange('sprints_before_long_break', val)}
                min={2}
                max={10}
                unit=""
                description="Number of sprints before taking a long break"
              />
            </div>
          </SettingsCard>

          {/* DAILY GOALS */}
          <SettingsCard title="Daily Goals" description="Set your focus targets">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <SettingInput
                label="Daily Target"
                value={settings.daily_target_minutes}
                onChange={(val) => handleChange('daily_target_minutes', val)}
                min={30}
                max={480}
                unit="minutes"
                description="Your daily focus goal"
              />
              <SettingInput
                label="Weekly Target"
                value={settings.weekly_target_minutes}
                onChange={(val) => handleChange('weekly_target_minutes', val)}
                min={100}
                max={2400}
                unit="minutes"
                description="Your weekly focus goal"
              />
            </div>
          </SettingsCard>

          {/* AUDIO SETTINGS */}
          <SettingsCard title="Audio" description="Customize sound settings">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <SettingSelect
                label="Default Ambient Sound"
                value={settings.default_ambient_sound}
                onChange={(val) => handleChange('default_ambient_sound', val)}
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'rain', label: 'Deep Rain' },
                  { value: 'birds', label: 'Forest Birds' },
                  { value: 'noise', label: 'White Noise' },
                  { value: 'lofi', label: 'Lo-Fi Beats' },
                ]}
                description="Background sound played during sessions"
              />
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <label style={{ fontSize: 14, fontWeight: 600, color: '#fff', display: 'block', marginBottom: 4 }}>
                      Default Volume
                    </label>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                      Initial volume level for ambient sounds
                    </p>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#2dd4bf' }}>
                    {settings.default_ambient_volume}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={settings.default_ambient_volume}
                  onChange={(e) => handleChange('default_ambient_volume', Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 3,
                    background: `linear-gradient(90deg, #2dd4bf 0%, #2dd4bf ${settings.default_ambient_volume}%, rgba(255,255,255,0.1) ${settings.default_ambient_volume}%, rgba(255,255,255,0.1) 100%)`,
                    outline: 'none',
                    cursor: 'pointer',
                    WebkitAppearance: 'none',
                  }}
                />
              </div>

              <SettingToggle
                label="Sound Effects"
                value={settings.sound_effects_enabled}
                onChange={(val) => handleChange('sound_effects_enabled', val)}
                description="Play sound notifications for events"
              />
            </div>
          </SettingsCard>

          {/* APPEARANCE */}
          <SettingsCard title="Appearance" description="Customize how the app looks">
            <SettingSelect
              label="Theme"
              value={settings.theme}
              onChange={(val) => handleChange('theme', val)}
              options={[
                { value: 'dark', label: 'Dark' },
                { value: 'light', label: 'Light' },
              ]}
              description="Choose your preferred color scheme"
            />
          </SettingsCard>

          {/* STATUS MESSAGE */}
          {message && (
            <div style={{
              padding: '12px 16px',
              background: message.includes('✓') ? 'rgba(45,212,191,0.1)' : 'rgba(248,113,113,0.1)',
              border: `1px solid ${message.includes('✓') ? 'rgba(45,212,191,0.3)' : 'rgba(248,113,113,0.3)'}`,
              borderRadius: 8,
              color: message.includes('✓') ? '#2dd4bf' : '#fca5a5',
              fontSize: 13,
              textAlign: 'center',
              fontWeight: 500,
            }}>
              {message}
            </div>
          )}

          {/* BUTTONS */}
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button
              onClick={handleReset}
              disabled={saving}
              style={{
                background: 'rgba(248,113,113,0.1)',
                border: '1px solid rgba(248,113,113,0.3)',
                borderRadius: 10,
                color: '#fca5a5',
                fontSize: 14,
                fontWeight: 600,
                padding: '12px 20px',
                cursor: saving ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                opacity: saving ? 0.5 : 1,
              }}
            >
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              style={{
                marginLeft: 'auto',
                background: (!hasChanges || saving) ? 'rgba(45,212,191,0.3)' : 'linear-gradient(135deg, #2dd4bf, #0694a2)',
                border: 'none',
                borderRadius: 10,
                color: '#0a1210',
                fontSize: 14,
                fontWeight: 700,
                padding: '12px 24px',
                cursor: (saving || !hasChanges) ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                opacity: (!hasChanges || saving) ? 0.6 : 1,
              }}
            >
              {saving ? 'Saving...' : hasChanges ? 'Save Changes' : 'No Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// HELPER COMPONENTS

function SettingsCard({ title, description, children }) {
  return (
    <div style={{
      background: '#181c28',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      padding: 24,
    }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', margin: '0 0 4px 0' }}>
          {title}
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

function SettingInput({ label, value, onChange, min, max, unit, description }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#fff', display: 'block', marginBottom: 4 }}>
        {label}
      </label>
      {description && (
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '0 0 8px 0' }}>
          {description}
        </p>
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#fff',
            padding: '10px 12px',
            fontSize: 13,
            fontFamily: 'inherit',
          }}
        />
        {unit && (
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', minWidth: 60 }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function SettingSelect({ label, value, onChange, options, description }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#fff', display: 'block', marginBottom: 4 }}>
        {label}
      </label>
      {description && (
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '0 0 8px 0' }}>
          {description}
        </p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          color: '#fff',
          padding: '10px 12px',
          fontSize: 13,
          fontFamily: 'inherit',
          cursor: 'pointer',
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} style={{ background: '#181c28', color: '#fff' }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SettingToggle({ label, value, onChange, description }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#fff', display: 'block', marginBottom: 4 }}>
          {label}
        </label>
        {description && (
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 52,
          height: 32,
          borderRadius: 16,
          background: value ? 'linear-gradient(135deg, #2dd4bf, #0694a2)' : 'rgba(255,255,255,0.1)',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.3s ease',
          flexShrink: 0,
          marginLeft: 16,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            background: '#fff',
            position: 'absolute',
            top: 2,
            left: value ? 22 : 2,
            transition: 'left 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </button>
    </div>
  );
}