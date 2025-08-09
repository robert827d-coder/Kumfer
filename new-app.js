/**
 * Fort Wayne Service Directory - GitHub CSV Edition
 * A complete web application that pulls provider data from GitHub CSV
 * No localStorage dependencies - everything syncs in real-time
 */

// Configuration - UPDATE THESE URLS FOR YOUR GITHUB REPO
const CONFIG = {
    // Replace with your actual GitHub repository CSV URL
    GITHUB_CSV_URL: 'https://github.com/robert827d-coder/Kumfer/blob/main/providers.csv,
    CACHE_TIMEOUT: 5 * 60 * 1000, // 5 minutes
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
    ADMIN_PASSWORD: 'michael2025', // Change this!
    AUTO_REFRESH_INTERVAL: 10 * 60 * 1000 // 10 minutes
};

/**
 * GitHub CSV Data Manager
 * Handles all data fetching, caching, and synchronization
 */
class GitHubDataManager {
    constructor(csvUrl, fallbackData = []) {
        this.csvUrl = csvUrl;
        this.cache = null;
        this.lastFetch = null;
        this.cacheTimeout = CONFIG.CACHE_TIMEOUT;
        this.fallbackData = fallbackData;
        this.retryAttempts = CONFIG.RETRY_ATTEMPTS;
        this.retryDelay = CONFIG.RETRY_DELAY;
    }

