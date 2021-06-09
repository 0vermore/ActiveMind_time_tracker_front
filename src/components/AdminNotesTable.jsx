import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import AdminTableItem from './AdminTableItem'

class AdminNotesTable extends Component {
    render() {
        const notes = this.props.notes
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User</th>
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
                            <AdminTableItem note={note} key={note.id} id={note.id}
                                updateNote={this.props.updateNote}
                                deleteNote={this.props.deleteNote}
                                projects={this.props.projects}
                                categories={this.props.categories}/>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default AdminNotesTable