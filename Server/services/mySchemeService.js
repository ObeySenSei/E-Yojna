const axios = require('axios');

const Scheme = require('../models/Scheme');

const categorizeScheme =
require('../utils/categorizeScheme');


// ================= FETCH & STORE SCHEMES =================
const fetchAndStoreSchemes = async () => {

    try {

        // TEMP MOCK DATA
        // Replace later with actual govt API

        const mockSchemes = [

            {

                title: 'PM Kisan',
                description: 'Financial support for farmers',
                ministry: 'Agriculture Ministry',
                benefits: '₹6000 yearly',
                eligibility: 'Small farmers'

            },

            {

                title: 'National Scholarship',
                description: 'Scholarship for students',
                ministry: 'Education Ministry',
                benefits: 'Education financial support',
                eligibility: 'Students'

            }

        ];


        for (const item of mockSchemes) {

            // Avoid duplicates
            const existingScheme = await Scheme.findOne({
                title: item.title
            });

            if (existingScheme) {
                continue;
            }


            const category =
            categorizeScheme(item.title);


            await Scheme.create({

                title: item.title,

                description: item.description,

                ministry: item.ministry,

                category,

                tags: [category.toLowerCase()],

                benefits: item.benefits,

                eligibility: item.eligibility,

                source: 'myScheme'

            });

        }

        console.log('✅ Schemes fetched and stored');

    } catch (error) {

        console.error(error.message);

    }

};

module.exports = fetchAndStoreSchemes;