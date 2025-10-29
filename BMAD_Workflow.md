E-THESIS Portal: Complete BMAD Workflow
Bicol University Tabaco – Fisheries Department

📋 BACKGROUND
Project Context
The Fisheries Department at Bicol University Tabaco has accumulated over a decade of valuable research through student thesis work (2015-2025). However, these abstracts are stored in physical or scattered digital formats, making it difficult for students, faculty, and researchers to access and reference previous work efficiently.
Problem Statement

Accessibility Issues: Thesis abstracts are difficult to locate and retrieve
Time Consumption: Manual searching through physical archives wastes valuable research time
Lack of Organization: No centralized system to categorize and manage abstracts
Limited Search Capabilities: Cannot search by specific criteria (year, author, keywords)
Risk of Data Loss: Physical documents are susceptible to damage or misplacement

Project Goals

Create a centralized digital repository for all thesis abstracts (2015-2025)
Implement efficient search functionality for quick retrieval
Enable easy uploading and management of new abstracts
Organize abstracts by year, author, and research topics
Preserve academic research for future reference

Target Users

Students: Access previous research for literature review and reference
Faculty Members: Review student work and track research trends
Researchers: Explore existing studies in fisheries field
Library Staff: Manage and organize thesis collection
Department Administrators: Monitor research output and trends


🔬 METHODOLOGY
Development Approach
Agile Development Method - Iterative development with continuous testing and feedback
Technology Stack
Frontend Technologies

HTML5: Structure and content of web pages
CSS3: Styling, layout, and responsive design
JavaScript: Client-side interactivity and dynamic features

Backend Technologies

PHP: Server-side logic, form processing, and database operations
MySQL: Relational database management system

System Architecture
┌─────────────────────────────────────────┐
│         User Interface Layer            │
│    (HTML, CSS, JavaScript)              │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│      Application Logic Layer            │
│              (PHP)                      │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         Database Layer                  │
│            (MySQL)                      │
└─────────────────────────────────────────┘
Development Phases
Phase 1: Planning & Requirements Gathering
Duration: 2 weeks

Conduct interviews with faculty and students
Identify required features and functionalities
Define user roles and permissions
Create system requirements document
Design database schema

Phase 2: Database Design
Duration: 1 week

Design normalized database structure
Create entity-relationship diagrams
Define table relationships
Plan data validation rules
Set up MySQL database

Phase 3: Frontend Development
Duration: 3 weeks

Create HTML page structures
Design CSS stylesheets for consistent look
Develop responsive layouts for mobile compatibility
Implement JavaScript for interactive elements
Create user-friendly forms

Phase 4: Backend Development
Duration: 4 weeks

Develop PHP scripts for CRUD operations (Create, Read, Update, Delete)
Implement search algorithms
Create file upload functionality
Build user authentication system
Develop admin panel

Phase 5: Integration & Testing
Duration: 2 weeks

Connect frontend with backend
Test all functionalities
Debug and fix errors
Perform security testing
Optimize performance

Phase 6: Deployment & Training
Duration: 1 week

Deploy to production server
Train users and administrators
Create user documentation
Gather initial feedback
Make necessary adjustments


📊 ANALYSIS
Database Structure Analysis
Primary Tables
1. users Table

user_id (Primary Key, INT, Auto Increment)
username (VARCHAR, Unique)
password (VARCHAR, Hashed)
email (VARCHAR)
role (ENUM: 'admin', 'faculty', 'student')
created_at (TIMESTAMP)

2. thesis_abstracts Table

abstract_id (Primary Key, INT, Auto Increment)
title (VARCHAR, 500)
author_name (VARCHAR, 200)
year (YEAR)
abstract_text (TEXT)
keywords (TEXT)
advisor (VARCHAR, 200)
file_path (VARCHAR, 500)
upload_date (TIMESTAMP)
uploaded_by (Foreign Key to users.user_id)

3. search_logs Table

log_id (Primary Key, INT, Auto Increment)
user_id (Foreign Key)
search_query (VARCHAR, 500)
search_date (TIMESTAMP)
results_count (INT)

