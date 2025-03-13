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
                                ▋