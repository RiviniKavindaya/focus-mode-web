// src/hooks/useSettings.js
import { useState, useEffect, useCallback } from "react";
import { settingsService } from "../services/settingsService";

const defaultSettings = {
  preferred_sprint_duration: 25,
  short_break_duration: 5,
  long_break_duration: 15,
  sprints_before_long_break: 4,
  daily_target_minutes: 120,
  weekly_target_minutes: 600,
  default_ambient_sound: "none",
  default_ambient_volume: 50,
  sound_effects_enabled: true,
  theme: "dark",
};

export default function useSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [originalSettings, setOriginalSettings] = useState(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [message, setMessage] = useState("");

  // =====================
  // LOAD SETTINGS
  // =====================
  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await settingsService.getSettings();

      setSettings(data);
      setOriginalSettings(data);
      setHasChanges(false);
    } catch (err) {
      setError(err);
      console.error("Settings load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================
  // UPDATE FIELD
  // =====================
  const updateSetting = (field, value) => {
    setSettings((prev) => {
      const updated = { ...prev, [field]: value };

      // detect changes properly
      const changed =
        JSON.stringify(updated) !== JSON.stringify(originalSettings);

      setHasChanges(changed);

      return updated;
    });
  };

  // =====================
  // SAVE SETTINGS
  // =====================
  const saveSettings = async () => {
    try {
      setSaving(true);
      setError(null);

      await settingsService.saveSettings(settings);

      setOriginalSettings(settings);
      setHasChanges(false);

      setMessage("✓ Settings saved successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setError(err);
      setMessage("✗ Failed to save settings");
      console.error("Settings save error:", err);
    } finally {
      setSaving(false);
    }
  };

  // =====================
  // RESET SETTINGS
  // =====================
  const resetSettings = async () => {
    try {
      setSaving(true);
      setError(null);

      await settingsService.resetSettings();

      await loadSettings();

      setMessage("✓ Settings reset successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setError(err);
      setMessage("✗ Failed to reset settings");
      console.error("Settings reset error:", err);
    } finally {
      setSaving(false);
    }
  };

  // =====================
  // INIT
  // =====================
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    settings,
    setSettings,
    updateSetting,

    loadSettings,
    saveSettings,
    resetSettings,

    loading,
    saving,
    error,
    message,
    hasChanges,

    setMessage,
  };
}