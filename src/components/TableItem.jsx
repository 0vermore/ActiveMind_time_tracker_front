import React, { Component } from 'react'
import { BsFillTrashFill } from "react-icons/bs"
import { ModalContainer } from '../containers/ModalContainer'

class TableItem extends Component {
    deleteNote = (id) => {
        this.props.deleteNote(id)
    }

    render() {
        const note = this.props.note
        console.log("TableItem:")
        console.log(note.id)
        return (
            <tr key={note.id} id={note.id}>
                <td>{note.project_id}</td>
                <td>{note.category_id}</td>
                <td>{note.description}</td>
                <td>{note.hours}</td>
                <td>
                    <ModalContainer className="taskLabel" note={note}
                        projects={this.props.projects}
                        categories={this.props.categories}
                        onSubmit={this.props.updateNote} />
                    <BsFillTrashFill className="deleteBtn" onClick={(e) => this.deleteNote(note.id)} />
                </td>
            </tr>
        );
    }
}

export default TableItem