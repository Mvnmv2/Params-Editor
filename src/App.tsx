import * as React from 'react';
import './App.css'

interface Param {
    id: number;
    name: string;
    type: string;
}

interface ParamValue {
    paramId: number;
    value: string | number;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    model: Model;
    showModel: boolean;
}

function App() {

    const params: Param[] =
        [
            {
                "id": 1,
                "name": "Цвет",
                "type": "type1"
            },
            {
                "id": 2,
                "name": "Длина",
                "type": "type2"
            },
            {
                "id": 3,
                "name": "Цена",
                "type": "type3"
            }

        ]

    const model: Model = {
        paramValues: [
            {
                paramId: 1,
                value: 'Красный'
            },
            {
                paramId: 2,
                value: '150 см'
            },

            {
                paramId: 3,
                value: '1000 руб'
            },

        ]
    }

    return (
        <>
            <ParamEditor params={params} model={model}/>
        </>
    )
}


class ParamEditor extends React.Component<Props, State> {

    private Model: { paramValues: { paramId: number; value: string | number }[] };

    constructor(props: Props) {
        super(props);

        this.state = {
            model: this.props.model,
            showModel: false,
        }
    }

    onChangeInput(e, i) {

        this.setState({

            ...this.state,
            model: this.Model = {
                ...this.state.model,
                paramValues:
                    [...this.state.model.paramValues,

                        ...this.state.model.paramValues
                            .filter(item => item.paramId === i + 1)
                            .map(obj => obj.value = e.target.value)
                            .filter(obj => typeof obj !== 'string')
                    ]
            }
        })
    }

    public getModel(m): Model {
        this.setState({...this.state, showModel: !this.state.showModel})
        return m
    }


    render() {
        console.log(this.state)

        return (
            <>
                <div className="editor">

                    <ParamsBlock model={this.state.model} params={this.props.params}/>

                    <InputBlock model={this.state.model} params={this.props.params} onChangeInput={this.onChangeInput.bind(this)}/>

                </div>
                <div style={{marginTop: '20px'}}>
                    <button onClick={() => this.getModel(this.state.model)}>Get Model</button>
                </div>

                {this.state.showModel && <ModelTable params={this.props.params} model={this.state.model}/>}

            </>
        );
    }
}

class ParamsBlock extends React.Component<Props, State> {

    render() {

        const {params} = {...this.props}

        return <div>
            {
                params.map(obj => <div key={obj.id}>{obj.name}</div>)
            }
        </div>;
    }

}

class InputBlock extends React.Component<Props, State> {

    render() {

        const {model, onChangeInput} = {...this.props}

        return <div>
            {
                model.paramValues.map((item, i) =>
                    <div key={model.paramValues[i].paramId}>
                        <input
                            type="text"
                            value={model.paramValues[i].value}
                            onChange={(event) => onChangeInput(event, i)}
                        />
                    </div>
                )
            }
        </div>;
    }
}

class ModelTable extends React.Component<Props, State> {

    render() {

        const {params, model} = {...this.props}

        return (
            <div>
                <table className="table">
                    <caption>Model:</caption>
                    <thead>
                    <tr>
                        {
                            params.map(obj => <th key={obj.id}> {obj.name}</th>)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {model.paramValues.map(obj => <td key={obj.paramId}> {obj.value} </td>)}
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App
