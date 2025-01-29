const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parses JSON requests

// Sample data
let javatest = [
    {
      "question": "What does the acronym 'JVM' stand for?",
      "options": [
        "Java Virtual Machine",
        "Java Verified Module",
        "Java Version Manager",
        "Java Variable Manager"
      ],
      "answer": 0
    },
    {
      "question": "Which principle allows Java programs to run on different platforms without modification?",
      "options": [
        "OOP",
        "Platform dependency",
        "Write Once, Run Anywhere",
        "Dynamic linking"
      ],
      "answer": 2
    },
    {
      "question": "Which tool in the JDK is used to compile Java programs?",
      "options": [
        "java",
        "javac",
        "jvm",
        "jar"
      ],
      "answer": 1
    },
    {
      "question": "What is the primary purpose of setting up the JAVA_HOME environment variable?",
      "options": [
        "To configure Java's runtime",
        "To specify the installation directory of JDK",
        "To enable debugging features",
        "To install additional libraries"
      ],
      "answer": 1
    },
    {
      "question": "Which of the following is a primitive data type in Java?",
      "options": [
        "String",
        "ArrayList",
        "int",
        "Scanner"
      ],
      "answer": 2
    },
    {
      "question": "What keyword is used to declare a constant in Java?",
      "options": [
        "const",
        "final",
        "static",
        "immutable"
      ],
      "answer": 1
    },
    {
      "question": "What type of loop executes at least once, even if the condition is false?",
      "options": [
        "for loop",
        "while loop",
        "do-while loop",
        "enhanced for loop"
      ],
      "answer": 2
    },
    {
      "question": "What does the 'break' statement do in Java?",
      "options": [
        "Terminates the program",
        "Exits the current loop or switch statement",
        "Skips the current iteration of a loop",
        "Divides two numbers"
      ],
      "answer": 1
    },
    {
      "question": "Which of these is NOT a principle of OOP?",
      "options": [
        "Encapsulation",
        "Abstraction",
        "Inheritance",
        "Compilation"
      ],
      "answer": 3
    },
    {
      "question": "Which keyword is used to inherit a class in Java?",
      "options": [
        "extend",
        "implements",
        "inherit",
        "subclass"
      ],
      "answer": 0
    },
    {
      "question": "What is the main purpose of an abstract class in Java?",
      "options": [
        "To provide complete implementations of all methods",
        "To define a blueprint for subclasses",
        "To encapsulate data only",
        "To manage threads"
      ],
      "answer": 1
    },
    {
      "question": "In Java, what is an object?",
      "options": [
        "A collection of data and methods defined in a class",
        "A primitive data type",
        "A reference to memory allocation",
        "A set of methods without implementation"
      ],
      "answer": 0
    },
    {
      "question": "What does the 'try' block do in Java?",
      "options": [
        "Executes code that might throw an exception",
        "Declares an exception",
        "Handles an exception",
        "Ignores an exception"
      ],
      "answer": 0
    },
    {
      "question": "What is the purpose of the 'finally' block in exception handling?",
      "options": [
        "To handle all exceptions",
        "To ensure code execution after try-catch blocks",
        "To declare a custom exception",
        "To define unchecked exceptions"
      ],
      "answer": 1
    },
    {
      "question": "Which collection type does NOT allow duplicate elements?",
      "options": [
        "ArrayList",
        "HashMap",
        "HashSet",
        "LinkedList"
      ],
      "answer": 2
    },
    {
      "question": "What keyword is used to prevent thread interference in Java?",
      "options": [
        "synchronized",
        "static",
        "volatile",
        "transient"
      ],
      "answer": 0
    },
    {
      "question": "Which Java class is used for writing text to a file?",
      "options": [
        "FileReader",
        "BufferedReader",
        "FileWriter",
        "ObjectOutputStream"
      ],
      "answer": 2
    },
    {
      "question": "What is the purpose of ObjectOutputStream in Java?",
      "options": [
        "Reading files",
        "Writing text files",
        "Serializing objects to a stream",
        "Deserializing objects from a file"
      ],
      "answer": 2
    },
    {
      "question": "Which Java NIO feature supports non-blocking file I/O?",
      "options": [
        "FileReader",
        "FileChannel",
        "Scanner",
        "ObjectInputStream"
      ],
      "answer": 1
    },
    {
      "question": "In a student management system, which Java data structure is ideal for storing unique student IDs with their names?",
      "options": [
        "ArrayList",
        "HashMap",
        "HashSet",
        "TreeMap"
      ],
      "answer": 1
    }
];
let javaassesment=[
      {
        "question": "What is Java?",
        "options": ["A programming language", "An operating system", "A database", "A web browser"],
        "answer": "A programming language"
      },
      {
        "question": "Which data type is used to create a variable that should store text?",
        "options": ["int", "float", "String", "char"],
        "answer": "String"
      },
      {
        "question": "What is the default value of an int variable in Java?",
        "options": ["null", "0", "undefined", "-1"],
        "answer": "0"
      },
      {
        "question": "What is the correct way to declare an array in Java?",
        "options": ["int arr[] = new int[5];", "array int arr[5];", "int[] arr = 5;", "arr = int[5];"],
        "answer": "int arr[] = new int[5];"
      },
      {
        "question": "Which keyword is used to create a class in Java?",
        "options": ["class", "define", "create", "new"],
        "answer": "class"
      },
      {
        "question": "What is the size of a char in Java?",
        "options": ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
        "answer": "2 bytes"
      },
      {
        "question": "What is the output of the expression 10 + 20 + \"30\"?",
        "options": ["1030", "102030", "30", "Error"],
        "answer": "1030"
      },
      {
        "question": "Which method is used to print output in Java?",
        "options": ["System.print()", "System.out.println()", "print()", "cout<<"],
        "answer": "System.out.println()"
      },
      {
        "question": "What does the keyword 'static' mean in Java?",
        "options": ["Defines a constant variable", "Defines a method that belongs to the class", "Defines a method that can only be overridden", "Defines an abstract method"],
        "answer": "Defines a method that belongs to the class"
      },
      {
        "question": "Which loop is guaranteed to execute at least once?",
        "options": ["for", "while", "do-while", "None of the above"],
        "answer": "do-while"
      },
      {
        "question": "Which package contains the Random class?",
        "options": ["java.lang", "java.io", "java.util", "java.net"],
        "answer": "java.util"
      },
      {
        "question": "What is a constructor in Java?",
        "options": ["A method to destroy objects", "A method to initialize objects", "A method to finalize objects", "A method to override objects"],
        "answer": "A method to initialize objects"
      },
      {
        "question": "What is inheritance in Java?",
        "options": ["Copying variables from one class to another", "Creating new classes from existing ones", "Overriding methods", "None of the above"],
        "answer": "Creating new classes from existing ones"
      },
      {
        "question": "Which interface is used to implement a thread in Java?",
        "options": ["Runnable", "Threadable", "Thread", "Concurrent"],
        "answer": "Runnable"
      },
      {
        "question": "What does the 'finally' block do in Java?",
        "options": ["Executes after the try block only if an exception occurs", "Executes always after the try block", "Executes if no exception occurs", "Handles exceptions"],
        "answer": "Executes always after the try block"
      },
      {
        "question": "What is the use of the 'this' keyword in Java?",
        "options": ["Refers to the current instance of the class", "Refers to the superclass of the current class", "Refers to a static method", "Refers to the main method"],
        "answer": "Refers to the current instance of the class"
      },
      {
        "question": "Which exception is thrown when dividing by zero in Java?",
        "options": ["ArithmeticException", "IOException", "NullPointerException", "NumberFormatException"],
        "answer": "ArithmeticException"
      },
      {
        "question": "What is the purpose of the 'super' keyword in Java?",
        "options": ["Refers to the parent class object", "Refers to the subclass object", "Used to override methods", "None of the above"],
        "answer": "Refers to the parent class object"
      },
      {
        "question": "What is polymorphism in Java?",
        "options": ["Executing the same method in multiple ways", "Using multiple classes in one program", "Defining multiple methods in one class", "None of the above"],
        "answer": "Executing the same method in multiple ways"
      },
      {
        "question": "Which Java keyword is used to stop the execution of a loop?",
        "options": ["exit", "break", "return", "continue"],
        "answer": "break"
      }
];

// Endpoints
app.get('/python', (req, res) => {
    res.send(javatest);
});
app.get('/javafa', (req, res) => {
  res.send(javaassesment);
});
// Start the server
app.listen(3000, () => console.log('API running on http://localhost:3000'));