    /**
     * Main method to get provider data
     * Uses intelligent caching with fallback mechanisms
     */
    async getProviders(forceRefresh = false) {
        const now = Date.now();
        
        // Use cache if available and not expired
        if (this.cache && 
            this.lastFetch && 
            !forceRefresh && 
            (now - this.lastFetch) < this.cacheTimeout) {
            return this.cache;
        }

        // Try to fetch from GitHub with retries
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                const providers = await this.fetchFromGitHub();
                this.cache = providers;
                this.lastFetch = now;
                
                // Update session storage as secondary cache
                this.updateSessionCache(providers);
                
                return providers;
            } catch (error) {
                console.warn(`GitHub fetch attempt ${attempt} failed:`, error);
                
                if (attempt === this.retryAttempts) {
                    console.error('All GitHub fetch attempts failed, using fallback');
                    
                    // Try session cache first, then fallback data
                    const sessionData = this.getSessionCache();
                    return sessionData || this.cache || this.fallbackData;
                }
                
                // Wait before retry
                await this.delay(this.retryDelay * attempt);
            }
        }
    }

    /**
     * Fetch CSV from GitHub with cache-busting
     */
    async fetchFromGitHub() {
        // Add timestamp to bust GitHub's CDN cache
        const timestamp = Date.now();
        const urlWithCacheBust = `${this.csvUrl}?t=${timestamp}`;
        
        const response = await fetch(urlWithCacheBust, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        const providers = this.parseCSV(csvText);
        
        if (providers.length === 0) {
            throw new Error('No valid provider data found in CSV');
        }
        
        return providers;
    }

    /**
     * Enhanced CSV parser that handles quotes, commas, and edge cases
     */
    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) {
            throw new Error('CSV file must have header and at least one data row');
        }
        
        const headers = this.parseCSVLine(lines[0]);
        const providers = [];
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue; // Skip empty lines
            
            try {
                const values = this.parseCSVLine(line);
                const provider = {};
                
                headers.forEach((header, index) => {
                    provider[header] = (values[index] || '').trim();
                });
                
                // Validate required fields
                if (provider.Company && provider.Category) {
                    // Add unique ID based on company name and contact
                    provider.id = this.generateId(provider.Company, provider.Contact);
                    providers.push(provider);
                }
            } catch (parseError) {
                console.warn(`Error parsing CSV line ${i + 1}: ${parseError.message}`);
            }
        }
        
        return providers;
    }

    /**
     * Parse a single CSV line handling quoted values and commas
     */
    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        let i = 0;
        
        while (i < line.length) {
            const char = line[i];
            
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    // Handle escaped quotes ("")
                    current += '"';
                    i += 2;
                } else {
                    // Toggle quote state
                    inQuotes = !inQuotes;
                    i++;
                }
            } else if (char === ',' && !inQuotes) {
                // End of field
                values.push(current);
                current = '';
                i++;
            } else {
                current += char;
                i++;
            }
        }
        
        // Add the last field
        values.push(current);
        
        return values;
    }

    /**
     * Generate a consistent ID for a provider
     */
    generateId(company, contact) {
        const key = `${company}-${contact || 'no-contact'}`.toLowerCase();
        return btoa(key).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);
    }

    /**
     * Session storage cache management
     */
    updateSessionCache(data) {
        try {
            sessionStorage.setItem('providers_cache', JSON.stringify({
                data: data,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.warn('Failed to update session cache:', error);
        }
    }

    getSessionCache() {
        try {
            const cached = sessionStorage.getItem('providers_cache');
            if (!cached) return null;
            
            const { data, timestamp } = JSON.parse(cached);
            
            // Check if cache is still valid
            if (Date.now() - timestamp > this.cacheTimeout) {
                sessionStorage.removeItem('providers_cache');
                return null;
            }
            
            return data;
        } catch (error) {
            sessionStorage.removeItem('providers_cache');
            return null;
        }
    }

    /**
     * Force refresh data from GitHub
     */
    async refreshData() {
        return await this.getProviders(true);
    }

    /**
     * Utility delay function
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * Application State Manager
 */
class AppState {
    constructor() {
        this.serviceProviders = [];
        this.filteredProviders = [];
        this.currentCategory = 'all';
        this.currentSearchTerm = '';
        this.isAdminMode = false;
        this.isLoading = false;
        this.autoRefreshTimer = null;
    }

    setProviders(providers) {
        this.serviceProviders = providers;
        this.applyFilters();
    }

    setCategory(category) {
        this.currentCategory = category;
        this.applyFilters();
    }

    setSearchTerm(term) {
        this.currentSearchTerm = term.toLowerCase().trim();
        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.serviceProviders];

        // Apply category filter
        if (this.currentCategory && this.currentCategory !== 'all') {
            filtered = filtered.filter(provider => 
                provider.Category === this.currentCategory
            );
        }

        // Apply search filter
        if (this.currentSearchTerm) {
            filtered = filtered.filter(provider => {
                const searchText = [
                    provider.Company,
                    provider.Category,
                    provider.Specialty,
                    provider.Contact,
                    provider.Service_Area
                ].join(' ').toLowerCase();
                
                return searchText.includes(this.currentSearchTerm);
            });
        }

        this.filteredProviders = filtered;
    }

    getFilteredProviders() {
        return this.filteredProviders;
    }

    setLoading(loading) {
        this.isLoading = loading;
    }

    setAdminMode(isAdmin) {
        this.isAdminMode = isAdmin;
    }
}

/**
 * UI Manager
 */
class UIManager {
    constructor(appState) {
        this.state = appState;
        this.elements = {};
        this.initializeElements();
    }

    initializeElements() {
        this.elements = {
            // Search and filters
            searchInput: document.getElementById('searchInput'),
            filterButtons: document.querySelectorAll('.filter-btn'),
            
            // Admin controls
            adminToggle: document.getElementById('adminToggle'),
            adminControls: document.getElementById('adminControls'),
            
            // Content areas
            providersGrid: document.getElementById('providersGrid'),
            noResults: document.getElementById('noResults'),
            
            // Status indicators
            dataStatus: document.getElementById('dataStatus'),
            lastUpdated: document.getElementById('lastUpdated')
        };
    }

    showLoading() {
        const existingLoader = document.getElementById('loading-indicator');
        if (existingLoader) return;
        
        const loader = document.createElement('div');
        loader.id = 'loading-indicator';
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--color-surface);
                padding: var(--space-24);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                z-index: 3000;
                text-align: center;
                min-width: 200px;
            ">
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 4px solid var(--color-border);
                    border-top: 4px solid var(--color-primary);
                    border-radius: 50%;
                    margin: 0 auto var(--space-16) auto;
                    animation: spin 1s linear infinite;
                "></div>
                <p style="margin: 0; color: var(--color-text);">
                    Loading provider data from GitHub...
                </p>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.body.appendChild(loader);
    }

    hideLoading() {
        const loader = document.getElementById('loading-indicator');
        if (loader) {
            loader.remove();
        }
    }

    renderProviders(providers) {
        const grid = this.elements.providersGrid;
        const noResults = this.elements.noResults;
        
        if (!grid || !noResults) return;

        // Clear grid
        grid.innerHTML = '';

        // Show/hide no results
        if (providers.length === 0) {
            noResults.style.display = 'block';
            return;
        } else {
            noResults.style.display = 'none';
        }

        // Create provider cards
        providers.forEach(provider => {
            const card = this.createProviderCard(provider);
            grid.appendChild(card);
        });
    }

    createProviderCard(provider) {
        const card = document.createElement('div');
        card.className = 'provider-card';
        card.setAttribute('data-provider-id', provider.id);

        // Clean and prepare contact information
        const phone = provider.number ? provider.number.trim() : '';
        const email = provider.email ? provider.email.trim() : '';
        const cleanPhone = phone.replace(/[^0-9+\-\s()]/g, '');

        // Build contact buttons
        let contactHTML = '';
        if (phone) {
            contactHTML += `
                <a href="tel:${cleanPhone.replace(/[^0-9+]/g, '')}" 
                   class="provider-card__phone">
                    📞 ${this.escapeHtml(phone)}
                </a>
            `;
        }
        if (email) {
            contactHTML += `
                <a href="mailto:${this.escapeHtml(email)}" 
                   class="provider-card__email">
                    ✉️ Email
                </a>
            `;
        }

        // Admin controls (only in admin mode)
        let adminControlsHTML = '';
        if (this.state.isAdminMode) {
            adminControlsHTML = `
                <div class="admin-card-controls">
                    <button class="btn btn--sm btn--edit" 
                            onclick="showGitHubEditInstructions('${this.escapeHtml(provider.Company)}', '${provider.id}')">
                        GitHub Edit
                    </button>
                    <button class="btn btn--sm btn--delete" 
                            onclick="showGitHubDeleteInstructions('${this.escapeHtml(provider.Company)}')">
                        GitHub Delete
                    </button>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="provider-card__header">
                <h3 class="provider-card__company">${this.escapeHtml(provider.Company)}</h3>
                ${provider.Contact ? `<p class="provider-card__contact-name">${this.escapeHtml(provider.Contact)}</p>` : ''}
            </div>
            
            <div class="provider-card__category">${this.escapeHtml(provider.Category)}</div>
            
            <div class="provider-card__content">
                ${provider.Specialty ? `<p class="provider-card__specialty">${this.escapeHtml(provider.Specialty)}</p>` : ''}
                <p class="provider-card__service-area">
                    <strong>Service Area:</strong> ${this.escapeHtml(provider.Service_Area)}
                </p>
                ${provider.Testimonial ? `
                    <blockquote class="provider-card__testimonial">
                        "${this.escapeHtml(provider.Testimonial)}"
                    </blockquote>
                ` : ''}
            </div>
            
            ${contactHTML ? `<div class="provider-card__contact">${contactHTML}</div>` : ''}
            ${adminControlsHTML}
        `;

        return card;
    }

    updateFilterButtons(activeCategory) {
        this.elements.filterButtons.forEach(button => {
            const category = button.getAttribute('data-category');
            if (category === activeCategory) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    updateAdminMode(isAdmin) {
        const toggle = this.elements.adminToggle;
        const controls = this.elements.adminControls;
        
        if (toggle) {
            if (isAdmin) {
                toggle.textContent = 'Exit Admin';
                toggle.classList.add('btn--primary');
                toggle.classList.remove('btn--outline');
            } else {
                toggle.textContent = 'Admin Mode';
                toggle.classList.remove('btn--primary');
                toggle.classList.add('btn--outline');
            }
        }
        
        if (controls) {
            if (isAdmin) {
                controls.classList.remove('hidden');
            } else {
                controls.classList.add('hidden');
            }
        }
    }

    updateLastRefreshed() {
        const now = new Date().toLocaleString();
        const lastUpdatedEl = this.elements.lastUpdated;
        
        if (lastUpdatedEl) {
            lastUpdatedEl.textContent = `Last refreshed: ${now}`;
        }
        
        // Also update footer timestamp
        const footerTimestamp = document.getElementById('footerLastUpdated');
        if (footerTimestamp) {
            footerTimestamp.textContent = now;
        }
    }

    showMessage(text, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        const message = document.createElement('div');
        message.className = `message message--${type}`;
        message.textContent = text;
        document.body.appendChild(message);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

/**
 * GitHub Integration Manager
 */
class GitHubManager {
    constructor(csvUrl) {
        this.csvUrl = csvUrl;
    }

    showEditInstructions(companyName, providerId) {
        const instructions = `
            <div class="github-instructions">
                <h4>Edit "${companyName}" on GitHub</h4>
                <ol>
                    <li>Go to your GitHub repository</li>
                    <li>Open the <code>providers.csv</code> file</li>
                    <li>Click the edit button (pencil icon)</li>
                    <li>Find the row for "${companyName}"</li>
                    <li>Make your changes</li>
                    <li>Commit with a descriptive message</li>
                    <li>Return here and click "Refresh Data"</li>
                </ol>
                <p><strong>GitHub CSV File:</strong><br>
                <a href="${this.getGitHubEditUrl()}" target="_blank">
                    Edit on GitHub →
                </a></p>
                <div class="csv-format-help">
                    <strong>CSV Format:</strong><br>
                    <code>Company,Contact,email,number,Main Location,Category,Specialty,Service_Area,Testimonial</code>
                </div>
            </div>
        `;
        
        this.showInstructionsModal('GitHub Edit Instructions', instructions);
    }

    showDeleteInstructions(companyName) {
        const instructions = `
            <div class="github-instructions">
                <h4>Delete "${companyName}" from GitHub</h4>
                <ol>
                    <li>Go to your GitHub repository</li>
                    <li>Open the <code>providers.csv</code> file</li>
                    <li>Click the edit button (pencil icon)</li>
                    <li>Find and delete the entire row for "${companyName}"</li>
                    <li>Commit with a descriptive message</li>
                    <li>Return here and click "Refresh Data"</li>
                </ol>
                <p><strong>GitHub CSV File:</strong><br>
                <a href="${this.getGitHubEditUrl()}" target="_blank">
                    Edit on GitHub →
                </a></p>
                <div class="warning">
                    <strong>⚠️ Warning:</strong> This action cannot be undone. Make sure you have a backup.
                </div>
            </div>
        `;
        
        this.showInstructionsModal('GitHub Delete Instructions', instructions);
    }

    showAddInstructions() {
        const instructions = `
            <div class="github-instructions">
                <h4>Add New Provider on GitHub</h4>
                <ol>
                    <li>Go to your GitHub repository</li>
                    <li>Open the <code>providers.csv</code> file</li>
                    <li>Click the edit button (pencil icon)</li>
                    <li>Add a new row at the end with provider details</li>
                    <li>Follow the CSV format exactly</li>
                    <li>Commit with a descriptive message</li>
                    <li>Return here and click "Refresh Data"</li>
                </ol>
                <p><strong>GitHub CSV File:</strong><br>
                <a href="${this.getGitHubEditUrl()}" target="_blank">
                    Edit on GitHub →
                </a></p>
                <div class="csv-format-help">
                    <strong>CSV Format Example:</strong><br>
                    <code>New Company,John Doe,john@example.com,(260) 555-0123,46825,Home Services,Professional services,Fort Wayne area,Great service!</code>
                </div>
            </div>
        `;
        
        this.showInstructionsModal('GitHub Add Instructions', instructions);
    }

    getGitHubEditUrl() {
        return this.csvUrl.replace('/raw.githubusercontent.com/', '/github.com/')
                          .replace('/main/', '/edit/main/');
    }

    showInstructionsModal(title, content) {
        // Remove existing modal if any
        const existingModal = document.getElementById('instructionsModal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'instructionsModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal__content modal__content--large">
                <h3>${title}</h3>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal__actions">
                    <button class="btn btn--secondary" onclick="hideInstructionsModal()">
                        Close
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.remove('hidden');

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideInstructionsModal();
            }
        });
    }

    hideInstructionsModal() {
        const modal = document.getElementById('instructionsModal');
        if (modal) {
            modal.remove();
        }
    }
}

/**
 * Auto-refresh Manager
 */
class AutoRefreshManager {
    constructor(dataManager, uiManager) {
        this.dataManager = dataManager;
        this.uiManager = uiManager;
        this.intervalId = null;
        this.isActive = false;
    }

    start(intervalMs = CONFIG.AUTO_REFRESH_INTERVAL) {
        if (this.intervalId) return; // Already running

        this.intervalId = setInterval(async () => {
            // Only auto-refresh when not in admin mode
            if (!window.appState?.isAdminMode) {
                try {
                    console.log('Auto-refreshing data from GitHub...');
                    const providers = await this.dataManager.refreshData();
                    window.appState.setProviders(providers);
                    this.uiManager.renderProviders(window.appState.getFilteredProviders());
                    this.uiManager.updateLastRefreshed();
                    
                    console.log(`Auto-refresh completed: ${providers.length} providers loaded`);
                } catch (error) {
                    console.warn('Auto-refresh failed:', error);
                }
            }
        }, intervalMs);

        this.isActive = true;
        console.log(`Auto-refresh started (${intervalMs / 1000}s interval)`);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isActive = false;
            console.log('Auto-refresh stopped');
        }
    }

    restart(intervalMs) {
        this.stop();
        this.start(intervalMs);
    }
}

// Global application instances
let dataManager;
let appState;
let uiManager;
let githubManager;
let autoRefreshManager;

/**
 * Application initialization
 */
async function initializeApp() {
    try {
        console.log('🚀 Initializing Fort Wayne Service Directory...');
        
        // Initialize managers
        dataManager = new GitHubDataManager(CONFIG.GITHUB_CSV_URL);
        appState = new AppState();
        uiManager = new UIManager(appState);
        githubManager = new GitHubManager(CONFIG.GITHUB_CSV_URL);
        autoRefreshManager = new AutoRefreshManager(dataManager, uiManager);
        
        // Make managers globally available
        window.dataManager = dataManager;
        window.appState = appState;
        window.uiManager = uiManager;
        window.githubManager = githubManager;
        
        // Set up event handlers
        setupEventHandlers();
        
        // Load initial data
        await loadInitialData();
        
        // Start auto-refresh
        autoRefreshManager.start();
        
        console.log('✅ Application initialized successfully');
        
    } catch (error) {
        console.error('❌ Application initialization failed:', error);
        uiManager.showMessage('Failed to initialize application. Please refresh the page.', 'error');
    }
}

async function loadInitialData() {
    try {
        uiManager.showLoading();
        appState.setLoading(true);
        
        console.log('📡 Loading provider data from GitHub...');
        const providers = await dataManager.getProviders();
        
        appState.setProviders(providers);
        uiManager.renderProviders(appState.getFilteredProviders());
        uiManager.updateLastRefreshed();
        
        console.log(`✅ Loaded ${providers.length} providers from GitHub`);
        uiManager.showMessage(`Loaded ${providers.length} providers from GitHub`, 'success');
        
    } catch (error) {
        console.error('❌ Failed to load provider data:', error);
        uiManager.showMessage('Failed to load provider data. Please check your internet connection.', 'error');
    } finally {
        uiManager.hideLoading();
        appState.setLoading(false);
    }
}

/**
 * Event Handlers Setup
 */
function setupEventHandlers() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                appState.setSearchTerm('');
                uiManager.renderProviders(appState.getFilteredProviders());
            }
        });
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // Admin controls
    setupAdminHandlers();
    
    // Data refresh button
    const refreshBtn = document.getElementById('refreshDataBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', handleDataRefresh);
    }
}

