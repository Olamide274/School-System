
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Book, BookOpen, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Book = {
  id: string;
  title: string;
  author: string;
  subject: string;
  status: "Available" | "Borrowed" | "Reserved";
  dueDate?: string;
  isbn: string;
};

// Mock book data
const mockBooks: Book[] = [
  {
    id: "BK001",
    title: "Mathematics for Higher Education",
    author: "Robert Williams",
    subject: "Mathematics",
    status: "Available",
    isbn: "978-3-16-148410-0",
  },
  {
    id: "BK002",
    title: "Advanced Physics Concepts",
    author: "Jennifer Adams",
    subject: "Physics",
    status: "Borrowed",
    dueDate: "2025-04-15",
    isbn: "978-1-86197-876-9",
  },
  {
    id: "BK003",
    title: "World History: Ancient Civilizations",
    author: "Michael Thompson",
    subject: "History",
    status: "Available",
    isbn: "978-0-06-083773-8",
  },
  {
    id: "BK004",
    title: "Biology and the Living World",
    author: "Sarah Johnson",
    subject: "Biology",
    status: "Reserved",
    isbn: "978-0-393-06848-8",
  },
  {
    id: "BK005",
    title: "Literature: Classics and Modern",
    author: "David Anderson",
    subject: "English",
    status: "Available",
    isbn: "978-0-306-40615-7",
  },
];

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredBooks = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBorrowBook = (bookId: string) => {
    const book = mockBooks.find((b) => b.id === bookId);
    if (book) {
      toast({
        title: "Book Borrowed",
        description: `You have borrowed '${book.title}'. Due date: ${new Date().toISOString().split('T')[0]}`,
      });
    }
  };

  const handleReserveBook = (bookId: string) => {
    const book = mockBooks.find((b) => b.id === bookId);
    if (book) {
      toast({
        title: "Book Reserved",
        description: `You have reserved '${book.title}'. You will be notified when it becomes available.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Library</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Books</CardTitle>
            <CardDescription>In the library</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Book className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-3xl font-bold">{mockBooks.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Available Books</CardTitle>
            <CardDescription>Ready to borrow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-3xl font-bold">
                {mockBooks.filter(book => book.status === "Available").length}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Books Due Today</CardTitle>
            <CardDescription>Need to be returned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-3xl font-bold">0</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Book Catalog</CardTitle>
          <CardDescription>Browse and borrow books from our library</CardDescription>
          <div className="flex items-center mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books by title, author, or subject..."
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
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        book.status === "Available"
                          ? "default"
                          : book.status === "Borrowed"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {book.status}
                    </Badge>
                    {book.dueDate && (
                      <div className="text-xs flex items-center mt-1 text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        Due: {book.dueDate}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{book.isbn}</TableCell>
                  <TableCell className="text-right">
                    {book.status === "Available" ? (
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBorrowBook(book.id)}
                        >
                          Borrow
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReserveBook(book.id)}
                        >
                          Reserve
                        </Button>
                      </div>
                    ) : book.status === "Borrowed" ? (
                      <Button variant="outline" size="sm" disabled>
                        Borrowed
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        Reserved
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Library;
