import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './movie-list.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';

import tmdbApi, { category } from '../../Api/tmdbApi';
import apiConfig from '../../Api/apiConfig';

import MovieCard from '../movie-card/MovieCard';


const MovieList = props => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') { //Tương tự
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMovieList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);

            }
            setItems(response.results);
        }
        getList();
    }, []);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <MovieCard item={item} category={props.category} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    );
}

MovieList.propTypes = {//kiểm tra các kiểu dữ liệu của các props mà component (hoặc container) nhận vào)
    category: PropTypes.string.isRequired, //Danh mục
    type: PropTypes.string.isRequired // Thể loại
}

export default MovieList;