function handleSearchInput(e) {
    appState.setSearchTerm(e.target.value);
    uiManager.renderProviders(appState.getFilteredProviders());
}

function handleFilterClick(e) {
    e.preventDefault();
    
    const category = this.getAttribute('data-category');
    appState.setCategory(category);
    uiManager.updateFilterButtons(category);
    uiManager.renderProviders(appState.getFilteredProviders());
}

async function handleDataRefresh(e) {
    if (e) e.preventDefault();
    
    const button = e?.target || document.getElementById('refreshDataBtn');
    if (!button) return;
    
    const originalText = button.textContent;
    
    try {
        button.disabled = true;
        button.textContent = 'Refreshing...';
        
        console.log('🔄 Manual data refresh requested');
        const providers = await dataManager.refreshData();
        
        appState.setProviders(providers);
        uiManager.renderProviders(appState.getFilteredProviders());
        uiManager.updateLastRefreshed();
        
        button.textContent = 'Refreshed!';
        uiManager.showMessage(`Refreshed ${providers.length} providers from GitHub`, 'success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('❌ Manual refresh failed:', error);
        button.textContent = 'Refresh Failed';
        uiManager.showMessage('Failed to refresh data. Please try again.', 'error');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);
    }
}

/**
 * Admin Mode Handlers
 */
