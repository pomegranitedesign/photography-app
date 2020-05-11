import React from 'react'
import styled from 'styled-components'

const Photos = ({ photos = [] }) => {
	const renderPhotos = () =>
		photos.map(({ id, url }) => (
			<PhotoContainer key={id}>
				<Photo src={url} />
			</PhotoContainer>
		))

	return <Wrapper>{renderPhotos()}</Wrapper>
}

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-row-gap: 20px;
	grid-column-gap: 10px;
	margin: 40px auto;
`

const PhotoContainer = styled.div``

const Photo = styled.img``

export default Photos
