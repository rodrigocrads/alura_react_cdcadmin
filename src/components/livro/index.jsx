import React, {Component} from 'react';

import Table from './table';
import Form from './form';

import axios from 'axios';
import PubSub from 'pubsub-js';

const URL_LIVROS = "http://localhost:8080/api/livros";
const URL_AUTORES = "http://localhost:8080/api/autores";

export default class Livro extends Component {
    constructor() {
        super();

        this.state = {
            livros: [],
            autores:[],
        };
    }

    componentWillMount() {
        PubSub.subscribe('atualizar-lista-livros', (topico, livros) => {
            this.setState({ livros });
        });

        axios.get(URL_LIVROS)
            .then((resp) => {
                const livros = resp.data;
                this.setState({ livros });
            });
        axios.get(URL_AUTORES)
            .then((resp) => {
                const autores = resp.data;
                this.setState({ autores });
            });
    }

    render() {
        return (
            <div id="main">
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>

                <div className="content" id="content">
                    <Form autores={this.state.autores} />
                    <Table livros={this.state.livros} />
                </div>
            </div>
        );
    };
}