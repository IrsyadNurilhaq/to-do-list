import React, { Component } from 'react';
import {InputGroup, FormControl, Button, Form} from 'react-bootstrap';
import Service from '../../../service/Index';
import '../../../style/list.css';

class All extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [],
            idList: []
        }
        this.handleGetData = this.handleGetData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async showData(data){
        const dataShow = await data.map((d,i) => {
            return(
                <InputGroup className="mb-3" key={i}>
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox 
                            checked={d.is_done === true ? true :false}
                            aria-label="Checkbox for following text input" 
                            onChange={() => this.handleDone(d.is_done,d.content, this.state.idList[i])}/>
                    </InputGroup.Prepend>
                        <FormControl 
                            aria-label="Text input with checkbox" 
                            value={d.content}
                            className={d.is_done === true && 'coret'}
                        />
                        <Button variant="link" onClick={() => this.handleDelete(this.state.idList[i])}>
                            Delete
                        </Button>
                </InputGroup>
            )
        })
        this.setState({data:dataShow})
    }
    async handleGetData(){
        
        await Service.getList().then((res) => {
            this.showData(res.data.data[0].lists)
            this.setState({idList : res.data.data[0].idList})
        })
    }

    async handleSubmit(e){
        if(e.key === 'Enter'){
            let data = {
                "is_done" : false,
                "content" : e.target.value
            }
            await Service.postData(data).then(() => {
                this.handleGetData();
            })
        }
    }
    async handleDone(isDone,content,id){
        let data = {
            "is_done" : !isDone,
            "content" : content
        }
        await Service.editList(id,data).then(() => {
            this.handleGetData();
        })
    }
    async handleDelete(id){
        await Service.deleteList(id).then(() => {
            this.handleGetData();
        })
    }
    async componentDidMount(){
        await this.handleGetData()
    }
    render(){
        return(
            <div>
                <Form.Group>
                    <Form.Control type="text" name="content" placeholder="What needs to be done?" onKeyDown={this.handleSubmit}/>
                </Form.Group>
                {this.state.data}
            </div>
        );
    }
}

export default All;