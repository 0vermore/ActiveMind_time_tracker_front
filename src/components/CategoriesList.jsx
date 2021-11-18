import React, { Component } from 'react'
import { BsFillTrashFill } from "react-icons/bs"

class CategoriesList extends Component {

  renderTrashIcon(id) {
    const { notes } = this.props;
    const overlap = notes.some(({ category_id }) => category_id === id);
    
    return !overlap && <BsFillTrashFill className="deleteBtn" onClick={() => this.props.deleteCategory(id)}>X</BsFillTrashFill>;
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
            {(this.props.categories).map((category, index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.category}</td>
                <td className='text-right'>
                  {this.renderTrashIcon(category.id)} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CategoriesList