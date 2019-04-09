import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import VoteScore from '../common/VoteScore';
import { handlePostVoteScore, handleDeletePost } from './postOperations'
import EntityButtons from '../common/EntityButtons'
import MessageDialog from '../common/MessageDialog'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

/**
 * @description React component to show Post's details.
 */
class PostItem extends Component {
  /**
   * @description Define props' arguments' types
   */
  static propTypes = {
    id: PropTypes.string,
  };

  state = {
    /** @description Control flag to manage dialog user interaction */
    showConfirmDialog: false,
  }

  /**
   * @description Function to get current Post Edit page
   */
  getPostEditLink = () => {
    const { id, category } = this.props;
    return `/${category.name}/${id}`;
  }

  /**
   * @description Component handle function to navigate to current Post data edition
   */
  handleEdit = (event) => {
    const { id, category, history } = this.props;
    history.push(`/${category.name}/${id}`)
  }

  /**
   * @description Component handle function to show a dialog to the user
   */
  handleShowDialog = (event) => {
    this.setState({ showConfirmDialog: true });
  }

  /**
   * @description Component handle function to process dialog user Yes decision button
   */
  handleDialogYesAnswer = (event) => {
    const { dispatch, id } = this.props
    this.setState({ showConfirmDialog: false });
    dispatch(handleDeletePost(id));
  }

  /**
   * @description Component handle function to process dialog user No decision button
   */
  handleDialogNoAnswer = (event) => {
    this.setState({ showConfirmDialog: false });
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { showConfirmDialog } = this.state;
    const { id, post, category, dispatch } = this.props;

    if (commons.isNull(post)) {
      return <p>Post with {id} does not exist</p>;
    }
    const {
      title,
      timestamp,
      body,
      author,
      commentCount
    } = post;

    const avatarId = category.name.substring(0,1).toUpperCase();
    const avatarColor = commons.stringToHslColor(category.name, 75, 80);
    const editPostLink = this.getPostEditLink();
    const viewCategLink = `/${category.name}`;

    //Post deletion behavior required to ask user by dialog message
    let dialogSetup = {};
    if (showConfirmDialog) {
      dialogSetup = commons.createDeleteMessage(constants.ENTITY_NAME.POST,  this.handleDialogYesAnswer, this.handleDialogNoAnswer, ' and all its Comments');
    }

    return (
      <div>
        <Card className="post" raised >
          <CardHeader
            avatar={
              <NavLink to={viewCategLink} exact >
                <Avatar aria-label="CardAvatar" style={{backgroundColor: avatarColor}}>
                  {avatarId}
                </Avatar>
              </NavLink>
            }
            action={
              <EntityButtons
                entityName={constants.ENTITY_NAME.POST}
                handleDelete={this.handleShowDialog}/>
            }
            title={<NavLink to={editPostLink} exact className="panel-info-title" >
                    {title}
                  </NavLink>}
            subheader={<div>
                        <NavLink to={viewCategLink} exact className="panel-info-categ" >
                          {category.name}
                        </NavLink>
                        {` | ${commons.formatDate(timestamp)} | ${author}`}
                      </div> }
          />
          <CardContent>
            <Typography component="p" className="panel-info-body">
              {body}
            </Typography>
          </CardContent>
          <CardActions style={{display: 'flex'}} disableActionSpacing>
            <VoteScore
              id={id}
              object={post}
              entityName={constants.VOTE_OBJECT.POST}
              dispatch={dispatch}
              actionHandle={handlePostVoteScore}/>
            <span className="panel-info-right" style={{marginTop: "3px", textAlign: "right", width: '60%'}}><i>Comments {commentCount}</i></span>
          </CardActions>
        </Card>
        <MessageDialog
              userMessage={dialogSetup.userMessage}
              buttons={dialogSetup.messageButtons}/>
      </div>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ categories, posts, common }, { id }) {
  let post;
  //test to prevent refreshing on this page without loading app content
  if (!commons.isEmpty(posts)
        && posts.hasOwnProperty(id)) {
    post = posts[id];
  } else {
    post = Object.assign({}, constants.EMTPY_POST);
  }
  //extract the current Post's Category
  const category = post ? categories[post.category] : {name: constants.UNSELECTED_CATEGORY_PATH};
  return {
    id,
    category,
    post,
    common
  };
}

export default withRouter(connect(mapStateToProps)(PostItem));
