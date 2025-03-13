$(document).ready(function() {

    // Funktion för att förhindra XSS (Cross-Site Scripting)
    function escapeHTML(str) {
        if (str == null) {
            return "";  // Eller något annat vettigt standardvärde
        }
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    }

    async function loadBlogPosts() {
        try {
            console.log("loadBlogPosts() körs");
            const response = await fetch('https://dennisbengtsson.github.io/blogg/json/blog_posts.json', {
                headers: { 'Accept': 'application/json' }
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log(data);
            // Hantera data här
            const blogList = document.getElementById('blog-list');
            if (blogList) {
                blogList.innerHTML = '';

                data.forEach(post => {
                    blogList.innerHTML += `
                        <div class="row blog-item px-3 pb-5">
                            <div class="col-md-5">
                                <img class="img-fluid mb-4 mb-md-0" src="${escapeHTML(post.image)}" alt="${escapeHTML(post.title)}">
                            </div>
                            <div class="col-md-7">
                                <h3 class="mt-md-4 px-md-3 mb-2 py-2 bg-white font-weight-bold">${escapeHTML(post.title)}</h3>
                                <div class="d-flex mb-3">
                                    <small class="mr-2 text-muted"><i class="fa fa-calendar-alt"></i> ${escapeHTML(post.date)}</small>
                                    <small class="mr-2 text-muted"><i class="fa fa-folder"></i> ${escapeHTML(post.category)}</small>
                                    <small class="mr-2 text-muted"><i class="fa fa-comments"></i> ${Number.isInteger(post.comments) ? post.comments : 0} Kommentarer</small>
                                </div>
                                <p>${escapeHTML(post.description)}</p>
                                <a class="btn btn-sm btn-outline-primary next-post" href="${escapeHTML(post.link)}">Läs mer <i class="fa fa-angle-right"></i></a>
                            </div>
                        </div>
                    `;
                });
            }
        } catch (error) {
            console.error('Kunde inte ladda bloggposter:', error);
            const blogList = document.getElementById('blog-list');
            if (blogList) blogList.innerHTML = '<p>Kunde inte ladda bloggposter. Försök igen senare.</p>';
        }
    }

    if (window.location.pathname.includes("blog.html")) {
        loadBlogPosts();
    }
});

$(document).ready(function() {
    function createCarousel(blogPosts) {
        const carouselInner = $('#carousel-inner');
        carouselInner.empty();

        if (!blogPosts || !Array.isArray(blogPosts)) {
            console.error('blogPosts är inte definierad eller är inte en array.');
            carouselInner.html('<div class="carousel-item active">Kunde inte ladda blogginlägg.</div>');
            return;
        }

        const latestPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        latestPosts.forEach((post, index) => {
            const { title, description, image, link } = post;
            const activeClass = index === 0 ? 'active' : '';
            const escapedTitle = escapeHTML(title);
            const escapedDescription = escapeHTML(description);
            const escapedImage = escapeHTML(image);
            const escapedLink = escapeHTML(link);

            carouselInner.append(`
                <div class="carousel-item ${activeClass}">
                    <img src="${escapedImage}" class="d-block w-100" alt="${escapedTitle}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${escapedTitle}</h5>
                        <p>${escapedDescription}</p>
                        <a href="${escapedLink}" class="btn btn-primary custom-read-more-button">Läs mer</a>
                    </div>
                </div>
            `);
        });
    }

    if (window.location.pathname.includes("index.html")) {
        // Hämta blogPosts med AJAX (ENDAST FÖR INDEX.HTML)
        $.ajax({
            url: "https://dennisbengtsson.github.io/blogg/json/blog_posts.json",
            method: "GET",
            dataType: "text", // ÄNDRAD TILL TEXT
            success: function(data) {
                try {
                    const blogPosts = JSON.parse(data); // Parsa JSON manuellt
                    createCarousel(blogPosts);
                } catch (e) {
                    console.error("Fel vid parsning av JSON:", e);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Fel vid hämtning av blogginlägg för index.html:", textStatus, errorThrown);
                $('#carousel-inner').html('<div class="carousel-item active">Kunde inte ladda blogginlägg.</div>');
            }
        });
    }

    // *** FUNKTION FÖR ATT SKAPA KARUSELLEN ***
    function createCarousel(blogPosts) {
        const carouselInner = $('#carousel-inner');
        carouselInner.empty(); // Rensa eventuellt tidigare innehåll

        // Kontrollera att blogPosts är definierad och en array
        if (!blogPosts || !Array.isArray(blogPosts)) {
            console.error('blogPosts är inte definierad eller är inte en array.');
            carouselInner.html('<div class="carousel-item active">Kunde inte ladda blogginlägg.</div>');
            return; // Avbryt funktionen
        }

        // Sortera blogginläggen efter datum (nyaste först) och ta de 5 senaste
        const latestPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        // Skapa karusell-items
        latestPosts.forEach((post, index) => {
            const activeClass = index === 0 ? 'active' : ''; // Första item ska ha klassen 'active'
            const item = `
                <div class="carousel-item ${activeClass}">
                    <img src="${escapeHTML(post.image)}" class="d-block w-100" alt="${escapeHTML(post.title)}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${escapeHTML(post.title)}</h5>
                        <p>${escapeHTML(post.description)}</p>
                        <a href="${escapeHTML(post.link)}" class="btn btn-primary custom-read-more-button">Läs mer</a>
                    </div>
                </div>
            `;
            carouselInner.append(item);
        });
    }
});