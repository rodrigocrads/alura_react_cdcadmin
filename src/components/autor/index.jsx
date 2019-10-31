import React, { Component } from 'react';

import AutorForm from './form';
import AutorTable from './table';

import axios from 'axios';
import PubSub from 'pubsub-js';

const URL = "http://localhost:8080/api/autores";

class Index extends Component {

    constructor() {
        super();

        this.state = {
            autores: [],
        }
    }

    componentWillMount() {
        axios.get(URL)
            .then(resp => {
                const autores = resp.data;
                this.setState({ autores });
            })
            .catch(() => alert('Erro ao tentar carregar a lista dos autores da API!!!!'));
        
        PubSub.subscribe('atualizar-lista-autores', (topico, novosAutores) => {
            console.log(`Foi chamado o tópico ${topico}!`);
            this.setState({autores: novosAutores});
        });
    }

    render() {
        return (
            <div id="main">
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>

                <div className="content" id="content">
                    <AutorForm />
                    <AutorTable autores={this.state.autores} />
                </div>
            </div>
        );
    }
}

export default Index;