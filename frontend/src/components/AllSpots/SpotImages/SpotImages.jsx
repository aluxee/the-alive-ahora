import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { thunkLoadSpotImages } from "../../../store/spot";
import './SpotImages';

import { one, two, three, four, five, six, seven, eight } from '../../../videos';






function SpotImages({ spot }) {

	console.log("%c 🚀 ~ SpotImages ~ spot: ", "color: red; font-size: 25px", spot)
	console.log("🚀 %c ~ file: SpotImages.jsx:5 ~ SpotImages ~ spot:", "color: cyan; font-size: 25px", spot, spot.id)

	const dispatch = useDispatch();
	const spotId = spot.id;

	console.log("%c testing for spot id: ", "color: orange; font-size: 25px", spotId)
	const displayImage = spot.previewImage;
	const [img, setImg] = useState("");
	const [hover, setHover] = useState(false);

	useEffect(() => {
		setImg(displayImage)
		dispatch(thunkLoadSpotImages(spotId))

	}, [dispatch, img, displayImage, spotId])




	// useEffect(() => { vidRef.current.play(); }, []);

	const imgStyle = {
		backgroundImage: `${setImg}`,
		height: 225,
		width: 225,
		marginTop: 15,
		overflow: "hidden",
		objectFit: "cover",
		overflowClipMargin: "content-box",
		borderRadius: '15%'
	}

	const thumbNailImg = () => {
		const videoThumbNails = [
			null,
			one, two, three, four, five, six, seven, eight
		]

		const videoThumbNail = videoThumbNails[spot.id] || null;

		return (
			<>
				{hover && videoThumbNail ?

					<video src={videoThumbNail}
						loop muted autoPlay
						width={225}
						height={225}
						className="spot-video-box"
						controls="true"
					/>
					:
					<img src={img} alt={spot.name} className="spot-image-box" style={imgStyle} />
				}
			</>
		)
	}


	return (
		<li className="spot-item">

			<div className="spot-image">
				<div id="id-spot-image">
					<Link to={`/spots/${spotId}`}
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}

					>
						<>
							{thumbNailImg()}
						</>

					</Link>
				</div>
			</div>
		</li>
	)

}


export default SpotImages;
