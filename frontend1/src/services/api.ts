import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  signup: async (data: { email: string; password: string; full_name: string }) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};

// Prediction API
export const predictionApi = {
  submitTest: async (scores: Record<string, number>) => {
    const response = await api.post('/predict/test', { scores });
    return response.data;
  },

  getResults: async () => {
    const response = await api.get('/predict/results');
    return response.data;
  },

  getResultById: async (id: string) => {
    const response = await api.get(`/predict/results/${id}`);
    return response.data;
  },
};

// User API
export const userApi = {
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (data: { full_name: string }) => {
    const response = await api.put('/user/profile', data);
    return response.data;
  },
};

// Career Paths API
export const careersApi = {
  getPaths: async () => {
    const response = await api.get('/careers/paths');
    return response.data;
  },

  getPath: async (id: number) => {
    const response = await api.get(`/careers/paths/${id}`);
    return response.data;
  },

  getExams: async () => {
    const response = await api.get('/careers/exams');
    return response.data;
  },

  getJobs: async (filters?: { career_path_id?: number; min_salary?: number; max_salary?: number }) => {
    const response = await api.get('/careers/jobs', { params: filters });
    return response.data;
  },

  getJobDetails: async (id: number) => {
    const response = await api.get(`/careers/jobs/${id}`);
    return response.data;
  },
};

// Roadmaps API
export const roadmapsApi = {
  getRoadmap: async () => {
    const response = await api.get('/roadmaps/');
    return response.data;
  },

  generateRoadmap: async (data: {
    stage?: string;
    academic_stage?: string;
    current_stream?: string;
    class_grade?: string;
    target_exams?: string[];
  }) => {
    const response = await api.post('/roadmaps/generate', data);
    return response.data;
  },

  updateStage: async (data: {
    academic_stage?: string;
    current_stream?: string;
    class_grade?: string;
    target_exams?: string[];
  }) => {
    const response = await api.put('/roadmaps/update-stage', data);
    return response.data;
  },
};

// Chatbot API
export const chatbotApi = {
  ask: async (question: string) => {
    const response = await api.post('/chatbot/ask', { question });
    return response.data;
  },

  getSuggestedQuestions: async () => {
    const response = await api.get('/chatbot/suggested-questions');
    return response.data;
  },
};

export default api;
