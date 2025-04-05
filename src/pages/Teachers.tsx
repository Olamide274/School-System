
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AddTeacherForm } from "@/components/forms/AddTeacherForm";

type Teacher = {
  id: string;
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  hireDate: string;
};

// Mock teacher data
const mockTeachers: Teacher[] = [
  {
    id: "TCH001",
    firstName: "Michael",
    lastName: "Johnson",
    subject: "Mathematics",
    email: "michael.johnson@scholarsync.com",
    hireDate: "2020-06-15",
  },
  {
    id: "TCH002",
    firstName: "Sarah",
    lastName: "Williams",
    subject: "Science",
    email: "sarah.williams@scholarsync.com",
    hireDate: "2019-08-10",
  },
  {
    id: "TCH003",
    firstName: "David",
    lastName: "Brown",
    subject: "History",
    email: "david.brown@scholarsync.com",
    hireDate: "2021-01-05",
  },
  {
    id: "TCH004",
    firstName: "Jennifer",
    lastName: "Davis",
    subject: "English",
    email: "jennifer.davis@scholarsync.com",
    hireDate: "2018-07-22",
  },
  {
    id: "TCH005",
    firstName: "Robert",
    lastName: "Wilson",
    subject: "Physical Education",
    email: "robert.wilson@scholarsync.com",
    hireDate: "2022-03-14",
  },
];

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { authState } = useAuth();
  const { toast } = useToast();
  const userRole = authState.user?.role || 'student';
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);

  const filteredTeachers = mockTeachers.filter(
    (teacher) =>
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddTeacher = () => {
    setShowAddTeacherForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Teachers</h1>
        {userRole === 'admin' && (
          <Button 
            className="bg-scholar-primary hover:bg-scholar-secondary"
            onClick={handleAddTeacher}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Teacher
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Teacher Management</CardTitle>
          <CardDescription>Manage all teacher records in the system</CardDescription>
          <div className="flex items-center mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search teachers..."
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
                <TableHead>Subject</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Hire Date</TableHead>
                {userRole === 'admin' && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.id}</TableCell>
                  <TableCell>{`${teacher.firstName} ${teacher.lastName}`}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.hireDate}</TableCell>
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
      
      <AddTeacherForm open={showAddTeacherForm} onOpenChange={setShowAddTeacherForm} />
    </div>
  );
};

export default Teachers;
