
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AddStudentForm } from "@/components/forms/AddStudentForm";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  email: string;
  enrollmentDate: string;
};

// Mock student data
const mockStudents: Student[] = [
  {
    id: "STU001",
    firstName: "John",
    lastName: "Doe",
    grade: "10A",
    email: "john.doe@example.com",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "STU002",
    firstName: "Jane",
    lastName: "Smith",
    grade: "11B",
    email: "jane.smith@example.com",
    enrollmentDate: "2023-09-02",
  },
  {
    id: "STU003",
    firstName: "Robert",
    lastName: "Johnson",
    grade: "9C",
    email: "robert.johnson@example.com",
    enrollmentDate: "2023-09-03",
  },
  {
    id: "STU004",
    firstName: "Emily",
    lastName: "Brown",
    grade: "12A",
    email: "emily.brown@example.com",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "STU005",
    firstName: "Michael",
    lastName: "Davis",
    grade: "10B",
    email: "michael.davis@example.com",
    enrollmentDate: "2023-09-02",
  },
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { authState } = useAuth();
  const { toast } = useToast();
  const userRole = authState.user?.role || 'student';
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddStudent = () => {
    setShowAddStudentForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Students</h1>
        {userRole === 'admin' && (
          <Button 
            className="bg-scholar-primary hover:bg-scholar-secondary"
            onClick={handleAddStudent}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Manage all student records in the system</CardDescription>
          <div className="flex items-center mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Enrollment Date</TableHead>
                {userRole === 'admin' && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.enrollmentDate}</TableCell>
                  {userRole === 'admin' && (
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AddStudentForm open={showAddStudentForm} onOpenChange={setShowAddStudentForm} />
    </div>
  );
};

export default Students;
