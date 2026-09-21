function BankAccount(initialBalance) {
    let balance = initialBalance;

    return {
        deposit(amount) {
            balance += amount;
        },
        withdraw(amount) {
            if (amount > balance) {
                console.log("Insufficient Balance");
            } else {
                balance -= amount;
            }
        },
        getBalance() {
            return balance;
        }
    };
}

const account = BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance());
