import { Student } from "./Student";

export interface IAssessment {
  name: string;
  maxScore: number;
  weight: number; // เปอร์เซ็นต์น
}

export const paradigmsAssessments: IAssessment[] = [
  { name: "Attentions", maxScore: 20, weight: 20 },
  { name: "Actions", maxScore: 40, weight: 40 },
  { name: "Tests", maxScore: 40, weight: 40 },
];

export class AssessmentScore {
  constructor(public assessment: IAssessment, public score: number = 0) {}

  getWeightedScore(): number {
    return (this.score / this.assessment.maxScore) * this.assessment.weight;
  }
}



export class Course {
  private students: Student[] = [];

  constructor(public name: string, private assessments: IAssessment[]) {
    const sumWeight = assessments.reduce((acc, a) => acc + a.weight, 0);
    if (sumWeight !== 100) {
      throw new Error("น้ำหนักรวมไม่เท่ากับ 100");
    }
  }

  addStudent(student: Student) {
    this.students.push(student);
  }

  findById(id: string): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  findByName(name: string): Student[] {
    return this.students.filter(s => s.name.includes(name));
  }

  getStudentReport(student: Student): string {
    return student.getReport(); // แสดงโบนัส
  }

  addBonus(studentId: string, bonus: number) {
    const student = this.findById(studentId);
    if (student) {
      student.bonus += bonus;
    }
  }
  printReportTable() {
  const tableData = this.students.map(s => s.getReportRow());
  console.table(tableData);
}

}