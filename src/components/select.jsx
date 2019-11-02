import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Select extends Component {
    constructor() {
        super();
        this.state = {msgErro:''};
    }

    componentDidMount() {
        PubSub.subscribe('erro-validacao', (top, erro) => {
            if (erro.field === this.props.name) {
                this.setState({ msgErro: erro.defaultMessage });
            }
        });

        PubSub.subscribe('limpar-msg-erros', (top) => {
            this.setState({ msgErro: '' });
        });
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select id={this.props.id} 
                    name={this.props.name}
                    onChange={this.props.onChange}
                >
                    <option value=''>Selecione uma opção</option>
                    {
                        this.props.options.map((option) => {
                            return <option key={option.id} value={option[this.props.optionParamValue]}>{option[this.props.optionParamLabel]}</option>
                        })
                    }
                </select>
                <span className="error">{this.state.msgErro}</span>
            </div>
        );
    }
}