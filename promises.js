function fetchStudent(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({
                    id: id,
                    name: "John"
                });
            } else {
                reject("Invalid Student ID");
            }
        }, 2000);
    });
}

fetchStudent(1)
    .then((student) => {
        console.log(student);
        return student.name;
    })
    .then((name) => {
        console.log(name);
    })
    .catch((error) => {
        console.log(error);
    });

async function getStudent() {
    try {
        const student = await fetchStudent(1);
        console.log(student);
    } catch (error) {
        console.log(error);
    }
}

getStudent();
