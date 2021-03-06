import React from 'react'
import Contact from '../models/Contact';
import axios from 'axios';
import ListContact from './ListContact';

export default class EditContact extends React.Component   {
    state ={
        index: 0,
        editOn:true,
        name:"",
        lastName:"",
        email:"",
        birthDate: "",
        phone:"",
    }


   handleNameChange = (e) => {
        this.setState({name: e.target.value});
    }
    handleLastNameChange = (e) => {
        this.setState({lastName: e.target.value});
    }
    handleEmailChange = (e) => {
      this.setState({email: e.target.value});
    }
    handleBirthDateChange = (e) => {
        this.setState({birthDate: e.target.value});
    }
    handlePhoneChange = (e) => {
        this.setState({phone: e.target.value});
    }

    handleEditContact =()=>{
        const newContact = new Contact(this.state);

        axios
        .put(`http://localhost:9000/contactAPI/edit/${this.state.id}`, newContact)
        .then(() => {
            alert("Contacto editado correctamente");
            var list = this.state.listContact;
            list.splice(this.state.index,1, newContact);
            this.setState({
                listContact:list,
                editOn:true,
            })
        })
        
        .catch(err => {
            console.error(err);
            alert("Ocurrio un error. Intente nuevamente");
        });
    }

    onItemClick= (item, index) => {
        this.setState({
            index: index,
            editOn:false,
            id: `${item.name}-${item.lastName}-${item.birthDate}-${item.email}-${item.phone}`,
            name:item.name,
            lastName:item.lastName,
            birthDate:item.birthDate,
            email:item.email,
            phone:item.phone,
        });
    }
    componentDidMount = () =>{
        axios
        .get('http://localhost:9000/contactAPI/list')
        .then((res) => {
            var list = []
            res.data.forEach((item)=>{
                list.push(JSON.parse(item));
            })
            this.setState({
                listContact:list,
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    render(){
        this.listContact =  <ListContact onItemClick={this.onItemClick} editOn={this.state.editOn} listContact={this.state.listContact}/>
        
        return (
            <div>
                {this.state.editOn && this.listContact}
                {!this.state.editOn &&
                    <form className = "NewContactForm">
                        <div>
                            Nombre: 
                            <input className = "NameInput" name = "Nombre" required value={this.state.name} onChange={this.handleNameChange}></input>
                        </div>
                        <div>
                            Apellido:
                            <input className = "LastNameInput" name = "Apellido" required value={this.state.lastName} onChange={this.handleLastNameChange}></input>
                        </div>
                        <div>
                            Email:
                            <input className = "EmailInput" type = "email" name = "Email" value={this.state.email} onChange={this.handleEmailChange}></input>
                        </div>
                        <div>
                            Fecha de nacimiento:
                            <input className = "BirthDateInput" type = "date" name= "Fecha de nacimiento"value={this.state.birthDate} onChange={this.handleBirthDateChange}></input>
                        </div>
                        <div>
                            Telefono
                            <input className = "PhoneInput" name = "Numero de telefono"value={this.state.phone} onChange={this.handlePhoneChange}></input>
                        </div>
                        <button type="button" onClick={this.handleEditContact}>Guardar contacto</button>
                    </form>
                }
        </div>
        
        );
    }
}