Feature Analysis
1. Search Functionality
Implementation: PHP + MySQL with multiple search criteria
Search Types:

By Year: Filter abstracts from specific graduation years
By Author: Find research by student name
By Keyword: Search within titles and abstract content
Advanced Search: Combine multiple criteria

Technical Implementation:
User enters search → JavaScript validates input → 
AJAX sends request → PHP processes query → 
MySQL executes search → PHP formats results → 
JavaScript displays results dynamically
2. Upload System
File Handling Process:

User selects PDF file (thesis abstract)
JavaScript validates file type and size
Form submits to PHP script
PHP validates and sanitizes all inputs
File moves to secure directory
Metadata stores in MySQL database
Confirmation message displays to user

Security Measures:

File type restrictions (.pdf only)
File size limits (max 5MB)
Secure file naming (prevent overwrites)
Input sanitization (prevent SQL injection)
User authentication required

3. Management Features
For Administrators:

View all abstracts in database
Edit abstract details
Delete abstracts (with confirmation)
Manage user accounts
View system statistics

For Regular Users:

Browse abstracts by year
View detailed abstract information
Download PDF files
Search through collection

User Flow Analysis
Student User Flow

Login → Enter credentials → System authenticates
Search → Enter keywords → View results → Select abstract
View Details → Read abstract → Download PDF if needed
Logout → End session

Admin User Flow

Login → Access admin dashboard
Upload New Abstract → Fill form → Upload PDF → Submit
Manage Existing → View list → Edit/Delete as needed
Monitor System → View statistics → Check recent uploads
Logout → End session


💻 DEVELOPMENT
Detailed Implementation Guide

1. DATABASE SETUP (MySQL)
Step 1: Create Database
sqlCREATE DATABASE ethesis_portal;
USE ethesis_portal;
Step 2: Create Users Table
sqlCREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role ENUM('admin', 'faculty', 'student') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Step 3: Create Thesis Abstracts Table
sqlCREATE TABLE thesis_abstracts (
    abstract_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    author_name VARCHAR(200) NOT NULL,
    year YEAR NOT NULL,
    abstract_text TEXT NOT NULL,
    keywords TEXT,
    advisor VARCHAR(200),
    file_path VARCHAR(500),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT,
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id)
);
Step 4: Create Search Logs Table
sqlCREATE TABLE search_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    search_query VARCHAR(500),
    search_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    results_count INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

2. FRONTEND DEVELOPMENT
HTML Structure (index.html)
Key Pages Needed:

Homepage (index.html) - Landing page with search bar
Login Page (login.html) - User authentication
Dashboard (dashboard.html) - Main user interface
Search Results (results.html) - Display search outcomes
Upload Page (upload.html) - Form for new abstracts
Admin Panel (admin.html) - Management interface

Example Homepage Structure:
html<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-THESIS Portal - BU Tabaco Fisheries</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">E-THESIS Portal</div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="search.html">Search</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="login.html">Login</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section class="hero">
            <h1>Fisheries Department Thesis Repository</h1>
            <p>2015 - 2025 Research Collection</p>
            <div class="search-box">
                <input type="text" id="quickSearch" placeholder="Search by title, author, or keyword...">
                <button onclick="performSearch()">Search</button>
            </div>
        </section>
        
        <section class="features">
            <div class="feature-card">
                <h3>📚 Extensive Collection</h3>
                <p>10+ years of fisheries research</p>
            </div>
            <div class="feature-card">
                <h3>🔍 Easy Search</h3>
                <p>Find abstracts quickly by multiple criteria</p>
            </div>
            <div class="feature-card">
                <h3>☁️ Cloud Storage</h3>
                <p>Access from anywhere, anytime</p>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2025 Bicol University Tabaco - Fisheries Department</p>
    </footer>
    
    <script src="js/main.js"></script>
</body>
</html>
CSS Styling (style.css)
Design Principles:

Clean, professional appearance
Responsive design (works on mobile and desktop)
Consistent color scheme (blue/ocean theme for Fisheries)
Easy-to-read typography

css/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Navigation */
header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 1rem 0;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: #87ceeb;
}

