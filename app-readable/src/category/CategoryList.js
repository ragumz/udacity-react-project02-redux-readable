import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import SortListMenu from '../common/SortListMenu'
import { ENTITY_NAME } from '../utils/constants'
import { getSortedEntityId, sortEntityMap } from '../common/commonOperations'

/**
 * @description Object with global Category sort menu options.
 */
export const CATEGORY_SORT_MENU = [
  {title: 'Name', fieldName: 'name'},
]

/**
 * @description React component to enlist all existing Categories.
 */
class CategoryList extends Component {

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { categories, sortingSetup } = this.props;
    //execute sort method over Category collection from menu user sorting selection
    let sortedCateg = sortEntityMap(categories, sortingSetup);

    return (
      <div>
        <div className="center">
          <h3 className="side-by-side">CATEGORIES</h3>
          <SortListMenu entityName={ENTITY_NAME.CATEGORY} sortMenuOptions={CATEGORY_SORT_MENU}  />
        </div>
        <div className="category">
          <ul className="category-list">
            {sortedCateg.map((id) => (
              <Link key={id} to={`/${id}`}>
                <span key={id} className="category-name">{categories[id].name}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps ({ categories, common }) {
  return {
    //all categories
    categories,
    //menu user sort selection
    sortingSetup: common[getSortedEntityId(ENTITY_NAME.CATEGORY)]
  }
}

export default withRouter(connect(mapStateToProps)(CategoryList));