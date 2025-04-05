
import { 
  Student, Teacher, Class, Subject, Attendance, 
  Exam, Result, Parent, FeePayment, Book, Timetable,
  Event
} from '../types';

// Mock data for different entities
const mockStudents: Student[] = [
  {
    id: "S1001",
    firstName: "John",
    lastName: "Smith",
    dateOfBirth: "2007-05-15",
    gender: "Male",
    address: "123 Student Lane, Cityville",
    phoneNumber: "555-123-4567",
    email: "john.smith@example.com",
    classGrade: "10A",
    enrollmentDate: "2022-08-15",
    parentId: "P1001"
  },
  {
    id: "S1002",
    firstName: "Emma",
    lastName: "Johnson",
    dateOfBirth: "2006-11-22",
    gender: "Female",
    address: "456 Learning Road, Townsburg",
    phoneNumber: "555-234-5678",
    email: "emma.johnson@example.com",
    classGrade: "11B",
    enrollmentDate: "2021-08-16",
    parentId: "P1002"
  },
  {
    id: "S1003",
    firstName: "Michael",
    lastName: "Brown",
    dateOfBirth: "2007-03-10",
    gender: "Male",
    address: "789 Education Street, Schooltown",
    phoneNumber: "555-345-6789",
    email: "michael.brown@example.com",
    classGrade: "10A",
    enrollmentDate: "2022-08-15",
    parentId: "P1003"
  },
  {
    id: "S1004",
    firstName: "Sophia",
    lastName: "Garcia",
    dateOfBirth: "2006-07-30",
    gender: "Female",
    address: "101 Academy Avenue, Learnville",
    phoneNumber: "555-456-7890",
    email: "sophia.garcia@example.com",
    classGrade: "11B",
    enrollmentDate: "2021-08-16",
    parentId: "P1004"
  },
  {
    id: "S1005",
    firstName: "William",
    lastName: "Davis",
    dateOfBirth: "2007-09-05",
    gender: "Male",
    address: "202 Knowledge Drive, Eduburg",
    phoneNumber: "555-567-8901",
    email: "william.davis@example.com",
    classGrade: "10B",
    enrollmentDate: "2022-08-15",
    parentId: "P1005"
  }
];

const mockTeachers: Teacher[] = [
  {
    id: "T1001",
    firstName: "Robert",
    lastName: "Anderson",
    gender: "Male",
    address: "123 Teacher Lane, Educator City",
    phoneNumber: "555-111-2222",
    email: "robert.anderson@scholarsync.com",
    subjectTaught: "Mathematics",
    qualification: "M.Sc. Mathematics",
    hireDate: "2018-06-15"
  },
  {
    id: "T1002",
    firstName: "Sarah",
    lastName: "Wilson",
    gender: "Female",
    address: "456 Professor Road, Academicville",
    phoneNumber: "555-333-4444",
    email: "sarah.wilson@scholarsync.com",
    subjectTaught: "English Literature",
    qualification: "M.A. English",
    hireDate: "2019-07-10"
  },
  {
    id: "T1003",
    firstName: "David",
    lastName: "Martinez",
    gender: "Male",
    address: "789 Instructor Street, Teachtown",
    phoneNumber: "555-555-6666",
    email: "david.martinez@scholarsync.com",
    subjectTaught: "Physics",
    qualification: "Ph.D. Physics",
    hireDate: "2017-08-22"
  }
];

const mockClasses: Class[] = [
  {
    id: "C1001",
    className: "Grade 10A",
    section: "A",
    classTeacherId: "T1001"
  },
  {
    id: "C1002",
    className: "Grade 10B",
    section: "B",
    classTeacherId: "T1003"
  },
  {
    id: "C1003",
    className: "Grade 11B",
    section: "B",
    classTeacherId: "T1002"
  }
];

const mockSubjects: Subject[] = [
  {
    id: "SUB1001",
    subjectName: "Mathematics",
    subjectCode: "MATH101",
    classId: "C1001",
    teacherId: "T1001"
  },
  {
    id: "SUB1002",
    subjectName: "English",
    subjectCode: "ENG101",
    classId: "C1001",
    teacherId: "T1002"
  },
  {
    id: "SUB1003",
    subjectName: "Physics",
    subjectCode: "PHY101",
    classId: "C1001",
    teacherId: "T1003"
  },
  {
    id: "SUB1004",
    subjectName: "Mathematics",
    subjectCode: "MATH102",
    classId: "C1002",
    teacherId: "T1001"
  },
  {
    id: "SUB1005",
    subjectName: "English",
    subjectCode: "ENG102",
    classId: "C1002",
    teacherId: "T1002"
  },
  {
    id: "SUB1006",
    subjectName: "Physics",
    subjectCode: "PHY102",
    classId: "C1003",
    teacherId: "T1003"
  }
];

