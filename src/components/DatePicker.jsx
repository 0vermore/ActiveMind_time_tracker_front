import React, { Component } from 'react'
import { Row, Col, FormControl } from 'react-bootstrap'
import { DateTime as DT } from 'luxon'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs"
import NotesTable from './NotesTable'

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: DT.now().toISODate()
        };
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onDatePlus = this.onDatePlus.bind(this);
        this.onDateMinus = this.onDateMinus.bind(this);
    };

    onChangeDate(event) {
        this.setState({ date: event.target.value });
    }

    onDatePlus(event) {
        let dt = DT.fromISO(this.state.date)
        let new_dt = dt.plus({ days: 1 })
        this.setState({ date: new_dt.toISODate() });
    }

    onDateMinus(event) {
        let dt = DT.fromISO(this.state.date)
        let new_dt = dt.minus({ days: 1 })
        this.setState({ date: new_dt.toISODate() });
    }

    render() {
        let total = 0
        const up_to_date_notes = []
        const notes = this.props.notes;
        const projects = this.props.projects;
        const categories = this.props.categories;
        const notes_by_date = notes.filter(note => note.date === this.state.date)
        for (let i = 0; i < notes_by_date.length; i++) {
            let note = notes_by_date[i];
            let project = projects.find(project => project.id === note.project_id || project.project === note.project_id)
            let category = categories.find(category => category.id === note.category_id || category.category === note.category_id)
            if (project && category) {
                note.project_id = project.project
                note.category_id = category.category
                up_to_date_notes.push(note)
            }
        }
        for(let i = 0; i<up_to_date_notes.length; i++){
            total += up_to_date_notes[i].hours
        }
        return (
            <div>
                <form className="datePickerForm">
                    <Row>
                        <Col className="btnArrowLeft">
                            <BsFillCaretLeftFill className="btnLeft" onClick={this.onDateMinus} />
                        </Col>
                        <Col>
                            <FormControl controlid="date" type="date" required
                                value={this.state.date} onChange={this.onChangeDate} />
                        </Col>
                        <Col className="btnArrowRight">
                            <BsFillCaretRightFill className="btnRight" onClick={this.onDatePlus} />
                        </Col>
                    </Row>
                </form>
                <div className="noteTable">
                    <NotesTable notes={up_to_date_notes} projects={projects}
							categories={categories}
                        deleteNote={this.props.deleteNote}
                        updateNote={this.props.updateNote} />
                </div>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col className="total"><h6 className="totalText">Total: {total.toFixed(1)}</h6></Col>
                    <Col></Col>
                </Row>
            </div >
        );
    }
}

export default DatePicker