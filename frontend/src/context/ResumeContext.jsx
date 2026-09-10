import React, { createContext, useContext, useState } from 'react';
import { resumeApi } from '../api/resumeApi';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [activeResume, setActiveResume] = useState(null);
  const [atsAnalysis, setAtsAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await resumeApi.getResumes();
      setResumes(res.data);
    } catch (e) {
      console.error('Failed to fetch resumes', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchResumeDetail = async (id) => {
    try {
      setLoading(true);
      const res = await resumeApi.getResumeDetail(id);
      setActiveResume(res.data);
      return res.data;
    } catch (e) {
      console.error('Failed to fetch resume detail', e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const createResume = async (data) => {
    const res = await resumeApi.createResume(data);
    setActiveResume(res.data);
    setResumes(prev => [res.data, ...prev]);
    return res.data;
  };

  return (
    <ResumeContext.Provider value={{
      resumes,
      activeResume,
      setActiveResume,
      atsAnalysis,
      setAtsAnalysis,
      loading,
      createResume,
      fetchResumes,
      fetchResumeDetail
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
