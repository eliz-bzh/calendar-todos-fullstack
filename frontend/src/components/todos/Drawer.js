import React from "react";
import Todos from "./todo/app";

const Drawer = ({ dateTodos }) => {

    return(
        <div>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <button className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <Todos dateTodos={dateTodos}/>
                </div>
            </div>
        </div>
    )
}

export default Drawer;