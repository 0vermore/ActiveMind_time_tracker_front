import React, { Component } from 'react'
import { BsFillTrashFill } from "react-icons/bs"

class ProjectsList extends Component {
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
            <tr>
              <td>{index + 1}</td>
              <td>{project.project}</td>
              <td className='text-right'><BsFillTrashFill className="deleteBtn" onClick={(e) => this.props.deleteProject(project.id)}>X</BsFillTrashFill></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }
}

export default ProjectsList