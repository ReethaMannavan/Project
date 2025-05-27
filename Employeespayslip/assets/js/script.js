function toggleSidebar() {
  const sidebar = document.getElementById('sidebarMenu');
  sidebar.classList.toggle('active');
  document.querySelector('.content').classList.toggle('active');
  

  const closeBtn = document.getElementById('sidebarClose');
  closeBtn.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
}

document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
document.getElementById('sidebarClose').addEventListener('click', toggleSidebar);


document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebarMenu');
  const toggleBtn = document.getElementById('sidebarToggle');
  
  if (sidebar.classList.contains('active') && 
      !sidebar.contains(event.target) && 
      !toggleBtn.contains(event.target)) {
    toggleSidebar();
  }
});