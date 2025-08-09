// Default service provider data
const defaultProviders = [
  {
    "Company": "Ace Handyman Services",
    "Contact": "Joe Barendse",
    "email": "ldorm@acehandymanservices.com",
    "number": "574-385-9855",
    "Main Location": 46804,
    "Category": "Home Services",
    "Specialty": "Professional handyman services",
    "Service_Area": "Fort Wayne area",
    "Testimonial": "Reliable handyman solutions for your home"
  },
  {
    "Company": "Ruoff Mortgage",
    "Contact": "Tracy Adams",
    "email": "tadams@ruoff.com",
    "number": "(260) 615-4761",
    "Main Location": 46825,
    "Category": "Mortgage Lender",
    "Specialty": "The Midwest's #1 Mortgage Lender",
    "Service_Area": "Fort Wayne area",
    "Testimonial": "Opening doors with expert loan officers"
  },
  {
    "Company": "Aardvark Home Inspectors, Inc.",
    "Contact": "Cory Ade",
    "email": "customercare@aardvarkfortwayne.com",
    "number": "",
    "Main Location": 46818,
    "Category": "Home Inspector",
    "Specialty": "Professional home inspections",
    "Service_Area": "Fort Wayne area",
    "Testimonial": "Thorough inspections you can trust"
  },
  {
    "Company": "Meridian Title Corporation",
    "Contact": "Chris Alexander",
    "email": "calexander@meridiantitle.com",
    "number": "(260) 246-1687",
    "Main Location": 46835,
    "Category": "Title Company",
    "Specialty": "Professional title services",
    "Service_Area": "Fort Wayne area",
    "Testimonial": "Reliable title and escrow services"
  },
  {
    "Company": "Better Organized Spaces Fort Wayne",
    "Contact": "Jason Spuller",
    "email": "jason@betterorgspaces.com",
    "number": "(260) 444-2459",
    "Main Location": 46845,
    "Category": "Home Services",
    "Specialty": "Home organization solutions",
    "Service_Area": "Fort Wayne area",
    "Testimonial": "Transform your spaces with professional organization"
  },
  {
    "Company": "National Property Inspections",
    "Contact": "Blake Evans",
    "email": "info@npiweb.com",
    "number": "(260) 705-9835",
    "Main Location": 46818,
    "Category": "Home Inspector",
    "Specialty": "Certified Professional Inspector, Mold & WDI certified",
    "Service_Area": "Fort Wayne, Leo, Auburn, New Haven, Huntertown, Churubusco",
    "Testimonial": "Top-rated home inspections with comprehensive digital reports"
  },
  {
    "Company": "Apex Inspect LLC",
    "Contact": "Tyler Battershell",
    "email": "info@apexinspectllc.com",
    "number": "(260) 888-5127",
    "Main Location": 46825,
    "Category": "Home Inspector",
    "Specialty": "CHI & PHI Certified, InterNACHI member",
    "Service_Area": "Fort Wayne and surrounding areas",
    "Testimonial": "Professional home inspection minimizing your risk"
  },
  {
    "Company": "A-Pro Home Inspection",
    "Contact": "Joe Sunderman",
    "email": "info@homeinspectionfortwaynein.com",
    "number": "(260) 994-2776",
    "Main Location": 46825,
    "Category": "Home Inspector",
    "Specialty": "500-point inspection, foundation level survey included",
    "Service_Area": "Fort Wayne and surrounding communities",
    "Testimonial": "Industry-leading inspections with comprehensive coverage"
  },
  {
    "Company": "KTL Performance Mortgage",
    "Contact": "Performance Team",
    "email": "info@performancemortgageone.com",
    "number": "(260) 470-9999",
    "Main Location": 46805,
    "Category": "Mortgage Lender",
    "Specialty": "Wholesale lending, quick funding, local expertise",
    "Service_Area": "Fort Wayne and Northeast Indiana",
    "Testimonial": "11+ years serving Fort Wayne with local expertise"
  },
  {
    "Company": "First Merchants Bank Mortgage",
    "Contact": "Mortgage Team",
    "email": "info@firstmerchants.com",
    "number": "1-800-205-3464",
    "Main Location": 46802,
    "Category": "Mortgage Lender",
    "Specialty": "Full range of loan programs, first-time buyers",
    "Service_Area": "Fort Wayne area",
    "Testimonial": "Comprehensive mortgage solutions with local guidance"
  },
  {
    "Company": "Titan Title Services",
    "Contact": "Title Team",
    "email": "info@titantitle.us",
    "number": "(260) 467-1333",
    "Main Location": 46802,
    "Category": "Title Company",
    "Specialty": "Five national underwriters, 300+ years experience",
    "Service_Area": "Fort Wayne area",
    "Testimonial": "More than title insurance - it's title ASSURANCE"
  },
  {
    "Company": "Centurion Land Title",
    "Contact": "Service Team",
    "email": "info@centurionlandtitle.com",
    "number": "(260) 385-8000",
    "Main Location": 46825,
    "Category": "Title Company",
    "Specialty": "Award-winning title company with 50,000+ closings",
    "Service_Area": "Fort Wayne area",
    "Testimonial": "Fast, friendly, and accurate title services"
  },
  {
    "Company": "MJM Mechanical",
    "Contact": "Service Team",
    "email": "info@mjmfortwayne.com",
    "number": "(260) 483-0878",
    "Main Location": 46825,
    "Category": "Plumbing",
    "Specialty": "24/7 emergency service, residential & commercial",
    "Service_Area": "Fort Wayne and surrounding areas",
    "Testimonial": "Licensed plumbers ready to help with any plumbing need"
  },
  {
    "Company": "Mr. Rooter Plumbing Fort Wayne",
    "Contact": "Service Team",
    "email": "info@mrrooter.com",
    "number": "(260) 555-0124",
    "Main Location": 46825,
    "Category": "Plumbing",
    "Specialty": "Licensed, insured, guaranteed work",
    "Service_Area": "Fort Wayne and surrounding areas",
    "Testimonial": "Highly-rated local pros with latest techniques"
  },
  {
    "Company": "Fire & Ice HVAC",
    "Contact": "Service Team",
    "email": "info@fireicehvac.com",
    "number": "(260) 250-3990",
    "Main Location": 46748,
    "Category": "HVAC",
    "Specialty": "Locally owned, furnace & AC services",
    "Service_Area": "Fort Wayne and Allen County",
    "Testimonial": "Fort Wayne's expert heating and cooling company"
  },
  {
    "Company": "Old Fort Roofing",
    "Contact": "Scott",
    "email": "scott@oldfortroofing.com",
    "number": "(260) 486-9001",
    "Main Location": 46825,
    "Category": "Roofing",
    "Specialty": "40+ years experience, Owens Corning Platinum Preferred",
    "Service_Area": "Fort Wayne, Huntertown, New Haven, Auburn",
    "Testimonial": "Second generation company with 35+ years roofing Fort Wayne"
  },
  {
    "Company": "Graber Roofing & Gutters",
    "Contact": "Service Team",
    "email": "info@graberroofing.com",
    "number": "(260) 555-0127",
    "Main Location": 46825,
    "Category": "Roofing",
    "Specialty": "Family-owned, A+ BBB rating, certified by top brands",
    "Service_Area": "Northeast Indiana",
    "Testimonial": "Licensed, bonded, insured with exceptional customer service"
  },
  {
    "Company": "Vision Scapes",
    "Contact": "Service Team",
    "email": "info@vision-scapes.com",
    "number": "(260) 555-0129",
    "Main Location": 46825,
    "Category": "Landscaping",
    "Specialty": "25 years serving Northeast Indiana",
    "Service_Area": "Northeast Indiana",
    "Testimonial": "Trusted landscaping with unwavering commitment to excellence"
  },
  {
    "Company": "Leeper's Lawn Service",
    "Contact": "Service Team",
    "email": "info@leeperslawn.com",
    "number": "(260) 747-1105",
    "Main Location": 46825,
    "Category": "Landscaping",
    "Specialty": "Voted Fort Wayne's best lawn & landscape",
    "Service_Area": "Fort Wayne area",
    "Testimonial": "Professional maintenance with personal attention you deserve"
  },
  {
    "Company": "Diamond Homescapes",
    "Contact": "Toby Clark",
    "email": "info@diamondhomescapes.com",
    "number": "(260) 580-7658",
    "Main Location": 46748,
    "Category": "Landscaping",
    "Specialty": "Fencing, decks, hardscapes since 2013",
    "Service_Area": "Huntertown and Allen County",
    "Testimonial": "Premier deck, fence, and hardscaping experts"
  },
  {
    "Company": "Three Rivers Federal Credit Union",
    "Contact": "Elizabeth Neal",
    "email": "lneal@trfcu.org",
    "number": "(260) 417-0104",
    "Main Location": 46825,
    "Category": "Banking",
    "Specialty": "Local credit union with mortgage services",
    "Service_Area": "Fort Wayne area",
    "Testimonial": "Member-focused financial services"
  }
];

