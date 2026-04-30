import asyncHandler from "express-async-handler";
import prisma from "../config/database.prisma";

// @desc    Get all site settings
// @route   GET /api/settings
// @access  Private/Admin
export const getAllSettings = asyncHandler(async (req, res) => {
  const settings = await prisma.siteSettings.findMany({
    orderBy: { category: 'asc' }
  });

  // Convert to key-value object
  const settingsObj = settings.reduce((acc: any, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  res.json(settingsObj);
});

// @desc    Get settings by category
// @route   GET /api/settings/category/:category
// @access  Private/Admin
export const getSettingsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const settings = await prisma.siteSettings.findMany({
    where: { category }
  });

  const settingsObj = settings.reduce((acc: any, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  res.json(settingsObj);
});

// @desc    Get public settings (for frontend)
// @route   GET /api/settings/public
// @access  Public
export const getPublicSettings = asyncHandler(async (req, res) => {
  const settings = await prisma.siteSettings.findMany({
    where: {
      category: {
        in: ['contact', 'social', 'about']
      }
    }
  });

  const settingsObj = settings.reduce((acc: any, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  res.json(settingsObj);
});

// @desc    Update a setting
// @route   PUT /api/settings/:key
// @access  Private/Admin
export const updateSetting = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  if (value === undefined || value === null) {
    res.status(400);
    throw new Error("Value is required");
  }

  const setting = await prisma.siteSettings.update({
    where: { key },
    data: { value }
  });

  res.json(setting);
});

// @desc    Bulk update settings
// @route   PUT /api/settings
// @access  Private/Admin
export const bulkUpdateSettings = asyncHandler(async (req, res) => {
  const { settings } = req.body;

  if (!settings || typeof settings !== 'object') {
    res.status(400);
    throw new Error("Settings object is required");
  }

  const updates = Object.entries(settings).map(([key, value]) =>
    prisma.siteSettings.update({
      where: { key },
      data: { value: value as string }
    })
  );

  await prisma.$transaction(updates);

  const updatedSettings = await prisma.siteSettings.findMany();

  const settingsObj = updatedSettings.reduce((acc: any, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  res.json(settingsObj);
});

// @desc    Initialize default settings
// @route   POST /api/settings/initialize
// @access  Private/Admin
export const initializeSettings = asyncHandler(async (req, res) => {
  const defaultSettings = [
    // Contact Information
    { key: 'contact_phone', value: '+233 24 000 0000', category: 'contact', description: 'Primary contact phone number' },
    { key: 'contact_phone_secondary', value: '+233 55 000 0000', category: 'contact', description: 'Secondary contact phone number' },
    { key: 'contact_email', value: 'info@winconstructures.com', category: 'contact', description: 'Primary contact email' },
    { key: 'contact_email_secondary', value: 'support@winconstructures.com', category: 'contact', description: 'Secondary contact email' },
    { key: 'contact_address', value: 'East Legon, Accra', category: 'contact', description: 'Office address line 1' },
    { key: 'contact_address_secondary', value: 'Greater Accra, Ghana', category: 'contact', description: 'Office address line 2' },
    { key: 'contact_working_hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM', category: 'contact', description: 'Working hours weekdays' },
    { key: 'contact_working_hours_sat', value: 'Sat: 10:00 AM - 2:00 PM', category: 'contact', description: 'Working hours Saturday' },

    // Social Links
    { key: 'social_facebook', value: 'https://facebook.com/winconstructures', category: 'social', description: 'Facebook page URL' },
    { key: 'social_twitter', value: 'https://twitter.com/winconstructures', category: 'social', description: 'Twitter/X profile URL' },
    { key: 'social_instagram', value: 'https://instagram.com/winconstructures', category: 'social', description: 'Instagram profile URL' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/winconstructures', category: 'social', description: 'LinkedIn company page URL' },
    { key: 'social_youtube', value: '', category: 'social', description: 'YouTube channel URL' },
    { key: 'social_whatsapp', value: 'https://wa.me/2332400000000', category: 'social', description: 'WhatsApp number URL' },

    // About Us
    { key: 'about_title', value: 'About Wincon Structures', category: 'about', description: 'About page title' },
    { key: 'about_description', value: 'Wincon Structures is a leading real estate company dedicated to helping you find your perfect property. With years of experience and a team of experts, we provide comprehensive real estate services across Ghana.', category: 'about', description: 'About us description' },
    { key: 'about_mission', value: 'To provide exceptional real estate services that help our clients achieve their property goals while maintaining the highest standards of integrity and professionalism.', category: 'about', description: 'Company mission statement' },
    { key: 'about_vision', value: 'To be the most trusted and innovative real estate company in Ghana, known for our commitment to excellence and customer satisfaction.', category: 'about', description: 'Company vision statement' },
    { key: 'about_years_experience', value: '15', category: 'about', description: 'Years of experience' },
    { key: 'about_happy_clients', value: '850', category: 'about', description: 'Number of happy clients' },
    { key: 'about_properties_sold', value: '2500', category: 'about', description: 'Number of properties sold' },

    // SEO & Meta
    { key: 'site_name', value: 'Wincon Structures', category: 'seo', description: 'Site name' },
    { key: 'site_tagline', value: 'Find Your Perfect Property', category: 'seo', description: 'Site tagline' },
    { key: 'site_description', value: 'Discover your dream property with Wincon Structures. Browse thousands of verified properties across prime locations in Ghana.', category: 'seo', description: 'Site meta description' },
    { key: 'site_keywords', value: 'real estate, ghana, properties, houses for sale, apartments for rent, accra, east legon', category: 'seo', description: 'Site meta keywords' },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting
    });
  }

  const allSettings = await prisma.siteSettings.findMany();

  const settingsObj = allSettings.reduce((acc: any, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  res.json({ message: 'Settings initialized successfully', settings: settingsObj });
});