function setupAdminHandlers() {
    // Admin toggle
    const adminToggle = document.getElementById('adminToggle');
    if (adminToggle) {
        adminToggle.addEventListener('click', handleAdminToggle);
    }

    // Admin control buttons
    const addProviderBtn = document.getElementById('addProviderBtn');
    if (addProviderBtn) {
        addProviderBtn.addEventListener('click', () => {
            githubManager.showAddInstructions();
        });
    }

    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', handleDataExport);
    }

    // Password modal handlers
    setupPasswordModal();
}

function handleAdminToggle(e) {
    e.preventDefault();
    
    if (appState.isAdminMode) {
        exitAdminMode();
    } else {
        showPasswordModal();
    }
}

function setupPasswordModal() {
    const passwordSubmit = document.getElementById('passwordSubmit');
    const passwordCancel = document.getElementById('passwordCancel');
    const passwordInput = document.getElementById('adminPassword');

    if (passwordSubmit) {
        passwordSubmit.addEventListener('click', handlePasswordSubmit);
    }

    if (passwordCancel) {
        passwordCancel.addEventListener('click', hidePasswordModal);
    }

    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handlePasswordSubmit();
            }
        });
    }

    // Modal backdrop close
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hidePasswordModal();
            }
        });
    }
}

function showPasswordModal() {
    const modal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('adminPassword');
    const errorDiv = document.getElementById('passwordError');

    if (modal && passwordInput && errorDiv) {
        modal.classList.remove('hidden');
        passwordInput.value = '';
        errorDiv.classList.add('hidden');
        setTimeout(() => passwordInput.focus(), 100);
    }
}

function hidePasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function handlePasswordSubmit() {
    const passwordInput = document.getElementById('adminPassword');
    const errorDiv = document.getElementById('passwordError');

    if (!passwordInput || !errorDiv) return;

    const password = passwordInput.value;
    
    if (password === CONFIG.ADMIN_PASSWORD) {
        enterAdminMode();
        hidePasswordModal();
    } else {
        errorDiv.classList.remove('hidden');
        passwordInput.select();
    }
}

function enterAdminMode() {
    appState.setAdminMode(true);
    uiManager.updateAdminMode(true);
    uiManager.renderProviders(appState.getFilteredProviders()); // Re-render to show admin controls
    uiManager.showMessage('Admin mode activated - GitHub editing enabled', 'success');
    
    // Pause auto-refresh in admin mode
    autoRefreshManager.stop();
}

function exitAdminMode() {
    appState.setAdminMode(false);
    uiManager.updateAdminMode(false);
    uiManager.renderProviders(appState.getFilteredProviders()); // Re-render to hide admin controls
    uiManager.showMessage('Admin mode deactivated', 'success');
    
    // Resume auto-refresh
    autoRefreshManager.start();
}

/**
 * Data Export Handler
 */
async function handleDataExport() {
    try {
        const providers = await dataManager.getProviders();
        const csvContent = convertToCSV(providers);
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `fort-wayne-providers-${new Date().toISOString().split('T')[0]}.csv`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        uiManager.showMessage('Provider data exported successfully', 'success');
        
    } catch (error) {
        console.error('Export failed:', error);
        uiManager.showMessage('Failed to export data', 'error');
    }
}