/* Hero Section */
.hero {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.search-box {
    max-width: 600px;
    margin: 2rem auto;
    display: flex;
    gap: 1rem;
}

.search-box input {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
}

.search-box button {
    padding: 1rem 2rem;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
}

.search-box button:hover {
    background: #ee5a52;
}

/* Features Section */
.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 4rem auto;
    padding: 0 2rem;
}

.feature-card {
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.feature-card:hover {
    transform: translateY(-5px);
}

/* Footer */
footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-links {
        flex-direction: column;
        gap: 1rem;
    }
    
    .hero h1 {
        font-size: 1.8rem;
    }
    
    .search-box {
        flex-direction: column;
    }
}
JavaScript Interactivity (main.js)
Purpose: Add dynamic features without page reloads
javascript// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('quickSearch').value;
    
    if (searchTerm.trim() === '') {
        alert('Please enter a search term');
        return;
    }
    
    // Redirect to search results page with query
    window.location.href = `results.html?q=${encodeURIComponent(searchTerm)}`;
}

// Allow Enter key to trigger search
document.getElementById('quickSearch')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Form validation for upload page
function validateUploadForm() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const abstractText = document.getElementById('abstractText').value;
    const file = document.getElementById('pdfFile').files[0];
    
    // Check if all fields are filled
    if (!title || !author || !year || !abstractText) {
        alert('Please fill in all required fields');
        return false;
    }
    
    // Validate year range
    const currentYear = new Date().getFullYear();
    if (year < 2015 || year > currentYear) {
        alert('Year must be between 2015 and ' + currentYear);
        return false;
    }
    
    // Validate file upload
    if (!file) {
        alert('Please select a PDF file to upload');
        return false;
    }
    
    // Check file type
    if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed');
        return false;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return false;
    }
    
    return true;
}

// Dynamic year dropdown population
function populateYearDropdown() {
    const yearSelect = document.getElementById('yearFilter');
    if (!yearSelect) return;
    
    const currentYear = new Date().getFullYear();
    
    for (let year = currentYear; year >= 2015; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    populateYearDropdown();
});

3. BACKEND DEVELOPMENT (PHP)
Database Connection (config.php)
Purpose: Establish connection to MySQL database
php<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'ethesis_portal');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set character set to UTF-8
$conn->set_charset("utf8");

// Start session for user authentication
session_start();
?>
User Authentication (login.php)
Purpose: Verify user credentials and create sessions
php<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Sanitize inputs to prevent SQL injection
    $username = $conn->real_escape_string($username);
    
    // Query database for user
    $sql = "SELECT user_id, username, password, role FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Password is correct, start session
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
            
            // Redirect based on role
            if ($user['role'] == 'admin') {
                header("Location: admin_dashboard.php");
            } else {
                header("Location: dashboard.php");
            }
            exit();
        } else {
            $error = "Invalid username or password";
        }
    } else {
        $error = "Invalid username or password";
    }
    
    $stmt->close();
}
?>
Search Functionality (search.php)
Purpose: Handle search requests and return results
php<?php
require_once 'config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

// Get search parameters
$searchTerm = isset($_GET['q']) ? $_GET['q'] : '';
$yearFilter = isset($_GET['year']) ? $_GET['year'] : '';
$authorFilter = isset($_GET['author']) ? $_GET['author'] : '';

// Build SQL query
$sql = "SELECT * FROM thesis_abstracts WHERE 1=1";

// Add conditions based on search criteria
if (!empty($searchTerm)) {
    $searchTerm = $conn->real_escape_string($searchTerm);
    $sql .= " AND (title LIKE '%$searchTerm%' OR abstract_text LIKE '%$searchTerm%' OR keywords LIKE '%$searchTerm%')";
}

if (!empty($yearFilter)) {
    $yearFilter = $conn->real_escape_string($yearFilter);
    $sql .= " AND year = '$yearFilter'";
}

if (!empty($authorFilter)) {
    $authorFilter = $conn->real_escape_string($authorFilter);
    $sql .= " AND author_name LIKE '%$authorFilter%'";
}

