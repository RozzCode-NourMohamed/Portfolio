// Scroll Btn
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const home = document.getElementById("home");

window.onscroll = function() {
    if (window.scrollY >= 500) { 
        scrollToTopBtn.style.display = "block"; 
    } else {
        scrollToTopBtn.style.display = "none";
    }
};
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
//----------------------------------------------------------------------
// Dark mood Btn
document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeBtn = document.getElementById("toggleThemeBtn");
    const logo = document.getElementById("logo-img");
    const savedTheme = localStorage.getItem("themeMode") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        toggleThemeBtn.innerHTML = '<img src="images\\sun.png" alt="light mood" style="width: 40px; height: 40px;">';
        logo.src = 'images\\logo-dark-mod.png';
    } else {
        toggleThemeBtn.innerHTML = '<img src="images\\moon.png" alt="dark mood" style="width: 40px; height: 40px;">';
        logo.src = 'images\\Logo.png';
    }
    toggleThemeBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            toggleThemeBtn.innerHTML = '<img src="images\\sun.png" alt="light mood" style="width: 40px; height: 40px;">';
            logo.src = 'images\\logo-dark-mod.png';
            localStorage.setItem("themeMode", "dark");
        } else {
            toggleThemeBtn.innerHTML = '<img src="images\\moon.png" alt="dark mood" style="width: 40px; height: 40px;">';
            logo.src = 'images\\Logo.png';
            localStorage.setItem("themeMode", "light");
        }
    });
});
//----------------------------------------------------------------------
// Scroll-progress
window.addEventListener("scroll", function() {
    const scrollTop = window.scrollY; 
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById("progressBar").style.width = scrollPercent + "%";
});
//----------------------------------------------------------------------
// language btn
const enButton = document.getElementById("enButton");
const arButton = document.getElementById("arButton");
const stylesheet = document.getElementById("stylesheet");
if(window.location.pathname.endsWith('project.html')){//escape
}else{
    enButton.addEventListener("click", function() {
        window.location.href = "index.html"; 
        localStorage.setItem('language', 'en');
    });
    arButton.addEventListener("click", function() {
        window.location.href = "ar.html";
        localStorage.setItem('language', 'ar');
    });
}
//----------------------------------------------------------------------
// menu btn
function toggleMenu() {
    const menuItems = document.getElementById("menu");
    const button = document.getElementById('menu-button');
    menuItems.classList.toggle('active');
    if (menuItems.classList.contains('active')) {
        button.textContent = '✖';
    } else {
        button.textContent = '☰';
    }
}
//----------------------------------------------------------------------
//projects
function loadProjectDetails() {
    const language = localStorage.getItem('language') || 'en';
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    fetch('project.json')
      .then(response => response.json())
      .then(data => {
        // البحث عن المشروع المناسب بناءً على المعرّف
        const project = data.find(item => item.id == projectId);
        if (project) {
          // تحديث محتويات الصفحة
          const description = language === 'ar' ? project['ar-description'] : project.description;
          document.getElementById('project-description').textContent = description;
          document.getElementById('project-image').src = project.image;
          const title = language === 'ar' ? project['ar-title'] : project.title;
          document.title = title;
          document.getElementById("project-link").href= project.src_code
        } else {
          // إذا لم يتم العثور على المشروع
          document.body.innerHTML = '<h1>المشروع غير موجود</h1>';
        }
      })
      .catch(error => {
        console.error('حدث خطأ أثناء تحميل البيانات:', error);
        document.body.innerHTML = '<h1>حدث خطأ أثناء تحميل البيانات</h1>';
      });
    const home_btn = document.getElementById("logo-btn")
    home_btn.href= language === 'ar' ? "ar.html" : "index.html";
  }
if (window.location.pathname.endsWith('project.html')) {
    loadProjectDetails();
}
//----------------------------------------------------------------------