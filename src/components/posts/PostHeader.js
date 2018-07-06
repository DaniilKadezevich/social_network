import React, {Component} from "react";
import { Avatar } from './index';
import PostDeleteBtn from '../../containers/content/btns/PostDeleteBtn';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

export default class PostHeader extends Component {
    render() {
        const locale = localStorage.getItem('locale');
        moment.locale(locale);

        return(
            <div className="row post-header no-gutters">
                <div className="col-2">
                    <Link to={`/users/${this.props.post.author}`}> <Avatar class='avatar' src={this.props.post.photo}/> </Link>
                </div>
                <div className="col-5 d-flex flex-column justify-content-center ">
                    <div className="post-header-name">{this.props.post.name} {this.props.post.surname}</div>
                    <div className="post-header-time">
                        {moment(this.props.post.date).format('MMMM Do YYYY, h:mm:ss a')}
                    </div>
                </div>
                <div className="col-5 d-flex justify-content-end">
                    {this.props.edit &&
                        <PostDeleteBtn _id={this.props.post._id}/>
                    }
                </div>
            </div>
        )
    }
}