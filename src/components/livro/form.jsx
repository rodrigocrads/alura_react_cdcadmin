import React, { Component } from 'react';

import Input from '../input';
import Select from '../select';
import TratadorErros from '../tratadorErros';

import axios from 'axios';
import PubSub from 'pubsub-js';

const URL = "http://localhost:8080/api/livros";

class Form extends Component {
    constructor() {
        super();

        this.state = {
            titulo: "",
            preco: "",
            autorId: "",
        }
    }

    enviarDadosForm(ev) {
        ev.preventDefault();

        const headers = { 'Content-TYpe': 'application/json' };
        const autor = this.state;

        PubSub.publish('limpar-msg-erros');

        axios.post(URL, autor, headers)
            .then((resp) => {
                const livros = resp.data;
                PubSub.publish('atualizar-lista-livros', livros);
                this.setState({
                    titulo: "",
                    preco: "",
                    autorId: "",
                });
            })
            .catch((error) => { 
                if(error.response.status === 400) {
                   new TratadorErros().publicarErros(error.response.data); 
                }
            });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" method="POST" onSubmit={(event) => this.enviarDadosForm(event)}>
                    <Input 
                        label="Título"
                        id="titulo"
                        type="text"
                        name="titulo"
                        value={this.state.titulo}
                        onChange={(ev) => this.setState({ titulo: ev.target.value } )}
                    />

                    <Input 
                        label="Preço"
                        id="preco"
                        type="text"
                        name="preco"
                        value={this.state.preco}
                        onChange={(ev) => this.setState({ preco: ev.target.value } )}
                    />

                    <Select
                        label="Autor"
                        id="autor"
                        name="autorId"
                        options={this.props.autores}
                        optionParamValue="id"
                        optionParamLabel="nome"
                        onChange={(ev) => this.setState({ autorId: ev.target.value } )}
                    />

                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>
            </div>
        );
    }

}

export default Form;