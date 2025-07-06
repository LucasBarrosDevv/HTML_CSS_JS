// Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      })
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Navbar background on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
    }
  })

  // Initialize filter functionality if on codes page
  if (document.getElementById("codes-grid")) {
    initializeFilters()
  }

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".benefit-card, .tech-item, .code-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Filter functionality for codes page
function initializeFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const codeCards = document.querySelectorAll(".code-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      codeCards.forEach((card) => {
        if (filter === "all") {
          card.classList.remove("hidden")
          card.style.animation = "slideInUp 0.5s ease forwards"
        } else {
          const categories = card.getAttribute("data-category")
          if (categories && categories.includes(filter)) {
            card.classList.remove("hidden")
            card.style.animation = "slideInUp 0.5s ease forwards"
          } else {
            card.classList.add("hidden")
          }
        }
      })
    })
  })
}

// Preview modal functionality
function openPreview(codeType) {
  const modal = document.getElementById("preview-modal")
  const modalTitle = document.getElementById("modal-title")
  const previewFrame = document.getElementById("preview-frame")

  // Set modal title based on code type
  const titles = {
    "animated-button": "Animated Button Collection - Live Preview",
    "responsive-cards": "Responsive Card Components - Live Preview",
    "navigation-menu": "Mobile Navigation Menu - Live Preview",
    "admin-dashboard": "Complete Admin Dashboard - Live Preview",
    "ecommerce-store": "E-commerce Store Template - Live Preview",
    "advanced-forms": "Advanced Form Components - Live Preview",
  }

  modalTitle.textContent = titles[codeType] || "Code Preview"

  // Create preview content based on code type
  const previewContent = generatePreviewContent(codeType)
  const blob = new Blob([previewContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)

  previewFrame.src = url
  modal.classList.add("active")

  // Prevent body scroll
  document.body.style.overflow = "hidden"
}

function closePreview() {
  const modal = document.getElementById("preview-modal")
  const previewFrame = document.getElementById("preview-frame")

  modal.classList.remove("active")
  previewFrame.src = ""

  // Restore body scroll
  document.body.style.overflow = "auto"
}

function generatePreviewContent(codeType) {
  const baseStyles = `
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Inter', sans-serif; 
                padding: 20px; 
                background: #f9fafb;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
    `

  const previews = {
    "animated-button": `
            <!DOCTYPE html>
            <html>
            <head>
                ${baseStyles}
                <style>
                    .button-container { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }
                    .animated-btn {
                        padding: 12px 24px;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .btn-1 { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; }
                    .btn-1:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3); }
                    .btn-2 { background: #f59e0b; color: white; }
                    .btn-2:hover { transform: scale(1.1); border-radius: 20px; }
                    .btn-3 { background: transparent; border: 2px solid #10b981; color: #10b981; }
                    .btn-3:hover { background: #10b981; color: white; transform: rotateX(10deg); }
                    .btn-4 { background: #ef4444; color: white; position: relative; overflow: hidden; }
                    .btn-4:before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); transition: left 0.5s; }
                    .btn-4:hover:before { left: 100%; }
                </style>
            </head>
            <body>
                <div class="button-container">
                    <button class="animated-btn btn-1">Gradient Lift</button>
                    <button class="animated-btn btn-2">Scale & Round</button>
                    <button class="animated-btn btn-3">Border Fill</button>
                    <button class="animated-btn btn-4">Shine Effect</button>
                </div>
            </body>
            </html>
        `,
    "responsive-cards": `
            <!DOCTYPE html>
            <html>
            <head>
                ${baseStyles}
                <style>
                    .cards-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 800px; }
                    .card {
                        background: white;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        transition: all 0.3s ease;
                    }
                    .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
                    .card-image { height: 150px; background: linear-gradient(135deg, #6366f1, #8b5cf6); }
                    .card-content { padding: 20px; }
                    .card-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 10px; }
                    .card-text { color: #6b7280; line-height: 1.5; }
                    .card-badge { 
                        position: absolute; 
                        top: 10px; 
                        right: 10px; 
                        background: #10b981; 
                        color: white; 
                        padding: 4px 8px; 
                        border-radius: 4px; 
                        font-size: 0.8rem; 
                    }
                    .card { position: relative; }
                </style>
            </head>
            <body>
                <div class="cards-container">
                    <div class="card">
                        <div class="card-image"></div>
                        <span class="card-badge">New</span>
                        <div class="card-content">
                            <h3 class="card-title">Modern Design</h3>
                            <p class="card-text">Beautiful card component with hover effects and responsive design.</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-image" style="background: linear-gradient(135deg, #f59e0b, #f97316);"></div>
                        <span class="card-badge">Popular</span>
                        <div class="card-content">
                            <h3 class="card-title">Responsive Layout</h3>
                            <p class="card-text">Adapts perfectly to all screen sizes with smooth animations.</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-image" style="background: linear-gradient(135deg, #10b981, #059669);"></div>
                        <div class="card-content">
                            <h3 class="card-title">Clean Code</h3>
                            <p class="card-text">Well-structured and maintainable CSS with modern techniques.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `,
    "navigation-menu": `
            <!DOCTYPE html>
            <html>
            <head>
                ${baseStyles}
                <style>
                    body { padding: 0; background: #f3f4f6; }
                    .navbar {
                        background: white;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        position: fixed;
                        top: 0;
                        width: 100%;
                        z-index: 1000;
                    }
                    .nav-container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 60px;
                    }
                    .nav-logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; }
                    .nav-menu { display: flex; gap: 30px; }
                    .nav-link { text-decoration: none; color: #374151; font-weight: 500; transition: color 0.3s; }
                    .nav-link:hover { color: #6366f1; }
                    .nav-toggle { display: none; flex-direction: column; cursor: pointer; }
                    .bar { width: 25px; height: 3px; background: #374151; margin: 3px 0; transition: 0.3s; }
                    .content { margin-top: 80px; padding: 40px 20px; text-align: center; }
                    
                    @media (max-width: 768px) {
                        .nav-menu {
                            position: fixed;
                            left: -100%;
                            top: 60px;
                            flex-direction: column;
                            background: white;
                            width: 100%;
                            text-align: center;
                            transition: 0.3s;
                            box-shadow: 0 10px 27px rgba(0,0,0,0.05);
                            padding: 20px 0;
                        }
                        .nav-menu.active { left: 0; }
                        .nav-toggle { display: flex; }
                        .nav-toggle.active .bar:nth-child(2) { opacity: 0; }
                        .nav-toggle.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
                        .nav-toggle.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
                    }
                </style>
            </head>
            <body>
                <nav class="navbar">
                    <div class="nav-container">
                        <div class="nav-logo">Logo</div>
                        <div class="nav-menu" id="nav-menu">
                            <a href="#" class="nav-link">Home</a>
                            <a href="#" class="nav-link">About</a>
                            <a href="#" class="nav-link">Services</a>
                            <a href="#" class="nav-link">Contact</a>
                        </div>
                        <div class="nav-toggle" id="nav-toggle">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                    </div>
                </nav>
                <div class="content">
                    <h1>Responsive Navigation</h1>
                    <p>Try resizing the window or clicking the menu button on mobile!</p>
                </div>
                <script>
                    document.getElementById('nav-toggle').addEventListener('click', function() {
                        document.getElementById('nav-menu').classList.toggle('active');
                        this.classList.toggle('active');
                    });
                </script>
            </body>
            </html>
        `,
    "admin-dashboard": `
            <!DOCTYPE html>
            <html>
            <head>
                ${baseStyles}
                <style>
                    body { padding: 0; background: #f3f4f6; font-size: 14px; }
                    .dashboard { display: flex; height: 100vh; }
                    .sidebar {
                        width: 250px;
                        background: #1f2937;
                        color: white;
                        padding: 20px 0;
                    }
                    .sidebar-header { padding: 0 20px 20px; border-bottom: 1px solid #374151; }
                    .sidebar-menu { padding: 20px 0; }
                    .menu-item {
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: background 0.3s;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .menu-item:hover { background: #374151; }
                    .menu-item.active { background: #6366f1; }
                    .main-content { flex: 1; display: flex; flex-direction: column; }
                    .header {
                        background: white;
                        padding: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .content-area { flex: 1; padding: 20px; }
                    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
                    .stat-card {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .stat-number { font-size: 2rem; font-weight: 700; color: #6366f1; }
                    .stat-label { color: #6b7280; margin-top: 5px; }
                    .chart-container {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        height: 300px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .chart-placeholder {
                        width: 100%;
                        height: 200px;
                        background: linear-gradient(135deg, #6366f1, #8b5cf6);
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 600;
                    }
                </style>
            </head>
            <body>
                <div class="dashboard">
                    <div class="sidebar">
                        <div class="sidebar-header">
                            <h2>Admin Panel</h2>
                        </div>
                        <div class="sidebar-menu">
                            <div class="menu-item active">📊 Dashboard</div>
                            <div class="menu-item">👥 Users</div>
                            <div class="menu-item">📦 Products</div>
                            <div class="menu-item">📈 Analytics</div>
                            <div class="menu-item">⚙️ Settings</div>
                        </div>
                    </div>
                    <div class="main-content">
                        <div class="header">
                            <h1>Dashboard Overview</h1>
                            <div>Welcome back, Admin!</div>
                        </div>
                        <div class="content-area">
                            <div class="stats-grid">
                                <div class="stat-card">
                                    <div class="stat-number">1,234</div>
                                    <div class="stat-label">Total Users</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-number">567</div>
                                    <div class="stat-label">Orders</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-number">$12,345</div>
                                    <div class="stat-label">Revenue</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-number">89%</div>
                                    <div class="stat-label">Growth</div>
                                </div>
                            </div>
                            <div class="chart-container">
                                <div class="chart-placeholder">
                                    Interactive Charts & Analytics
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `,
    "ecommerce-store": `
            <!DOCTYPE html>
            <html>
            <head>
                ${baseStyles}
                <style>
                    body { padding: 0; background: #f9fafb; }
                    .header {
                        background: white;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        padding: 15px 0;
                    }
                    .header-content {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; }
                    .nav-links { display: flex; gap: 30px; }
                    .nav-links a { text-decoration: none; color: #374151; font-weight: 500; }
                    .cart-icon { background: #6366f1; color: white; padding: 8px 12px; border-radius: 6px; }
                    .hero {
                        background: linear-gradient(135deg, #6366f1, #8b5cf6);
                        color: white;
                        text-align: center;
                        padding: 60px 20px;
                    }
                    .hero h1 { font-size: 2.5rem; margin-bottom: 15px; }
                    .hero p { font-size: 1.2rem; opacity: 0.9; }
                    .products-section { padding: 60px 20px; }
                    .section-title { text-align: center; font-size: 2rem; margin-bottom: 40px; }
                    .products-grid {
                        max-width: 1200px;
                        margin: 0 auto;
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 30px;
                    }
                    .product-card {
                        background: white;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        transition: transform 0.3s ease;
                    }
                    .product-card:hover { transform: translateY(-5px); }
                    .product-image {
                        height: 200px;
                        background: linear-gradient(135deg, #f59e0b, #f97316);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 600;
                    }
                    .product-info { padding: 20px; }
                    .product-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 10px; }
                    .product-price { font-size: 1.3rem; font-weight: 700; color: #6366f1; margin-bottom: 15px; }
                    .add-to-cart {
                        width: 100%;
                        background: #6366f1;
                        color: white;
                        border: none;
                        padding: 10px;
                        border-radius: 6px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background 0.3s;
                    }
                    .add-to-cart:hover { background: #4f46e5; }
                </style>
            </head>
            <body>
                <header class="header">
                    <div class="header-content">
                        <div class="logo">ShopCraft</div>
                        <nav class="nav-links">
                            <a href="#">Home</a>
                            <a href="#">Products</a>
                            <a href="#">About</a>
                            <a href="#">Contact</a>
                        </nav>
                        <div class="cart-icon">🛒 Cart (0)</div>
                    </div>
                </header>
                
                <section class="hero">
                    <h1>Premium E-commerce Store</h1>
                    <p>Discover amazing products with seamless shopping experience</p>
                </section>
                
                <section class="products-section">
                    <h2 class="section-title">Featured Products</h2>
                    <div class="products-grid">
                        <div class="product-card">
                            <div class="product-image">Product Image</div>
                            <div class="product-info">
                                <h3 class="product-title">Premium Headphones</h3>
                                <div class="product-price">$199.99</div>
                                <button class="add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image" style="background: linear-gradient(135deg, #10b981, #059669);">Product Image</div>
                            <div class="product-info">
                                <h3 class="product-title">Smart Watch</h3>
                                <div class="product-price">$299.99</div>
                                <button class="add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image" style="background: linear-gradient(135deg, #ef4444, #dc2626);">Product Image</div>
                            <div class="product-info">
                                <h3 class="product-title">Wireless Speaker</h3>
                                <div class="product-price">$149.99</div>
                                <button class="add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
            </html>
        `,
    "advanced-forms": `
            <!DOCTYPE html>
            <html>
            <head>
                ${baseStyles}
                <style>
                    .form-container {
                        max-width: 600px;
                        background: white;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    }
                    .form-title { font-size: 2rem; font-weight: 700; margin-bottom: 30px; text-align: center; color: #1f2937; }
                    .form-group { margin-bottom: 25px; }
                    .form-label {
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #374151;
                    }
                    .form-input {
                        width: 100%;
                        padding: 12px 16px;
                        border: 2px solid #e5e7eb;
                        border-radius: 8px;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                    }
                    .form-input:focus {
                        outline: none;
                        border-color: #6366f1;
                        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                    }
                    .form-input.error { border-color: #ef4444; }
                    .error-message {
                        color: #ef4444;
                        font-size: 0.9rem;
                        margin-top: 5px;
                        display: none;
                    }
                    .form-input.error + .error-message { display: block; }
                    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                    .file-upload {
                        border: 2px dashed #d1d5db;
                        border-radius: 8px;
                        padding: 40px 20px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .file-upload:hover { border-color: #6366f1; background: #f8fafc; }
                    .file-upload.dragover { border-color: #6366f1; background: #eff6ff; }
                    .submit-btn {
                        width: 100%;
                        background: linear-gradient(135deg, #6366f1, #8b5cf6);
                        color: white;
                        border: none;
                        padding: 15px;
                        border-radius: 8px;
                        font-size: 1.1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3); }
                    .progress-bar {
                        width: 100%;
                        height: 4px;
                        background: #e5e7eb;
                        border-radius: 2px;
                        margin-bottom: 30px;
                        overflow: hidden;
                    }
                    .progress-fill {
                        height: 100%;
                        background: linear-gradient(135deg, #6366f1, #8b5cf6);
                        width: 60%;
                        transition: width 0.3s ease;
                    }
                </style>
            </head>
            <body>
                <div class="form-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <h2 class="form-title">Advanced Form Components</h2>
                    <form id="advanced-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">First Name</label>
                                <input type="text" class="form-input" placeholder="Enter first name" required>
                                <div class="error-message">First name is required</div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Last Name</label>
                                <input type="text" class="form-input" placeholder="Enter last name" required>
                                <div class="error-message">Last name is required</div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Email Address</label>
                            <input type="email" class="form-input" placeholder="Enter email address" required>
                            <div class="error-message">Please enter a valid email</div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Phone Number</label>
                            <input type="tel" class="form-input" placeholder="Enter phone number" required>
                            <div class="error-message">Phone number is required</div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Upload Document</label>
                            <div class="file-upload" id="file-upload">
                                <div>📁 Drag & drop files here or click to browse</div>
                                <input type="file" style="display: none;" id="file-input" multiple>
                            </div>
                        </div>
                        
                        <button type="submit" class="submit-btn">Submit Form</button>
                    </form>
                </div>
                
                <script>
                    // Form validation
                    document.getElementById('advanced-form').addEventListener('submit', function(e) {
                        e.preventDefault();
                        alert('Form validation and submission logic would be implemented here!');
                    });
                    
                    // File upload
                    const fileUpload = document.getElementById('file-upload');
                    const fileInput = document.getElementById('file-input');
                    
                    fileUpload.addEventListener('click', () => fileInput.click());
                    
                    fileUpload.addEventListener('dragover', (e) => {
                        e.preventDefault();
                        fileUpload.classList.add('dragover');
                    });
                    
                    fileUpload.addEventListener('dragleave', () => {
                        fileUpload.classList.remove('dragover');
                    });
                    
                    fileUpload.addEventListener('drop', (e) => {
                        e.preventDefault();
                        fileUpload.classList.remove('dragover');
                        // Handle file drop logic here
                    });
                </script>
            </body>
            </html>
        `,
  }

  return previews[codeType] || "<html><body><h1>Preview not available</h1></body></html>"
}

// Download functionality
function downloadCode(codeType) {
  // Create a simple download simulation
  const link = document.createElement("a")
  link.href =
    "data:text/plain;charset=utf-8," +
    encodeURIComponent(
      `// ${codeType} - Free Code Download\n// This would contain the actual code files\n// Implementation would include all necessary HTML, CSS, and JavaScript`,
    )
  link.download = `${codeType}.zip`
  link.click()

  // Show success message
  alert(
    `✅ ${codeType} has been downloaded successfully!\n\nThe download includes:\n• HTML files\n• CSS stylesheets\n• JavaScript functionality\n• Documentation\n• Usage examples`,
  )
}

// WhatsApp contact functionality
function contactWhatsApp(codeType) {
  const message = encodeURIComponent(
    `Hi! I'm interested in purchasing the "${codeType}" code project. Could you please provide more details about pricing and features?`,
  )
  const whatsappUrl = `https://wa.me/1234567890?text=${message}`
  window.open(whatsappUrl, "_blank")
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("preview-modal")
  if (e.target === modal) {
    closePreview()
  }
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePreview()
  }
})

// Add slideInUp animation
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
document.head.appendChild(style)
