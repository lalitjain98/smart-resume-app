/* eslint-disable no-console */
import manageResume from '../actionTypes/manageResume';


const initialState = {
  showResumeSectionFormModal: false,
  currentResumeSectionItemId: null,
  resumeSections: [],
  skills: [],

  showSkillFormModal: false,
  showExperienceFormModal: false,
  currentExperienceItemId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case manageResume.SHOW_RESUME_SECTION_FORM_MODAL:
    return {
      ...state,
      showResumeSectionFormModal: action.payload,
    };

  case manageResume.GET_ALL_RESUME_SECTIONS:
    return {
      ...state,
      resumeSectionsLoading: true,
      resumeSections: [],
      resumeSectionsError: null,
    };
  case manageResume.GET_ALL_RESUME_SECTIONS_SUCCESS:
    return {
      ...state,
      resumeSectionsLoading: false,
      resumeSections: action.payload,
      resumeSectionsError: null,
    };
  case manageResume.GET_ALL_RESUME_SECTIONS_ERROR:
    return {
      ...state,
      resumeSectionsLoading: false,
      resumeSections: [],
      resumeSectionsError: action.payload,
    };
  case manageResume.SET_CURRENT_RESUME_SECTION_ITEM_ID:
    return {
      ...state,
      currentResumeSectionItemId: action.payload,
    };
  case manageResume.CREATE_RESUME_SECTION:
    return {
      ...state,
      createResumeSectionLoading: true,
      createResumeSectionError: null,
    };
  case manageResume.CREATE_RESUME_SECTION_SUCCESS:
    return {
      ...state,
      createResumeSectionLoading: false,
      resumeSections: [
        ...state.resumeSections,
        action.payload,
      ],
      createResumeSectionError: null,
    };
  case manageResume.CREATE_RESUME_SECTION_ERROR:
    return {
      ...state,
      createResumeSectionLoading: false,
      createResumeSectionError: action.payload,
    };

  case manageResume.UPDATE_RESUME_SECTION:
    return {
      ...state,
      updateResumeSectionLoading: true,
      updateResumeSectionError: null,
    };
  case manageResume.UPDATE_RESUME_SECTION_SUCCESS:
    return (() => {
      const rsCopy = [...state.resumeSections];
      const editIndex = rsCopy.findIndex((item) => item.id === state.currentResumeSectionItemId);
      console.log('Before Edit', rsCopy[editIndex]);
      rsCopy[editIndex] = {
        ...rsCopy[editIndex],
        ...action.payload,
      };
      console.log('After Edit', rsCopy[editIndex]);

      return {
        ...state,
        updateResumeSectionLoading: false,
        resumeSections: rsCopy,
        updateResumeSectionError: null,
      };
    })();
  case manageResume.UPDATE_RESUME_SECTION_ERROR:
    return {
      ...state,
      updateResumeSectionLoading: false,
      updateResumeSectionError: action.payload,
    };
  case manageResume.SHOW_XP_FORM_MODAL:
    return {
      ...state,
      showExperienceFormModal: action.payload,
    };

  case manageResume.SET_CURRENT_XP_ITEM_ID:
    return {
      ...state,
      currentExperienceItemId: action.payload,
    };
  case manageResume.CREATE_XP:
    return {
      ...state,
      createExperienceLoading: true,
      createExperienceError: null,
    };
  case manageResume.CREATE_XP_SUCCESS:
    return (() => {
      const rsCopy = [...state.resumeSections];
      console.log(state.currentResumeSectionItemId);
      const rsIndex = rsCopy.findIndex((item) => item.id == state.currentResumeSectionItemId);
      console.log('Before Create Exp', rsIndex, rsCopy[rsIndex]);

      rsCopy[rsIndex].experiences = [
        ...rsCopy[rsIndex].experiences,
        action.payload,
      ];

      console.log('After Create Exp', rsCopy[rsIndex].experiences);

      return {
        ...state,
        createExperienceLoading: false,
        createExperienceError: null,
        resumeSections: rsCopy,
      };
    })();
  case manageResume.CREATE_XP_ERROR:
    return {
      ...state,
      createExperienceLoading: false,
      createExperienceError: action.payload,
    };

  case manageResume.UPDATE_XP:
    return {
      ...state,
      updateExperienceLoading: true,
      updateExperienceError: null,
    };
  case manageResume.UPDATE_XP_SUCCESS:
    return (() => {
      const rsCopy = [...state.resumeSections];
      console.log(state.currentResumeSectionItemId);
      const rsIndex = rsCopy.findIndex((item) => item.id == state.currentResumeSectionItemId);
      console.log(rsIndex);
      console.log(rsCopy[rsIndex]);
      const exps = [...(rsCopy[rsIndex].experiences || [])];
      console.log(exps);
      const editIndex = exps.findIndex((item) => item.id == state.currentExperienceItemId);

      exps[editIndex] = {
        ...exps[editIndex],
        ...action.payload,
      };

      console.log('Before Update Exp', rsCopy[rsIndex].experiences);

      rsCopy[rsIndex].experiences = exps;

      console.log('After Update Exp', rsCopy[rsIndex].experiences);

      return {
        ...state,
        updateExperienceLoading: false,
        updateExperienceError: null,
        resumeSections: rsCopy,
      };
    })();
  case manageResume.UPDATE_XP_ERROR:
    return {
      ...state,
      updateExperienceLoading: false,
      updateExperienceError: action.payload,
    };

  case manageResume.SHOW_SKILL_FORM_MODAL:
    return {
      ...state,
      showSkillFormModal: action.payload,
    };

  case manageResume.GET_ALL_SKILLS:
    return {
      ...state,
      skillsLoading: true,
      skills: [],
      skillsError: null,
    };
  case manageResume.GET_ALL_SKILLS_SUCCESS:
    return {
      ...state,
      skillsLoading: false,
      skills: action.payload,
      skillsError: null,
    };
  case manageResume.GET_ALL_SKILLS_ERROR:
    return {
      ...state,
      skillsLoading: false,
      skills: [],
      skillsError: action.payload,
    };
  case manageResume.SET_CURRENT_SKILL_ITEM_ID:
    return {
      ...state,
      currentSkillItemId: action.payload,
    };
  case manageResume.CREATE_SKILL:
    return {
      ...state,
      createSkillLoading: true,
      createSkillError: null,
    };
  case manageResume.CREATE_SKILL_SUCCESS:
    return {
      ...state,
      createSkillLoading: false,
      skills: [
        ...state.skills,
        action.payload,
      ],
      createSkillError: null,
    };
  case manageResume.CREATE_SKILL_ERROR:
    return {
      ...state,
      createSkillLoading: false,
      createSkillError: action.payload,
    };

  case manageResume.UPDATE_SKILL:
    return {
      ...state,
      updateSkillLoading: true,
      updateSkillError: null,
    };
  case manageResume.UPDATE_SKILL_SUCCESS:
    return (() => {
      const rsCopy = [...state.skills];
      const editIndex = rsCopy.findIndex((item) => item.id === state.currentSkillItemId);
      console.log('Before Edit', rsCopy[editIndex]);
      rsCopy[editIndex] = {
        ...rsCopy[editIndex],
        ...action.payload,
      };
      console.log('After Edit', rsCopy[editIndex]);

      return {
        ...state,
        updateSkillLoading: false,
        skills: rsCopy,
        updateSkillError: null,
      };
    })();
  case manageResume.UPDATE_SKILL_ERROR:
    return {
      ...state,
      updateSkillLoading: false,
      updateSkillError: action.payload,
    };
  default:
    return state;
  }
};
