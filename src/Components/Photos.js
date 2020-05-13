import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'

import Toggle from './Toggle'
import AddComment from './AddComment'

const Photos = ({ photos = [] }) => {
	const [ currentPhoto, setCurrentPhoto ] = useState({})

	const getPhoto = async (id = '', toggle = () => {}) => {
		toggle()
		const res = await axios.get(
			`https://boiling-refuge-66454.herokuapp.com/images/${id}`
		)
		setCurrentPhoto(res.data)
	}

	const renderPhotos = (toggle = () => {}) =>
		photos.map(({ id, url }) => (
			<PhotoContainer key={id}>
				<Photo src={url} onClick={() => getPhoto(id, toggle)} />
			</PhotoContainer>
		))

	return (
		<Wrapper>
			<Toggle>
				{({ on, toggle }) =>
					on ? (
						<Fragment>
							<Card>
								<div>
									<SinglePhoto src={currentPhoto.url} />
									<AddComment imageID={currentPhoto.id} />
								</div>
								<Comments>
									<ul>
										{currentPhoto.comments ? (
											currentPhoto.comments.map(
												(comment) => (
													<div key={comment.id}>
														<Date>
															{moment(
																comment.date
															).format(
																'DD.MM.YYYY'
															)}
														</Date>
														<li className="comment">
															{comment.text}
														</li>
													</div>
												)
											)
										) : null}
									</ul>
								</Comments>
							</Card>
							<Background onClick={toggle} />
							{renderPhotos()}
						</Fragment>
					) : (
						renderPhotos(toggle)
					)}
			</Toggle>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-row-gap: 20px;
	grid-column-gap: 10px;
	margin: 40px auto;
`

const PhotoContainer = styled.div`display: block;`

const Photo = styled.img`
	border-radius: 3px;
	box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.25);
	transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
	cursor: pointer;

	&:hover {
		transform: scale(1.03);
	}
`

const SinglePhoto = styled.img`width: 400px;`

const Card = styled.div`
	background-color: #ffffff;
	z-index: 2;
	padding: 30px;
	min-width: 200px;
	min-height: 300px;
	width: 600px;
	display: flex;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 0;
`

const Comments = styled.div`
	margin-left: 14px;
	li.comment {
		font-size: 13px;
		color: #000000;
		list-style: none;
	}
`

const Date = styled.li`
	color: #999999;
	font-size: 13px;
`

export default Photos