// Application state
let serviceProviders = [];
let currentCategory = 'all';
let currentSearchTerm = '';
let isAdminMode = false;
let editingProviderId = null;
let currentConfirmAction = null;
const ADMIN_PASSWORD = 'michael2025';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadServiceProviders();
    setupEventHandlers();
    renderProviders(serviceProviders);
}

// Data management functions
function loadServiceProviders() {
    const saved = localStorage.getItem('serviceProviders');
    if (saved) {
        try {
            serviceProviders = JSON.parse(saved);
        } catch (error) {
            console.error('Error loading saved providers:', error);
            serviceProviders = [...defaultProviders];
            saveServiceProviders();
        }
    } else {
        serviceProviders = [...defaultProviders];
        saveServiceProviders();
    }
}

function saveServiceProviders() {
    try {
        localStorage.setItem('serviceProviders', JSON.stringify(serviceProviders));
    } catch (error) {
        console.error('Error saving providers:', error);
    }
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Event handler setup
function setupEventHandlers() {
    setupSearchHandler();
    setupFilterHandlers();
    setupAdminHandlers();
    setupModalHandlers();
}

function setupSearchHandler() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // Clear any existing event listeners
        searchInput.removeEventListener('input', handleSearchInput);
        searchInput.addEventListener('input', handleSearchInput);
        
        // Allow clearing the search
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                currentSearchTerm = '';
                applyFiltersAndRender();
            }
        });
    }
}

