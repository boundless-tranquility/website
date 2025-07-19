// RSS Feed Handler for Blogger
class RSSFeedHandler {
    constructor() {
        this.blogUrl = 'https://marketdecoding.blogspot.com/';
        this.rssUrl = 'https://marketdecoding.blogspot.com/feeds/posts/default?alt=rss';
        this.maxPosts = 3; // Number of posts to display
        this.blogContainer = document.querySelector('.blog-posts');
        this.loadingElement = null;
        this.errorElement = null;
    }

    // Initialize the RSS feed
    async init() {
        if (!this.blogContainer) {
            console.warn('Blog container not found');
            return;
        }

        this.showLoading();
        
        try {
            const posts = await this.fetchRSSFeed();
            this.displayPosts(posts);
        } catch (error) {
            console.error('Error loading RSS feed:', error);
            this.showError();
        }
    }

    // Show loading state
    showLoading() {
        this.loadingElement = document.createElement('div');
        this.loadingElement.className = 'blog-loading';
        this.loadingElement.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading latest market insights...</p>
        `;
        this.blogContainer.appendChild(this.loadingElement);
    }

    // Show error state
    showError() {
        if (this.loadingElement) {
            this.loadingElement.remove();
        }
        
        this.errorElement = document.createElement('div');
        this.errorElement.className = 'blog-error';
        this.errorElement.innerHTML = `
            <p>Unable to load latest posts. Please visit our blog directly.</p>
            <a href="${this.blogUrl}" target="_blank" rel="noopener noreferrer" class="blog-cta-btn">
                Visit Market Decoding Blog
            </a>
        `;
        this.blogContainer.appendChild(this.errorElement);
    }

    // Fetch RSS feed using CORS proxy
    async fetchRSSFeed() {
        // Use a CORS proxy to bypass CORS restrictions
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(this.rssUrl));
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const xmlText = await response.text();
        return this.parseRSSFeed(xmlText);
    }

    // Parse RSS XML and extract posts
    parseRSSFeed(xmlText) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Check for parsing errors
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
            throw new Error('Failed to parse RSS feed');
        }

        const items = xmlDoc.querySelectorAll('item');
        const posts = [];

        items.forEach((item, index) => {
            if (index >= this.maxPosts) return;

            const title = item.querySelector('title')?.textContent || 'Untitled';
            const link = item.querySelector('link')?.textContent || this.blogUrl;
            const description = item.querySelector('description')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            
            // Extract category from Blogger's category tags
            const categories = item.querySelectorAll('category');
            const category = categories.length > 0 ? categories[0].textContent : 'Market Analysis';

            // Clean up description (remove HTML tags and limit length)
            const cleanDescription = this.cleanDescription(description);
            
            // Format date
            const formattedDate = this.formatDate(pubDate);

            posts.push({
                title: this.decodeHtmlEntities(title),
                link: link,
                description: cleanDescription,
                date: formattedDate,
                category: category
            });
        });

        return posts;
    }

    // Clean description text
    cleanDescription(description) {
        // Remove HTML tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = description;
        let text = tempDiv.textContent || tempDiv.innerText || '';
        
        // Remove extra whitespace
        text = text.replace(/\s+/g, ' ').trim();
        
        // Limit length to ~150 characters
        if (text.length > 150) {
            text = text.substring(0, 150) + '...';
        }
        
        return text;
    }

    // Format date
    formatDate(dateString) {
        if (!dateString) return 'Recent';
        
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) return 'Yesterday';
            if (diffDays < 7) return `${diffDays} days ago`;
            if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
            if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
            
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
            });
        } catch (error) {
            return 'Recent';
        }
    }

    // Decode HTML entities
    decodeHtmlEntities(text) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }

    // Display posts in the container
    displayPosts(posts) {
        if (this.loadingElement) {
            this.loadingElement.remove();
        }

        if (posts.length === 0) {
            this.showError();
            return;
        }

        this.blogContainer.innerHTML = posts.map(post => `
            <article class="blog-post">
                <div class="blog-post-content">
                    <h3>${post.title}</h3>
                    <div class="blog-meta">
                        <span class="blog-date">${post.date}</span>
                        <span class="blog-category">${post.category}</span>
                    </div>
                    <p class="blog-excerpt">
                        ${post.description}
                    </p>
                    <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="read-more-btn">
                        Read Full Article →
                    </a>
                </div>
            </article>
        `).join('');
    }
}

// Initialize RSS feed when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const rssHandler = new RSSFeedHandler();
    rssHandler.init();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RSSFeedHandler };
} 