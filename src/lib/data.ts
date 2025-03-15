export const categories = [
  'JavaScript',
  'Python',
  'React',
  'Marketing',
  'UI/UX Design',
  'Data Science',
  'Business',
  'Mobile Development',
  'Cloud Computing',
  'Machine Learning',
  'DevOps',
  'Blockchain',
  'Cybersecurity',
  'Game Development',
  'AI'
];

export interface Resource {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  duration: string;
  rating: number;
  source: string;
  url: string;
  points: number;
  featured?: boolean;
  content?: string;
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'JavaScript Crash Course for Beginners',
    description: 'Learn JavaScript fundamentals in just one hour. Perfect for beginners who want to start coding quickly.',
    thumbnail: 'https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg',
    category: 'JavaScript',
    duration: '1h 12m',
    rating: 4.8,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
    points: 30,
    featured: true,
    content: `
      # JavaScript Crash Course for Beginners

      This comprehensive course covers everything you need to know to get started with JavaScript:

      ## Topics Covered:
      - Variables and Data Types
      - Functions and Scope
      - DOM Manipulation
      - Event Handling
      - Arrays and Objects
      - ES6 Features

      ## Why This Resource?
      This video is perfect for beginners as it breaks down complex concepts into digestible chunks with practical examples.
      
      ## How to Use This Resource:
      Watch the full video and code along with the examples. Take notes on key concepts and practice with the exercises.
    `
  },
  {
    id: '2',
    title: 'Python for Data Science - Full Course',
    description: 'Learn Python specifically for data science applications. Covers pandas, numpy, matplotlib and more.',
    thumbnail: 'https://i.ytimg.com/vi/LHBE6Q9XlzI/maxresdefault.jpg',
    category: 'Python',
    duration: '4h 20m',
    rating: 4.9,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
    points: 75,
    featured: true
  },
  {
    id: '3',
    title: 'UI/UX Design Essentials',
    description: 'Learn the fundamentals of UI/UX design. This course teaches you design thinking, wireframing, and prototyping.',
    thumbnail: 'https://i.ytimg.com/vi/c9Wg6Cb_YlU/maxresdefault.jpg',
    category: 'UI/UX Design',
    duration: '2h 45m',
    rating: 4.7,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
    points: 45,
    featured: true
  },
  {
    id: '4',
    title: 'React JS Tutorial for Beginners',
    description: 'Complete React tutorial covering components, props, state, hooks, and building a full project from scratch.',
    thumbnail: 'https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg',
    category: 'React',
    duration: '1h 48m',
    rating: 4.9,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    points: 40
  },
  {
    id: '5',
    title: 'Digital Marketing Fundamentals',
    description: 'Learn the basics of digital marketing including SEO, social media marketing, and content marketing.',
    thumbnail: 'https://i.ytimg.com/vi/nU-IIXBWlS4/maxresdefault.jpg',
    category: 'Marketing',
    duration: '1h 30m',
    rating: 4.6,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
    points: 35
  },
  {
    id: '6',
    title: 'Machine Learning for Beginners',
    description: 'Introduction to machine learning concepts, algorithms and practical applications with Python.',
    thumbnail: 'https://i.ytimg.com/vi/KNAWp2S3w94/maxresdefault.jpg',
    category: 'Machine Learning',
    duration: '3h 12m',
    rating: 4.8,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=KNAWp2S3w94',
    points: 60
  },
  {
    id: '7',
    title: 'Flutter Mobile App Development',
    description: 'Build beautiful native apps for iOS and Android from a single codebase using Flutter.',
    thumbnail: 'https://i.ytimg.com/vi/1ukSR1GRtMU/maxresdefault.jpg',
    category: 'Mobile Development',
    duration: '2h 30m',
    rating: 4.7,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=1ukSR1GRtMU',
    points: 45
  },
  {
    id: '8',
    title: 'AWS Cloud Fundamentals',
    description: 'Learn the fundamentals of Amazon Web Services cloud computing platform.',
    thumbnail: 'https://i.ytimg.com/vi/ulprqHHWlng/maxresdefault.jpg',
    category: 'Cloud Computing',
    duration: '2h 15m',
    rating: 4.6,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=ulprqHHWlng',
    points: 50
  },
  {
    id: '9',
    title: 'Business Plan Creation Guide',
    description: 'Step-by-step guide to creating a comprehensive business plan for your startup or small business.',
    thumbnail: 'https://i.ytimg.com/vi/Fqch5OrUPvA/maxresdefault.jpg',
    category: 'Business',
    duration: '1h 10m',
    rating: 4.5,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=Fqch5OrUPvA',
    points: 30
  },
  {
    id: '10',
    title: 'Data Visualization with D3.js',
    description: 'Create stunning interactive data visualizations for the web using the powerful D3.js library.',
    thumbnail: 'https://i.ytimg.com/vi/C4t6qfHZ6Tw/maxresdefault.jpg',
    category: 'Data Science',
    duration: '3h 20m',
    rating: 4.7,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=C4t6qfHZ6Tw',
    points: 55
  },
  {
    id: '11',
    title: 'DevOps for Beginners: CI/CD Pipeline with GitHub Actions',
    description: 'Learn how to set up continuous integration and continuous deployment pipelines using GitHub Actions. Perfect for developers wanting to automate their workflows.',
    thumbnail: 'https://i.ytimg.com/vi/R8_veQiYBjI/maxresdefault.jpg',
    category: 'DevOps',
    duration: '1h 45m',
    rating: 4.7,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=R8_veQiYBjI',
    points: 40
  },
  {
    id: '12',
    title: 'Introduction to Blockchain Technology',
    description: 'A comprehensive introduction to blockchain technology, cryptocurrencies, and smart contracts. Learn the fundamentals of decentralized systems.',
    thumbnail: 'https://i.ytimg.com/vi/SSo_EIwHSd4/maxresdefault.jpg',
    category: 'Blockchain',
    duration: '2h 30m',
    rating: 4.5,
    source: 'Udemy',
    url: 'https://www.udemy.com/course/blockchain-basics',
    points: 50
  },
  {
    id: '13',
    title: 'Cybersecurity Fundamentals: Protecting Your Digital Life',
    description: 'Learn essential cybersecurity practices to protect your personal information and digital assets from common threats and attacks.',
    thumbnail: 'https://i.ytimg.com/vi/inWWhr5tnEA/maxresdefault.jpg',
    category: 'Cybersecurity',
    duration: '1h 20m',
    rating: 4.8,
    source: 'Coursera',
    url: 'https://www.coursera.org/learn/cybersecurity-basics',
    points: 35
  },
  {
    id: '14',
    title: 'Game Development with Unity: Complete 2D Game',
    description: 'Build a complete 2D game from scratch using Unity game engine. Learn game physics, animations, and C# programming for game development.',
    thumbnail: 'https://i.ytimg.com/vi/gB1F9G0JXOo/maxresdefault.jpg',
    category: 'Game Development',
    duration: '4h 15m',
    rating: 4.9,
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=gB1F9G0JXOo',
    points: 70
  },
  {
    id: '15',
    title: 'AI Fundamentals: Understanding Machine Learning and Neural Networks',
    description: 'An introduction to artificial intelligence concepts including machine learning algorithms, neural networks, and practical applications in everyday technologies.',
    thumbnail: 'https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg',
    category: 'AI',
    duration: '2h 50m',
    rating: 4.8,
    source: 'edX',
    url: 'https://www.edx.org/learn/artificial-intelligence',
    points: 55,
    featured: true
  },
  {
    id: '16',
    title: 'Advanced React Patterns and Best Practices',
    description: 'Learn advanced React patterns including render props, custom hooks, context API, and performance optimization techniques for complex applications.',
    thumbnail: 'https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg',
    category: 'React',
    duration: '3h 10m',
    rating: 4.9,
    source: 'Frontend Masters',
    url: 'https://frontendmasters.com/courses/advanced-react-patterns/',
    points: 65
  },
  {
    id: '17',
    title: 'Python for Data Analysis: Pandas Deep Dive',
    description: 'Master data manipulation and analysis with Python using the pandas library. Learn to clean, transform, and visualize data effectively.',
    thumbnail: 'https://i.ytimg.com/vi/vmEHCJofslg/maxresdefault.jpg',
    category: 'Python',
    duration: '2h 40m',
    rating: 4.7,
    source: 'DataCamp',
    url: 'https://www.datacamp.com/courses/pandas-fundamentals',
    points: 45
  },
  {
    id: '18',
    title: 'UX Research Methods: User Interviews and Usability Testing',
    description: 'Learn effective techniques for conducting user interviews and usability testing to gather valuable insights for your design process.',
    thumbnail: 'https://i.ytimg.com/vi/O94kYyzqvTc/maxresdefault.jpg',
    category: 'UI/UX Design',
    duration: '1h 55m',
    rating: 4.6,
    source: 'Interaction Design Foundation',
    url: 'https://www.interaction-design.org/courses/user-research-methods',
    points: 40
  }
];

