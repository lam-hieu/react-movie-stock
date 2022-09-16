import React, { useState, useEffect, useRef } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; //thư viện làm slider

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import tmdbApi, { category, movieType } from '../../Api/tmdbApi';
import apiConfig from '../../Api/apiConfig';

import './slider.scss';
import { useHistory } from 'react-router-dom'; // thư viện giúp cho việc điều hướng url tới các component

const Slider = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { pages: 1 }
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, { params });
                setMovieItems(response.results.slice(0, 4));
                console.log(response); //Toàn bộ Object của API
            } catch {
                console.log('Have something wrong!');
            }
        }
        getMovies();
    }, []);

    return (
        <div className="slider">
            <Swiper
                // Tìm hiểu các sử dụng thư viện swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
            >
                {
                    movieItems.map((item, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                // <img src={apiConfig.originalImage(item.backdrop_path)} />
                                <SliderItem
                                    item={item} className={`${isActive ? 'active' : ''}`}

                                />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {
                movieItems.map((item, index) => (
                    <TrailerModal key={index} item={item} />
                ))
            }
        </div>
    );
}

const SliderItem = props => {

    let history = useHistory(); //truy cập Object bên API, điều hướng url

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => { // -> Promise
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id); // await chỉ sd trong hàm async

        if (videos.results.length > 0) { //27
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;

            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer!';
        }
        modal.classList.toggle('active');
    }

    return (

        <div
            className={`slider__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            {/* {item.title} */}

            <div className="slider__item__content container">
                <div className="slider__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => history.push('/movie/' + item.id)}>
                            Watch Now
                        </Button>

                        <OutlineButton onClick={setModalActive}>
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>

                <div className="slider__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    );
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null); // useRef là một Fn, trả về 1 Obj -> Obj có thể mutate và tồn tại xuyến suốt vòng đời của Component

    const onClose = () => iframeRef.current.setAttribute('src', '')

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer" ></iframe>
            </ModalContent>
        </Modal>
    )

}

export default Slider;