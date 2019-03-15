import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CategoryList extends Component {

  render() {
    const { categories } = this.props;

    const sortedCateg = Object.keys(categories)
                      .sort((a,b) => categories[b]['name'] > categories[a]['name'])

    return (
      <div className="category">
        <ul className='dashboard-list'>
          {sortedCateg.map((id) => (
            <Link key={id} to={`/category/${id}`}>
              <span key={id} className="category-name">{categories[id].name}</span>
            </Link>
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