const email = "user@gmail.com";
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (emailPattern.test(email)) {
    console.log("Valid Email");
    const domain = email.substring(email.indexOf("@") + 1);
    console.log("Domain : " + domain);
} else {
    console.log("Invalid Email");
}

const currentDate = new Date();
console.log(currentDate.toDateString());
