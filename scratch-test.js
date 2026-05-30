try {
  const fi = require('react-icons/fi');
  console.log("react-icons/fi loaded successfully!");
  console.log("FiCalendar:", !!fi.FiCalendar);
  console.log("FiClock:", !!fi.FiClock);
  console.log("FiDollarSign:", !!fi.FiDollarSign);
  console.log("FiX:", !!fi.FiX);
  console.log("FiCheck:", !!fi.FiCheck);
  console.log("FiUsers:", !!fi.FiUsers);
} catch (e) {
  console.error("Error loading react-icons/fi:", e);
}
