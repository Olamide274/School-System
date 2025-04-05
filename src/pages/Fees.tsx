
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, Banknote, ArrowUpRight, Plus, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PaymentForm } from "@/components/forms/PaymentForm";
import { AddFeeForm } from "@/components/forms/AddFeeForm";

// Mock fee data
const mockFeeData = [
  {
    id: "FEE001",
    title: "First Term Tuition Fee",
    amount: 25000,
    dueDate: "2023-09-15",
    status: "paid",
    paymentDate: "2023-09-10",
    paymentMethod: "card"
  },
  {
    id: "FEE002",
    title: "Second Term Tuition Fee",
    amount: 25000,
    dueDate: "2024-01-15",
    status: "pending",
    paymentDate: null,
    paymentMethod: null
  },
  {
    id: "FEE003",
    title: "Laboratory Fee",
    amount: 5000,
    dueDate: "2023-09-30",
    status: "overdue",
    paymentDate: null,
    paymentMethod: null
  },
  {
    id: "FEE004",
    title: "Library Fee",
    amount: 2000,
    dueDate: "2023-10-15",
    status: "paid",
    paymentDate: "2023-10-05",
    paymentMethod: "bank"
  }
];

// Mock student payments for admin view
const mockStudentPayments = [
  {
    id: "PAYMENT001",
    studentId: "STU001",
    studentName: "John Doe",
    class: "10A",
    feeTitle: "First Term Tuition Fee",
    amount: 25000,
    status: "paid",
    paymentDate: "2023-09-10"
  },
  {
    id: "PAYMENT002",
    studentId: "STU002",
    studentName: "Jane Smith",
    class: "11B",
    feeTitle: "First Term Tuition Fee",
    amount: 25000,
    status: "paid",
    paymentDate: "2023-09-12"
  },
  {
    id: "PAYMENT003",
    studentId: "STU003",
    studentName: "Robert Johnson",
    class: "9C",
    feeTitle: "First Term Tuition Fee",
    amount: 25000,
    status: "pending",
    paymentDate: null
  },
  {
    id: "PAYMENT004",
    studentId: "STU004",
    studentName: "Emily Brown",
    class: "12A",
    feeTitle: "First Term Tuition Fee",
    amount: 25000,
    status: "overdue",
    paymentDate: null
  },
  {
    id: "PAYMENT005",
    studentId: "STU001",
    studentName: "John Doe",
    class: "10A",
    feeTitle: "Laboratory Fee",
    amount: 5000,
    status: "paid",
    paymentDate: "2023-09-20"
  }
];