function handleSearchInput(e) {
    currentSearchTerm = e.target.value.toLowerCase().trim();
    applyFiltersAndRender();
}

function setupFilterHandlers() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current category
            currentCategory = this.getAttribute('data-category');
            applyFiltersAndRender();
        });
    });
}

function setupAdminHandlers() {
    // Admin toggle button
    const adminToggle = document.getElementById('adminToggle');
    if (adminToggle) {
        adminToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isAdminMode) {
                exitAdminMode();
            } else {
                showPasswordModal();
            }
        });
    }

    // Admin control buttons
    const exitAdminBtn = document.getElementById('exitAdminBtn');
    if (exitAdminBtn) {
        exitAdminBtn.addEventListener('click', function(e) {
            e.preventDefault();
            exitAdminMode();
        });
    }

    const addProviderBtn = document.getElementById('addProviderBtn');
    if (addProviderBtn) {
        addProviderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            editingProviderId = null;
            showProviderModal();
        });
    }

    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', function(e) {
            e.preventDefault();
            exportToCSV();
        });
    }

    const importDataBtn = document.getElementById('importDataBtn');
    if (importDataBtn) {
        importDataBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('importFileInput').click();
        });
    }

    const importFileInput = document.getElementById('importFileInput');
    if (importFileInput) {
        importFileInput.addEventListener('change', handleCSVImport);
    }
}

