import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Student from './pages/Student';

function App() {

  // build a service to grab token when user signs in
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  })

  return (
    <Router>
      <Routes>
        <Route path="/students/:id" exact element={<Student />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
