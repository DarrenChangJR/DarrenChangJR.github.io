class PoetryBlog {
    constructor() {
        this.poems = [];
        this.currentPoemIndex = -1;
        this.slugToIndex = new Map();
        // Detect base path for GitHub Pages (empty for username.github.io, or /repo-name for others)
        this.basePath = this.getBasePath();
        // Initialize dark mode immediately, before any async operations
        this.initDarkMode();
        this.init();
    }

    // Get base path for GitHub Pages deployment
    getBasePath() {
        const pathname = window.location.pathname;
        
        // If we're at / or /index.html, we're at root (username.github.io case)
        if (pathname === '/' || pathname === '/index.html') {
            return '';
        }
        
        // Extract the base path (first segment if we're in a subdirectory)
        // For /repo-name/poem-slug, we want /repo-name
        // For /repo-name/index.html, we want /repo-name
        const pathParts = pathname.split('/').filter(p => p && p !== 'index.html');
        
        // If we have path parts and we're not at root, the first part is likely the repo name
        // But we need to be careful - if we're already on a poem page, detect from that
        if (pathParts.length > 1) {
            // We're viewing a poem in a subdirectory
            return '/' + pathParts[0];
        } else if (pathParts.length === 1) {
            // Could be a poem slug at root, or repo name
            // Check if it matches any poem slug - if not, it's probably the repo name
            // For now, assume single segment at root is a poem slug
            return '';
        }
        
        return '';
    }

    // Generate URL-friendly slug from poem title
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-')      // Replace spaces with hyphens
            .replace(/-+/g, '-')        // Replace multiple hyphens with single
            .trim();
    }

    async init() {
        await this.loadPoems();
        this.setupEventListeners();
        this.showMenu();
    }

    async loadPoems() {
        try {
            const response = await fetch('poems.json');
            if (!response.ok) {
                throw new Error('Failed to load poems');
            }
            this.poems = await response.json();
            // Build slug to index mapping
            this.poems.forEach((poem, index) => {
                const slug = this.generateSlug(poem.title);
                this.slugToIndex.set(slug, index);
            });
            this.renderMenu();
        } catch (error) {
            console.error('Error loading poems:', error);
            document.getElementById('poem-list').innerHTML = 
                '<li class="error">Failed to load poems. Please check that poems.json exists.</li>';
        }
    }

    initDarkMode() {
        // Check for saved preference or default to light mode
        const savedMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const isDark = savedMode === 'true' || (savedMode === null && prefersDark);
        
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Update icon after a short delay to ensure DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updateDarkModeIcon(isDark);
            });
        } else {
            this.updateDarkModeIcon(isDark);
        }
    }

    toggleDarkMode() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDark);
        this.updateDarkModeIcon(isDark);
    }

    updateDarkModeIcon(isDark) {
        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.querySelector('.toggle-icon').textContent = isDark ? '☀️' : '🌙';
        }
    }

    setupEventListeners() {
        // Dark mode toggle
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }

        // Navigation links
        document.querySelectorAll('[data-view]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.getAttribute('data-view');
                if (view === 'menu') {
                    this.showMenu();
                }
            });
        });

        // Previous/Next navigation
        document.getElementById('prev-link').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPoemIndex > 0) {
                this.showPoem(this.currentPoemIndex - 1, true, true);
            }
        });

        document.getElementById('next-link').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPoemIndex < this.poems.length - 1) {
                this.showPoem(this.currentPoemIndex + 1, true, true);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.view === 'menu') {
                this.showMenu(false);
            } else if (e.state && e.state.view === 'poem') {
                this.showPoem(e.state.index, false, false);
            } else {
                this.showMenu(false);
            }
        });
    }

    renderMenu() {
        const poemList = document.getElementById('poem-list');
        poemList.innerHTML = '';

        this.poems.forEach((poem, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'poem-list-item';
            
            // Make entire row clickable
            listItem.addEventListener('click', () => {
                this.showPoem(index);
            });

            // Calculate poem number (highest number for first poem)
            const poemNumber = this.poems.length - index;

            // Create number element
            const numberElement = document.createElement('span');
            numberElement.className = 'poem-number';
            numberElement.textContent = poemNumber;

            // Title is now a span, not a link
            const titleElement = document.createElement('span');
            titleElement.className = 'poem-title-link';
            titleElement.textContent = poem.title;

            const meta = document.createElement('div');
            meta.className = 'poem-list-meta';
            if (poem.date) {
                meta.textContent = poem.date;
            }

            // Add all elements to list item
            listItem.appendChild(numberElement);
            listItem.appendChild(titleElement);
            if (meta.textContent) {
                listItem.appendChild(meta);
            }
            poemList.appendChild(listItem);
        });
    }

    showMenu(updateHistory = true) {
        document.getElementById('menu-view').classList.add('active');
        document.getElementById('poem-view').classList.remove('active');
        this.currentPoemIndex = -1;
        
        // Update URL without page reload
        if (updateHistory) {
            const menuPath = this.basePath || '/';
            window.history.pushState({ view: 'menu' }, '', menuPath);
        }
        
        // Update page title and meta
        this.updatePageMeta('Poetry Blog - A Collection of Beautiful Verses', 
                          'A collection of beautiful poetry - explore verses that touch the soul');
    }

    showPoem(index, updateHistory = true, isNavigation = false) {
        if (index < 0 || index >= this.poems.length) {
            return;
        }

        const poem = this.poems[index];
        this.currentPoemIndex = index;

        // Update content
        document.getElementById('poem-title').textContent = poem.title;
        document.getElementById('poem-author').textContent = poem.author || '';
        
        // Format poem content
        const content = document.getElementById('poem-content');
        if (typeof poem.content === 'string') {
            content.textContent = poem.content;
        } else if (Array.isArray(poem.content)) {
            content.textContent = poem.content.join('\n');
        } else {
            content.textContent = '';
        }

        // Update navigation
        const prevLink = document.getElementById('prev-link');
        const nextLink = document.getElementById('next-link');
        
        if (index === 0) {
            prevLink.classList.add('hidden');
        } else {
            prevLink.classList.remove('hidden');
        }
        
        if (index === this.poems.length - 1) {
            nextLink.classList.add('hidden');
        } else {
            nextLink.classList.remove('hidden');
        }

        // Show poem view
        document.getElementById('menu-view').classList.remove('active');
        document.getElementById('poem-view').classList.add('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update URL with poem slug (clean path, no hash)
        // If navigating with Next/Previous, replace state so back button goes to menu
        // If coming from menu, push state
        if (updateHistory) {
            const slug = this.generateSlug(poem.title);
            const poemPath = this.basePath ? `${this.basePath}/${slug}` : `/${slug}`;
            if (isNavigation) {
                window.history.replaceState({ index: index, view: 'poem' }, '', poemPath);
            } else {
                window.history.pushState({ index: index, view: 'poem' }, '', poemPath);
            }
        }

        // Update page title and meta for SEO
        const pageTitle = `${poem.title}${poem.author ? ' by ' + poem.author : ''} - Poetry Blog`;
        const contentText = typeof poem.content === 'string' ? poem.content : (Array.isArray(poem.content) ? poem.content.join('\n') : '');
        const pageDescription = contentText.substring(0, 160).replace(/\n/g, ' ') + '...';
        this.updatePageMeta(pageTitle, pageDescription);
    }

    updatePageMeta(title, description) {
        document.title = title;
        
        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;

        // Update Open Graph tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
        }
        ogTitle.content = title;

        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (!ogDesc) {
            ogDesc = document.createElement('meta');
            ogDesc.setAttribute('property', 'og:description');
            document.head.appendChild(ogDesc);
        }
        ogDesc.content = description;
    }

}

