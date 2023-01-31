import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Dashboard() {
    const [students, setStudents] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const [values, setValues] = useState({
        name: '',
        class: ''
    })


    // if node env is development then set localhost:8000 else use REACT_APP_BASE_URL
    const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        let ignore = false;

        // reach out to API only once
        if (!ignore) {
            getStudents();
        }
        return () => {
            ignore = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // no dependencies

    const getStudents = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/students`)
                .then(res => res.json())
                .then(data => {
                    console.log({ data });
                    setStudents(data);
                });
        } catch (error) {
            setErrors(error.message || "Unexpected Error")
        } finally {
            setLoading({ ...loading, loading: false });
        }

    }

    const createStudent = async () => {
        try {
            await fetch(`${API_BASE}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(() => getStudents())
        } catch (error) {
            // setErrors(error.message || "Unexpected Error")
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg:
                    'Unexpected Error',
            })
        } finally {
            setLoading(false)
        }
    }

    // take event
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent form from submitting the page by default
        createStudent();
    }

    // take event to allow it to update and set values while it changes
    const handleInputChanges = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,  // use spread operator to get the latest version of values
            [event.target.name]: event.target.value // set value from the form to the event target name
        }))
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>Students: On Dashboard</h1>
                <Link to="/">Home</Link>
                <ul>
                    {
                        students?.map(student => (
                            <li key={student._id}>
                                <Link to={`/students/${student._id}`}>{student.name}</Link>
                            </li>
                        ))
                    }
                </ul>

                <h3>Create: Student and Assign Course</h3>
                {/* onSubmit call handleSubmit to update name and class */}
                <form onSubmit={(event) => handleSubmit(event)}>
                    <label>
                        Name:
                        <input type="text" name="name" value={values.name} onChange={handleInputChanges} />
                    </label>
                    <label>
                        Class:
                        <input type="text" name="class" value={values.class} onChange={handleInputChanges} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </header>
        </div>
    );
}

export default Dashboard;
