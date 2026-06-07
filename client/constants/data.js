// data.js
export const API_URL = 'http://localhost:5000/api';

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
];

// Fetch schemes from backend
export const fetchSchemesFromBackend = async (occupation = null) => {
  try {
    let url = `${API_URL}/schemes`;
    if (occupation) {
      url += `?occupation=${occupation}`;
    }
    
    console.log('Fetching from:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched schemes:', Array.isArray(data) ? data.length : 0);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Backend fetch error:', error);
    return [];
  }
};

// Fetch occupations list
export const fetchOccupationsFromBackend = async () => {
  try {
    const response = await fetch(`${API_URL}/occupations`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch occupations:', error);
    return [];
  }
};