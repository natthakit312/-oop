
import {  paradigmsAssessments, Course } from "./IAssessment";

import { Student } from "./Student";


const paradigms = new Course("Paradigms", paradigmsAssessments);

const student1 = new Student("6716211027-3", "ณัฐกิตติ์", paradigmsAssessments);
student1.setScore("Attentions", 20);
student1.setScore("Actions", 15);
student1.setScore("Tests", 20);
student1.bonus = 5; 

const student2 = new Student("67162110310-5", "ศิวกร", paradigmsAssessments);
student2.setScore("Attentions", 18);
student2.setScore("Actions", 30);
student2.setScore("Tests", 25);
student2.bonus = 2; 

const student3 = new Student("67162110310-6", "ปริญญา", paradigmsAssessments);
student3.setScore("Attentions", 10);
student3.setScore("Actions", 20);
student3.setScore("Tests", 30);
student3.bonus = 5; 

paradigms.addStudent(student1);
paradigms.addStudent(student2);
paradigms.addStudent(student3);


paradigms.printReportTable(); // ใช้ console.table แสดงรายงานเป็นตาราง