function convertToCSV(data) {
    const headers = ['Company', 'Contact', 'email', 'number', 'Main Location', 'Category', 'Specialty', 'Service_Area', 'Testimonial'];
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(provider => {
        return headers.map(header => {
            const value = provider[header] || '';
            return `"${value.toString().replace(/"/g, '""')}"`;
        }).join(',');
    });
    
    return [csvHeaders, ...csvRows].join('\n');
}

/**
 * Global functions for GitHub instructions (called from card buttons)
 */
window.showGitHubEditInstructions = function(companyName, providerId) {
    githubManager.showEditInstructions(companyName, providerId);
};

window.showGitHubDeleteInstructions = function(companyName) {
    githubManager.showDeleteInstructions(companyName);
};

window.hideInstructionsModal = function() {
    githubManager.hideInstructionsModal();
};

/**
 * Application lifecycle handlers
 */
document.addEventListener('DOMContentLoaded', initializeApp);

window.addEventListener('beforeunload', () => {
    if (autoRefreshManager) {
        autoRefreshManager.stop();
    }
});

// Handle visibility changes to pause/resume auto-refresh
document.addEventListener('visibilitychange', () => {
    if (autoRefreshManager) {
        if (document.hidden) {
            autoRefreshManager.stop();
        } else {
            autoRefreshManager.start();
        }
    }
});

console.log('🏠 Fort Wayne Service Directory - GitHub Edition loaded');
