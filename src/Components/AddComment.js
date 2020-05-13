import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const AddComment = ({ imageID = '' }) => {
	const [ name, setName ] = useState('')
	const [ comment, setComment ] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()

		await axios.post(
			`https://boiling-refuge-66454.herokuapp.com/images/${imageID}/comments`,
			comment
		)
	}

	return (
		<Form method="POST" onSubmit={handleSubmit}>
			<Input
				placeholder="Name"
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
			<Input
				placeholder="Text"
				style={{ marginTop: 10 }}
				value={comment}
				onChange={(event) => setComment(event.target.value)}
			/>
			<Button onClick={handleSubmit}>Leave Comment</Button>
		</Form>
	)
}

const Form = styled.form`margin-top: 20px;`

const Input = styled.input`
	display: block;
	padding: 5px;
	width: 400px;
`

const Button = styled.button`
	border-radius: 3px;
	background-color: #4997d0;
	border: none;
	padding: 8px;
	width: 400px;
	cursor: pointer;
	color: #ffffff;
	margin-top: 10px;
`

export default AddComment
