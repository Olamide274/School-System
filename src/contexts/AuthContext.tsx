
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole, AuthState, LoginCredentials } from '../types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers = [
  { 
    id: '1', 
    firstName: 'Admin', 
    lastName: 'User', 
    email: 'admin@scholarsync.com', 
    password: 'admin123', 
    role: 'admin' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=1E40AF&color=fff'
  },
  { 
    id: '2', 
    firstName: 'Teacher', 
    lastName: 'User', 
    email: 'teacher@scholarsync.com', 
    password: 'teacher123', 
    role: 'teacher' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Teacher+User&background=3B82F6&color=fff'
  },
  { 
    id: '3', 
    firstName: 'Student', 
    lastName: 'User', 
    email: 'student@scholarsync.com', 
    password: 'student123', 
    role: 'student' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Student+User&background=60A5FA&color=fff'
  },
  { 
    id: '4', 
    firstName: 'Parent', 
    lastName: 'User', 
    email: 'parent@scholarsync.com', 
    password: 'parent123', 
    role: 'parent' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Parent+User&background=93C5FD&color=fff'
  }
];

// Function to simulate JWT token generation
const generateMockToken = (user: Omit<User, 'password'>) => {
  // In a real app, this would be handled by a server
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
    exp: new Date().getTime() + 3600000 // 1 hour from now
  }));
  const signature = btoa('mocksignature');
  return `${header}.${payload}.${signature}`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // In a real app, you would verify the token's validity
        // Here we just parse it to extract the user data
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid token format');
        
        const payload = JSON.parse(atob(parts[1]));
        
        // Check if token is expired
        if (payload.exp < new Date().getTime()) {
          throw new Error('Token expired');
        }
        
        // Find the user from our mock database
        const user = mockUsers.find(u => u.id === payload.id);
        if (!user) throw new Error('User not found');
        
        // Extract user without password
        const { password, ...safeUser } = user;
        
        setAuthState({
          isAuthenticated: true,
          user: safeUser,
          token
        });
      } catch (error) {
        console.error('Auth token error:', error);
        localStorage.removeItem('token');
        toast({
          title: "Authentication Error",
          description: "Your session has expired. Please log in again.",
          variant: "destructive"
        });
      }
    }
    setIsLoading(false);
  }, [toast]);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    
    // In a real app, this would be an API request
    // Simulating server delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const user = mockUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Remove password from user object
      const { password, ...safeUser } = user;
      
      // Generate token
      const token = generateMockToken(safeUser);
      
      // Save to local storage
      localStorage.setItem('token', token);
      
      // Update state
      setAuthState({
        isAuthenticated: true,
        user: safeUser,
        token
      });
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${safeUser.firstName}!`,
      });
    } catch (error) {
      console.error('Login error:', error);
      let message = 'An unknown error occurred';
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