$sql .= " ORDER BY year DESC, title ASC";

// Execute query
$result = $conn->query($sql);

// Log search activity
$logSql = "INSERT INTO search_logs (user_id, search_query, results_count) VALUES (?, ?, ?)";
$logStmt = $conn->prepare($logSql);
$resultsCount = $result->num_rows;
$logStmt->bind_param("isi", $_SESSION['user_id'], $searchTerm, $resultsCount);
$logStmt->execute();
$logStmt->close();

// Return results as JSON for AJAX or display directly
$abstracts = array();
while ($row = $result->fetch_assoc()) {
    $abstracts[] = $row;
}

header('Content-Type: application/json');
echo json_encode($abstracts);
?>
Upload Handler (upload_abstract.php)
Purpose: Process new abstract submissions
php<?php
require_once 'config.php';

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin') {
    die("Unauthorized access");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data
    $title = $_POST['title'];
    $author = $_POST['author'];
    $year = $_POST['year'];
    $abstractText = $_POST['abstractText'];
    $keywords = $_POST['keywords'];
    $advisor = $_POST['advisor'];
    
    // Sanitize inputs
    $title = $conn->real_escape_string($title);
    $author = $conn->real_escape_string($author);
    $year = $conn->real_escape_string($year);
    $abstractText = $conn->real_escape_string($abstractText);
    $keywords = $conn->real_escape_string($keywords);
    $advisor = $conn->real_escape_string($advisor);
    
    // Handle file upload
    $uploadDir = 'uploads/';
    $filePath = '';
    
    if (isset($_FILES['pdfFile']) && $_FILES['pdfFile']['error'] == 0) {
        $fileName = $_FILES['pdfFile']['name'];
        $fileTmpName = $_FILES['pdfFile']['tmp_name'];
        $fileSize = $_FILES['pdfFile']['size'];
        $fileType = $_FILES['pdfFile']['type'];
        
        // Check file type
        $allowedTypes = array('application/pdf');
        if (!in_array($fileType, $allowedTypes)) {
            die("Error: Only PDF files are allowed");
        }
        
        // Check file size (5MB max)
        if ($fileSize > 5 * 1024 * 1024) {
            die("Error: File size exceeds 5MB limit");
        }
        
        // Generate unique filename
        $newFileName = uniqid() . '_' . basename($fileName);
        $filePath = $uploadDir . $newFileName;
        
        // Move uploaded file
        if (!move_uploaded_file($fileTmpName, $filePath)) {
            die("Error: Failed to upload file");
        }
    }
    
    // Insert into database
    $sql = "INSERT INTO thesis_abstracts (title, author_name, year, abstract_text, keywords, advisor, file_path, uploaded_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssissssi", $title, $author, $year, $abstractText, $keywords, $advisor, $filePath, $_SESSION['user_id']);
    
    if ($stmt->execute()) {
        echo "Abstract uploaded successfully!";
        header("Location: dashboard.php?success=1");
    } else {
        echo "Error: " . $stmt->error;
    }
    
    $stmt->close();
}
?>
Admin Functions (admin_functions.php)
Purpose: Management operations for administrators
php<?php
require_once 'config.php';

// Check admin privileges
function checkAdmin() {
    if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin') {
        header("Location: login.html");
        exit();
    }
}

// Get all abstracts
function getAllAbstracts($conn) {
    $sql = "SELECT a.*, u.username as uploaded_by_name 
            FROM thesis_abstracts a 
            LEFT JOIN users u ON a.uploaded_by = u.user_id 
            ORDER BY a.upload_date DESC";
    $result = $conn->query($sql);
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Delete abstract
function deleteAbstract($conn, $abstractId) {
    checkAdmin();
    
    // Get file path first
    $sql = "SELECT file_path FROM thesis_abstracts WHERE abstract_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $abstractId);
    $stmt->execute();
    $result = $stmt->get_result();
    $abstract = $result->fetch_assoc();
    
    // Delete file if exists
    if ($abstract && file_exists($abstract['file_path'])) {
        unlink($abstract['file_path']);
    }
    
    // Delete from database
    $sql = "DELETE FROM thesis_abstracts WHERE abstract_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $abstractId);
    return $stmt->execute();
}

// Update abstract
function updateAbstract($conn, $abstractId, $data) {
    checkAdmin();
    
    $sql = "UPDATE thesis_abstracts 
            SET title = ?, author_name = ?, year = ?, abstract_text = ?, keywords = ?, advisor = ? 
            WHERE abstract_id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssisssi", 
        $data['title'], 
        $data['author'], 
        $data['year'], 
        $data['abstractText'], 
        $data['keywords'], 
        $data['advisor'], 
        $abstractId
    );
    
    return $stmt->execute();
}