const Fees = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || 'student';
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // State for payment form
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedFee, setSelectedFee] = useState<{id: string; title: string; amount: number} | null>(null);
  
  // State for add fee form
  const [showAddFeeForm, setShowAddFeeForm] = useState(false);
  
  // State for student payments (mutable for mark as paid functionality)
  const [studentPayments, setStudentPayments] = useState(mockStudentPayments);
  
  // Filter student payments based on search, class and status filters
  const filteredStudentPayments = studentPayments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.feeTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || payment.class === selectedClass;
    const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });
  
  const handlePayNow = (feeId: string) => {
    const fee = mockFeeData.find(f => f.id === feeId);
    if (fee) {
      setSelectedFee({
        id: fee.id,
        title: fee.title,
        amount: fee.amount
      });
      setShowPaymentForm(true);
    }
  };
  
  const handleAddFee = () => {
    setShowAddFeeForm(true);
  };
  
  const handleMarkAsPaid = (paymentId: string) => {
    setStudentPayments(payments => 
      payments.map(payment => 
        payment.id === paymentId 
          ? {...payment, status: 'paid', paymentDate: new Date().toISOString().split('T')[0]}
          : payment
      )
    );
    
    toast({
      title: "Payment Marked as Paid",
      description: "The payment has been marked as paid successfully.",
    });
  };

  const renderParentStudentView = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Fee Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Due</CardTitle>
            <CardDescription>Pending payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₹{mockFeeData
                .filter(fee => fee.status === "pending" || fee.status === "overdue")
                .reduce((sum, fee) => sum + fee.amount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Paid</CardTitle>
            <CardDescription>This academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₹{mockFeeData
                .filter(fee => fee.status === "paid")
                .reduce((sum, fee) => sum + fee.amount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Due Date</CardTitle>
            <CardDescription>Upcoming payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockFeeData
                .filter(fee => fee.status === "pending")
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0]?.dueDate || "No pending fees"}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Fee Details</CardTitle>
          <CardDescription>View and manage your fee payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFeeData.map(fee => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.title}</TableCell>
                  <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell>{fee.dueDate}</TableCell>
                  <TableCell>
                    {fee.status === "paid" && (
                      <Badge className="bg-green-500">Paid</Badge>
                    )}
                    {fee.status === "pending" && (
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>
                    )}
                    {fee.status === "overdue" && (
                      <Badge className="bg-red-500">Overdue</Badge>
                    )}
                  </TableCell>
                  <TableCell>{fee.paymentDate || "-"}</TableCell>
                  <TableCell className="text-right">
                    {fee.status !== "paid" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePayNow(fee.id)}
                      >
                        <CreditCard className="h-4 w-4 mr-1" /> Pay Now
                      </Button>
                    )}
                    {fee.status === "paid" && (
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        {fee.paymentMethod === "card" ? (
                          <span className="flex items-center">
                            <CreditCard className="h-3 w-3 mr-1" /> Card
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Banknote className="h-3 w-3 mr-1" /> Bank
                          </span>
                        )}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Payment Form Dialog */}
      {selectedFee && (
        <PaymentForm 
          open={showPaymentForm}
          onOpenChange={setShowPaymentForm}
          feeId={selectedFee.id}
          feeTitle={selectedFee.title}
          amount={selectedFee.amount}
        />
      )}
    </div>
  );
  
  const renderAdminView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Fee Management</h1>
        <Button 
          className="bg-scholar-primary hover:bg-scholar-secondary"
          onClick={handleAddFee}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Fee
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Collected</CardTitle>
            <CardDescription>This academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₹{studentPayments
                .filter(payment => payment.status === "paid")
                .reduce((sum, payment) => sum + payment.amount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Pending</CardTitle>
            <CardDescription>Outstanding payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₹{studentPayments
                .filter(payment => payment.status !== "paid")
                .reduce((sum, payment) => sum + payment.amount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Collection Rate</CardTitle>
            <CardDescription>Payment percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(
                (studentPayments.filter(payment => payment.status === "paid").length / 
                studentPayments.length) * 100
              )}%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overdue Payments</CardTitle>
            <CardDescription>Delayed payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {studentPayments.filter(payment => payment.status === "overdue").length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Fee Collection Management</CardTitle>
          <CardDescription>Track and manage student fee payments</CardDescription>
          
          <Tabs defaultValue="all" className="w-full mt-4">
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by student or fee..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select
                value={selectedClass}
                onValueChange={setSelectedClass}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="10A">Grade 10A</SelectItem>
                  <SelectItem value="11B">Grade 11B</SelectItem>
                  <SelectItem value="9C">Grade 9C</SelectItem>
                  <SelectItem value="12A">Grade 12A</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudentPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No payments found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudentPayments.map(payment => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.studentName}</TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>{payment.feeTitle}</TableCell>
                    <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {payment.status === "paid" && (
                        <Badge className="bg-green-500">Paid</Badge>
                      )}
                      {payment.status === "pending" && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>
                      )}
                      {payment.status === "overdue" && (
                        <Badge className="bg-red-500">Overdue</Badge>
                      )}
                    </TableCell>
                    <TableCell>{payment.paymentDate || "-"}</TableCell>
                    <TableCell className="text-right">
                      {payment.status !== "paid" ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkAsPaid(payment.id)}
                        >
                          <Check className="h-4 w-4 mr-1 text-green-500" /> Mark Paid
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Receipt Generated",
                              description: "Payment receipt has been generated.",
                            });
                          }}
                        >
                          <ArrowUpRight className="h-4 w-4 mr-1" /> Receipt
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Add Fee Form Dialog */}
      <AddFeeForm open={showAddFeeForm} onOpenChange={setShowAddFeeForm} />
    </div>
  );
  
  return userRole === 'admin' ? renderAdminView() : renderParentStudentView();
};

export default Fees;
