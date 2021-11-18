import React, { Component } from 'react'
import { BsFillTrashFill } from "react-icons/bs"
import ModalContainer from '../containers/ModalContainer';


class ProjectsList extends Component {

  renderTrashIcon(id) {
    const { notes } = this.props;
    const overlap = notes.some(({ project_id }) => project_id === id);
    
    return !overlap && <BsFillTrashFill className="deleteBtn" onClick={() => this.props.deleteProject(id)}>X</BsFillTrashFill>;
  }
  
  render() {
    return (
      <div className="border border-secondary rounded">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {(this.props.projects).map((project, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{project.project}</td>
              <td className='text-right'>
              <ModalContainer className="taskLabel" 
                        projects={this.props.projects}
                        categories={this.props.categories}
                        onSubmit={this.props.updateNote} />
                {this.renderTrashIcon(project.id)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }
}

export default ProjectsList