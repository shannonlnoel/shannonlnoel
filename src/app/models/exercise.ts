import { ExerciseCategory } from "./exercise-category";
import { Lesson } from "./lesson";

export class Exercise {
    exerciseID?: number;
    name: string;
    focus: string;
    url: string;
    ExerciseCategoryID: number;
    exerciseCategory?: ExerciseCategory;
    lessons: Lesson[];
}