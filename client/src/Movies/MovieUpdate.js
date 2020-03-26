import React, {useState, useEffect} from "react";
import { useParams, useHistory } from 'react-router-dom'
import axios from "axios";

const initialItem = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const MovieUpdate = props => {

    const {id} = useParams()
    const {push}= useHistory()

    const [movie, setMovie] = useState(initialItem);

    const handleChange = e => {
        e.persist();
        let value = e.target.value

        setMovie({
        ...movie,
        [e.target.name]: value
        });
    };

    useEffect(() => {
        const movieToUpdate = props.movieList.find(e => `${e.id}` === id )
        if (movieToUpdate) {
            setMovie(movieToUpdate)
        }
    }, [props.movieList, id])

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
        <div>
            <h3>Update Movie</h3>
            <form onSubmit={handleSubmit}>
                Title:
                <input 
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={movie.title}
                />
                Director:
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    value={movie.director}
                />
                Metascore:
                <input
                    type="number"
                    name="metascore"
                    onChange={handleChange}
                    value={movie.metascore}
                />
                Stars: 
                <input
                type="text"
                name="stars"
                value={movie.stars}
                onChange={handleChange}
                />
            
                <button>Update Movie</button>
            </form>
        </div>
    );
};

export default MovieUpdate;