// ===============================
// app.js
// Website Main Functionality
// ===============================


// ---------- LOGIN CHECK ----------

function checkLogin() {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
    }
}


// ---------- USER NAME ----------

function showUserName() {
    const userName = localStorage.getItem("userName") || "User";

    const elements = document.querySelectorAll(".user-name");

    elements.forEach(element => {
        element.textContent = userName;
    });
}


// ---------- LOGOUT ----------

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");

    window.location.href = "login.html";
}


// ---------- COURSES ----------

const courses = [
    {
        id: 1,
        title: "Web Development",
        description: "HTML, CSS aur JavaScript seekhein."
    },
    {
        id: 2,
        title: "Graphic Designing",
        description: "Graphic designing ki basic skills."
    },
    {
        id: 3,
        title: "Digital Marketing",
        description: "Digital marketing ki basic knowledge."
    },
    {
        id: 4,
        title: "Computer Basics",
        description: "Computer ki basic information."
    }
];


// ---------- COURSE LIST ----------

function showCourses(courseList = courses) {
    const courseContainer = document.getElementById("courseList");

    if (!courseContainer) return;

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const courseCard = document.createElement("div");

        courseCard.className = "course-card";

        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <button onclick="openCourse(${course.id})">
                Open Course
            </button>
        `;

        courseContainer.appendChild(courseCard);
    });
}


// ---------- COURSE SEARCH ----------

function searchCourses() {

    const searchInput = document.getElementById("courseSearch");

    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchText)
    );

    showCourses(filteredCourses);
}


// ---------- OPEN COURSE ----------

function openCourse(courseId) {

    const course = courses.find(course => course.id === courseId);

    if (!course) return;

    // Save course history
    let history = JSON.parse(
        localStorage.getItem("courseHistory")
    ) || [];

    history = history.filter(item => item.id !== course.id);

    history.unshift({
        id: course.id,
        title: course.title,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "courseHistory",
        JSON.stringify(history)
    );

    // Course page
    window.location.href = `course.html?id=${course.id}`;
}


// ---------- COURSE HISTORY ----------

function showHistory() {

    const historyContainer =
        document.getElementById("courseHistory");

    if (!historyContainer) return;

    const history = JSON.parse(
        localStorage.getItem("courseHistory")
    ) || [];

    historyContainer.innerHTML = "";

    if (history.length === 0) {
        historyContainer.innerHTML =
            "<p>No course history found.</p>";
        return;
    }

    history.forEach(item => {

        const historyItem = document.createElement("div");

        historyItem.className = "history-item";

        historyItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>Opened: ${item.date}</p>
            <button onclick="openCourse(${item.id})">
                Open Again
            </button>
        `;

        historyContainer.appendChild(historyItem);
    });
}


// ---------- CLEAR HISTORY ----------

function clearHistory() {

    localStorage.removeItem("courseHistory");

    showHistory();
}


// ---------- PROFILE INFORMATION ----------

function showProfile() {

    const userName =
        localStorage.getItem("userName") || "User";

    const profileName =
        document.getElementById("profileName");

    if (profileName) {
        profileName.textContent = userName;
    }
}


// ---------- LOGIN FUNCTION ----------

function loginUser(userName) {

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userName", userName);

    window.location.href = "index.html";
}


// ---------- PAGE LOAD ----------

document.addEventListener("DOMContentLoaded", function () {

    showUserName();
    showCourses();
    showHistory();
    showProfile();

});