const mockAttendance: Attendance[] = [
  {
    id: "ATT1001",
    studentId: "S1001",
    classId: "C1001",
    date: "2023-09-01",
    status: "present"
  },
  {
    id: "ATT1002",
    studentId: "S1002",
    classId: "C1003",
    date: "2023-09-01",
    status: "present"
  },
  {
    id: "ATT1003",
    studentId: "S1003",
    classId: "C1001",
    date: "2023-09-01",
    status: "absent"
  },
  {
    id: "ATT1004",
    studentId: "S1004",
    classId: "C1003",
    date: "2023-09-01",
    status: "present"
  },
  {
    id: "ATT1005",
    studentId: "S1005",
    classId: "C1002",
    date: "2023-09-01",
    status: "present"
  }
];

const mockExams: Exam[] = [
  {
    id: "E1001",
    examType: "Midterm",
    date: "2023-10-15",
    classId: "C1001"
  },
  {
    id: "E1002",
    examType: "Midterm",
    date: "2023-10-15",
    classId: "C1002"
  },
  {
    id: "E1003",
    examType: "Final",
    date: "2023-12-10",
    classId: "C1001"
  },
  {
    id: "E1004",
    examType: "Final",
    date: "2023-12-10",
    classId: "C1002"
  }
];

const mockResults: Result[] = [
  {
    id: "R1001",
    studentId: "S1001",
    examId: "E1001",
    subjectId: "SUB1001",
    marksObtained: 85,
    grade: "A"
  },
  {
    id: "R1002",
    studentId: "S1001",
    examId: "E1001",
    subjectId: "SUB1002",
    marksObtained: 78,
    grade: "B"
  },
  {
    id: "R1003",
    studentId: "S1002",
    examId: "E1001",
    subjectId: "SUB1001",
    marksObtained: 92,
    grade: "A"
  },
  {
    id: "R1004",
    studentId: "S1003",
    examId: "E1001",
    subjectId: "SUB1001",
    marksObtained: 68,
    grade: "C"
  }
];

const mockParents: Parent[] = [
  {
    id: "P1001",
    firstName: "James",
    lastName: "Smith",
    phoneNumber: "555-987-6543",
    email: "james.smith@example.com",
    address: "123 Student Lane, Cityville"
  },
  {
    id: "P1002",
    firstName: "Maria",
    lastName: "Johnson",
    phoneNumber: "555-876-5432",
    email: "maria.johnson@example.com",
    address: "456 Learning Road, Townsburg"
  },
  {
    id: "P1003",
    firstName: "Daniel",
    lastName: "Brown",
    phoneNumber: "555-765-4321",
    email: "daniel.brown@example.com",
    address: "789 Education Street, Schooltown"
  },
  {
    id: "P1004",
    firstName: "Elena",
    lastName: "Garcia",
    phoneNumber: "555-654-3210",
    email: "elena.garcia@example.com",
    address: "101 Academy Avenue, Learnville"
  },
  {
    id: "P1005",
    firstName: "Thomas",
    lastName: "Davis",
    phoneNumber: "555-543-2109",
    email: "thomas.davis@example.com",
    address: "202 Knowledge Drive, Eduburg"
  }
];

const mockFeePayments: FeePayment[] = [
  {
    id: "F1001",
    studentId: "S1001",
    amountPaid: 1500,
    paymentDate: "2023-08-05",
    paymentStatus: "paid"
  },
  {
    id: "F1002",
    studentId: "S1002",
    amountPaid: 1500,
    paymentDate: "2023-08-10",
    paymentStatus: "paid"
  },
  {
    id: "F1003",
    studentId: "S1003",
    amountPaid: 750,
    paymentDate: "2023-08-15",
    paymentStatus: "pending"
  },
  {
    id: "F1004",
    studentId: "S1004",
    amountPaid: 1500,
    paymentDate: "2023-08-07",
    paymentStatus: "paid"
  },
  {
    id: "F1005",
    studentId: "S1005",
    amountPaid: 0,
    paymentDate: "",
    paymentStatus: "pending"
  }
];

const mockBooks: Book[] = [
  {
    id: "B1001",
    title: "Introduction to Calculus",
    author: "John Mathematician",
    isbn: "978-1234567890",
    studentId: "S1001",
    issueDate: "2023-09-05",
    returnDate: "2023-09-19"
  },
  {
    id: "B1002",
    title: "Advanced Physics",
    author: "Sarah Physicist",
    isbn: "978-0987654321",
    studentId: "S1003",
    issueDate: "2023-09-10",
    returnDate: ""
  },
  {
    id: "B1003",
    title: "English Grammar Essentials",
    author: "David Linguist",
    isbn: "978-5678901234",
    studentId: "",
    issueDate: "",
    returnDate: ""
  },
  {
    id: "B1004",
    title: "World History: Modern Era",
    author: "Emma Historian",
    isbn: "978-4321098765",
    studentId: "S1002",
    issueDate: "2023-09-08",
    returnDate: "2023-09-22"
  },
  {
    id: "B1005",
    title: "Chemical Principles",
    author: "Robert Chemist",
    isbn: "978-3456789012",
    studentId: "",
    issueDate: "",
    returnDate: ""
  }
];

