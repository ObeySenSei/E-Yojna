// data.js
// For Render Production (LIVE)
export const API_URL = 'https://e-yojna.onrender.com/api';

// For local development (uncomment when testing locally)
// export const API_URL = 'http://localhost:5000/api';

export const CATEGORIES = ['All', 'Farmers', 'Students', 'Business', 'Health', 'Women', 'Solar Energy', 'Housing', 'Senior Citizens', 'Sports'];

export const MOCK_SCHEMES = [
  {
    "id": 1,
    "title": "PM KISAN Samman Nidhi",
    "ministry": "Ministry of Agriculture",
    "description": "Financial benefit of ₹6000 per year to small and marginal farmer families",
    "benefits": "₹6000 per year in three installments",
    "category": "Farmers",
    "occupations": ["farmer"],
    "applyLink": "https://pmkisan.gov.in",
    "eligibility": "Small and marginal farmer families"
  }
  // Add your other 19 schemes here...
];

// Fetch schemes from backend with TIMEOUT
export const fetchSchemesFromBackend = async (occupation = null) => {
  try {
    let url = `${API_URL}/schemes`;
    if (occupation) {
      url += `?occupation=${occupation}`;
    }
    
    console.log('🔍 Fetching from:', url);
    
    // Add timeout - prevents infinite loading in APK
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Fetched schemes:', Array.isArray(data) ? data.length : 0);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('❌ Backend fetch error:', error.message);
    return null; // Return null to trigger fallback
  }
};

// Fetch occupations list with TIMEOUT
export const fetchOccupationsFromBackend = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${API_URL}/occupations`, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('❌ Failed to fetch occupations:', error.message);
    return [];
  }
};