function setupModalHandlers() {
    // Password modal
    const passwordSubmit = document.getElementById('passwordSubmit');
    if (passwordSubmit) {
        passwordSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            handlePasswordSubmit();
        });
    }

    const passwordCancel = document.getElementById('passwordCancel');
    if (passwordCancel) {
        passwordCancel.addEventListener('click', function(e) {
            e.preventDefault();
            hidePasswordModal();
        });
    }

    const adminPassword = document.getElementById('adminPassword');
    if (adminPassword) {
        adminPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handlePasswordSubmit();
            }
        });
    }

    // Provider modal
    const saveProvider = document.getElementById('saveProvider');
    if (saveProvider) {
        saveProvider.addEventListener('click', function(e) {
            e.preventDefault();
            handleSaveProvider();
        });
    }

    const cancelProvider = document.getElementById('cancelProvider');
    if (cancelProvider) {
        cancelProvider.addEventListener('click', function(e) {
            e.preventDefault();
            hideProviderModal();
        });
    }

    // Confirmation modal
    const confirmYes = document.getElementById('confirmYes');
    if (confirmYes) {
        confirmYes.addEventListener('click', function(e) {
            e.preventDefault();
            handleConfirmYes();
        });
    }

    const confirmNo = document.getElementById('confirmNo');
    if (confirmNo) {
        confirmNo.addEventListener('click', function(e) {
            e.preventDefault();
            hideConfirmModal();
        });
    }

    // Close modals on backdrop click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            if (e.target.id === 'passwordModal') hidePasswordModal();
            else if (e.target.id === 'providerModal') hideProviderModal();
            else if (e.target.id === 'confirmModal') hideConfirmModal();
        }
    });
}

// Admin authentication
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
    if (password === ADMIN_PASSWORD) {
        enterAdminMode();
        hidePasswordModal();
    } else {
        errorDiv.classList.remove('hidden');
        passwordInput.select();
    }
}

function enterAdminMode() {
    isAdminMode = true;
    
    const adminControls = document.getElementById('adminControls');
    const adminToggle = document.getElementById('adminToggle');
    
    if (adminControls) {
        adminControls.classList.remove('hidden');
    }
    
    if (adminToggle) {
        adminToggle.textContent = 'Exit Admin';
        adminToggle.classList.add('btn--primary');
        adminToggle.classList.remove('btn--outline');
    }
    
    renderProviders(getFilteredProviders());
    showMessage('Admin mode activated', 'success');
}

function exitAdminMode() {
    isAdminMode = false;
    
    const adminControls = document.getElementById('adminControls');
    const adminToggle = document.getElementById('adminToggle');
    
    if (adminControls) {
        adminControls.classList.add('hidden');
    }
    
    if (adminToggle) {
        adminToggle.textContent = 'Admin Mode';
        adminToggle.classList.remove('btn--primary');
        adminToggle.classList.add('btn--outline');
    }
    
    renderProviders(getFilteredProviders());
    showMessage('Exited admin mode', 'success');
}

// Provider modal functions
function showProviderModal(provider = null) {
    const modal = document.getElementById('providerModal');
    const title = document.getElementById('providerModalTitle');
    const form = document.getElementById('providerForm');
    
    if (!modal || !title || !form) return;
    
    if (provider) {
        title.textContent = 'Edit Provider';
        editingProviderId = provider.id;
        
        // Populate form fields safely
        const fields = [
            ['company', provider.Company],
            ['contact', provider.Contact],
            ['phone', provider.number],
            ['email', provider.email],
            ['category', provider.Category],
            ['specialty', provider.Specialty],
            ['serviceArea', provider.Service_Area],
            ['testimonial', provider.Testimonial]
        ];
        
        fields.forEach(([id, value]) => {
            const field = document.getElementById(id);
            if (field) {
                field.value = value || '';
            }
        });
    } else {
        title.textContent = 'Add New Provider';
        editingProviderId = null;
        form.reset();
    }
    
    modal.classList.remove('hidden');
    
    const companyField = document.getElementById('company');
    if (companyField) {
        setTimeout(() => companyField.focus(), 100);
    }
}

