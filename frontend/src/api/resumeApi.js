import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactApi = {
  submitInquiry: (data) => client.post('/contact/', data)
};

// Interceptor to attach JWT token if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle token refresh or 401
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_data');
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (username, password) => client.post('/auth/login/', { username, password }),
  register: (userData) => client.post('/auth/register/', userData),
  googleLogin: (data) => client.post('/auth/google/', data),
  getGoogleConfig: () => client.get('/auth/google/config/'),
  saveGoogleConfig: (clientId) => client.post('/auth/google/config/', { client_id: clientId })
};

export const adminApi = {
  getOverview: () => client.get('/admin/overview/'),
  getUsers: () => client.get('/admin/users/'),
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
  importJSONResume: (jsonData) => client.post('/resumes/import-json/', jsonData),

  // Razorpay ₹29 PDF Payment & Verification
  checkPaymentStatus: (resumeId) => client.get(`/resumes/${resumeId}/payment-status/`),
  createRazorpayOrder: (resumeId) => client.post(`/resumes/${resumeId}/create-order/`),
  verifyRazorpayPayment: (resumeId, payload) => client.post(`/resumes/${resumeId}/verify-payment/`, payload)
};

export default client;
