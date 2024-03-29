import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { thunkCreateSpot } from "../../../../../store/spot";
import './CreateSpotForm.css';



function CreateSpotForm({ spot, formType }) {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [country, setCountry] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [describeText, setDescribeText] = useState('');
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const [prevMainImage, setPrevMainImage] = useState('');
	const [otherImage, setOtherImage] = useState('');
	const [otherImage2, setOtherImage2] = useState('');
	const [otherImage3, setOtherImage3] = useState('');
	const [otherImage4, setOtherImage4] = useState('');

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState({});




	useEffect(() => {
		const errorsObject = {};

		country.length < 3 ? errorsObject.country = "Country is required" : country;
		address.length < 10 ? errorsObject.address = "Address is required" : address;
		city.length < 4 ? errorsObject.city = "City is required" : city;
		state.length < 2 ? errorsObject.state = "State is required" : state;
		describeText.length < 30 ? errorsObject.describeText = "Description needs a minimum of 30 characters" : describeText;
		title.length < 5 ? errorsObject.title = "Name is required" : title;
		price.length === 0 ? errorsObject.price = "Price is required" : price;
		if (isNaN(Number(price))) errorsObject.price = "Valid price is required";

		if (prevMainImage.length === 0 || otherImage.length === 0) {

			prevMainImage.length === 0 || !prevMainImage.includes(".jpg") || !prevMainImage.includes(".png") || !prevMainImage.includes(".jpeg") ? errorsObject.prevMainImage = "Preview image is required." : prevMainImage;
			otherImage.length === 0 || !otherImage.includes(".jpg") || !otherImage.includes(".png") || !otherImage.includes(".jpeg") ? errorsObject.otherImage = "Image URL must end in .png, .jpg, or .jpeg" : otherImage;
		}
		setErrors(errorsObject);



	}, [country, address, city, state, describeText, title, price, prevMainImage, otherImage]);


	const handleSubmit = async (e) => {
		e.preventDefault();

		// console.log("SPOT!!!", spot);


		if (formType === 'Create Spot') {

			const newPrevImage = {
				url: prevMainImage,
				preview: true
			};


			if (otherImage) {
				images.push({ url: otherImage, preview: false })
				// setImages((imgs) => [...imgs, { url: otherImage, preview: false }])
			}
			if (otherImage2) {
				images.push({ url: otherImage2, preview: false })
				// setImages((imgs) => [...imgs, { url: otherImage2, preview: false }])
			}
			if (otherImage3) {
				images.push({ url: otherImage3, preview: false })
			}
			if (otherImage4) {
				images.push({ url: otherImage4, preview: false })
			}

			images.push(newPrevImage);

			setImages(images);

			spot = {
				Spot: {
					country, address, city, state,
					lat: 0,
					lng: 0,
					name: title,
					price,
					description: describeText,
					previewImage: newPrevImage
				},

			}

			const submissionResults = await dispatch(thunkCreateSpot(spot, images));


			console.log("🚀 ~ file: CreateSpotForm.jsx:141 ~ handleSubmit ~ images INSIDE createSpotForm:", "color: red", images)
			console.log("%c 🚀 ~ handleSubmit ~ images: ", "color: red; font-size: 25px", images)

			console.log("🚀 ~ file: CreateSpotForm.jsx:141 ~ handleSubmit ~ submissionResults:", submissionResults)

			if (!submissionResults.errors) {
				console.log("SUBMISSION ID: ", submissionResults.id)
				navigate(`/spots/${submissionResults.id}`)
			} else {
				return submissionResults.errors
			}

		}

	}


	const stylishComma = () => {

		if (errors.city || errors.state) {
			return <div id="comma"
				style={{
					alignSelf: 'center',
					marginInlineStart: "-7.5rem"

				}}>
				,
			</div>
		} else if (!errors.city && !errors.state) {
			return <div id="comma"
				style={{
					alignSelf: "end",
					marginBlockEnd: "0.6rem",
					marginInlineStart: "-7.0rem"
				}}>
				,
			</div>

		} else {
			return <div id="comma"
				style={{
					alignSelf: 'end',
					marginBlockEnd: 10,
					marginInlineEnd: 60

				}}
			>
				,
			</div>
		}
	}


	return (
		<>
			<div className="form-outer-container">
				<div className="form-inner-container">
					<form onSubmit={handleSubmit} className="create-form">
						<div className="create-form-container">

							<h2 id="create-form-h2">
								Create a new Spot
								{formType}
							</h2>
							<div className="create-form-locale">
								<div className="create-form-header">
									<h3 className="create-form-h3">
										Where&apos;s your place located?
									</h3>
									<div className="form-text-div">Guests will only get your exact address once they booked a reservation.
									</div>
								</div>

								<div className="form-locale form-country" id="form-country">
									<label htmlFor="country">
										Country
										<input type="text" name="country" id="country" placeholder="Country"
											value={country}
											onChange={(e) => setCountry(e.target.value)}
											required />
									</label>
									{/* {"country" in errors && <p className="p-error">{errors.country}</p>} */}
									<p className="p-error">{errors?.country}</p>
								</div>

								<div className="form-locale form-address" id="form-address">
									<label htmlFor="address">
										Street Address
										<input type="text" name="address" id="address" placeholder="Address"
											value={address}
											onChange={(e) => setAddress(e.target.value)}
											required />
									</label>
									{/* {"address" in errors && <p className="p-error">{errors.address}</p>} */}
									<p className="p-error">{errors?.address}</p>
								</div>

								<div className="form-locale form-city-state">
									<div className="form-city-state-container" id="city-container">
										<label htmlFor="city">
											City
										</label>
										<input type="text" name="city" id="city" className="form-label city" placeholder="City"
											value={city}
											onChange={(e) => setCity(e.target.value)}
											required />
										{/* {"city" in errors && <p className="p-error">{errors.city}</p>} */}
										<p className="p-error">{errors?.city}</p>

									</div>
									{stylishComma()}

									<div className="form-city-state-container" id="state-container">
										<label htmlFor="state">
											State
										</label>
										<input type="text" name="state" id="state" className="form-label state" placeholder="STATE"
											value={state}
											onChange={(e) => setState(e.target.value)}
											required />
										{/* {"state" in errors && <p className="p-error">{errors.state}</p>} */}
										<p className="p-error">{errors?.state}</p>
									</div>

								</div>
							</div>

							<hr />

							<div className="form-description">
								<div className="create-form-header">
									<h3 className="create-form-h3">
										Describe your place to guests
									</h3>
									<div className="form-text-div">
										Mention the best features of your space, any special amenities like
										fast wifi or parking, and what you love about the neighborhood.
									</div>
								</div>
								<textarea name="" id="" cols="80" rows="10" placeholder="Please write at least 30 characters"
									value={describeText}
									onChange={(e) => setDescribeText(e.target.value)}
								></textarea>
								<p className="p-error">{errors?.describeText}</p>
							</div>

							<hr />

							<div className="form-title">
								<div className="create-form-header">
									<h3 className="create-form-h3">Create a title for your spot</h3>
									<div className="form-text-div">
										Catch guests&apos; attention with a spot title that highlights what makes
										your place special.
									</div>
								</div>
								<input type="text" name="title" id="title" placeholder="Name of your spot"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>

								<p className="p-error">{errors?.title}</p>
							</div>

							<hr />

							<div className="form-price">
								<div className="create-form-header">
									<h3 className="create-form-h3">Set a base price for your spot</h3>
									<div className="form-text-div">
										Competitive pricing can help your listing stand out and rank higher
										in search results.
									</div>
								</div>
								<div className="price-container">
									<span>$</span>
									<input type="text" name="price" id="price" placeholder="Price per night (USD)"
										value={price}
										onChange={(e) => setPrice(e.target.value)}
									/>

									<p className="p-error">{errors?.price}</p>

								</div>
							</div>

							<hr />

							<div className="spot-pics">
								<div className="create-form-header">
									<h3>Liven up your spot with photos</h3>
									<p>Submit a link to at least one photo to publish your spot.</p>
								</div>
								<input type="text" name="preview-img" id="preview-img" placeholder="Preview Image URL"
									value={prevMainImage}
									onChange={(e) => setPrevMainImage(e.target.value)}

								/>

								<p className="p-error">{errors?.prevMainImage}</p>

								<input type="text" name="img-one" className="spot-form-img" id="img-one" placeholder="Image URL"
									value={otherImage}
									onChange={(e) => setOtherImage(e.target.value)}
								/>

								<p className="p-error">{errors?.otherImage}</p>

								<input type="text" name="img-two" className="spot-form-img" id="img-two" placeholder="Image URL"
									value={otherImage2}
									onChange={(e) => setOtherImage2(e.target.value)}
								/>
								<input type="text" name="img-three" className="spot-form-img" id="img-three" placeholder="Image URL"
									value={otherImage3}
									onChange={(e) => setOtherImage3(e.target.value)}
								/>
								<input type="text" name="img-four" className="spot-form-img" id="img-four" placeholder="Image URL"
									value={otherImage4}
									onChange={(e) => setOtherImage4(e.target.value)}
								/>
							</div>
							<hr />
						</div>
						<button
							type="submit"
							className="spot-create-form-btn"
							disabled={Object.values(errors).length > 0}
						>
							Create Spot
							{/* {formType} */}
						</button>

					</form>
				</div>
			</div>
		</>

	)
}


export default CreateSpotForm;
