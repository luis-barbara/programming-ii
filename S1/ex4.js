// 4.Implement a Student class with properties (name, grades) and methods to calculate final grade.

class Student {
    constructor(name, grades) {
        this.name = name;
        this.grades = grades;
    }

    calcFinalGrade() {
        if (this.grades.length == 0) {
            return 0;
        }
        const sum = this.grades.reduce((acumulador, nota) => acumulador + nota, 0);
        return sum / this.grades.length;
    }
}

const student1 = new Student("John", [90, 80, 70]);
console.log(`Final Grade for ${student1.name}: ${student1.calcFinalGrade().toFixed(2)}`);