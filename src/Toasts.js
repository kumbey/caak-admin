import React from "react";
import Button from "./components/Button";

const Toasts = () => {
    return (
        <div className="mt-20">
            <div className="p-10">
                <Button skin={'primary'} uppercase>Show Toast</Button>
            </div>
            <div id="toasts-container"
                className="toasts-container top-auto lg:top-0 bottom-0 lg:bottom-auto right-0 left-0 lg:left-auto">
                <div className="toast mb-4">
                    <div className="toast-header">
                        <h5>Toast Title</h5>
                        <small>just now</small>
                        <button type="button" className="close" data-dismiss="toast">&times;</button>
                    </div>
                    <div className="toast-body">
                        See? Just like this.
                    </div>
                </div>
                <div className="toast mb-4">
                    <div className="toast-header">
                        <h5>Toast Title</h5>
                        <small>2 seconds ago</small>
                        <button type="button" className="close" data-dismiss="toast">&times;</button>
                    </div>
                    <div className="toast-body">
                        Heads up, toast will stack automatically.
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Toasts