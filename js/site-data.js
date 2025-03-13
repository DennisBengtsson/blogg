const headerHTML = `
    <nav class="navbar navbar-expand-lg bg-secondary navbar-dark">
        <a href="index.html" class="navbar-brand d-block d-lg-none">Navigering</a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div class="navbar-nav m-auto">
                <div class="nav-item dropdown">
                    <a href="index.html" class="nav-link dropdown-toggle" data-toggle="dropdown">Hem</a>
                    <div class="dropdown-menu">
                        <a href="blog.html" class="dropdown-item" data-page="blog">Blogg</a>
                        <a href="bilder.html" class="dropdown-item" data-page="bilder">Bilder</a>
                    </div>
                </div>
                <div class="nav-item dropdown">
                    <a href="about.html" class="nav-link dropdown-toggle" data-toggle="dropdown">Om Mig</a>
                    <div class="dropdown-menu">
                        <a href="about.html" class="dropdown-item" data-page="about">Om Mig</a>
                        <a href="contact.html" class="dropdown-item" data-page="contact">Kontakt</a>
                    </div>
                </div>
                <!-- Removed direct links to Blogg, Bilder, About, and Contact -->
            </div>
        </div>
    </nav>
`;





const footerHTML = `
  <div class="container py-4 bg-secondary text-center my-website-footer">
    <p class="m-0 text-white">
      &copy; 2025 <span id="footer-name"></span>. Alla rättigheter förbehållna.
    </p>
  </div>
`;

const sidebarHTML = `
    <div class="sidebar">
        <div class="sidebar-text d-flex flex-column h-100 justify-content-center text-center">
            <img class="mx-auto d-block w-75 bg-primary img-fluid rounded-circle mb-4 p-3" src="./img/profile.jpg"
                 alt="" id="profile-image">
            <h1 class="font-weight-bold" id="profile-name"></h1>
            <p class="mb-4" id="profile-description">
                <span id="static-sidebar-text"></span>
            </p>
            <div class="d-flex justify-content-center mb-5">
                <a class="btn btn-outline-primary mr-2" href="#" target="_blank" rel="noopener noreferrer" id="x-link"><i
                        class="fab fa-x-twitter"></i></a>
                <a class="btn btn-outline-primary mr-2" href="#" target="_blank" rel="noopener noreferrer"
                   id="facebook-link"><i class="fab fa-facebook-f"></i></a>
                <a class="btn btn-outline-primary mr-2" href="#" target="_blank" rel="noopener noreferrer"
                   id="linkedin-link"><i class="fab fa-linkedin-in"></i></a>
                <a class="btn btn-outline-primary mr-2" href="#" target="_blank" rel="noopener noreferrer"
                   id="instagram-link"><i class="fab fa-instagram"></i></a>
            </div>
            <a href="mailto:dennisrmgbengtsson@gmail.com" class="btn btn-lg btn-block btn-primary mt-auto">Kontakta
                mig</a>
        </div>
        <div class="sidebar-icon d-flex flex-column h-100 justify-content-center text-right">
            <i class="fas fa-2x fa-angle-double-right text-primary"></i>
        </div>
    </div>
`;


const loadAllData = async () => {
    try {
        const response = await fetch('data.json'); // Ändra denna rad
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        updatePageTitle(data);
        updateFooter(data);
        updateSidebar(data.sidebar, data);

    } catch (error) {
        console.error('Kunde inte ladda data:', error);
    }
};



const updatePageTitle = (data) => {
    const pageTitleElement = document.getElementById('page-title');
    if (pageTitleElement) pageTitleElement.textContent = data.name + (data.pageTitleSuffix || '');
    else console.warn('Element med ID "page-title" hittades inte!');
};

const updateFooter = (data) => {
    if (data.footerNameId) {
        const footerNameElement = document.getElementById(data.footerNameId);
        if (footerNameElement) footerNameElement.textContent = data.name;
        else console.warn(`Element med ID "${data.footerNameId}" hittades inte!`);
    }
};

const updateSidebar = (sidebar, data) => {
    if (!sidebar) return;

    const updateElementText = (elementId, text) => {
        const element = document.getElementById(elementId);
        if (element) element.textContent = text;
        else console.warn(`Element med ID "${elementId}" hittades inte!`);
    };

    const updateElementHref = (elementId, href) => {
        const element = document.getElementById(elementId);
        if (element) element.href = href;
        else console.warn(`Element med ID "${elementId}" hittades inte!`);
    };

    if (sidebar.profileNameId) updateElementText(sidebar.profileNameId, data.name);
    if (sidebar.profileDescriptionId) updateElementText(sidebar.profileDescriptionId, data.description);
     if (sidebar.profileImageId) {
        const profileImage = document.getElementById(sidebar.profileImageId);
        if (profileImage) profileImage.src = "./img/profile.jpg"; //Uppdatera bildens källa
        else console.warn(`Element med ID "${sidebar.profileImageId}" hittades inte!`);
    }
    if (sidebar.xLinkId) updateElementHref(sidebar.xLinkId, data.x);
    if (sidebar.facebookLinkId) updateElementHref(sidebar.facebookLinkId, data.facebook);
    if (sidebar.linkedinLinkId) updateElementHref(sidebar.linkedinLinkId, data.linkedin);
    if (sidebar.instagramLinkId) updateElementHref(sidebar.instagramLinkId, data.instagram);
};

const generateMenu = async () => {
    try {
        const response = await fetch('data.json'); // Ändra denna rad
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const menu = data.menu;
        let menuHTML = '';

        menu.forEach(item => {
            if (item.dropdown) {
                menuHTML += `
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">${item.label}</a>
                        <div class="dropdown-menu">
                `;
                item.dropdown.forEach(dropdownItem => {
                    menuHTML += `<a href="${dropdownItem.url}" class="dropdown-item" data-page="${dropdownItem.dataPage}">${dropdownItem.label}</a>`;
                });
                menuHTML += `</div></div>`;
            } else {
                menuHTML += `<a href="${item.url}" class="nav-item nav-link" data-page="${item.dataPage}">${item.label}</a>`;
            }
        });
        return menuHTML;
    } catch (error) {
        console.error('Kunde inte ladda menyn:', error);
        return '';
    }
};

const setActiveNavLink = () => {
    let path = window.location.pathname;
    let page = path.split("/").pop().replace(".html", "") || "index";

    document.querySelectorAll('.nav-item .nav-link').forEach(link => {
        if (link.getAttribute('data-page') === page) link.classList.add('active');
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('header-container').innerHTML = headerHTML;
    document.getElementById('sidebar-container').innerHTML = sidebarHTML;
    document.getElementById('footer-container').innerHTML = footerHTML;
    await loadAllData();

    const menuHTML = await generateMenu();
    const navbarCollapse = document.querySelector('.navbar-collapse .navbar-nav');
    if (navbarCollapse) navbarCollapse.innerHTML = menuHTML;
    else console.warn('Kunde inte hitta .navbar-collapse .navbar-nav!');

    setActiveNavLink();
});

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('header-container').innerHTML = headerHTML;
    document.getElementById('sidebar-container').innerHTML = sidebarHTML;
    document.getElementById('footer-container').innerHTML = footerHTML;
    await loadAllData();

    const menuHTML = await generateMenu();
    const navbarCollapse = document.querySelector('.navbar-collapse .navbar-nav');
    if (navbarCollapse) navbarCollapse.innerHTML = menuHTML;
    else console.warn('Kunde inte hitta .navbar-collapse .navbar-nav!');

    setActiveNavLink();

    // Lägg till detta för att felsöka
    console.log("Aktuell sökväg:", window.location.pathname);
});


