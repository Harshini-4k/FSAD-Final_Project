# Code Review Preparation Guide - Skill Certification Tracker

---

## 📋 PROJECT OVERVIEW

**Technology Stack:**
- **Backend**: Spring Boot (Java), Spring Data JPA, REST APIs
- **Frontend**: React (Vite), React Router, Material-UI (MUI), Axios
- **Database**: JPA with relational database support
- **Authentication**: Email/Password-based with role-based access control

---

## 🎯 LIKELY QUESTIONS & ANSWERS

---

## **BACKEND - JAVA & SPRING BOOT**

### 1. **Architecture & Design Patterns**

**Q: What design pattern did you use for your REST API?**
> A: I used the **MVC (Model-View-Controller) pattern** with the following structure:
> - **Model**: `Certification` and `User` entities (JPA entities)
> - **Controller**: `AuthController` and `CertificationController` (REST endpoints)
> - **Repository**: `CertificationRepository` and `UserRepository` (data access layer)
> - This separates concerns and makes the code maintainable and testable.

**Q: Why did you create separate repositories for Certification and User?**
> A: Following the **Repository Pattern**, each entity has its own repository for:
> - **Single Responsibility**: Each repository handles only its entity's database operations
> - **Reusability**: Repositories can be injected into multiple controllers
> - **Testing**: Easy to mock repositories in unit tests
> - **Maintainability**: Changes to one entity don't affect others

---

### 2. **REST API Design**

**Q: Explain your API endpoint structure and HTTP methods used.**
> A: I followed **RESTful conventions**:
> ```
> GET    /api/certifications              → Get all certifications (Admin)
> GET    /api/certifications/user/{id}    → Get user's certifications
> POST   /api/certifications              → Create new certification
> PUT    /api/certifications/{id}         → Update certification
> DELETE /api/certifications/{id}         → Delete certification
> GET    /api/certifications/status/{s}   → Filter by status
> ```
> Each HTTP method maps to CRUD operations:
> - **GET** = Read data
> - **POST** = Create data
> - **PUT** = Update data
> - **DELETE** = Remove data
> - Paths use nouns (certifications) not verbs

**Q: What is CORS and why did you configure it?**
> A: **CORS (Cross-Origin Resource Sharing)** allows frontend and backend on different ports to communicate:
> ```java
> @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
> ```
> - Frontend runs on port 5173/5174 (Vite)
> - Backend runs on port 8080 (Spring Boot)
> - Without CORS, browser blocks cross-domain requests for security
> - I whitelisted specific origins instead of `*` for better security

---

### 3. **Database & JPA**

**Q: What is JPA and how did you use it?**
> A: **JPA (Java Persistence API)** is an ORM (Object-Relational Mapping) framework:
> ```java
> @Entity
> public class Certification {
>     @Id
>     @GeneratedValue(strategy = GenerationType.IDENTITY)
>     private Long id;  // Auto-incremented primary key
>     
>     private Long userId;
>     private String certificationName;
>     private String issueDate;
> }
> ```
> - `@Entity` maps Java class to database table
> - `@Id` marks the primary key
> - `@GeneratedValue` auto-generates ID values
> - This eliminates boilerplate SQL code

**Q: What are the status values and how are they determined?**
> A: Three status values in certification management:
> - **ACTIVE**: Certification valid for >30 days
> - **EXPIRING_SOON**: Certification valid for ≤30 days
> - **EXPIRED**: Certification validity has passed
> 
> Status is calculated on frontend based on expiryDate comparison with current date

---

### 4. **Authentication & Security**

**Q: How did you implement user authentication?**
> A: Simple email/password authentication:
> ```java
> @PostMapping("/login")
> public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
>     User user = userRepository.findByEmail(email);
>     if (user == null || !user.getPassword().equals(password)) {
>         return ResponseEntity.status(401)
>             .body(Map.of("success", false, "message", "Invalid credentials"));
>     }
>     return ResponseEntity.ok(userData);
> }
> ```
> - Find user by email in database
> - Compare stored password with provided password
> - Return user info (id, role, name) on success

**Q: Is your password storage secure? What would you improve?**
> A: **Current approach is NOT secure** for production:
> - Passwords are stored as plain text
> - Should use **bcrypt** or **Spring Security** for hashing
> 
> **Production improvement:**
> ```java
> import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
> BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
> user.setPassword(encoder.encode(password));
> // Later: encoder.matches(rawPassword, hashedPassword)
> ```

**Q: How did you implement role-based access control?**
> A: 
> - Added `role` field to `User` entity (ADMIN/USER)
> - Signup allows user to select role
> - Frontend uses `ProtectedRoute` to check role before rendering
> - Backend validates user role for admin endpoints
> ```java
> if (userData.role !== "ADMIN") {
>     navigate("/login");  // Redirect unauthorized users
> }
> ```

---

### 5. **Error Handling**

