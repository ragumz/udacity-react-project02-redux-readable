import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SortListMenu from '../common/SortListMenu'
import { ENTITY_NAME } from '../utils/constants'
import { getSortedEntityId, sortEntityMap } from '../common/commonOperations'

export const CATEGORY_SORT_MENU = [
  {title: 'Name', fieldName: 'name'},
]

class CategoryList extends Component {

  render() {
    const { categories, sortingSetup } = this.props;

    let sortedCateg = sortEntityMap(categories, sortingSetup);

    return (
      <div>
        <div className="center">
          <h3 className="side-by-side">CATEGORIES</h3>
          <SortListMenu entityName={ENTITY_NAME.CATEGORY} sortMenuOptions={CATEGORY_SORT_MENU}  />
        </div>
        <div className="category">
          <ul className="dashboard-list">
            {sortedCateg.map((id) => (
              <Link key={id} to={`/category/${id}`}>
                <span key={id} className="category-name">{categories[id].name}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categories, common }) {
  return {
    categories,
    sortingSetup: common[getSortedEntityId(ENTITY_NAME.CATEGORY)]
  }
}

export default connect(mapStateToProps)(CategoryList)