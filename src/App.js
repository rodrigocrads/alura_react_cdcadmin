import React, { Component } from 'react';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';

import Input from '../src/components/input';

import axios from 'axios';

const URL = "http://localhost:8080/api/autores";

class App extends Component {

    constructor() {
        super();

        this.state = {
            autores: [],
            form: {
                nome: "",
                email: "",
                senha: "",
            }
        }
    }

    componentWillMount() {
        axios.get(URL)
            .then(resp => {
                const autores = resp.data;
                this.setState({ autores });
            })
            .catch(() => alert('Erro ao tentar carregar as informações dos autores!!!!'))
    }

    enviarDadosForm(ev) {
        ev.preventDefault();

        const headers = { 'Content-TYpe': 'application/json' };

        axios.post(URL, this.state.form, headers)
            .then((resp) => {
                const autores = resp.data;
                this.setState({ autores })
            })
            .catch((err) => console.log(err));
    }


    render() {
        const form = this.state.form;

        return (
            <div id="layout">

                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="#">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                        </ul>
                    </div>
                </div>

                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>

                    <div className="content" id="content">
                        <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" method="POST" onSubmit={(event) => this.enviarDadosForm(event)}>
                                <Input label="Nome"
                                    id="nome"
                                    type="text"
                                    name="nome"
                                    value={form.nome}
                                    onChange={(ev) => this.setState({ form: { ...form, nome: ev.target.value } })}
                                />

                                <Input label="Email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={(ev) => this.setState({ form: { ...form, email: ev.target.value } })}
                                />

                                <Input label="Senha"
                                    id="senha"
                                    type="password"
                                    name="senha"
                                    value={form.senha}
                                    onChange={(ev) => this.setState({ form: { ...form, senha: ev.target.value } })}
                                />

                                <div className="pure-control-group">
                                    <label></label>
                                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                                </div>
                            </form>
                        </div>a

                        <div>
                            <table className="pure-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.autores.map((autor) => {
                                            return (
                                                <tr key={autor.id}>
                                                    <td>{autor.nome}</td>
                                                    <td>{autor.email}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default App;
