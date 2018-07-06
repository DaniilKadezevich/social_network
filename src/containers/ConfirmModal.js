import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ConfirmModal.sass';

class ConfirmModal extends Component {
    render() {
        return (
            <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">{this.props.info.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.info.text}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary btn-sm"
                                    onClick={this.props.info.callback}
                                    data-dismiss="modal" aria-label="Close"
                            >
                                {this.props.info.btnText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        info: state.confirmM,
    }
}
function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal)