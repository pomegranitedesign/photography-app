import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { notification } from 'antd'

class AddComment extends Component {
	state = {
		name: '',
		comment: ''
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		if (!this.state.name)
			notification.open({ message: 'Please enter name', type: 'error' })
		else if (!this.state.comment)
			notification.open({
				message: 'Please enter comment text ',
				type: 'error'
			})

		const res = await axios.post(
			`https://boiling-refuge-66454.herokuapp.com/images/${this.props
				.imageID}/comments`,
			{
				comment: this.state.comment,
				name: this.state.name
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		if (res.status === 204) this.props.toggle()
		this.setState({ name: '', comment: '' })
		notification.open({
			message: 'Comment added successfully',
			type: 'success'
		})
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

	render() {
		return (
			<Form method="POST" onSubmit={this.handleSubmit}>
				<Input
					placeholder="Name"
					value={this.state.name}
					name="name"
					onChange={this.handleChange}
				/>
				<Input
					placeholder="Text"
					style={{ marginTop: 10 }}
					value={this.state.comment}
					name="comment"
					onChange={this.handleChange}
				/>
				<Button onClick={this.handleSubmit}>Leave Comment</Button>
			</Form>
		)
	}
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
