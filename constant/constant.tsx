export const experiencesList = [
  {
    _id: 'exp-1',
    company: 'Shopee',
    position: 'Software Engineer Trainee',
    startDate: '2025-02-01',
    endDate: '',
    description: 'Leading e-commerce platform in Southeast Asia and Taiwan.',
    achievements: [
      `Selected as one of 28+ trainees to attend Shopee - SEA Labs Indonesia's competitive training program for software engineers.`,
      'Learn full-stack development using Go and React, along with SRE best-practices.',
    ],
    logoUrl: './company/Shopee.svg',
    website: 'https://www.sea.com/products/shopee',
  },
  {
    _id: 'exp-2',
    company: 'Bank Mandiri',
    position: 'Software Engineer Intern',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    description: 'Biggest bank in Indonesia in terms of assets ($35.16B market cap).',
    achievements: [
      'Contributed to the RPA KCTT project using UiPath, automating the KCTT reject data recapitulation process, reducing manual effort by approximately 80% and cutting processing time by 50%.',
      'Developed automation solutions for IPA uploading, streamlining workflows to handle 30+ uploads with zero errors post-implementation.',
      'Achieved recognition as one of the top interns in the IT School program, standing out among 3/4 sessions for exceptional performance and contributions.',
    ],
    logoUrl: '/company/Mandiri.webp',
    website: 'https://www.bankmandiri.co.id/',
  },
  {
    _id: 'exp-3',
    company: 'The Directorate General of Treasury (DJPb), Ministry of Finance',
    position: 'Mobile Developer - Contract',
    startDate: '2024-08-01',
    endDate: '2024-09-31',
    description: 'Government institution in Indonesia.',
    achievements: [
      'Engineered critical features including network state management, session validation, and search, increasing app performance and reducing data loading times by approximately 30%.',
      'Improved system reliability by identifying and resolving 5+ production issues, ensuring 99.9% app uptime and smooth user experiences.',
      'Optimized user workflows through intuitive search and filter features, reducing time spent accessing key bansos data and reports by an estimated 40%.',
    ],
    logoUrl: '/company/Kemenkeu.png',
    website: 'https://www.kemenkeu.go.id/home',
  },
  {
    _id: 'exp-4',
    company: 'Televisi Republik Indonesia (TVRI)',
    position: 'Mobile Developer - Contract',
    startDate: '2024-07-01',
    endDate: '2024-09-31',
    description: `Indonesia's national public broadcasting service.`,
    achievements: [
      'Engineered core app features using Flutter, including task management, task submission, and survey management, streamlining workflows and potentially boosting team productivity by an estimated 20%.',
      'Designed and implemented offline capabilities with auto-resync and local preferences, improving app usability and reliability in low-connectivity environments.',
      'Achieved over 100+ installations on Google Play Store within the first release, demonstrating successful adoption and user trust.',
    ],
    logoUrl: '/company/TVRI.png',
    website: 'https://tvri.go.id/',
  },
  {
    _id: 'exp-5',
    company: 'Bangkit Academy led by Google, Tokopedia, Gojek, and Traveloka',
    position: 'Mobile Development Cohort',
    startDate: '2024-02-01',
    endDate: '2024-07-31',
    description: 'Growing world-class tech talent in Indonesia with Kampus Merdeka.',
    achievements: [
      'Developed deep expertise in Android development through an intensive, industry-led program by Google, Tokopedia, Gojek, and Traveloka.',
      'Mastered Kotlin and Firebase to engineer scalable, user-centric mobile applications, emphasizing robust software engineering and UI/UX design principles.',
      'Spearheaded the development of HouseSpot as a capstone project, showcasing real-world problem solving and innovative mobile app design.',
      'Collaborated effectively in a dynamic cohort environment, refining teamwork and critical thinking skills essential for professional mobile development.',
    ],
    logoUrl: '/company/BangkitLogo.png',
    website: 'https://grow.google/intl/id_id/bangkit/?tab=mobile-development',
  },
  {
    _id: 'exp-6',
    company: 'Faculty of Computer Science Universitas Indonesia',
    position: 'Teaching Assistant',
    startDate: '2022-08-01',
    endDate: '2024-06-31',
    description: 'Shaping excellence in computer science education and research.',
    achievements: [
      'Mentored 3 student groups (15+ students) in core HCI and user-centered design, driving enhanced project quality and academic alignment.',
      'Guided 14 students through Java and OOP principles by designing targeted lab assignments that reinforced key concepts.',
      'Led 13 students through an intensive Python curriculum, with tailored lab projects contributing to top midterm and final scores.',
      'Streamlined project evaluation and delivered personalized one-on-one demonstrations to deepen practical course understanding.',
    ],
    logoUrl: '/company/TAUI.jpeg',
    website: 'https://cs.ui.ac.id/',
  },
];

