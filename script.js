const calculateSalary = (employeeName, basicSalary, allowancePercentage = 10, taxPercentage = 5) => {
    const grossSalary = basicSalary + (basicSalary * allowancePercentage / 100);
    const netSalary = grossSalary - (grossSalary * taxPercentage / 100);

    return {
        name: employeeName,
        grossSalary,
        netSalary
    };
};

console.log(calculateSalary("Sachin", 50000));
