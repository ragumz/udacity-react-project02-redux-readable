import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategoryList extends Component {

  render() {
    const { categories } = this.props;

    const sortedCateg = Object.keys(categories)
                      .sort((a,b) => categories[b]['name'] > categories[a]['name'])

    return (
      <div className="category">
        <ul className='dashboard-list'>
          {sortedCateg.map((name) => (
            <span key={name} className="category-name">{name}</span>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(CategoryList)