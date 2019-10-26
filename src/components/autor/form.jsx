import React, { Component } from 'react';

import Input from '../input';

import axios from 'axios';

const URL = "http://localhost:8080/api/autores";

class Form extends Component {
    constructor() {
        super();

        this.state = {
            nome: "",
            email: "",
            senha: "",
        }
    }

    enviarDadosForm(ev) {
        ev.preventDefault();

        const headers = { 'Content-TYpe': 'application/json' };

        const autor = this.state;

        axios.post(URL, autor, headers)
            .then((resp) => {
                const autores = resp.data;
                this.props.atualizarAutores(autores);
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" method="POST" onSubmit={(event) => this.enviarDadosForm(event)}>
                    <Input label="Nome"
                        id="nome"
                        type="text"
                        name="nome"
                        value={this.state.nome}
                        onChange={(ev) => this.setState({ nome: ev.target.value } )}
                    />

                    <Input label="Email"
                        id="email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={(ev) => this.setState({ email: ev.target.value } )}
                    />

                    <Input label="Senha"
                        id="senha"
                        type="password"
                        name="senha"
                        value={this.state.senha}
                        onChange={(ev) => this.setState({ senha: ev.target.value } )}
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