**Q: How did you handle errors in your API?**
> A: Used try-catch with meaningful HTTP responses:
> ```java
> @PostMapping
> public ResponseEntity<?> addCertification(@RequestBody Certification cert) {
>     if (cert.getCertificationName() == null) {
>         return ResponseEntity.badRequest()
>             .body(Map.of("success", false, "message", "Name required"));
>     }
>     try {
>         Certification saved = repository.save(cert);
>         return ResponseEntity.ok(saved);
>     } catch (Exception e) {
>         return ResponseEntity.status(500)
>             .body(Map.of("error", e.getMessage()));
>     }
> }
> ```
> - Input validation before processing
> - HTTP status codes (400, 404, 500)
> - Descriptive error messages for debugging

---

## **FRONTEND - REACT**

### 6. **Component Structure & State Management**

**Q: Why did you use React hooks instead of class components?**
> A: **Functional components with hooks** are the modern React approach:
> ```jsx
> function AdminDashboardPage() {
>   const [certificates, setCertificates] = useState([]);
>   const [loading, setLoading] = useState(false);
>   useEffect(() => {
>     fetchAllCertifications();
>   }, []);
> }
> ```
> - **useState**: Manage component state
> - **useEffect**: Side effects (API calls, cleanup)
> - Advantages: Simpler, reusable, easier to test than class components

**Q: Explain the useState hook and what it does.**
> A: `useState` creates stateful variables in functional components:
> ```jsx
> const [certificates, setCertificates] = useState([]);
> ```
> - **certificates**: Current state value
> - **setCertificates**: Function to update state
> - `[]`: Initial state (empty array)
> - When state changes → component re-renders with new data

---

### 7. **API Communication with Axios**

**Q: Why did you use Axios instead of fetch?**
> A: **Axios advantages over fetch**:
> ```jsx
> // Axios - simpler syntax
> const response = await axios.get("http://localhost:8080/api/certifications");
> 
> // Fetch - more verbose
> const response = await fetch(url);
> const data = await response.json();
> ```
> - Automatic JSON serialization/deserialization
> - Simpler error handling
> - Request/response interceptors support
> - Built-in timeout support
> - Better browser compatibility

**Q: How did you handle API errors?**
> A: 
> ```jsx
> try {
>   const response = await axios.get(url);
>   setCertificates(response.data);
> } catch (error) {
>   console.error("Error:", error);
>   if (error.response) {
>     alert("Server error: " + error.response.data?.message);
>   } else {
>     alert("Network error: Check if backend is running");
>   }
> }
> ```
> - `error.response`: Backend returns error (4xx, 5xx)
> - No `error.response`: Network issues

---

### 8. **Routing & Protected Routes**

**Q: How did you implement protected routes?**
> A: Created `ProtectedRoute` wrapper component:
> ```jsx
> function ProtectedRoute({ children, requiredRole }) {
>   const user = JSON.parse(localStorage.getItem("user"));
>   if (!user) return <Navigate to="/login" />;
>   if (requiredRole && user.role !== requiredRole) {
>     return <Navigate to="/" />;
>   }
>   return children;
> }
> ```
> - Check if user is logged in (localStorage)
> - Verify user has required role
> - Redirect to login if unauthorized
> 
> **Usage:**
> ```jsx
> <ProtectedRoute requiredRole="ADMIN">
>   <AdminDashboardPage />
> </ProtectedRoute>
> ```

**Q: Why did you store user info in localStorage?**
> A: 
> - **Persistence**: User stays logged in after page refresh
> - **Easy access**: Any component can access user data
> - **Simple implementation**: No backend session needed
> 
> **Alternative (production):**
> - Use HTTP-only cookies with JWT tokens
> - localStorage is vulnerable to XSS attacks

---

### 9. **Material-UI (MUI) Implementation**

**Q: Why did you use Material-UI instead of Bootstrap or Tailwind?**
> A: **Material-UI advantages**:
> - **Pre-built components**: Card, Dialog, DataGrid, etc.
> - **Consistent theming**: Easy to apply global styles
> - **Responsive**: Built-in responsive grid system
> - **Accessibility**: WCAG compliant components
> - **Integration**: Works seamlessly with React and React Router
> 
> **Example:**
> ```jsx
> <Card sx={{ borderRadius: 2, background: "linear-gradient(...)" }}>
>   <CardContent>
>     <Typography variant="h4">Title</Typography>
>   </CardContent>
> </Card>
> ```

---

### 10. **Data Filtering & Display Modes**

**Q: How did you implement the card/table view toggle?**
> A: Used conditional rendering with state:
> ```jsx
> const [viewMode, setViewMode] = useState("cards");

> {viewMode === "cards" ? (
>   <Grid container spacing={3}>
>     {filteredCerts.map(cert => (
>       <CertificateCard key={cert.id} certificate={cert} />
>     ))}
>   </Grid>
> ) : (
>   <Table>
>     {/* table implementation */}
>   </Table>
> )}
> ```
> - Store current view mode in state
> - Render different components based on mode
> - Same data, different presentation

