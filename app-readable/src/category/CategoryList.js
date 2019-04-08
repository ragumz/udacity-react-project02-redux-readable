import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import SortListMenu from '../common/SortListMenu'
import { ENTITY_NAME } from '../utils/constants'
import { getSortedEntityId, sortEntityMap } from '../common/commonOperations'
import Card from '@material-ui/core/Card';

/**
 * @description Object with global Category sort menu options.
 */
export const CATEGORY_SORT_MENU = [
  {title: 'Name', fieldName: 'name'},
]

/**
 * @description React component to enlist all existing Categories.
 */
const CategoryList = ({categories, sortingSetup}) => {

  /**
   * @description Apply sorting setup options to the Categories' object collection
   */
  const getSortedCategories = () => {
    //execute sort method over Category collection from menu user sorting selection
    return sortEntityMap(categories, sortingSetup);
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  return (
    <div>
      <div className="center">
        <h3 className="side-by-side">CATEGORIES ({Object.keys(categories).length})</h3>
        <SortListMenu entityName={ENTITY_NAME.CATEGORY} sortMenuOptions={CATEGORY_SORT_MENU}  />
      </div>
      <Card className="category" raised>
        <ul className="category-list">
          {getSortedCategories().map((id) => (
            <Link key={id} to={`/${id}`}>
              <span key={id} className="category-name">{categories[id].name}</span>
            </Link>
          ))}
        </ul>
      </Card>
    </div>
  );
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