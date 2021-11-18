import React, { Component } from 'react'
import { BsFillTrashFill } from "react-icons/bs"

class UsersList extends Component {
  
  renderTrashIcon(id) {
    const { notes } = this.props;
    const overlap = notes.some(({ user_id }) => user_id === id);
    
    return !overlap && <BsFillTrashFill className="deleteBtn" onClick={() => this.props.deleteUser(id)}>X</BsFillTrashFill>;
  }

  render() {
    return (
      <div className="border border-secondary rounded">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Last Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {(this.props.users).map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td className='text-right'> {this.renderTrashIcon(user.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UsersList
