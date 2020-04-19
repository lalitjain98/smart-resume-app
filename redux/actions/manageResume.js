import manageResume from '../actionTypes/manageResume';
import api from '../../api';
import { DEFAULT_ERROR_MESSAGE } from '../../constants/api';

export const setShowResumeSectionFormModal = (showModal) => async (dispatch) => {
  dispatch({
    type: manageResume.SHOW_RESUME_SECTION_FORM_MODAL,
    payload: showModal,
  });
};

const getAllResumeSections = () => async (dispatch, getState) => {
  try {
    dispatch({ type: manageResume.GET_ALL_RESUME_SECTIONS });
    const res = await api('/resume-sections', 'GET');
    console.log(res);
    if (res && res.status >= 200 && res.status < 400) {
      const { data } = res;
      dispatch({
        type: manageResume.GET_ALL_RESUME_SECTIONS_SUCCESS,
        payload: data.rows,
      });
    }
    if (res.status >= 400 && res.status < 600) throw new Error(res.message);
  } catch (e) {
    console.log(e);
    dispatch({ type: manageResume.GET_ALL_RESUME_SECTIONS_ERROR, payload: e.message || DEFAULT_ERROR_MESSAGE });
  }
};

const setCurrentResumeSectionItemId = (id) => async (dispatch) => {
  dispatch({
    type: manageResume.SET_CURRENT_RESUME_SECTION_ITEM_ID,
    payload: id,
  });
};

const saveResumeSection = (sectionData) => async (dispatch, getState) => {
  try {
    const state = getState();
    const id = state.manageResume.currentResumeSectionItemId;
    if (id) {
      dispatch({ type: manageResume.UPDATE_RESUME_SECTION });
      const res = await api(`/resume-sections/${id}`, 'PUT', sectionData);
      console.log(res);
      if (res && res.status >= 200 && res.status < 400) {
        const { data } = res;
        if (data === 1) {
          dispatch({
            type: manageResume.UPDATE_RESUME_SECTION_SUCCESS,
            payload: sectionData,
          });
        }
      }
      if (res.data === 0) dispatch({ type: manageResume.UPDATE_RESUME_SECTION_ERROR, payload: DEFAULT_ERROR_MESSAGE });
      if (res.status >= 400 && res.status < 600) dispatch({ type: manageResume.UPDATE_RESUME_SECTION_ERROR, payload: res.message || DEFAULT_ERROR_MESSAGE });
    } else {
      dispatch({ type: manageResume.CREATE_RESUME_SECTION });
      const res = await api('/resume-sections', 'POST', sectionData);
      console.log(res);
      if (res && res.status >= 200 && res.status < 400) {
        const { data } = res;
        dispatch({
          type: manageResume.CREATE_RESUME_SECTION_SUCCESS,
          payload: data,
        });
      }
      if (res.status >= 400 && res.status < 600) dispatch({ type: manageResume.CREATE_RESUME_SECTION_ERROR, payload: res.message || DEFAULT_ERROR_MESSAGE });
    }
  } catch (e) {
    console.log(e);
  }
};

const setCurrentExperienceItemId = (id) => async (dispatch) => {
  dispatch({
    type: manageResume.SET_CURRENT_XP_ITEM_ID,
    payload: id,
  });
};

