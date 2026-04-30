"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useSettings } from '@/hooks/useSettings';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'react-toastify';

export default function SettingsPage() {
  const { settings, loading, fetchAllSettings, bulkUpdateSettings, initializeSettings } = useSettings();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchAllSettings();
  }, []);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async (category: string) => {
    setSaving(true);

    try {
      const categoryKeys: { [key: string]: string[] } = {
        contact: [
          'contact_phone', 'contact_phone_secondary', 'contact_email', 'contact_email_secondary',
          'contact_address', 'contact_address_secondary', 'contact_working_hours', 'contact_working_hours_sat'
        ],
        social: [
          'social_facebook', 'social_twitter', 'social_instagram', 'social_linkedin',
          'social_youtube', 'social_whatsapp'
        ],
        about: [
          'about_title', 'about_description', 'about_mission', 'about_vision',
          'about_years_experience', 'about_happy_clients', 'about_properties_sold'
        ],
        seo: [
          'site_name', 'site_tagline', 'site_description', 'site_keywords'
        ]
      };

      const keysToUpdate = categoryKeys[category] || [];
      const updates: any = {};

      keysToUpdate.forEach(key => {
        if (formData[key] !== undefined) {
          updates[key] = formData[key];
        }
      });

      await bulkUpdateSettings(updates);
      toast.success(`${category.charAt(0).toUpperCase() + category.slice(1)} settings saved successfully!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleInitialize = async () => {
    if (!confirm('This will initialize default settings. Are you sure?')) return;

    try {
      await initializeSettings();
      toast.success('Settings initialized successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to initialize settings');
    }
  };

  const tabs = [
    { id: 'contact', label: 'Contact Info', icon: <FaEnvelope className="w-4 h-4" /> },
    { id: 'social', label: 'Social Links', icon: <FaFacebook className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <FaMapMarkerAlt className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO & Meta', icon: <FaClock className="w-4 h-4" /> },
  ];

  if (loading && !formData.contact_phone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
              <p className="text-gray-600 mt-1">Manage your site-wide content and information</p>
            </div>
            <button
              onClick={handleInitialize}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Initialize Defaults
            </button>
          </div>

          {/* Tabs */}
          <div="flex gap-2 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contact Settings */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Primary Phone</label>
                <input
                  type="text"
                  value={formData.contact_phone || ''}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="+233 24 000 0000"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Secondary Phone</label>
                <input
                  type="text"
                  value={formData.contact_phone_secondary || ''}
                  onChange={(e) => handleChange('contact_phone_secondary', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="+233 55 000 0000"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Primary Email</label>
                <input
                  type="email"
                  value={formData.contact_email || ''}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="info@winconstructures.com"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Secondary Email</label>
                <input
                  type="email"
                  value={formData.contact_email_secondary || ''}
                  onChange={(e) => handleChange('contact_email_secondary', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="support@winconstructures.com"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                <input
                  type="text"
                  value={formData.contact_address || ''}
                  onChange={(e) => handleChange('contact_address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="East Legon, Accra"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                <input
                  type="text"
                  value={formData.contact_address_secondary || ''}
                  onChange={(e) => handleChange('contact_address_secondary', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Greater Accra, Ghana"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Working Hours (Weekdays)</label>
                <input
                  type="text"
                  value={formData.contact_working_hours || ''}
                  onChange={(e) => handleChange('contact_working_hours', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Mon - Fri: 9:00 AM - 6:00 PM"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Working Hours (Saturday)</label>
                <input
                  type="text"
                  value={formData.contact_working_hours_sat || ''}
                  onChange={(e) => handleChange('contact_working_hours_sat', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Sat: 10:00 AM - 2:00 PM"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleSave('contact')}
                disabled={saving}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Social Settings */}
        {activeTab === 'social' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <h2 className="text-xl font-semibold mb-6">Social Media Links</h2>

            <div className="space-y-6">
              {[
                { key: 'social_facebook', label: 'Facebook', icon: <FaFacebook className="text-blue-600" />, placeholder: 'https://facebook.com/winconstructures' },
                { key: 'social_twitter', label: 'Twitter/X', icon: <FaTwitter className="text-gray-800" />, placeholder: 'https://twitter.com/winconstructures' },
                { key: 'social_instagram', label: 'Instagram', icon: <FaInstagram className="text-pink-600" />, placeholder: 'https://instagram.com/winconstructures' },
                { key: 'social_linkedin', label: 'LinkedIn', icon: <FaLinkedin className="text-blue-700" />, placeholder: 'https://linkedin.com/company/winconstructures' },
                { key: 'social_youtube', label: 'YouTube', icon: <FaYoutube className="text-red-600" />, placeholder: 'https://youtube.com/@winconstructures' },
                { key: 'social_whatsapp', label: 'WhatsApp', icon: <FaWhatsapp className="text-green-600" />, placeholder: 'https://wa.me/2332400000000' },
              ].map((social) => (
                <div key={social.key} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    {social.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="block text-sm font-medium text-gray-700">{social.label}</label>
                    <input
                      type="url"
                      value={formData[social.key] || ''}
                      onChange={(e) => handleChange(social.key, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder={social.placeholder}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleSave('social')}
                disabled={saving}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        )}

        {/* About Settings */}
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <h2 className="text-xl font-semibold mb-6">About Us Content</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.about_title || ''}
                  onChange={(e) => handleChange('about_title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="About Wincon Structures"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={4}
                  value={formData.about_description || ''}
                  onChange={(e) => handleChange('about_description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Company description..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mission Statement</label>
                <textarea
                  rows={3}
                  value={formData.about_mission || ''}
                  onChange={(e) => handleChange('about_mission', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Our mission..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Vision Statement</label>
                <textarea
                  rows={3}
                  value={formData.about_vision || ''}
                  onChange={(e) => handleChange('about_vision', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Our vision..."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <input
                    type="number"
                    value={formData.about_years_experience || ''}
                    onChange={(e) => handleChange('about_years_experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="15"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Happy Clients</label>
                  <input
                    type="number"
                    value={formData.about_happy_clients || ''}
                    onChange={(e) => handleChange('about_happy_clients', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="850"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Properties Sold</label>
                  <input
                    type="number"
                    value={formData.about_properties_sold || ''}
                    onChange={(e) => handleChange('about_properties_sold', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="2500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleSave('about')}
                disabled={saving}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        )}

        {/* SEO Settings */}
        {activeTab === 'seo' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <h2 className="text-xl font-semibold mb-6">SEO & Meta Information</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Site Name</label>
                <input
                  type="text"
                  value={formData.site_name || ''}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Wincon Structures"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Site Tagline</label>
                <input
                  type="text"
                  value={formData.site_tagline || ''}
                  onChange={(e) => handleChange('site_tagline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Find Your Perfect Property"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  rows={3}
                  value={formData.site_description || ''}
                  onChange={(e) => handleChange('site_description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Discover your dream property with Wincon Structures..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Meta Keywords</label>
                <input
                  type="text"
                  value={formData.site_keywords || ''}
                  onChange={(e) => handleChange('site_keywords', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="real estate, ghana, properties, houses for sale"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleSave('seo')}
                disabled={saving}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
