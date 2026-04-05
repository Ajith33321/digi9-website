<?php $page_title = "Contact — Tell Us What You Want to Build"; ?>
<?php include 'includes/header.php'; ?>

<!-- ##### PAGE HEADER ##### -->
<div class="page-header">
  <div class="container">
    <div class="reveal">
      <div class="eyebrow">Get in Touch</div>
      <h1 class="h1-mega">Tell Us What You Want to <span class="text-gradient">Build</span></h1>
      <p class="subtext">We'll review your message and get back to you within one business day to set up an initial conversation.</p>
      <div class="page-header-line"></div>
    </div>
  </div>
</div>

<!-- ##### CONTACT SECTION ##### -->
<section class="section">
  <div class="container">
    <div class="grid-2" style="align-items:start;">
      
      <!-- Info Col -->
      <div class="reveal">
        <div class="eyebrow" style="margin-top:0;">Contact Information</div>
        <h2 class="section-title">Let's Start a Conversation</h2>
        <p class="body-text" style="margin-bottom:36px;">Whether you have a fully formed brief or just a rough idea — we're happy to talk through it and help you figure out the right approach.</p>
        
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div style="display:flex; gap:16px; align-items:flex-start;">
            <div class="card" style="width:48px; height:48px; padding:0; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;">📍</div>
            <div>
              <div style="font-size:13px; font-weight:700; color:var(--accent); margin-bottom:4px; text-transform:uppercase; letter-spacing:0.05em;">Location</div>
              <div class="body-text">Bangalore, Karnataka, India</div>
            </div>
          </div>
          <div style="display:flex; gap:16px; align-items:flex-start;">
            <div class="card" style="width:48px; height:48px; padding:0; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;">✉️</div>
            <div>
              <div style="font-size:13px; font-weight:700; color:var(--accent); margin-bottom:4px; text-transform:uppercase; letter-spacing:0.05em;">Email</div>
              <div class="body-text">hello@digi9.in</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Col -->
      <div class="reveal">
        <div class="form-card">
          <h3 class="card-title" style="margin-bottom:28px;">Send Us a Message</h3>
          <form class="contact-form" id="contact-form">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div class="form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="Your name" required name="name">
              </div>
              <div class="form-group">
                <label>Company</label>
                <input type="text" placeholder="Your company" name="company">
              </div>
            </div>
            <div class="form-group">
              <label>Email Address *</label>
              <input type="email" placeholder="your@email.com" required name="email">
            </div>
            <div class="form-group">
              <label>Tell us about your project *</label>
              <textarea placeholder="Describe what you want to build..." required name="message"></textarea>
            </div>
            <button type="submit" class="btn-primary" style="width:100%;">Send Message →</button>
            <div id="form-status" class="form-success" style="margin-top:20px;">Message sent! We'll get back to you soon.</div>
          </form>
          <p style="font-size:12px; color:var(--text-muted); text-align:center; margin-top:20px;">We typically respond within 1 business day.</p>
        </div>
      </div>

    </div>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
