export const filterSchemesByOccupation = (schemes, occupation) => {
  return schemes.filter(scheme => 
    scheme.occupations?.includes(occupation)
  );
};

export const getOccupationName = (occupations, id) => {
  const occupation = occupations.find(o => o.id === id);
  return occupation ? occupation.name : '';
};