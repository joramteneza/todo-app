import { useEffect, useState } from "react";
import LoginForm from "./components/auth/login";
import SignupForm from "./components/auth/signup";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import TodoList from "./components/Todolist";

function App() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  const handleFormToggle = () => {
    setIsLoginForm(!isLoginForm);
  };

  console.log(user);

  return (
    <div className="">
      {!user ? (
        isLoginForm ? (
          <LoginForm onToggleForm={handleFormToggle} />
        ) : (
          <SignupForm onToggleForm={handleFormToggle} />
        )
      ) : (
        <TodoList user={user} />
      )}
    </div>
  );
}

export default App;
