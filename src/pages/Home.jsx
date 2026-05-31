import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Dashboard from '../components/DashboardDemo'
import Timer from '../components/Timer'
import Motivation from '../components/Motivation'
import Settings from '../components/SettingsDemo'
import Footer from '../components/Footer'

export default function Home({
  darkMode,
  setDarkMode,
  soundEnabled,
  setSoundEnabled,
  focusIntensity,
  setFocusIntensity,
  activeSection,
  setActiveSection
}) {
  return (
    <>
      {/* NAVBAR */}
      <section id="navigation">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </section>

      {/* HERO */}
      <section id="hero">
        <Hero darkMode={darkMode} />
      </section>

      {/* DASHBOARD */}
      <section id="dashboard">
        <Dashboard darkMode={darkMode} />
      </section>

      {/* TIMER */}
      <section id="timer">
        <Timer darkMode={darkMode} />
      </section>

      {/* MOTIVATION */}
      <section id="motivation">
        <Motivation darkMode={darkMode} />
      </section>

      {/* SETTINGS */}
      <section id="settings">
        <Settings
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          focusIntensity={focusIntensity}
          setFocusIntensity={setFocusIntensity}
        />
      </section>

      {/* FOOTER */}
      <Footer darkMode={darkMode} />
    </>
  )
}