**Q: How did you implement the status filter?**
> A:
> ```jsx
> const getFilteredCertificates = () => {
>   if (filterStatus === "ALL") return certificates;
>   return certificates.filter(cert => 
>     cert.status === filterStatus
>   );
> };
> ```
> - Filter array in memory (client-side filtering)
> - Could optimize with server-side filtering for large datasets
> - Update filtered list when filter status changes

---

### 11. **Statistics Calculation**

**Q: How did you calculate the certification statistics?**
> A: Process all certifications and count by status:
> ```jsx
> const calculateStats = (certs) => {
>   let active = 0, expiring = 0, expired = 0;
>   
>   certs.forEach(cert => {
>     const status = cert.status.toUpperCase();
>     if (status === "EXPIRED") expired++;
>     else if (status === "EXPIRING_SOON") expiring++;
>     else active++;
>   });
>   
>   setStats({ total: certs.length, active, expiring, expired });
> };
> ```
> - Loop through all certifications
> - Count each status type
> - Update stats state
> - Displayed in colored cards

---

### 12. **Form Handling & Dialog Management**

**Q: How did you handle form submission in the add/edit dialog?**
> A: Form state management:
> ```jsx
> const [formData, setFormData] = useState({
>   userId: "",
>   certificationName: "",
>   organization: "",
>   issueDate: "",
>   expiryDate: "",
>   status: "ACTIVE"
> });

> const handleSaveCertification = async () => {
>   if (!formData.userId) {
>     alert("Please fill required fields");
>     return;
>   }
>   
>   if (editingCert) {
>     await axios.put(`/api/certifications/${editingCert.id}`, formData);
>   } else {
>     await axios.post("/api/certifications", formData);
>   }
>   fetchAllCertifications(); // Refresh data
> };
> ```
> - Store form input in state
> - Validate before submission
> - Distinguish between add vs edit operations
> - Refresh list after successful save

---

## 🔍 **COMMON FOLLOW-UP QUESTIONS**

### 13. **Performance & Optimization**

**Q: Could your code be optimized?**
> A: Yes, several optimizations:
> 1. **Pagination**: For large cert lists, fetch in chunks
> 2. **Server-side filtering**: Filter at backend instead of all data
> 3. **Memoization**: Use `useMemo` to avoid recalculating stats
> ```jsx
> const filteredCerts = useMemo(() => 
>   getFilteredCertificates(), [certificates, filterStatus]
> );
> ```
> 4. **Debouncing**: Delay API calls while user enters search
> 5. **Lazy loading**: Load images/data as needed

### 14. **Testing**

**Q: How would you test your backend API?**
> A: 
> - **Unit tests**: Test individual methods with JUnit
> - **Integration tests**: Test API endpoints with MockMvc
> - **Example:**
> ```java
> @Test
> public void testLogin() {
>     User testUser = new User("test@example.com", "password", "USER");
>     userRepository.save(testUser);
>     // Test login endpoint...
> }
> ```

**Q: How would you test your React components?**
> A:
> - React Testing Library for component testing
> - Mock API calls with jest.mock()
> - Test user interactions and state changes

### 15. **Security Concerns**

**Q: What security improvements would you make?**
> A:
> 1. **Password hashing**: Use bcrypt instead of plain text
> 2. **JWT tokens**: Replace localStorage with secure tokens
> 3. **Input validation**: Sanitize all user inputs
> 4. **HTTPS**: Use SSL/TLS in production
> 5. **SQL Injection prevention**: JPA ORM prevents this
> 6. **Rate limiting**: Prevent brute force attacks
> 7. **CORS whitelisting**: Only allow trusted origins

---

## 📚 **KEY CONCEPTS TO REVIEW**

- **REST API Principles**: CRUD, HTTP methods, status codes
- **MVC Pattern**: Separation of concerns
- **Spring Boot**: Dependency injection, annotations, JPA
- **React Hooks**: useState, useEffect, custom hooks
- **Component Lifecycle**: Mounting, updating, unmounting
- **State Management**: Local state vs. global (Redux)
- **Async/Await**: Promises and error handling
- **Authentication**: Session vs. token-based
- **Database Design**: Primary keys, relationships
- **API Security**: CORS, CSRF, input validation

---

## ✅ **TIPS FOR YOUR REVIEW**

1. **Know why you made decisions**: Don't just know what you coded, understand WHY
2. **Be honest about limitations**: Mention what could be improved
3. **Ask clarifying questions**: If confused by a question, ask for clarification
4. **Use examples**: Back up your answers with code snippets
5. **Learn from feedback**: Listen to suggestions and take notes
6. **Have code ready**: Keep your IDE open to show implementation details

