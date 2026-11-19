export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'Full-Stack' | 'Frontend' | 'React' | 'Mobile / UI';
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  stars?: number;
  imageColor?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools & DevOps' | 'Design & Others';
  level: number; // 0 - 100
  iconName: string;
  popular?: boolean;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'Development' | 'Design' | 'Study' | 'Personal';
  createdAt: string;
}

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'project' | 'skill' | 'todo' | 'section';
  targetId: string;
  icon: string;
}

export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: {
    lat: string;
    lng: string;
  };
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: UserAddress;
  phone?: string;
  website?: string;
  company?: UserCompany;
}
