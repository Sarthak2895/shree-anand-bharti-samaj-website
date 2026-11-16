export type Locale = "en" | "mr";

export const localePath = (locale: Locale, path = "") => {
  const normalized = path === "/" ? "" : path;
  return locale === "mr" ? `/mr${normalized}` : normalized || "/";
};

export const ui = {
  en: {
    languageName: "English",
    switchLanguage: "मराठी",
    organisation: "Shree Anand Bharti Samaj",
    organisationMarathi: "श्री आनंद भारती समाज, ठाणे",
    nav: {
      home: "Home",
      about: "About Us",
      departments: "Departments",
      library: "Library",
      gallery: "Gallery",
      events: "Events",
      contact: "Contact",
    },
    footerDescription:
      "Preserving a 116-year legacy while empowering generations through sports, culture, education, wellness, service and community participation.",
    follow: "Follow the organisation",
  },
  mr: {
    languageName: "मराठी",
    switchLanguage: "English",
    organisation: "श्री आनंद भारती समाज",
    organisationMarathi: "Shree Anand Bharti Samaj, Thane",
    nav: {
      home: "मुख्यपृष्ठ",
      about: "आमच्याविषयी",
      departments: "विभाग",
      library: "ग्रंथालय",
      gallery: "छायाचित्र संग्रह",
      events: "कार्यक्रम",
      contact: "संपर्क",
    },
    footerDescription:
      "क्रीडा, संस्कृती, शिक्षण, आरोग्य, सेवा आणि सामुदायिक सहभागातून ११६ वर्षांचा वारसा जपत पुढील पिढ्यांना सक्षम करण्याचा आमचा प्रयत्न.",
    follow: "संस्थेला सोशल मीडियावर फॉलो करा",
  },
} as const;
