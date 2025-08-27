import { IAssessment, AssessmentScore } from "./IAssessment";

export class Student {
  private scores: Map<string, AssessmentScore> = new Map();
  public bonus: number = 0; // เพิ่มโบนัส

  constructor(
    public id: string,
    public name: string,
    private assessments: IAssessment[]
  ) {
    for (const a of assessments) {
      this.scores.set(a.name, new AssessmentScore(a, 0));
    }
  }

  setScore(assessmentName: string, score: number): void {
    const asmt = this.scores.get(assessmentName);
    if (asmt) {
      if (score > asmt.assessment.maxScore) {
        throw new Error(
          `คะแนนเกินกำหนด (${asmt.assessment.maxScore} คะแนน)`
        );
      }
      asmt.score = score;
    }
  }

  getTotalScore(): number {
    let total = 0;
    for (const s of this.scores.values()) {
      total += s.getWeightedScore();
    }
    total += this.bonus; // นับโบนัส
    return Math.min(total, 100); // ไม่ให้เกิน 100
  }

  getGrade(): string {
    const score = this.getTotalScore();
    if (score >= 80) return "A";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "C+";
    if (score >= 60) return "C";
    if (score >= 55) return "D+";
    if (score >= 50) return "D";
    return "F";
  }

  getReport(): string {
    let report = ` รายงานผล: ${this.name} (${this.id})\n`;
    for (const a of this.assessments) {
      const s = this.scores.get(a.name)!;
      report += `- ${a.name}: ${s.score}/${a.maxScore} (น้ำหนัก ${a.weight}%)\n`;
    }
    report += `+ Bonus: ${this.bonus}\n`; // แสดงโบนัส
    report += `รวม: ${this.getTotalScore().toFixed(2)} คะแนน -> เกรด ${this.getGrade()}\n`;
    return report;
  }
getReportRow(): any {
  const row: any = { ID: this.id, Name: this.name };
  for (const [name, scoreObj] of this.scores.entries()) {
    row[name] = colorizeScore(scoreObj.score, scoreObj.assessment.maxScore);
  }
  row.Bonus = this.bonus;
  row.Total = this.getTotalScore().toFixed(2);
  row.Grade = this.getGrade();
  return row;
}


}  function colorizeScore(score: number, maxScore: number): string {
  const percent = (score / maxScore) * 100;
  if (percent >= 80) return `\x1b[32m${score}/${maxScore}\x1b[0m`; // เขียว
  if (percent >= 60) return `\x1b[33m${score}/${maxScore}\x1b[0m`; // เหลือง
  return `\x1b[31m${score}/${maxScore}\x1b[0m`; // แดง
}
