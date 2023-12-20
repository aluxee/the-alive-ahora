import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { thunkLoadSpotImages } from "../../../store/spot";
import './SpotDetails';

function SpotDetails({ spot }) {
	console.log("🚀 %c ~ file: SpotDetails.jsx:5 ~ SpotDetails ~ spot:", "color: magenta; font-size: 25px", spot, spot.previewImage)

	const dispatch = useDispatch();
	console.log("%c testing for spot id: ", "color: orange; font-size: 25px", spot.id)

	const [img, setImg] = useState();

	useEffect(() => {
		setImg(spot.previewImage)
		dispatch(thunkLoadSpotImages(spot.id))

	}, [dispatch, img])


	return (
		<li className="spot-item">
			<div className="spot-item-div">
				<div className="spot-image">
					<span id="id-spot-image">
						<Link to={`/spots/${spot.id}`}>
							<img src={img} alt={spot.name} style={
								{
									backgroundImage: `${setImg}`,
									maxHeight: 250,
									maxWidth: 238,
									// overflow: "hidden"
									objectFit: "cover",
									overflowClipMargin: "content-box",
									overflow: "clip",
									borderRadius: 30
								}
							}
							/>

						</Link>
					</span>
				</div>
				<div className="spot-name-rate">
					<span id="spot-state-city">{spot.state}, {spot.city}</span>
					<span id="spot-rating">
						<i className="fa-solid fa-star"></i>
						{spot.avgRating}
					</span>
				</div>
				<div className="spot-price">
					<span>${spot.price} night</span>
					<span></span>
				</div>
			</div>
		</li>
	)

}


export default SpotDetails;