const saveExperience = (xpData) => async (dispatch, getState) => {
  try {
    const state = getState();
    const resumeSectionId = state.manageResume.currentResumeSectionItemId;
    const id = state.manageResume.currentExperienceItemId;
    if (id) {
      dispatch({ type: manageResume.UPDATE_XP });
      const res = await api(`/experiences/${id}`, 'PUT', xpData, { resumeSectionId });
      console.log(res);
      if (res && res.status >= 200 && res.status < 400) {
        const { data } = res;
        if (data === 1) {
          dispatch({
            type: manageResume.UPDATE_XP_SUCCESS,
            payload: xpData,
          });
        }
      }
      if (res.data === 0) dispatch({ type: manageResume.UPDATE_XP_ERROR, payload: DEFAULT_ERROR_MESSAGE });
      if (res.status >= 400 && res.status < 600) dispatch({ type: manageResume.UPDATE_XP_ERROR, payload: res.message || DEFAULT_ERROR_MESSAGE });
    } else {
      dispatch({ type: manageResume.CREATE_XP });
      const res = await api('/experiences', 'POST', xpData, { resumeSectionId });
      console.log(res);
      if (res && res.status >= 200 && res.status < 400) {
        const { data } = res;
        dispatch({
          type: manageResume.CREATE_XP_SUCCESS,
          payload: data,
        });
      }
      if (res.status >= 400 && res.status < 600) dispatch({ type: manageResume.CREATE_XP_ERROR, payload: res.message || DEFAULT_ERROR_MESSAGE });
    }
  } catch (e) {
    console.log(e);
  }
};

export const setShowExperienceFormModal = (showModal) => async (dispatch) => {
  dispatch({
    type: manageResume.SHOW_XP_FORM_MODAL,
    payload: showModal,
  });
};

export const setShowSkillFormModal = (showModal) => async (dispatch) => {
  dispatch({
    type: manageResume.SHOW_SKILL_FORM_MODAL,
    payload: showModal,
  });
};

const getAllSkills = () => async (dispatch, getState) => {
  try {
    dispatch({ type: manageResume.GET_ALL_SKILLS });
    const res = await api('/skills', 'GET');
    console.log(res);
    if (res && res.status >= 200 && res.status < 400) {
      const { data } = res;
      dispatch({
        type: manageResume.GET_ALL_SKILLS_SUCCESS,
        payload: data.rows,
      });
    }
    if (res.status >= 400 && res.status < 600) throw new Error(res.message);
  } catch (e) {
    console.log(e);
    dispatch({ type: manageResume.GET_ALL_SKILLS_ERROR, payload: e.message || DEFAULT_ERROR_MESSAGE });
  }
};

const setCurrentSkillItemId = (id) => async (dispatch) => {
  dispatch({
    type: manageResume.SET_CURRENT_SKILL_ITEM_ID,
    payload: id,
  });
};

const saveSkill = (skillData) => async (dispatch, getState) => {
  try {
    const state = getState();
    const id = state.manageResume.currentSkillItemId;
    if (id) {
      dispatch({ type: manageResume.UPDATE_SKILL });
      const res = await api(`/skills/${id}`, 'PUT', skillData);
      console.log(res);
      if (res && res.status >= 200 && res.status < 400) {
        const { data } = res;
        if (data === 1) {
          dispatch({
            type: manageResume.UPDATE_SKILL_SUCCESS,
            payload: skillData,
          });
        }
      }
      if (res.data === 0) dispatch({ type: manageResume.UPDATE_SKILL_ERROR, payload: DEFAULT_ERROR_MESSAGE });
      if (res.status >= 400 && res.status < 600) dispatch({ type: manageResume.UPDATE_SKILL_ERROR, payload: res.message || DEFAULT_ERROR_MESSAGE });
    } else {
      dispatch({ type: manageResume.CREATE_SKILL });
      const res = await api('/skills', 'POST', skillData);
      console.log(res);
      if (res && res.status >= 200 && res.status < 400) {
        const { data } = res;
        dispatch({
          type: manageResume.CREATE_SKILL_SUCCESS,
          payload: data,
        });
      }
      if (res.status >= 400 && res.status < 600) dispatch({ type: manageResume.CREATE_SKILL_ERROR, payload: res.message || DEFAULT_ERROR_MESSAGE });
    }
  } catch (e) {
    console.log(e);
  }
};


export default {
  getAllResumeSections,

  setShowResumeSectionFormModal,
  setCurrentResumeSectionItemId,
  saveResumeSection,

  setShowExperienceFormModal,
  setCurrentExperienceItemId,
  saveExperience,

  getAllSkills,

  setShowSkillFormModal,
  setCurrentSkillItemId,
  saveSkill,

};
