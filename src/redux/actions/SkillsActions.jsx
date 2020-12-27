// classes
import Crud from '../../Classes/Crud';

// types
import {
  GET_SKILLS,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_ERROR
} from '../types/skillsTypes';

// global variables
const crud = new Crud();
const endpoint = '/skills';

// functions to get all skills
export function getSkillsAction() {
  return crud.getElement(
    endpoint,
    getSkills,
    getSkillsSuccess,
    getSkillsError
  );
}

const getSkills = () => ({
  type: GET_SKILLS,
  payload: true
});

const getSkillsSuccess = (skills) => ({
  type: GET_SKILLS_SUCCESS,
  payload: skills
});

const getSkillsError = () => ({
  type: GET_SKILLS_ERROR,
  payload: true
});