export const addResource = (resource: Omit<Resource, 'id' | 'rating' | 'points'>): Resource => {
  const newResource: Resource = {
    ...resource,
    id: (resources.length + 1).toString(),
    rating: 0,
    points: Math.floor(15 + Math.random() * 40)
  };
  
  resources.push(newResource);
  
  localStorage.setItem('customResources', JSON.stringify(
    JSON.parse(localStorage.getItem('customResources') || '[]').concat([newResource])
  ));
  
  return newResource;
};

export const loadCustomResources = (): void => {
  const customResources = JSON.parse(localStorage.getItem('customResources') || '[]');
  
  const existingIds = new Set(resources.map(r => r.id));
  
  customResources.forEach((resource: Resource) => {
    if (!existingIds.has(resource.id)) {
      resources.push(resource);
      existingIds.add(resource.id);
    }
  });
};

loadCustomResources();

export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  completedResources: string[];
  inProgressResources: string[];
  hasCompletedOnboarding: boolean;
  learningGoals: string[];
  preferredCategories: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  weeklyHours: number;
  preferredFormats: string[];
}

let currentUser: User | null = null;

export const getUserPoints = (): number => {
  return currentUser?.points || 120;
};

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const setCurrentUser = (user: User | null): void => {
  currentUser = user;
};

