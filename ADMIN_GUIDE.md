# Admin Dashboard User Guide

This guide will help you use the admin dashboard to manage your website content.

## Getting Started

1. Navigate to `/admin/login` in your browser
2. Enter your admin email and password
3. You'll be redirected to the dashboard upon successful login

## Dashboard Overview

The admin dashboard is organized into several sections:

### 1. Translations
**Path:** `/admin/translations`

Manage all text content for both Turkish and English languages.

- Select language from the dropdown (Turkish/English)
- Choose a section from the sidebar (nav, hero, campaigns, etc.)
- Edit individual translation values
- Click "Save Section" to save changes for the current section
- Click "Save All Translations" to save all changes at once

**Tips:**
- Use the expandable sections to navigate nested translations
- Changes are saved per section for better organization
- Always test your changes on the frontend after saving

### 2. Campaigns
**Path:** `/admin/campaigns`

Manage marketing campaigns displayed on your homepage.

**Features:**
- Add/Remove campaigns
- Edit campaign title, subtitle, description, and CTA button text
- Each campaign appears in the carousel on the homepage

**To add a campaign:**
1. Click "Add Item"
2. Fill in all required fields
3. Click "Save Changes"

### 3. Testimonials
**Path:** `/admin/testimonials`

Manage customer testimonials and reviews.

**Fields:**
- **Name**: Customer's name
- **Role/Title**: Their job title or role
- **Text**: The testimonial content

**To add a testimonial:**
1. Click "Add Item"
2. Enter customer information
3. Write the testimonial text
4. Click "Save Changes"

### 4. FAQ
**Path:** `/admin/faq`

Manage frequently asked questions.

**Fields:**
- **Question**: The FAQ question
- **Answer**: The detailed answer

**To add an FAQ:**
1. Click "Add Item"
2. Enter question and answer
3. Click "Save Changes"

### 5. Products
**Path:** `/admin/products`

Configure product listings.

**Fields:**
- **Product Key**: Unique identifier (e.g., "traffic", "kasko")
- **Route Path**: URL path (e.g., "/products/traffic")
- **Gradient Color**: Visual styling gradient
- **Popular**: Mark as popular product
- **New**: Mark as new product

**Note:** Product names are managed in the Translations section under "products"

### 6. Statistics
**Path:** `/admin/statistics`

Update site statistics displayed on the homepage.

**Statistics:**
- Happy Customers (e.g., "1.5M")
- Policy Quotes (e.g., "2.3M")
- Insurance Partners (e.g., "30")
- Years of Experience (e.g., "10")

### 7. Contact Information
**Path:** `/admin/contact`

Manage contact page content and information.

**Sections:**
- Hero section (title, description)
- Contact info cards (phone, email, address, working hours)

**To update contact info:**
1. Select language
2. Edit the relevant fields
3. Click "Save Changes"

### 8. About Page
**Path:** `/admin/about`

Manage the about page content.

**Sections:**
- Hero section
- Mission statement
- Journey milestones (timeline)
- Awards

**To add milestones:**
1. Scroll to "Journey" section
2. Click "Add Item" under Milestones
3. Enter year, title, and description
4. Click "Save Changes"

**To add awards:**
1. Scroll to "Awards" section
2. Click "Add Item" under Awards
3. Enter award title and subtitle
4. Click "Save Changes"

## Best Practices

1. **Test Before Publishing**: Always preview changes on the frontend
2. **Save Frequently**: Don't lose your work - save sections as you edit
3. **Use Both Languages**: Remember to update both Turkish and English versions
4. **Keep Backups**: Export data periodically (feature coming soon)
5. **Validate Content**: Check for typos and formatting issues

## Troubleshooting

### Can't see my changes on the frontend?
- Make sure you clicked "Save Changes"
- Refresh the frontend page (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors

### Changes not saving?
- Check your internet connection
- Verify you're still logged in
- Check Firebase Console for any permission errors

### Forgot password?
- Use Firebase Console > Authentication to reset password
- Or contact your system administrator

## Security Notes

- Never share your admin credentials
- Logout when finished (especially on shared computers)
- Use strong, unique passwords
- Don't leave the admin panel open in public places

## Need Help?

If you encounter any issues:
1. Check the [Firebase Setup Guide](./FIREBASE_SETUP.md)
2. Review Firebase Console for errors
3. Check browser console for JavaScript errors
4. Contact your development team

