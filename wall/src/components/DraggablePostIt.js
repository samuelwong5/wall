import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import PostIt from './PostIt';
import './DraggablePostIt.css';
import ReactDOM from 'react-dom';

class DraggablePostIt extends Component {
    updateChild(e, data) {
        let elem = ReactDOM.findDOMNode(this);
        var k = elem.lastChild;
        k.style.height = data.size.height;
        k.style.width = data.size.width;
        this.postit.setSize(data.size.width, data.size.height);
    }

    render() {

        return (
            <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[25, 25]}
                onStop={() => this.postit.updateBounds()}>
                <div>
                    <div className="handle"><span role="img" aria-label="drag">📍</span></div>
                    <ResizableBox width={400} height={250}
                        minConstraints={[400, 250]} maxConstraints={[1000, 500]}
                        onResizeStop={this.updateChild.bind(this)}
                    >
                        <div className="preview" style={{ height: "250px", width: "400px" }}>
                            <PostIt color={this.props.color} id={this.props.id} ref={instance => { this.postit = instance; }} />
                        </div>
                    </ResizableBox>
                </div>
            </Draggable>
        );
    }
}

export default DraggablePostIt;
