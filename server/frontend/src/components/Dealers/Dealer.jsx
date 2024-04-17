import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const Dealer = () => {

    const [dealer, setDealer] = useState({});
    const [reviews, setReviews] = useState([]);
    const [unreviewed, setUnreviewed] = useState(false);
    const [postReview, setPostReview] = useState(<></>)

    let curr_url = window.location.href;
    let root_url = curr_url.substring(0,curr_url.indexOf("dealer"));
    let params = useParams();
    let id =params.id;
    let dealer_url = root_url+`djangoapp/dealer/${id}`;
    let reviews_url = root_url+`djangoapp/reviews/dealer/${id}`;
    let post_review = root_url+`postreview/${id}`;

    const get_dealer = async ()=>{
        const res = await fetch(dealer_url, {
            method: "GET"
        });
        const retobj = await res.json();

        if(retobj.status === 200) {
            let dealerobjs = Array.from(retobj.dealer)
            setDealer(dealerobjs[0])
        }
    }

    const get_reviews = async ()=>{
        const res = await fetch(reviews_url, {
            method: "GET"
        });
        const retobj = await res.json();

        if(retobj.status === 200) {
            if(retobj.reviews.length > 0){
                setReviews(retobj.reviews)
            } else {
                setUnreviewed(true);
            }
        }
    }

    useEffect(() => {
        get_dealer();
        get_reviews();
        if(sessionStorage.getItem("username")) {
            setPostReview(<a class="bi bi-person-lines-fill" href={post_review}><span></span></a>)
        }
    },[]);

    const smiley = {
        "positive": "card-header bi bi-emoji-smile bg-success",
        "neutral": "card-header bi bi-emoji-neutral bg-secondary",
        "negative": "card-header bi bi-emoji-frown bg-danger",
    }

    return(
    <div>
        <Header/>
        <div class="container" id="dealer">
            <div>
                <h1>{dealer.full_name}{postReview}</h1>
                <h4>{dealer['city']},{dealer['address']}, Zip - {dealer['zip']}, {dealer['state']} </h4>
            </div>
            <div class="cards d-flex">
            {reviews.length === 0 && unreviewed === false ? (
                <text>Loading Reviews....</text>
            ):  unreviewed === true? <div>No reviews yet! </div> :
            reviews.map(review => (
                <div className='card shadow-sm m-2'>
                    <div class={smiley[review.sentiment]}></div>
                    <div class="card-body"><div className='review'>{review.review}</div></div>
                    <div class="card-footer">
                        <div className="reviewer d-flex">
                            <div class="reviewer-item flex-fill">
                                <span class="bi bi-person"></span>
                                <span class="text">{review.name}</span>
                            </div>
                            <div class="reviewer-item flex-fill">
                                <span class="bi bi-buildings"></span>
                                <span class="text">{review.car_make}</span>
                            </div>
                            <div class="reviewer-item flex-fill">
                                <span class="bi bi-car-front"></span>
                                <span class="text">{review.car_model}</span>
                            </div>
                            <div class="reviewer-item flex-fill">
                                <span class="bi bi-calendar-event"></span>
                                <span class="text">{review.car_year}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
    )
}

export default Dealer
