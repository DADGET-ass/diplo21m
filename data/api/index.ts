import { getFacultets } from './facultets/getFacultets';
import { authUser } from './postLogin';
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

export {
    getTeachersByDiscipline,
    addFacults,
    addDisciplines,
    getFacultet,
    getFacultets,
    authUser,
    getTeachers,
    addTeacher
}

export type {
    IAllTeachers,
    IFacultets,
    addTeacherProps,
    ICourses,
    IGroups,
    ITeachers
}