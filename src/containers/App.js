import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/js/bootstrap.bundle';

import { Header, Main, Notification, ConfirmModal} from '../components/index'
import ImageAdder from './content/gallery/ImageAdder';
import GalleryModal from './content/galleryModal/GalleryModal';

class App extends Component {
    render() {
        return (
          <div className="App">
              {this.props.isGalleryModalOpen &&
                <GalleryModal/>
              }
              <ImageAdder/>
              <ConfirmModal/>
              <Notification/>
              <Header/>
              <Main/>
          </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        isGalleryModalOpen: state.galleryModal.isOpen,
    }
}
export default connect(mapStateToProps)(App)

