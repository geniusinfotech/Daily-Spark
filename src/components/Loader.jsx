import React, { Component } from 'react'

export default class Loader extends Component {
    render() {
        return (
            <div>
                <div className="loader">
                    <div className="box box-1">
                        <div className="side-left"></div>
                        <div className="side-right"></div>
                        <div className="side-top"></div>
                    </div>
                    <div className="box box-2">
                        <div className="side-left"></div>
                        <div className="side-right"></div>
                        <div className="side-top"></div>
                    </div>
                    <div className="box box-3">
                        <div className="side-left"></div>
                        <div className="side-right"></div>
                        <div className="side-top"></div>
                    </div>
                    <div className="box box-4">
                        <div className="side-left"></div>
                        <div className="side-right"></div>
                        <div className="side-top"></div>
                    </div>
                </div>
            </div>
        )
    }
}
