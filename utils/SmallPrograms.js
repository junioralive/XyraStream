export function getSeason(date) {
  const year = date.getFullYear();

  // Define the start of each season
  const seasons = {
    'Spring': new Date(year, 2, 21),  // March 21
    'Summer': new Date(year, 5, 21),  // June 21
    'Fall': new Date(year, 8, 23),    // September 23
    'Winter': new Date(year, 11, 21)  // December 21
  };

  if (date >= seasons['Winter'] || date < seasons['Spring']) {
    return 'Winter';
  } else if (date >= seasons['Spring'] && date < seasons['Summer']) {
    return 'Spring';
  } else if (date >= seasons['Summer'] && date < seasons['Fall']) {
    return 'Summer';
  } else if (date >= seasons['Fall'] && date < seasons['Winter']) {
    return 'Fall';
  }
}


export const getLanguageCode = (languageCode) => {
  switch (languageCode) {
    case "en":
      return "ENGLISH";
    case "es":
      return "SPANISH";
    case "fr":
      return "FRENCH";
    case "de":
      return "GERMAN";
    case "ja":
      return "JAPANESE";
    case "zh":
      return "CHINESE";
    case "hi":
      return "HINDI";
    case "ko":
      return "KOREAN";
    case "pt":
      return "PORTUGUESE";
    case "ru":
      return "RUSSIAN";
    case "it":
      return "ITALIAN";
    case "ar":
      return "ARABIC";
    case "tr":
      return "TURKISH";
    // Add more cases as needed
    default:
      return languageCode?.toUpperCase(); // Fallback to the original code if the language is not listed
  }
};