const mockTimetables: Timetable[] = [
  {
    id: "TT1001",
    classId: "C1001",
    dayOfWeek: "Monday",
    periodNumber: 1,
    subjectId: "SUB1001",
    teacherId: "T1001"
  },
  {
    id: "TT1002",
    classId: "C1001",
    dayOfWeek: "Monday",
    periodNumber: 2,
    subjectId: "SUB1002",
    teacherId: "T1002"
  },
  {
    id: "TT1003",
    classId: "C1001",
    dayOfWeek: "Monday",
    periodNumber: 3,
    subjectId: "SUB1003",
    teacherId: "T1003"
  },
  {
    id: "TT1004",
    classId: "C1002",
    dayOfWeek: "Monday",
    periodNumber: 1,
    subjectId: "SUB1004",
    teacherId: "T1001"
  },
  {
    id: "TT1005",
    classId: "C1002",
    dayOfWeek: "Monday",
    periodNumber: 2,
    subjectId: "SUB1005",
    teacherId: "T1002"
  }
];

const mockEvents: Event[] = [
  {
    id: "EV1001",
    eventName: "Annual Sports Day",
    date: "2023-11-15",
    venue: "School Playground",
    description: "Annual sports competition featuring track and field events, team sports, and individual competitions."
  },
  {
    id: "EV1002",
    eventName: "Science Fair",
    date: "2023-10-25",
    venue: "School Auditorium",
    description: "Exhibition of student science projects showcasing innovation and scientific knowledge."
  },
  {
    id: "EV1003",
    eventName: "Parent-Teacher Meeting",
    date: "2023-09-30",
    venue: "School Classrooms",
    description: "Scheduled meetings between teachers and parents to discuss student progress and address concerns."
  }
];

// API service functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Student API
  getStudents: async (): Promise<Student[]> => {
    await delay(500);
    return [...mockStudents];
  },
  
  getStudentById: async (id: string): Promise<Student | undefined> => {
    await delay(300);
    return mockStudents.find(student => student.id === id);
  },
  
  // Teacher API
  getTeachers: async (): Promise<Teacher[]> => {
    await delay(500);
    return [...mockTeachers];
  },
  
  getTeacherById: async (id: string): Promise<Teacher | undefined> => {
    await delay(300);
    return mockTeachers.find(teacher => teacher.id === id);
  },
  
  // Class API
  getClasses: async (): Promise<Class[]> => {
    await delay(400);
    return [...mockClasses];
  },
  
  getClassById: async (id: string): Promise<Class | undefined> => {
    await delay(300);
    return mockClasses.find(cls => cls.id === id);
  },
  
  // Subject API
  getSubjects: async (): Promise<Subject[]> => {
    await delay(400);
    return [...mockSubjects];
  },
  
  getSubjectsByClassId: async (classId: string): Promise<Subject[]> => {
    await delay(300);
    return mockSubjects.filter(subject => subject.classId === classId);
  },
  
  // Attendance API
  getAttendanceByStudentId: async (studentId: string): Promise<Attendance[]> => {
    await delay(400);
    return mockAttendance.filter(att => att.studentId === studentId);
  },
  
  getAttendanceByClassId: async (classId: string, date?: string): Promise<Attendance[]> => {
    await delay(400);
    let result = mockAttendance.filter(att => att.classId === classId);
    if (date) {
      result = result.filter(att => att.date === date);
    }
    return result;
  },
  
  // Exam API
  getExams: async (): Promise<Exam[]> => {
    await delay(300);
    return [...mockExams];
  },
  
  getExamsByClassId: async (classId: string): Promise<Exam[]> => {
    await delay(300);
    return mockExams.filter(exam => exam.classId === classId);
  },
  
  // Result API
  getResultsByStudentId: async (studentId: string): Promise<Result[]> => {
    await delay(400);
    return mockResults.filter(result => result.studentId === studentId);
  },
  
  getResultsByExamId: async (examId: string): Promise<Result[]> => {
    await delay(400);
    return mockResults.filter(result => result.examId === examId);
  },
  
  // Parent API
  getParents: async (): Promise<Parent[]> => {
    await delay(500);
    return [...mockParents];
  },
  
  getParentById: async (id: string): Promise<Parent | undefined> => {
    await delay(300);
    return mockParents.find(parent => parent.id === id);
  },
  
  // Fee Management API
  getFeePaymentsByStudentId: async (studentId: string): Promise<FeePayment[]> => {
    await delay(400);
    return mockFeePayments.filter(payment => payment.studentId === studentId);
  },
  
  // Library API
  getBooks: async (): Promise<Book[]> => {
    await delay(500);
    return [...mockBooks];
  },
  
  getBooksByStudentId: async (studentId: string): Promise<Book[]> => {
    await delay(400);
    return mockBooks.filter(book => book.studentId === studentId);
  },
  
  // Timetable API
  getTimetableByClassId: async (classId: string, day?: string): Promise<Timetable[]> => {
    await delay(400);
    let result = mockTimetables.filter(tt => tt.classId === classId);
    if (day) {
      result = result.filter(tt => tt.dayOfWeek === day);
    }
    // Sort by period number
    return result.sort((a, b) => a.periodNumber - b.periodNumber);
  },
  
  // Event API
  getEvents: async (): Promise<Event[]> => {
    await delay(400);
    return [...mockEvents];
  }
};
