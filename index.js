import inquirer from "inquirer";
//=======================================================
// *************defining a student class***************
//=======================================================
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // initialize an empty array for courses
        this.balance = 100;
    }
    //========================================
    // method to enroll a student in a course
    //========================================
    enroll_course(course) {
        this.courses.push(course);
    }
    //=================================
    // method to view a student balance
    //================================
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    //==============================
    // method to pay student fees
    //==============================
    pay_fee(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }
    //=================================
    // method to display student status
    //================================
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
//======================================================================
// **********Creating studnet manager class to manage students*********
//======================================================================
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //===================================================
    // method to add a new student
    //===================================================
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student : ${name} added successfully. Student ID: ${student.id}`);
    }
    //===================================================
    // method to enroll a student in a course
    //===================================================
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course); // inheriting parent class
            console.log(`${student.name} enrolled in ${course} succesfully`);
        }
    }
    //===================================================
    //Method to view a student balance
    //===================================================
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found please enter a correct student ID");
        }
    }
    //=======================================
    // mehtod to pay student fees
    //=======================================
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fee(amount);
        }
        else {
            console.log("Student not found please enter a correct student ID");
        }
    }
    //=======================================
    // mehtod to display student status
    //=======================================
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //=======================================
    // mehtod to find a student by student ID
    //=======================================
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//======================================================================
// **********Creating Main Function to run this program****************
//======================================================================
async function main() {
    console.log("=".repeat(50));
    console.log("Welcome to Student Management System by HIBA KHAN");
    console.log("=".repeat(50));
    let student_manager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "Select an Option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Student Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        // Using switch case statement to handle user's choice
        switch (choice.choices) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter Student id",
                    }
                ]);
                student_manager.view_student_balance(balance_input.Student_id);
                break;
            case "Pay Student Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter Student id",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter amount to pay",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.Student_id, fees_input.amount);
                break;
            case "Show Student Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student id",
                    }
                ]);
                student_manager.show_student_status(status_input.Student_id);
                break;
            case "Exit":
                console.log("Exiting....");
                process.exit();
        }
    }
}
// calling main function 
main();
