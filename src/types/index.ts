
export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phoneNumber: string;
  email: string;
  classGrade: string;
  enrollmentDate: string;
  parentId: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  phoneNumber: string;
  email: string;
  subjectTaught: string;
  qualification: string;
  hireDate: string;
}

export interface Class {
  id: string;
  className: string;
  section: string;
  classTeacherId: string;
}

export interface Subject {
  id: string;
  subjectName: string;
  subjectCode: string;
  classId: string;
  teacherId: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent';
}

export interface Exam {
  id: string;
  examType: string;
  date: string;
  classId: string;
}

export interface Result {
  id: string;
  studentId: string;
  examId: string;
  subjectId: string;
  marksObtained: number;
  grade: string;
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  amountPaid: number;
  paymentDate: string;
  paymentStatus: 'paid' | 'pending';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  studentId?: string;
  issueDate?: string;
  returnDate?: string;
}

export interface Timetable {
  id: string;
  classId: string;
  dayOfWeek: string;
  periodNumber: number;
  subjectId: string;
  teacherId: string;
}

export interface Admin {
  id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
}

export interface Event {
  id: string;
  eventName: string;
  date: string;
  venue: string;
  description: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
