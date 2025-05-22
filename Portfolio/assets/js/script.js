 const currentPage = location.pathname.split("/").pop();
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (href === "home.html" && currentPage === "")) {
      link.classList.add("active");
    }
  });