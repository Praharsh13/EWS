// --- US city/ZIP pool (now with lat/lng) ---
const US_LOCATIONS = [
    { city: "San Francisco, CA", zip: "94103", lat: 37.7749, lng: -122.4194 },
    { city: "New York, NY",      zip: "10001", lat: 40.7484, lng: -73.9967 },
    { city: "Boston, MA",        zip: "02108", lat: 42.3587, lng: -71.0636 },
    { city: "Chicago, IL",       zip: "60601", lat: 41.8864, lng: -87.6186 },
    { city: "Dallas, TX",        zip: "75201", lat: 32.7876, lng: -96.7996 },
    { city: "Seattle, WA",       zip: "98101", lat: 47.6101, lng: -122.3344 },
    { city: "Los Angeles, CA",   zip: "90012", lat: 34.0614, lng: -118.2436 },
    { city: "Miami, FL",         zip: "33130", lat: 25.7680, lng: -80.2000 },
    { city: "Atlanta, GA",       zip: "30303", lat: 33.7529, lng: -84.3925 },
    { city: "Denver, CO",        zip: "80202", lat: 39.7525, lng: -104.9995 },
  ];
  
  // Force USA location (city+zip), preserving incoming city if you want
  function withUSLocation(location = {}, i = 0) {
    const pick = US_LOCATIONS[i % US_LOCATIONS.length];
    const useProvidedUSCity = location?.city && /, [A-Z]{2}$/.test(location.city);
    // pick coords from the pool always (demo-friendly & deterministic)
    return {
      city: useProvidedUSCity ? location.city : pick.city,
      country: "USA",
      zip: pick.zip,
      lat: pick.lat,
      lng: pick.lng,
    };
  }
  
  // --- Final exported list: convert RAW patients → USA + careTeam + coords (unchanged lines kept)
  export const PATIENTS = RAW_PATIENTS.map((p, i) => ({
    ...p,
    location: withUSLocation(p.location, i),
    careTeam: p.careTeam ?? {
      group: CARE_GROUPS[i % CARE_GROUPS.length],
      practitioner: PRACTITIONERS[i % PRACTITIONERS.length],
    },
    service: p.service || (p.age < 18 ? "Pediatrics" : "Adult"),
    insurance: p.insurance ?? (i % 2 === 0 ? "BCBS HMO" : "BCBS PPO"),
    majorDiagnosis:
      p.majorDiagnosis ??
      (p.lastCheckup?.imaging?.[0]?.impression ||
       p.lastCheckup?.imaging?.[0]?.result ||
       p.history?.[0] || ""),
  }));
  