// Get system statistics
function getStatistics($conn) {
    $stats = array();
    
    // Total abstracts
    $result = $conn->query("SELECT COUNT(*) as total FROM thesis_abstracts");
    $stats['total_abstracts'] = $result->fetch_assoc()['total'];
    
    // Total users
    $result = $conn->query("SELECT COUNT(*) as total FROM users");
    $stats['total_users'] = $result->fetch_assoc()['total'];
    
    // Recent uploads (last 30 days)
    $result = $conn->query("SELECT COUNT(*) as total FROM thesis_abstracts WHERE upload_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
    $stats['recent_uploads'] = $result->fetch_assoc()['total'];
    
    // Total searches
    $result = $conn->query("SELECT COUNT(*) as total FROM search_logs");
    $stats['total_searches'] = $result->fetch_assoc()['total'];
    
    // Abstracts by year
    $result = $conn->query("SELECT year, COUNT(*) as count FROM thesis_abstracts GROUP BY year ORDER BY year DESC");
    $stats['by_year'] = $result->fetch_all(MYSQLI_ASSOC);
    
    return $stats;
}
?>

4. SECURITY IMPLEMENTATION
Security Best Practices
1. Password Hashing
php// When creating new user
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// When verifying
password_verify($inputPassword, $hashedPassword);
2. SQL Injection Prevention
php// Use prepared statements
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
3. XSS Protection
php// Sanitize output
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');
4. File Upload Security
php// Validate file type
$allowedTypes = ['application/pdf'];
if (!in_array($_FILES['file']['type'], $allowedTypes)) {
    die("Invalid file type");
}

// Rename uploaded files
$newName = uniqid() . '_' . basename($_FILES['file']['name']);
5. Session Security
php// Set secure session parameters
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
session_start();

5. TESTING PROCEDURES
Unit Testing Checklist
Database Operations

 Insert new abstract successfully
 Retrieve abstracts by search criteria
 Update existing abstract
 Delete abstract and associated file
 Handle duplicate entries

User Authentication

 Login with valid credentials
 Login with invalid credentials
 Logout functionality
 Session timeout
 Password reset

Search Functionality

 Search by title
 Search by author
 Search by year
 Search by keywords
 Combined search criteria
 Handle no results
 Handle special characters

File Upload

 Upload valid PDF file
 Reject non-PDF files
 Reject oversized files
 Handle upload errors
 Verify file storage

User Interface

 Responsive design on mobile
 Responsive design on tablet
 Responsive design on desktop
 Form validation
 Error message display

Integration Testing
End-to-End User Flows

New user registration → Login → Search → View results
Admin login → Upload abstract → Verify in database → Download file
User search → View abstract → Download PDF
Admin edit abstract → Verify changes → Display updated info


6. DEPLOYMENT
Server Requirements

Web Server: Apache or Nginx
PHP Version: 7.4 or higher
MySQL Version: 5.7 or higher
Storage: Minimum 10GB for files
SSL Certificate: For HTTPS encryption

Deployment Steps
Step 1: Prepare Server
bash# Update system
sudo apt update && sudo apt upgrade

# Install Apache
sudo apt install apache2

# Install PHP
sudo apt install php php-mysql php-mbstring

# Install MySQL
sudo apt install mysql-server
Step 2: Configure Database
bash# Secure MySQL installation
sudo mysql_secure_installation

# Create database user
mysql -u root -p
CREATE USER 'ethesis_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON ethesis_portal.
