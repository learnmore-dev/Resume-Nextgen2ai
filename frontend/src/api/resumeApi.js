import axios from 'axios';

const API_BASE = '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ensureAuthToken = async () => {
  let token = localStorage.getItem('access_token');
  if (token) return token;
  try {
    const res = await axios.post(`${API_BASE}/auth/login/`, {
      username: 'guest_user',
      password: 'guestpass123'
    });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    localStorage.setItem('user_data', JSON.stringify({ username: 'guest_user', isGuest: true }));
    return res.data.access;
  } catch (err) {
    try {
      await axios.post(`${API_BASE}/auth/register/`, {
        username: 'guest_user',
        email: 'guest@nextgen2ai.com',
        password: 'guestpass123'
      });
      const res = await axios.post(`${API_BASE}/auth/login/`, {
        username: 'guest_user',
        password: 'guestpass123'
      });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      return res.data.access;
    } catch (e) {
      console.error('Guest auth failed', e);
      return null;
    }
  }
};

// Interceptor to attach JWT token (auto-login if missing)
client.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('access_token');
  if (!token && !config.url.includes('/auth/')) {
    token = await ensureAuthToken();
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle token refresh / re-login on 401
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('access_token');
      const token = await ensureAuthToken();
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return client(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (username, password) => client.post('/auth/login/', { username, password }),
  register: (userData) => client.post('/auth/register/', userData),
};

export const resumeApi = {
  getResumes: () => client.get('/resumes/'),
  getResumeDetail: (id) => client.get(`/resumes/${id}/`),
  createResume: (data) => client.post('/resumes/', data),
  updateResume: (id, data) => client.patch(`/resumes/${id}/`, data),
  deleteResume: (id) => client.delete(`/resumes/${id}/`),

  // Sub-resources
  updatePersonalInfo: (resumeId, data) => client.patch(`/resumes/${resumeId}/personal-info/`, data),
  addExperience: (resumeId, data) => client.post(`/resumes/${resumeId}/experience/`, data),
  updateExperience: (resumeId, expId, data) => client.patch(`/resumes/${resumeId}/experience/${expId}/`, data),
  deleteExperience: (resumeId, expId) => client.delete(`/resumes/${resumeId}/experience/${expId}/`),
  
  addEducation: (resumeId, data) => client.post(`/resumes/${resumeId}/education/`, data),
  updateEducation: (resumeId, eduId, data) => client.patch(`/resumes/${resumeId}/education/${eduId}/`, data),
  deleteEducation: (resumeId, eduId) => client.delete(`/resumes/${resumeId}/education/${eduId}/`),

  addProject: (resumeId, data) => client.post(`/resumes/${resumeId}/projects/`, data),
  updateProject: (resumeId, projId, data) => client.patch(`/resumes/${resumeId}/projects/${projId}/`, data),
  deleteProject: (resumeId, projId) => client.delete(`/resumes/${resumeId}/projects/${projId}/`),

  addSkill: (resumeId, data) => client.post(`/resumes/${resumeId}/skills/`, data),
  updateSkill: (resumeId, skillId, data) => client.patch(`/resumes/${resumeId}/skills/${skillId}/`, data),
  deleteSkill: (resumeId, skillId) => client.delete(`/resumes/${resumeId}/skills/${skillId}/`),

  addAchievement: (resumeId, data) => client.post(`/resumes/${resumeId}/achievements/`, data),
  updateAchievement: (resumeId, achId, data) => client.patch(`/resumes/${resumeId}/achievements/${achId}/`, data),
  deleteAchievement: (resumeId, achId) => client.delete(`/resumes/${resumeId}/achievements/${achId}/`),

  // AI Pipeline
  generateSummary: (resumeId, payload = {}) => client.post(`/resumes/${resumeId}/generate-summary/`, payload),
  improveBullets: (resumeId, payload = {}) => client.post(`/resumes/${resumeId}/improve-bullets/`, payload),
  optimizeForJob: (resumeId, jobDescriptionId) => client.post(`/resumes/${resumeId}/optimize-for-job/`, { job_description_id: jobDescriptionId }),
  aiAutofillRole: (resumeId, payload = {}) => client.post(`/resumes/${resumeId}/ai-autofill/`, payload),

  // Job & ATS
  createJobDescription: (data) => client.post('/job-descriptions/', data),
  analyzeATS: (resumeId, jobDescriptionId) => client.post('/ats/analyze/', { resume_id: resumeId, job_description_id: jobDescriptionId }),
  uploadPDFAndAnalyzeATS: (file, jobDescriptionId) => {
    const formData = new FormData();
    formData.append('resume_file', file);
    formData.append('job_description_id', jobDescriptionId);
    return client.post('/ats/upload-pdf/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getSampleJDs: () => client.get('/ats/sample-jds/'),
  getATSHistory: () => client.get('/ats/history/'),

  // Templates & PDF / JSON Resume Export & Import
  getTemplates: () => client.get('/templates/'),
  exportPDF: (resumeId, templateId) => client.get(
    `/resumes/${resumeId}/export-pdf/?template_id=${templateId || 1}`,
    { responseType: 'blob' }
  ),
  exportJSONResume: (resumeId) => client.get(`/resumes/${resumeId}/export-json/`, { responseType: 'blob' }),
  importJSONResume: (jsonData) => client.post('/resumes/import-json/', jsonData)
};

export default client;
