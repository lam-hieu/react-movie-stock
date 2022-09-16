import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router';

import tmdbApi from '../../Api/tmdbApi';

const VideoList = props => {

    const { category } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = () => async () => {
            const response = await tmdbApi.getVideos(category, props.id);
            setVideos(response.results.slice(0, 5));
        }
        getVideos();
    }, [category, props.id])

    return (
        <>
            {
                videos.map((item, index) => (
                    <Video key={index} item={item} />

                ))
            }
        </>
    )
}

const Video = props => {

    const item = props.item;

    const iframeRef = useRef(null); // useRef là một Fn, trả về 1 Obj -> Obj có thể mutate và tồn tại xuyến suốt vòng đời của Component

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';

        iframeRef.current.setAttribute('height', height)
    }, [])

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={console.log(`https://www.youtube.com/embed/${item.key}`)}

                ref={iframeRef}
                width="100%"
                title="video"></iframe>
        </div>
    )
}

export default VideoList;