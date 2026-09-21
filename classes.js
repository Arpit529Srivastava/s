const AttendanceMixin = {
    markAttendance() {
        console.log("Attendance Marked");
    }
};

class Person {
    constructor(name) {
        this.name = name;
    }

    display() {
        console.log(this.name);
    }

    static college() {
        return "XYZ Engineering College";
    }
}

class Student extends Person {
    constructor(name, rollNumber) {
        super(name);
        this.rollNumber = rollNumber;
    }
}

Object.assign(Student.prototype, AttendanceMixin);

const student = new Student("Karthik", 101);
student.display();
student.markAttendance();
console.log(Student.college());