function hideProviderModal() {
    const modal = document.getElementById('providerModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    editingProviderId = null;
}

function handleSaveProvider() {
    const form = document.getElementById('providerForm');
    if (!form) return;
    
    const formData = new FormData(form);
    
    // Validate required fields
    const company = formData.get('company');
    const category = formData.get('category');
    
    if (!company || !category) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    const providerData = {
        Company: company,
        Contact: formData.get('contact') || '',
        number: formData.get('phone') || '',
        email: formData.get('email') || '',
        Category: category,
        Specialty: formData.get('specialty') || '',
        Service_Area: formData.get('serviceArea') || '',
        Testimonial: formData.get('testimonial') || '',
        Main_Location: 46825
    };
    
    if (editingProviderId) {
        // Update existing provider
        const index = serviceProviders.findIndex(p => p.id === editingProviderId);
        if (index !== -1) {
            serviceProviders[index] = { ...providerData, id: editingProviderId };
            showMessage('Provider updated successfully', 'success');
        }
    } else {
        // Add new provider
        providerData.id = generateId();
        serviceProviders.push(providerData);
        showMessage('Provider added successfully', 'success');
    }
    
    saveServiceProviders();
    applyFiltersAndRender();
    hideProviderModal();
}

// Delete provider
function deleteProvider(providerId) {
    const provider = serviceProviders.find(p => p.id === providerId);
    if (!provider) return;
    
    showConfirmModal(
        `Are you sure you want to delete "${provider.Company}"?`,
        () => {
            serviceProviders = serviceProviders.filter(p => p.id !== providerId);
            saveServiceProviders();
            applyFiltersAndRender();
            showMessage('Provider deleted successfully', 'success');
        }
    );
}

// Confirmation modal
function showConfirmModal(message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    const messageEl = document.getElementById('confirmMessage');
    
    if (!modal || !messageEl) return;
    
    messageEl.textContent = message;
    modal.classList.remove('hidden');
    currentConfirmAction = onConfirm;
}

function hideConfirmModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    currentConfirmAction = null;
}

function handleConfirmYes() {
    if (currentConfirmAction) {
        currentConfirmAction();
    }
    hideConfirmModal();
}

// CSV Export/Import
function exportToCSV() {
    try {
        const csvContent = convertToCSV(serviceProviders);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'service-providers.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        showMessage('Data exported successfully', 'success');
    } catch (error) {
        console.error('Export error:', error);
        showMessage('Error exporting data', 'error');
    }
}

function convertToCSV(data) {
    const headers = ['Company', 'Contact', 'number', 'email', 'Category', 'Specialty', 'Service_Area', 'Testimonial'];
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(provider => {
        return headers.map(header => {
            const value = provider[header] || '';
            return `"${value.toString().replace(/"/g, '""')}"`;
        }).join(',');
    });
    
    return [csvHeaders, ...csvRows].join('\n');
}

function handleCSVImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const csvData = e.target.result;
            const newProviders = parseCSV(csvData);
            
            if (newProviders.length === 0) {
                showMessage('No valid data found in CSV file', 'error');
                return;
            }
            
            showConfirmModal(
                `Import ${newProviders.length} providers? This will replace all existing data.`,
                () => {
                    serviceProviders = newProviders.map(provider => ({
                        ...provider,
                        id: generateId()
                    }));
                    saveServiceProviders();
                    applyFiltersAndRender();
                    showMessage(`Imported ${newProviders.length} providers successfully`, 'success');
                }
            );
        } catch (error) {
            console.error('CSV import error:', error);
            showMessage('Error importing CSV file', 'error');
        }
    };
    reader.readAsText(file);
    
    // Clear the input so the same file can be selected again
    event.target.value = '';
}

