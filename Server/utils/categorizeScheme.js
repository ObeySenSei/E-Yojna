const categorizeScheme = (text) => {

    const value = text.toLowerCase();

    if (value.includes('kisan') ||
        value.includes('farmer')) {

        return 'Farmers';

    }

    if (value.includes('student') ||
        value.includes('scholarship')) {

        return 'Students';

    }

    if (value.includes('employee')) {

        return 'Employees';

    }

    if (value.includes('senior')) {

        return 'Senior Citizens';

    }

    return 'General';

};

module.exports = categorizeScheme;