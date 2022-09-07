import React from 'react';

import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';

import Slider from '../components/slider/Slider.jsx';
import MovieList from '../components/movie-list/MovieList.jsx';

import { category, movieType, tvType } from '../Api/tmdbApi';

const Home = () => {
    return (
        <>
            <Slider />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>NEW RELEASES</h2>
                        <Link to="/movie">
                            <OutlineButton className="small" >
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>TOP RATINGS MOVIES</h2>
                        <Link to="/movie">
                            <OutlineButton className="small" >
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>NEW TV SERIES</h2>
                        <Link to="/tv">
                            <OutlineButton className="small" >
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>TOP RATINGS TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small" >
                                View more
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated} />
                </div>
            </div>
        </>
    );
}
export default Home;