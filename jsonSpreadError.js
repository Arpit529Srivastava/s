const student = {
    id: 101,
    name: "Karthik",
    marks: 90
};

const clonedStudent = { ...student };

console.log(JSON.stringify(clonedStudent));

for (const key in student) {
    console.log(key + " " + student[key]);
}

try {
    if (student.marks < 35) {
        throw new Error("Student Failed");
    } else {
        console.log("Student Passed");
    }
} catch (error) {
    console.log(error.message);
} finally {
    console.log("Execution Completed");
}
