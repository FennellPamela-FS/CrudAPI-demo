import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../App.css';

function Student() {
    // we might STOP using students ?????
    const [students, setStudents] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [values, setValues] = useState({
        name: '',
        class: ''
    })

    const { id } = useParams();
    const navigate = useNavigate();

    // if node env is development then set localhost:8000 else use REACT_APP_BASE_URL
    const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        let ignore = false;

        // reach out to API only once
        if (!ignore) {
            // getStudents();
            getStudent();
        }
        return () => {
            ignore = true;
        }

    }, []) // no dependencies

    const getStudent = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/students/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log({ data });
                    setStudents(data);
                    // // const { name, class } = data;
                    // setValues({
                    //     name: data.name,
                    //     class: data.class
                    // })
                    setValues(data)
                });
        } catch (error) {
            setError(error.message || "Unexpected Error")
        } finally {
            setLoading(false);
        }

    }

    // reach out to server
    const deleteStudent = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/students/${id}`, {
                // option Delete
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    setStudents(data);
                    // navigate back to the dashboard, replace history with this
                    navigate("/dashboard", { replace: true })
                })
        } catch (error) {
            setError(error.message || "Unexpected Error")
        } finally {
            setLoading(false)
        }
    }

    // 
    const updateStudent = async () => {
        try {
            await fetch(`${API_BASE}/students/${id}`, {
                // PATCH option
                method: 'PATCH',
                headers: {  // check headers are sending json
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)    // send updated stringify values
            })
                .then(res => res.json())
                .then(data => {
                    console.log({ data })
                })
        } catch (error) {
            setError(error.message || "Unexpected Error")
        } finally {
            setLoading(false)
        }
    }

    // take event
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent form from submitting the page by default
        updateStudent();
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
                <h1>Student Profile</h1>
                {/* 
                    if we have students, then show students.name
                    both and, student && student.name
                */}
                {/* <h5>{students && students.name ? values.name : students.name}</h5> */}

                <h5>{values && values.name}</h5>
                <p>{values && values.class}</p>

                <button onClick={() => deleteStudent()}>Delete Student</button>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>

                <h3>Edit: Student Profile</h3>
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

export default Student;
