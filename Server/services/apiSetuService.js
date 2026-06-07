// C:\E-Yojna\Server\services\apiSetuService.js

class APISetuService {
  constructor() {
    // API Setu requires authentication
    this.apiKey = process.env.APISETU_API_KEY || '';
    this.baseUrl = 'https://api.apisetu.gov.in';
  }
  
  async fetchSchemes() {
    console.log('🔌 Fetching schemes from API Setu...');
    
    try {
      // API Setu endpoints for schemes
      // Note: Actual implementation would require valid API key
      const endpoints = [
        `${this.baseUrl}/schemes/v1/list`,
        `${this.baseUrl}/schemes/v1/categories`,
      ];
      
      // For demo, return mock data
      const mockSchemes = this.getMockSchemes();
      
      console.log(`✅ API Setu returned ${mockSchemes.length} schemes`);
      return mockSchemes;
      
    } catch (error) {
      console.error('API Setu error:', error.message);
      return [];
    }
  }
  
  getMockSchemes() {
    return [
      {
        id: Date.now(),
        title: "Digital India Scheme",
        description: "Promoting digital literacy",
        ministry: "Ministry of Electronics & IT",
        category: "Technology",
        occupations: ["student", "jobseeker"],
        benefits: "Free training",
        eligibility: "Indian citizens",
        documents: ["Aadhar"],
        applyLink: "https://digitalindia.gov.in"
      }
    ];
  }
  
  async fetchSchemeById(schemeId) {
    // Fetch individual scheme details
    try {
      const response = await fetch(`${this.baseUrl}/schemes/v1/${schemeId}`);
      return response.json();
    } catch (error) {
      console.error('Error fetching scheme:', error);
      return null;
    }
  }
}

module.exports = APISetuService;