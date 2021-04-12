import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import TableItem from './TableItem'

class NotesTable extends Component {
    render() {
        const notes = this.props.notes
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Hours</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => {
                        return (
                            <TableItem note={note} key={note.id} id={note.id}
                                updateNote={this.props.updateNote}
                                deleteNote={this.props.deleteNote}
                                projects={this.props.projects}
                                categories={this.props.categories} />
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default NotesTable