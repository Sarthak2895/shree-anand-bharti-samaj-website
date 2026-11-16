export type DepartmentIconName =
  | "dumbbell"
  | "credit"
  | "music"
  | "palette"
  | "library"
  | "women"
  | "nursing"
  | "festival"
  | "indigenous-sports"
  | "foreign-sports"
  | "excursion"
  | "yoga";

export type Department = {
  slug: string;
  name: string;
  nameMr: string;
  shortDescription: string;
  shortDescriptionMr: string;
  overview: string;
  overviewMr: string;
  focusAreas: string[];
  focusAreasMr: string[];
  icon: DepartmentIconName;
  image: string;
};

export const departments: Department[] = [
  {
    slug: "gymnasium",
    image: "/images/departments/gymnasium.webp",
    name: "Gymnasium",
    nameMr: "व्यायामशाळा",
    shortDescription: "Fitness, strength and physical development for the community.",
    shortDescriptionMr: "समुदायासाठी तंदुरुस्ती, ताकद आणि शारीरिक विकास.",
    overview: "The Gymnasium department encourages disciplined exercise, physical fitness and active living. Confirmed timings and training details will be published after committee approval.",
    overviewMr: "व्यायामशाळा विभाग शिस्तबद्ध व्यायाम, शारीरिक तंदुरुस्ती आणि सक्रिय जीवनशैलीला प्रोत्साहन देतो. समितीच्या मंजुरीनंतर वेळापत्रक आणि प्रशिक्षणाची माहिती प्रसिद्ध केली जाईल.",
    focusAreas: ["Physical fitness", "Strength training", "Discipline", "Community wellness"],
    focusAreasMr: ["शारीरिक तंदुरुस्ती", "ताकद प्रशिक्षण", "शिस्त", "सामुदायिक आरोग्य"],
    icon: "dumbbell",
  },
  {
    slug: "credit-society",
    image: "/images/departments/credit-society.webp",
    name: "Credit Society",
    nameMr: "पतसंस्था",
    shortDescription: "Financial cooperation and member-focused community support.",
    shortDescriptionMr: "आर्थिक सहकार्य आणि सदस्यकेंद्रित सामुदायिक मदत.",
    overview: "The Credit Society supports responsible financial cooperation and member services. Only committee-approved services and notices will be published on the website.",
    overviewMr: "पतसंस्था जबाबदार आर्थिक सहकार्य आणि सदस्य सेवांना सहाय्य करते. समितीने मंजूर केलेल्या सेवा आणि सूचना वेबसाइटवर प्रसिद्ध केल्या जातील.",
    focusAreas: ["Member services", "Financial awareness", "Cooperation", "Responsible support"],
    focusAreasMr: ["सदस्य सेवा", "आर्थिक जागरूकता", "सहकार्य", "जबाबदार मदत"],
    icon: "credit",
  },
  {
    slug: "band",
    image: "/images/departments/band.webp",
    name: "Band",
    nameMr: "बँड विभाग",
    shortDescription: "Musical practice, performance and ceremonial participation.",
    shortDescriptionMr: "संगीत सराव, सादरीकरण आणि समारंभातील सहभाग.",
    overview: "The Band department nurtures musical discipline, teamwork and public performance through organised practice and participation in community occasions.",
    overviewMr: "बँड विभाग नियोजित सराव आणि सामुदायिक कार्यक्रमांतील सहभागातून संगीतशिस्त, संघभावना आणि सार्वजनिक सादरीकरणाला प्रोत्साहन देतो.",
    focusAreas: ["Musical practice", "Team performance", "Ceremonial events", "Youth participation"],
    focusAreasMr: ["संगीत सराव", "संघ सादरीकरण", "समारंभ", "युवा सहभाग"],
    icon: "music",
  },
  {
    slug: "arts-development-circle",
    image: "/images/departments/arts-development-circle.webp",
    name: "Arts Development Circle",
    nameMr: "कला विकास मंडळ",
    shortDescription: "Creative expression through art, performance and cultural learning.",
    shortDescriptionMr: "कला, सादरीकरण आणि सांस्कृतिक शिक्षणातून सर्जनशील अभिव्यक्ती.",
    overview: "The Arts Development Circle supports creativity, cultural learning and opportunities for artists and participants of different age groups.",
    overviewMr: "कला विकास मंडळ सर्जनशीलता, सांस्कृतिक शिक्षण आणि विविध वयोगटांतील कलाकार व सहभागींसाठी संधी निर्माण करते.",
    focusAreas: ["Visual arts", "Performing arts", "Workshops", "Cultural learning"],
    focusAreasMr: ["दृश्यकला", "सादरीकरण कला", "कार्यशाळा", "सांस्कृतिक शिक्षण"],
    icon: "palette",
  },
  {
    slug: "library",
    image: "/images/departments/library.webp",
    name: "Library",
    nameMr: "ग्रंथालय",
    shortDescription: "Reading, learning and openly shared community publications.",
    shortDescriptionMr: "वाचन, शिक्षण आणि खुलेपणाने शेअर केलेली सामुदायिक प्रकाशने.",
    overview: "The Library department promotes reading and knowledge sharing. Visitors can directly publish articles, research papers and educational resources through the digital library without account verification.",
    overviewMr: "ग्रंथालय विभाग वाचन आणि ज्ञानवाटपाला प्रोत्साहन देतो. वापरकर्ते खाते पडताळणीशिवाय डिजिटल ग्रंथालयातून लेख, संशोधन निबंध आणि शैक्षणिक साहित्य थेट प्रकाशित करू शकतात.",
    focusAreas: ["Reading resources", "Articles", "Research papers", "Knowledge sharing"],
    focusAreasMr: ["वाचन साहित्य", "लेख", "संशोधन निबंध", "ज्ञानवाटप"],
    icon: "library",
  },
  {
    slug: "womens-association",
    image: "/images/departments/womens-association.webp",
    name: "Women’s Association",
    nameMr: "महिला मंडळ",
    shortDescription: "Participation, learning and community initiatives led by women.",
    shortDescriptionMr: "महिलांच्या नेतृत्वाखाली सहभाग, शिक्षण आणि सामुदायिक उपक्रम.",
    overview: "The Women’s Association provides a platform for learning, creativity, wellbeing and meaningful participation in community initiatives.",
    overviewMr: "महिला मंडळ शिक्षण, सर्जनशीलता, आरोग्य आणि सामुदायिक उपक्रमांतील अर्थपूर्ण सहभागासाठी व्यासपीठ उपलब्ध करून देते.",
    focusAreas: ["Skill development", "Wellbeing", "Cultural participation", "Community leadership"],
    focusAreasMr: ["कौशल्य विकास", "आरोग्य", "सांस्कृतिक सहभाग", "सामुदायिक नेतृत्व"],
    icon: "women",
  },
  {
    slug: "nursing-equipment",
    image: "/images/departments/nursing-equipment.webp",
    name: "Nursing Equipment",
    nameMr: "रुग्णोपयोगी साहित्य विभाग",
    shortDescription: "Practical health-support equipment for community needs.",
    shortDescriptionMr: "समुदायाच्या गरजांसाठी उपयुक्त आरोग्य सहाय्य साहित्य.",
    overview: "This service-oriented department coordinates information and availability of approved nursing or patient-support equipment for community use.",
    overviewMr: "हा सेवाभिमुख विभाग समुदायासाठी मंजूर रुग्णोपयोगी आणि आरोग्य सहाय्य साहित्याची माहिती व उपलब्धता समन्वयित करतो.",
    focusAreas: ["Patient support", "Equipment information", "Community service", "Responsible coordination"],
    focusAreasMr: ["रुग्ण सहाय्य", "साहित्य माहिती", "सामुदायिक सेवा", "जबाबदार समन्वय"],
    icon: "nursing",
  },
  {
    slug: "bhajans-and-festivals",
    image: "/images/departments/bhajans-and-festivals.webp",
    name: "Bhajans and Festivals",
    nameMr: "भजन व उत्सव विभाग",
    shortDescription: "Devotional, traditional and community celebrations.",
    shortDescriptionMr: "भक्ती, परंपरा आणि सामुदायिक उत्सव.",
    overview: "The department coordinates bhajans, festivals and traditional gatherings that strengthen cultural continuity and community bonds.",
    overviewMr: "हा विभाग भजन, उत्सव आणि पारंपरिक कार्यक्रमांचे आयोजन करून सांस्कृतिक सातत्य आणि सामुदायिक नाते मजबूत करतो.",
    focusAreas: ["Bhajans", "Festivals", "Traditions", "Community gatherings"],
    focusAreasMr: ["भजन", "उत्सव", "परंपरा", "सामुदायिक कार्यक्रम"],
    icon: "festival",
  },
  {
    slug: "indigenous-sports",
    image: "/images/departments/indigenous-sports.webp",
    name: "Indigenous Sports",
    nameMr: "देशी क्रीडा विभाग",
    shortDescription: "Traditional Indian sports, teamwork and disciplined competition.",
    shortDescriptionMr: "पारंपरिक भारतीय क्रीडा, संघभावना आणि शिस्तबद्ध स्पर्धा.",
    overview: "The Indigenous Sports department promotes traditional games, physical skill, teamwork and opportunities for training and competition.",
    overviewMr: "देशी क्रीडा विभाग पारंपरिक खेळ, शारीरिक कौशल्य, संघभावना तसेच प्रशिक्षण आणि स्पर्धांच्या संधींना प्रोत्साहन देतो.",
    focusAreas: ["Traditional games", "Skill development", "Teamwork", "Competitions"],
    focusAreasMr: ["पारंपरिक खेळ", "कौशल्य विकास", "संघभावना", "स्पर्धा"],
    icon: "indigenous-sports",
  },
  {
    slug: "foreign-sports",
    image: "/images/departments/foreign-sports.webp",
    name: "Foreign Sports",
    nameMr: "विदेशी क्रीडा विभाग",
    shortDescription: "Modern and internationally played sports for varied age groups.",
    shortDescriptionMr: "विविध वयोगटांसाठी आधुनिक आणि आंतरराष्ट्रीय क्रीडा.",
    overview: "The Foreign Sports department supports coaching, practice and participation in modern and internationally played sports.",
    overviewMr: "विदेशी क्रीडा विभाग आधुनिक आणि आंतरराष्ट्रीय खेळांमध्ये प्रशिक्षण, सराव आणि सहभागाला सहाय्य करतो.",
    focusAreas: ["Modern sports", "Coaching", "Practice", "Competitive development"],
    focusAreasMr: ["आधुनिक खेळ", "प्रशिक्षण", "सराव", "स्पर्धात्मक विकास"],
    icon: "foreign-sports",
  },
  {
    slug: "excursion",
    image: "/images/departments/excursion.webp",
    name: "Excursion",
    nameMr: "सहल विभाग",
    shortDescription: "Educational, cultural and recreational community journeys.",
    shortDescriptionMr: "शैक्षणिक, सांस्कृतिक आणि मनोरंजनात्मक सामुदायिक सहली.",
    overview: "The Excursion department organises approved educational, cultural and recreational visits that encourage learning and community bonding.",
    overviewMr: "सहल विभाग शिक्षण आणि सामुदायिक नाते वृद्धिंगत करणाऱ्या मंजूर शैक्षणिक, सांस्कृतिक आणि मनोरंजनात्मक सहली आयोजित करतो.",
    focusAreas: ["Educational visits", "Cultural exploration", "Community bonding", "Recreation"],
    focusAreasMr: ["शैक्षणिक भेटी", "सांस्कृतिक अनुभव", "सामुदायिक नाते", "मनोरंजन"],
    icon: "excursion",
  },
  {
    slug: "yoga-department",
    image: "/images/departments/yoga-department.webp",
    name: "Yoga Department",
    nameMr: "योग विभाग",
    shortDescription: "Yoga, mindfulness and holistic wellness programmes.",
    shortDescriptionMr: "योग, सजगता आणि सर्वांगीण आरोग्य कार्यक्रम.",
    overview: "The Yoga Department promotes balance, flexibility, mindful living and holistic wellbeing through guided activities.",
    overviewMr: "योग विभाग मार्गदर्शित उपक्रमांद्वारे संतुलन, लवचिकता, सजग जीवनशैली आणि सर्वांगीण आरोग्याला प्रोत्साहन देतो.",
    focusAreas: ["Yoga practice", "Breathing", "Mindfulness", "Holistic wellness"],
    focusAreasMr: ["योगाभ्यास", "श्वसन", "सजगता", "सर्वांगीण आरोग्य"],
    icon: "yoga",
  },
];

export function getDepartment(slug: string) {
  return departments.find((department) => department.slug === slug);
}
