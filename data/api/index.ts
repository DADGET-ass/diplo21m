import { addIAudith } from './audithories/addAudithories';
import { getIAudith } from '@/data/api/audithories/getAudithories';
import { addTypes } from './disciplines/types/addTypes';
import { getTypes } from './disciplines/types/getTypes';
import { registrUser } from './user/postRegistration';
import { getDisciplines } from './disciplines/getDisciplines';
import { getFacultets } from './facultets/getFacultets';
import { authUser } from './user/postLogin';
import { getFacultet } from './facultets/getFacultet';
import { addDisciplines } from './disciplines/addDisciplines';
import { addFacults } from './facultets/addFacults';
import { getTeachersByDiscipline } from './teachers/getTeachersByDiscipline';
import { getTeachers } from './teachers/getTeachers';
import { IAllTeachers } from './teachers/getTeachers';
import { IFacultets } from './facultets/getFacultets';
import { addTeacher } from './teachers/addTeacher';
import { addTeacherProps } from './teachers/addTeacher';
import { ICourses } from './facultets/getFacultets';
import { IGroups } from './facultets/getFacultets';
import { ITeachers } from './teachers/getTeachersByDiscipline';
import { check } from './user/check';

export {
    getTeachersByDiscipline,
    addFacults,
    addDisciplines,
    getFacultet,
    getFacultets,
    authUser,
    getTeachers,
    addTeacher,
    getDisciplines,
    check,
    registrUser,
    getTypes,
    addTypes,
    getIAudith,
    addIAudith,
}

export type {
    IAllTeachers,
    IFacultets,
    addTeacherProps,
    ICourses,
    IGroups,
    ITeachers
}