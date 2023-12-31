import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkLoadSpotImages } from "../../../store/spot";
import './SpotPageImages.css';

function SpotPageImages({ spot }) {
	// console.log("🚀 %c ~ file: SpotPageImages.jsx:8 ~ SpotPageImages ~ SpotPageImages:", "color: magenta; font-size: 26px", SpotPageImages)

	// goal: load all array of images for specified spot


	const dispatch = useDispatch();
	const spotId = spot.id;

	// console.log("%c testing for spot id: ", "color: orange; font-size: 25px", spotId)
	const displayImage = spot.previewImage;
	// console.log("SPOT!!!: ", spot, spot.SpotImages);
	const [img, setImg] = useState();

	useEffect(() => {
		setImg(displayImage)
		dispatch(thunkLoadSpotImages(spotId))

	}, [dispatch, img, displayImage, spotId])


	//* need to fix second spot, none of the images pop up and breaks the page
	const mainImage = spot.SpotImages.find(image => (
		// image.id === 1 ? image.url : '';
		image
		// console.log("IMAGE RENDER: ", image)

	))

	const otherImages = spot.SpotImages.filter(image => (

		image.url !== spot.SpotImages[0].url ? image : null
	)
	)
	// image.id !== 1

	// console.log("🚀 ~ file: SpotPageImages.jsx:31 ~ SpotPageImages ~ otherImage:", otherImages)
	// console.log("🚀%c ~ file: SpotPageImages.jsx:27 ~ SpotPageImages ~ mainImage:", "color: red; font-size: 20px", mainImage, mainImage.url)

	if (!mainImage || !otherImages) return null;
	if (mainImage.length === 0 || otherImages.length === 0) return null;

	return (

		<div className="spot-page-images-container">
			<div className="images-container_one">
				<img src={mainImage.url} key={mainImage.url} className="the-main-spot-image" style={
					{
						backgroundImage: `${setImg}`,
						overflow: "hidden",
						objectFit: "cover",
						width: 450,
						height: 450,
						overflowClipMargin: "content-box",
						borderRadius: 30
					}}
				/>
			</div>
			<div className="images-container_two">
				{otherImages.map(image => (
					<img src={image.url} key={image.url} className="the-spot-images" style={
						{
							backgroundImage: `${setImg}`,
							overflow: "hidden",
							objectFit: "cover",
							overflowClipMargin: "content-box",
							borderRadius: 30
						}}
					/>
				))}
			</div>
		</div>

	)

}


export default SpotPageImages;
