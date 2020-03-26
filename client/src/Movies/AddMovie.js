import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

const AddMovie = props => {

    const initialItem = {
        id: "",
        title: "",
        director: "",
        metascore: "",
        stars: []
    };

    const [newMovie, setNewMovie] = useState(initialItem);

    const { push } = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies`, newMovie)
            .then(res => {
                push("/");
            })
            .catch(err => console.log(err));
    }

    const handleChange = e => {
        e.preventDefault()
        let value = e.target.value
        if (e.target.name === 'stars') {
            value = [value]
        }

        setNewMovie({
            ...newMovie,
            id: Date.now,
            [e.target.name]: value
        })
    };

    return (
        <div className='add-form'>
            <h1>Add Movie</h1>
            <form onSubmit={handleSubmit}>
                <h3>
                    Title:
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={newMovie.title}
                    />
                </h3>
                <h3>
                    Director:
                    <input
                        type="text"
                        name="director"
                        onChange={handleChange}
                        value={newMovie.director}
                    />
                </h3>
                <h3>
                    Metascore:
                    <input
                        type="text"
                        name="metascore"
                        onChange={handleChange}
                        value={newMovie.metascore}
                    />
                    
                </h3>
                <h3>
                    Stars: 
                    <input
                        type="text"
                        name="stars"
                        onChange={handleChange}
                        value={newMovie.stars}
                    />
                </h3>
                <button type="submit">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddMovie;