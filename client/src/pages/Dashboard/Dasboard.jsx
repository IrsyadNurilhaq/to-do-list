import React, { Component } from 'react';
import {Col,Row,Nav,Tab} from 'react-bootstrap';
import All from './content/All';

class Dashboard extends Component{
    render(){
        return(
            <div className="container" style={{marginTop: "10%"}}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">All</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <All/>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </div>
        );
    }
}

export default Dashboard;