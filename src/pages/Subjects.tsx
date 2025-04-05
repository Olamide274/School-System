
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { AddSubjectForm } from "@/components/forms/AddSubjectForm";

type Subject = {
  id: string;
  name: string;
  code: string;
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
};

// Mock subject data
const mockSubjects: Subject[] = [
  {
    id: "SUB001",
    name: "Mathematics",
    code: "MATH101",
    classId: "CLS001",
    className: "Grade 10A",
    teacherId: "TCH001",
    teacherName: "Michael Johnson",
  },
  {
    id: "SUB002",
    name: "Science",
    code: "SCI102",
    classId: "CLS002",
    className: "Grade 11B",
    teacherId: "TCH002",
    teacherName: "Sarah Williams",
  },
  {
    id: "SUB003",
    name: "History",
    code: "HIS103",
    classId: "CLS003",
    className: "Grade 9C",
    teacherId: "TCH003",
    teacherName: "David Brown",
  },
  {
    id: "SUB004",
    name: "English",
    code: "ENG104",
    classId: "CLS004",
    className: "Grade 12A",
    teacherId: "TCH004",
    teacherName: "Jennifer Davis",
  },
  {
    id: "SUB005",
    name: "Physical Education",
    code: "PHY105",
    classId: "CLS005",
    className: "Grade 10B",
    teacherId: "TCH005",
    teacherName: "Robert Wilson",
  },
];

const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { authState } = useAuth();
  const userRole = authState.user?.role || 'student';
  const [showAddSubjectForm, setShowAddSubjectForm] = useState(false);

  const filteredSubjects = mockSubjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
        {userRole === 'admin' && (
          <Button 
            className="bg-scholar-primary hover:bg-scholar-secondary"
            onClick={() => setShowAddSubjectForm(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Subject
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Subject Management</CardTitle>
          <CardDescription>Manage all subjects in the curriculum</CardDescription>
          <div className="flex items-center mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subjects..."
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
                <TableHead>Subject Name</TableHead>
                <TableHead>Subject Code</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Teacher</TableHead>
                {userRole === 'admin' && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.id}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{subject.code}</Badge>
                  </TableCell>
                  <TableCell>{subject.className}</TableCell>
                  <TableCell>{subject.teacherName}</TableCell>
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
      
      <AddSubjectForm open={showAddSubjectForm} onOpenChange={setShowAddSubjectForm} />
    </div>
  );
};

export default Subjects;
