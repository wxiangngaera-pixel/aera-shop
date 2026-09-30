// ═══════════════════════════════════════════════════════════════
    // AUTOMATIC CONFIGURATION - Works out of the box!
    // ═══════════════════════════════════════════════════════════════
    
    // This URL is automatically configured when you install this template
    // It redirects to your Thank You page with the form data
    const THANK_YOU_PAGE_URL = 'https://my.chatbees.io/p/lp-mtv7bqkp-09geg';
    
    // ───────────────────────────────────────────────────────────────
    // CUSTOM DOMAIN USERS: Update the URL above
    // ───────────────────────────────────────────────────────────────
    // If you're using a custom domain (like www.yourcompany.com),
    // replace the URL above with your custom domain version:
    //
    // Example:
    // const THANK_YOU_PAGE_URL = 'https://www.yourcompany.com/p/thank-you-abc123';
    //
    // Where to find your Thank You page URL:
    // 1. Go to Dashboard > Landing Pages
    // 2. Find your "Thank You Page" 
    // 3. Copy the published URL
    // 4. Paste it above
    // ───────────────────────────────────────────────────────────────
    
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      
      // Build the full name
      const fullName = firstName + ' ' + lastName;
      
      // Create URL with parameters that will auto-create the contact
      const params = new URLSearchParams({
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        email: email,
        phone: phone
      });
      
      // Check for referral parameter in current URL, or use default
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref') || 'landing-page-template'; // Default ref for tracking
      params.set('ref', ref); // Include ref in redirect for campaign tracking
      
      // Check for tags parameter in current URL, or use default
      const tags = urlParams.get('tags') || 'vip'; // Default tag for all leads from this template
      params.set('tags', tags); // Include tags for auto-tagging
      
      // Redirect to thank you page with contact information
      // The thank you page will automatically:
      // 1. Create a new contact with this information
      // 2. Display personalized content using {{variables}}
      // 3. Track the referral source if ref parameter is present
      window.location.href = THANK_YOU_PAGE_URL + '?' + params.toString();
    });