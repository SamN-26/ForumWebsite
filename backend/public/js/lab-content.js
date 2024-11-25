document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-links a");
    const dynamicContent = document.getElementById("dynamicContent");
    const pageTitle = document.getElementById("pageTitle");
  
    const contentMap = {
      "lab-issues": "<h2>Lab Issues</h2><p>Discuss lab-related problems here.</p>",
      "queries": "<h2>Queries</h2><p>Post and discuss any academic queries here.</p>",
      "tutorials": "<h2>Tutorials</h2><p>Share and discuss tutorial materials here.</p>",
      "announcements": "<h2>Announcements</h2><p>Important announcements will be displayed here.</p>",
    };
  
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = link.getAttribute("data-tab");
        dynamicContent.innerHTML = contentMap[tab] || "<p>Content not found.</p>";
        pageTitle.textContent = link.textContent;
      });
    });
  });
  