export const loginUser = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && email.includes('@') && password.length > 3) {
        const user: User = {
          id: '1',
          email: email,
          name: email.split('@')[0],
          points: 120,
          completedResources: ['1', '3'],
          inProgressResources: ['2', '4'],
          hasCompletedOnboarding: true,
          learningGoals: ['skills', 'career'],
          preferredCategories: ['JavaScript', 'React', 'Python'],
          skillLevel: 'beginner',
          weeklyHours: 5,
          preferredFormats: ['video', 'interactive']
        };
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800);
  });
};

export const registerUser = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && email.includes('@') && password.length > 5) {
        const user: User = {
          id: Date.now().toString(),
          email: email,
          name: email.split('@')[0],
          points: 0,
          completedResources: [],
          inProgressResources: [],
          hasCompletedOnboarding: true,
          learningGoals: ['skills'],
          preferredCategories: ['JavaScript'],
          skillLevel: 'beginner',
          weeklyHours: 5,
          preferredFormats: ['video']
        };
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid email or password. Password must be at least 6 characters.'));
      }
    }, 800);
  });
};

export const logoutUser = (): void => {
  currentUser = null;
  localStorage.removeItem('currentUser');
};

export const initializeUserFromStorage = (): void => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
  }
};

export const markResourceCompleted = (resourceId: string): void => {
  if (!currentUser) return;
  
  currentUser.inProgressResources = currentUser.inProgressResources.filter(id => id !== resourceId);
  
  if (!currentUser.completedResources.includes(resourceId)) {
    currentUser.completedResources.push(resourceId);
    
    const resource = resources.find(r => r.id === resourceId);
    if (resource) {
      currentUser.points += resource.points;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
};

export const markResourceInProgress = (resourceId: string): void => {
  if (!currentUser) return;
  
  if (!currentUser.inProgressResources.includes(resourceId) && 
      !currentUser.completedResources.includes(resourceId)) {
    currentUser.inProgressResources.push(resourceId);
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
};

export const saveUserPreferences = (preferences: Partial<User>): void => {
  if (!currentUser) return;
  
  currentUser = { ...currentUser, ...preferences, hasCompletedOnboarding: true };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
};

export const getPersonalizedResources = (): Resource[] => {
  if (!currentUser) {
    return resources.filter(r => r.featured);
  }
  
  let personalizedResources = [...resources];
  
  if (currentUser.preferredCategories.length > 0) {
    personalizedResources = personalizedResources.filter(
      resource => currentUser!.preferredCategories.includes(resource.category)
    );
  }
  
  if (personalizedResources.length > 5) {
    if (currentUser.skillLevel === 'beginner') {
      personalizedResources.sort((a, b) => 
        parseInt(a.duration) < parseInt(b.duration) ? -1 : 1
      );
    } else if (currentUser.skillLevel === 'advanced') {
      personalizedResources.sort((a, b) => 
        parseInt(a.duration) > parseInt(b.duration) ? -1 : 1
      );
    }
  }
  
  if (personalizedResources.length < 3) {
    const featuredResources = resources.filter(r => 
      r.featured && !personalizedResources.includes(r)
    );
    personalizedResources = [...personalizedResources, ...featuredResources.slice(0, 3)];
  }
  
  return personalizedResources;
};
