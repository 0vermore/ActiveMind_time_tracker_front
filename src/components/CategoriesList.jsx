import React, { Component } from 'react'
import { BsFillTrashFill } from "react-icons/bs"

class CategoriesList extends Component {

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
            {(this.props.categories).map((category, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{category.category}</td>
                <td className='text-right'><BsFillTrashFill className="deleteBtn" onClick={(e) => this.props.deleteCategory(category.id)}>X</BsFillTrashFill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CategoriesList