<?php
$currentPage = basename($_SERVER['PHP_SELF']);
// Fallbacks
if (!isset($pageTitle)) $pageTitle = "AI Software and App Development Company in Bangalore | Digi9";
if (!isset($metaDescription)) $metaDescription = "Digi9 is a custom AI software development company in India building AI-powered applications, web platforms, and mobile apps for real business workflows.";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($pageTitle); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($metaDescription); ?>">
    
    <!-- Design System CSS -->
    <link rel="stylesheet" href="/assets/css/style.css">
    
    <!-- Favicon placeholder -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231E90FF' rx='20'/%3E%3Ctext x='50' y='65' fill='%23FFF' font-family='Arial' font-size='50' font-weight='bold' text-anchor='middle'%3ED9%3C/text%3E%3C/svg%3E">
</head>
<body>
<!-- Space Theme Parallax Base Layers -->
<canvas id="starfield" data-depth="-300"></canvas>
<div class="nebula-blob nebula-1" data-depth="-150"></div>
<div class="nebula-blob nebula-2" data-depth="-150"></div>
<div class="aurora-band aurora-1" data-depth="-80"></div>
<div class="aurora-band aurora-2" data-depth="-80"></div>

<nav id="navbar">
    <div class="container nav-inner">
        <a href="index.php" class="logo">Digi<span>9</span></a>
        
        <!-- Desktop Menu -->
        <ul class="nav-links">
            <li><a href="services.php" class="<?php echo ($currentPage == 'services.php') ? 'active' : ''; ?>">Services</a></li>
            <li><a href="solutions.php" class="<?php echo ($currentPage == 'solutions.php') ? 'active' : ''; ?>">Solutions</a></li>
            <li><a href="work.php" class="<?php echo ($currentPage == 'work.php') ? 'active' : ''; ?>">Work</a></li>
            <li><a href="process.php" class="<?php echo ($currentPage == 'process.php') ? 'active' : ''; ?>">Process</a></li>
            <li><a href="about.php" class="<?php echo ($currentPage == 'about.php') ? 'active' : ''; ?>">About</a></li>
            <li><a href="insights.php" class="<?php echo ($currentPage == 'insights.php' || $currentPage == 'post.php') ? 'active' : ''; ?>">Insights</a></li>
            <li><a href="contact.php" class="btn-primary" style="margin-left: 16px;">Book a Consultation</a></li>
        </ul>

        <!-- Hamburger Icon (Mobile) -->
        <div class="hamburger" id="nav-toggle">
            <span></span><span></span><span></span>
        </div>
    </div>
</nav>

<!-- Mobile Menu Overlay -->
<div class="mobile-menu" id="nav-menu">
    <a href="services.php">Services</a>
    <a href="solutions.php">Solutions</a>
    <a href="work.php">Work</a>
    <a href="process.php">Process</a>
    <a href="about.php">About</a>
    <a href="insights.php">Insights</a>
    <a href="contact.php" class="mobile-cta">Book a Consultation</a>
</div>

<main>
