export const kpis = [
    { label: 'Detection Rate', value: '92%' },
    { label: 'False Positives', value: '5%' },
    { label: 'False Negatives', value: '3%' },
    { label: 'Active Alerts', value: '7' },
  ];
  
  export const cancerDeaths = [
    { type: 'Lung', deaths: 120000 },
    { type: 'Breast', deaths: 85000 },
    { type: 'Prostate', deaths: 65000 },
    { type: 'Skin', deaths: 40000 },
    { type: 'Colorectal', deaths: 55000 },
  ];
  
  export const genderRatio = { male: 55, female: 45, others:12 };
  

  export const cancerDeathsMale = [
    { type: 'Lung', deaths: 75000 },
    { type: 'Prostate', deaths: 65000 },
    { type: 'Colorectal', deaths: 32000 },
    { type: 'Skin', deaths: 22000 },
    { type: 'Liver', deaths: 18000 },
  ];
  
  export const cancerDeathsFemale = [
    { type: 'Breast', deaths: 85000 },
    { type: 'Lung', deaths: 45000 },
    { type: 'Colorectal', deaths: 23000 },
    { type: 'Skin', deaths: 18000 },
    { type: 'Ovarian', deaths: 15000 },
  ];
  
  // by country (ISO or label — your choice)
  export const cancerDeathsByCountry = {
    USA: [
      { type: 'Lung', deaths: 52000 },
      { type: 'Breast', deaths: 43000 },
      { type: 'Prostate', deaths: 28000 },
      { type: 'Colorectal', deaths: 25000 },
      { type: 'Skin', deaths: 18000 }

    ],
    GBR: [
      { type: 'Lung', deaths: 12000 },
      { type: 'Breast', deaths: 9000 },
      { type: 'Colorectal', deaths: 7000 },
    ],
    IND: [
      { type: 'Lung', deaths: 15000 },
      { type: 'Breast', deaths: 11000 },
      { type: 'Colorectal', deaths: 8000 },
    ],
  };
  