// Initialize the blog when DOM is ready
let poetryBlogInstance = null;

function initializeBlog() {
    if (!poetryBlogInstance) {
        poetryBlogInstance = new PoetryBlog();
        window.poetryBlog = poetryBlogInstance;
    }
    return poetryBlogInstance;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeBlog();
    });
} else {
    initializeBlog();
}

// Handle path-based navigation on page load with slugs
window.addEventListener('load', () => {
    const path = window.location.pathname;
    // Check if path is not just root or index
    if (path && path !== '/' && path !== '/index.html') {
        // Extract slug from path (remove base path if present)
        let slug = path.replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/, '');
        
        // Remove base path if we're in a subdirectory (e.g., /repo-name/poem-slug -> poem-slug)
        const pathParts = slug.split('/');
        if (pathParts.length > 1) {
            // Assume first part is base, rest is slug
            slug = pathParts.slice(1).join('/');
        }
        
        setTimeout(() => {
            const blog = initializeBlog();
            // Wait for poems to load
            if (blog.poems.length > 0 && blog.slugToIndex.has(slug)) {
                const index = blog.slugToIndex.get(slug);
                blog.showPoem(index, false);
            } else if (blog.poems.length === 0) {
                // If poems haven't loaded yet, wait a bit more
                setTimeout(() => {
                    if (blog.slugToIndex.has(slug)) {
                        const index = blog.slugToIndex.get(slug);
                        blog.showPoem(index, false);
                    }
                }, 200);
            }
        }, 100);
    }
});
