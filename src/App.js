import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Container from './Components/Container'
import Photos from './Components/Photos'

const App = () => {
	const [ photos, setPhotos ] = useState([])

	useEffect(() => {
		const fetchPhotos = async () => {
			const res = await axios.get(
				'https://boiling-refuge-66454.herokuapp.com/images'
			)
			setPhotos(res.data)
		}
		fetchPhotos()
	}, [])

	return (
		<Container>
			<Title>Test App</Title>

			<div>
				<Photos photos={photos} />
			</div>
		</Container>
	)
}

const Title = styled.h1`
	font-weight: 900;
	font-size: 40px;
	text-align: center;
	margin-top: 40px;
`

export default App
