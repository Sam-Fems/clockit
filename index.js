const loginSection = document.getElementById("login");
const dashboardSection = document.getElementById("dashboard");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const userNameSpan = document.getElementById("userName");
const clockInBtn = document.getElementById("clockInBtn");
const clockOutBtn = document.getElementById("clockOutBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const NINE_HOURS_MS = 5 * 1000;

function showDashboard() {
  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
  const user = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const department = localStorage.getItem("department");
  const employeeId = localStorage.getItem("employeeId");

  userNameSpan.textContent = user;
  document.getElementById("profileName").value = user || "";
  document.getElementById("profileEmail").value = email || "";
  document.getElementById("profileRole").value = role || "";
  document.getElementById("profileDepartment").value = department || "";
  document.getElementById("profileEmployeeId").value = employeeId || "";

  updateButtons();
}

function showLogin() {
  dashboardSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
  usernameInput.value = "";
  emailInput.value = "";
}

function updateButtons() {
  const clockInTime = localStorage.getItem("clockInTime");
  if (clockInTime) {
    clockInBtn.style.display = "none";
    clockOutBtn.style.display = "block";
    const timePassed = Date.now() - parseInt(clockInTime);
    clockOutBtn.disabled = timePassed < NINE_HOURS_MS;
  } else {
    clockInBtn.style.display = "block";
    clockOutBtn.style.display = "none";
  }
}

setInterval(updateButtons, 1000);

loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  if (username && email) {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("role", "Senior Developer");
    localStorage.setItem("department", "IT");
    localStorage.setItem("employeeId", "EMP001");
    showDashboard();
  } else {
    alert("Please enter your name and email.");
  }
});

clockInBtn.addEventListener("click", () => {
  localStorage.setItem("clockInTime", Date.now());
  alert("You have clocked in successfully!");
  updateButtons();
});

clockOutBtn.addEventListener("click", () => {
  if (!clockOutBtn.disabled) {
    alert("You have clocked out successfully!");
    localStorage.removeItem("clockInTime");
    updateButtons();
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  showLogin();
});

if (localStorage.getItem("username")) {
  showDashboard();
}
