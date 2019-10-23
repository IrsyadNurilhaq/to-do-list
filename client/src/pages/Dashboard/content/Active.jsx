import React, { Component } from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';

class Active extends Component{
    render(){
        return(
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup.Prepend>
                        <FormControl aria-label="Text input with checkbox" />
                        <Button variant="link">Delete</Button>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup.Prepend>
                        <FormControl aria-label="Text input with checkbox" />
                        <Button variant="link">Delete</Button>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup.Prepend>
                        <FormControl aria-label="Text input with checkbox" />
                        <Button variant="link">Delete</Button>
                </InputGroup>
            </div>
        );
    }
}

export default Active;