function parseCSV(csvData) {
    const lines = csvData.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
    
    return lines.slice(1).map(line => {
        const values = parseCSVLine(line);
        const provider = {};
        
        headers.forEach((header, index) => {
            provider[header] = values[index] || '';
        });
        
        return provider;
    }).filter(provider => provider.Company && provider.Category);
}

function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    values.push(current.trim());
    return values;
}

// Message system
function showMessage(text, type) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const message = document.createElement('div');
    message.className = `message message--${type}`;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

// Filtering and rendering
function applyFiltersAndRender() {
    const filteredProviders = getFilteredProviders();
    renderProviders(filteredProviders);
}

function getFilteredProviders() {
    let filtered = [...serviceProviders];
    
    // Apply category filter
    if (currentCategory && currentCategory !== 'all') {
        filtered = filtered.filter(provider => 
            provider.Category === currentCategory
        );
    }
    
    // Apply search filter
    if (currentSearchTerm) {
        filtered = filtered.filter(provider => {
            const searchText = [
                provider.Company,
                provider.Category,
                provider.Specialty,
                provider.Contact,
                provider.Service_Area
            ].join(' ').toLowerCase();
            
            return searchText.includes(currentSearchTerm);
        });
    }
    
    return filtered;
}

function renderProviders(providers) {
    const grid = document.getElementById('providersGrid');
    const noResults = document.getElementById('noResults');
    
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
    
    // Create cards
    providers.forEach(provider => {
        // Ensure provider has an ID
        if (!provider.id) {
            provider.id = generateId();
        }
        
        const card = createProviderCard(provider);
        grid.appendChild(card);
    });
}

function createProviderCard(provider) {
    const card = document.createElement('div');
    card.className = 'provider-card';
    
    // Clean phone number for tel: link
    const cleanPhone = provider.number ? provider.number.replace(/[^0-9+\-\s()]/g, '') : '';
    
    // Build contact section
    let contactHTML = '';
    if (provider.number && provider.number.trim()) {
        contactHTML += `<a href="tel:${cleanPhone.replace(/[^0-9+]/g, '')}" class="provider-card__phone">📞 ${provider.number}</a>`;
    }
    if (provider.email && provider.email.trim()) {
        contactHTML += `<a href="mailto:${provider.email}" class="provider-card__email">✉️ Email</a>`;
    }
    
    // Admin controls
    let adminControlsHTML = '';
    if (isAdminMode) {
        adminControlsHTML = `
            <div class="admin-card-controls">
                <button class="btn btn--edit" onclick="editProvider('${provider.id}')">Edit</button>
                <button class="btn btn--delete" onclick="confirmDeleteProvider('${provider.id}')">Delete</button>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="provider-card__header">
            <h3 class="provider-card__company">${escapeHtml(provider.Company)}</h3>
            <p class="provider-card__contact-name">${escapeHtml(provider.Contact)}</p>
        </div>
        
        <div class="provider-card__category">${escapeHtml(provider.Category)}</div>
        
        <div class="provider-card__content">
            <p class="provider-card__specialty">${escapeHtml(provider.Specialty)}</p>
            <p class="provider-card__service-area"><strong>Service Area:</strong> ${escapeHtml(provider.Service_Area)}</p>
            <p class="provider-card__testimonial">"${escapeHtml(provider.Testimonial)}"</p>
        </div>
        
        <div class="provider-card__contact">
            ${contactHTML}
        </div>
        
        ${adminControlsHTML}
    `;
    
    return card;
}

// Utility function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Global functions for button clicks
window.editProvider = function(providerId) {
    const provider = serviceProviders.find(p => p.id === providerId);
    if (provider) {
        showProviderModal(provider);
    }
};

window.confirmDeleteProvider = function(providerId) {
    deleteProvider(providerId);
};