import React, {useState, useEffect} from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";

const initialItem = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
};   

const MovieUpdate = props => {
 
    // get the params and history objects
    const { id } = useParams();
    const { push }= useHistory();

    const [movie, setMovie] = useState(initialItem);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value
        if (ev.target.name === 'metascore') {
            value = parseInt(value, 10);
        }
        if (ev.target.name === 'stars') {
            value = value.split(',');
        }

        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    // ********** Find the movie and set it to state ********** //
    // get the id from params
    // loop through the movies list to find the movie
    // set the movie to state to pre-populate the form\

    useEffect(() => {
        const movieToUpdate = props.movieList.find(e => `${e.id}` === id );
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
        
    }, [props.movieList, id]);

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res);
                setMovie(res.data);
                push(`/`);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='update-form'>
            <h1>Update Movie</h1>
            <form onSubmit={handleSubmit}>
                <h3>Title:</h3>
                    <input 
                        type="text"
                        name="title"
                        onChange={changeHandler}
                        value={movie.title}
                    />
                <h3>Director:</h3>
                    <input
                        type="text"
                        name="director"
                        onChange={changeHandler}
                        value={movie.director}
                    />
                <h3>Metascore:</h3>
                    <input
                        type="text"
                        name="metascore"
                        onChange={changeHandler}
                        value={movie.metascore}
                    />
                <h3>Stars:</h3>
                    <input
                        type="text"
                        name="stars"
                        onChange={changeHandler}
                        value={movie.stars}
                    />
                <button >Update Movie</button>
            </form>
        </div>
    );
};

export default MovieUpdate;