document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname;
  console.log("Current path:", currentPath);

  links.forEach((link) => {
    if (currentPath.includes(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });
});