export const projectList = [
  {
    id: 1,
    title: 'Citizen Journalism Mobile',
    description: `A flutter app designed to streamline news reporting, delivering real-time updates from TVRI.`,
    image: '/project/citizen-journalism.png?height=300&width=500',
    link: 'https://play.google.com/store/apps/details?id=com.tvri.citizenjournalism&hl=en&pli=1',
    tags: ['Flutter', 'Quill RTE', 'Cubit', 'Local Database'],
  },
  {
    id: 2,
    title: 'Bikun Tracker Mobile',
    description:
      'A flutter app designed to keep track of the mobilization of Bis Kuning (Bikun) in University of Indonesia.',
    image: '/project/bikuntracker.png?height=300&width=500',
    link: 'https://bikun.ui.ac.id/',
    tags: ['Flutter', 'Websocket', 'Google API', 'Firebase'],
  },
  {
    id: 3,
    title: 'Questify',
    description:
      'A startup project that aims to empower academic community engagement through a redefined prize-based questionnaire platform.',
    image: '/project/questify.png?height=300&width=500',
    link: 'https://questify-ppl.vercel.app/',
    tags: ['Next.js', 'NestJS', 'TypeScript', 'TDD'],
  },
  {
    id: 4,
    title: 'HouseSpot',
    description:
      'A mobile app designed to simplify homeownership by estimating house prices, connecting with reliable vendors, and discovering related home products and services.',
    image: '/project/housespot.png?height=300&width=500',
    link: 'https://github.com/HouseSpot/kotlin-mobile-fe/releases',
    tags: ['Kotlin', 'Google API', 'ExpressJS', 'GCP'],
  },
  {
    id: 5,
    title: 'Mobile Bansos',
    description:
      'A flutter app to streamline the distribution and management of social assistance (bansos) in Indonesia.',
    image: '/project/mobile-bansos.png?height=300&width=500',
    link: '',
    tags: ['Flutter', 'Cache Management'],
  },
  {
    id: 6,
    title: 'Pet Daycare',
    description:
      'A web app project for pet daycare service with various payment capabilities such as Pet Coins, Voucher, Gopay, Dana, etc.',
    image: '/project/pet-daycare.png?height=300&width=500',
    link: 'https://frontend-adpro-b10.vercel.app/',
    tags: ['Next.js', 'Java Springboot', 'Design Pattern'],
  },
  {
    id: 7,
    title: 'IO Dentistry FKG UI',
    description:
      'A web app to showcase information on the Faculty of Dentistry at Universitas Indonesia for international students.',
    image: '/project/fkg-io.png?height=300&width=500',
    link: 'https://io-dentistry-ui.com/',
    tags: ['React', 'Static Site'],
  },

  {
    id: 8,
    title: 'Share Eat',
    description:
      'A flutter app aimed to resolve issues on food losses & food wastes launched at MACS-G20.',
    image: '/project/share-eat.png?height=300&width=500',
    link: 'https://www.canva.com/design/DAFUgiJEGFg/8YpQFP3n-oyjywJQzvpqGw/view?utm_content=DAFUgiJEGFg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h11c54749bb',
    tags: ['Flutter', 'Django'],
  },
];
