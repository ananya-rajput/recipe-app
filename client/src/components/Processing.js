import React from 'react';
import styled from 'styled-components';
import { 
    Text, 
    TextButton, 
    Select,
    Tunnel,
    TPanel,
    TPanelBody,
    TPanelFooter,
    TPanelHead,
    ComboBox,
    RadioGroup,
    Toggle,
    TextAndSelect
} from '@dailykit/ui';

import { Sachet } from './';

const initialTempState = {
    sachet : {
        quantity : {
            value : '',
            unit : ''
        },
        tracking : true,
        modes : [
            {
                active : false,
                type : 'Real Time',
                priority : 1,
                station : {
                    id : undefined,
                    title : ''
                },
                supplierItems : [],
                accuracy : {
                    id : undefined,
                    title : ''
                },
                packaging : {
        
                },
                label : {
                    active : true,
                    slip : '',
                    template : undefined
                }
            },
            {
                active : false,
                type : 'Copacker',
                priority : 2,
                station : {
                    id : undefined,
                    title : ''
                },
                supplierItems : [],
                accuracy : {
                    id : undefined,
                    title : ''
                },
                packaging : {
        
                },
                label : {
                    active : true,
                    slip : '',
                    template : undefined
                }
            },
            {
                active : false,
                type : 'Planned Lot',
                priority : 3,
                station : {
                    id : undefined,
                    title : ''
                },
                supplierItems : [],
                accuracy : {
                    id : undefined,
                    title : ''
                },
                packaging : {
        
                },
                label : {
                    active : true,
                    slip : '',
                    template : undefined
                }
            }
        ]
    },
    mode : {
        type : '',
        station : {
            id : undefined,
            title : ''
        },
        supplierItems : [],
        accuracy : {
            id : undefined,
            title : ''
        },
        packaging : {

        },
        label : {
            active : true,
            slip : '',
            template : undefined
        }
    },
    supplierItems : []
};

const tempReducer = (state, action) => {
    switch(action.type) {
        case 'SACHET': {
            return { ...state, sachet : { ...state.sachet, ...action.payload } };
        }
        case 'MODE': {
            return { ...state, mode : { ...state.mode, ...action.payload } }
        }
        case 'SUPPLIER': {
            return { ...state, supplierItems : action.payload }
        }
        default:
            return state;
    }
}


const Processing = ({ data, addSachetToProcessing }) => {

    const [temp, dispatchTempAction] = React.useReducer(tempReducer, initialTempState);
    const [isAdding, setIsAdding] = React.useState(false);

    React.useEffect(() => {
        console.log(data);
    }, [])

    const saveSachet = () => {
        addSachetToProcessing(temp.sachet);
        dispatchTempAction({ type : 'SACHET', payload : {
                quantity : {
                    value : '',
                    unit : ''
                },
                tracking : true,
                modes : [
                    {
                        active : false,
                        type : 'Real Time',
                        priority : 1,
                        station : {
                            id : undefined,
                            title : ''
                        },
                        supplierItems : [],
                        accuracy : {
                            id : undefined,
                            title : ''
                        },
                        packaging : {
                
                        },
                        label : {
                            active : true,
                            slip : '',
                            template : undefined
                        }
                    },
                    {
                        active : false,
                        type : 'Copacker',
                        priority : 2,
                        station : {
                            id : undefined,
                            title : ''
                        },
                        supplierItems : [],
                        accuracy : {
                            id : undefined,
                            title : ''
                        },
                        packaging : {
                
                        },
                        label : {
                            active : true,
                            slip : '',
                            template : undefined
                        }
                    },
                    {
                        active : false,
                        type : 'Planned Lot',
                        priority : 3,
                        station : {
                            id : undefined,
                            title : ''
                        },
                        supplierItems : [],
                        accuracy : {
                            id : undefined,
                            title : ''
                        },
                        packaging : {
                
                        },
                        label : {
                            active : true,
                            slip : '',
                            template : undefined
                        }
                    }
                ]
        } })
        setIsAdding(false);
    }

    const toggleMode = (e) => {
        const { checked, name } = e;
        if (checked) {
            dispatchTempAction({ type : 'MODE', payload : { type : name }});
            togglePanelStations(0);
        }
        const copyModes = temp.sachet.modes;
        const index = copyModes.findIndex(mode => mode.type === name);
        console.log(index);
        if (index != -1) {
            copyModes[index].active = checked;
            dispatchTempAction({ type : 'SACHET', payload : { modes : copyModes }})
        }
    }

    // Stations
    const [panelsStations, setPanelsStations] = React.useState([
        'hidden',
        'hidden'
    ])
    const [stationOptions] = React.useState([
        { id: 1, title: 'Station 1'},
        { id: 2, title: 'Station 2'},
        { id: 3, title: 'Station 3'}
    ])
    const selectedStationHandler = (option) => {
        dispatchTempAction({ type : 'MODE',  payload : { station : option }});
        togglePanelStations(1);
    }

    const togglePanelStations = panel => {
        const temp = panelsStations
        if (panel || panel === 0) {
           temp[panel] = 'full'
        }
        if (panel - 1 || panel - 1 === 0) {
           temp[panel - 1] = 'partial'
        }
        let len = panel - 1
        if (len > 0) {
           while (len--) {
              temp[len] = 'hidden'
           }
        }
        setPanelsStations([...temp])
    }
  
     const closePanelStations = panel => {
        const temp = panelsStations
        temp[panel] = 'hidden'
        if (panel < temp.length - 1 && panel + 1) {
           temp[panel + 1] = 'hidden'
        }
        if (panel - 1 || panel - 1 === 0) {
           temp[panel - 1] = 'full'
        }
        if (panel - 2 || panel - 2 === 0) {
           temp[panel - 2] = 'partial'
        }
        setPanelsStations([...temp])
    }

    // Supplier Items
    const supplierItemsOptions = [
        {id: 1, title: 'Item 1'},
        {id: 2, title: 'Item 2'},
        {id: 3, title: 'Item 3'},
    ]
    const selectedSupplierItemsHandler = (options) => {
        dispatchTempAction({ type : 'SUPPLIER', payload : options });
    }
    const removeSupplierItem = (option) => {
        console.log(option);
    }
    const saveSupplierItems = () => {
        dispatchTempAction({ type : 'MODE', payload : { supplierItems : temp.supplierItems } });
        dispatchTempAction({ type : 'SUPPLIER', payload : [] });
        closePanelSupplierItems(0);
    }
    const [panelsSupplierItems, setPanelsSupplierItems] = React.useState([
        'hidden'
    ])
    const togglePanelSupplierItems = panel => {
        const temp = panelsSupplierItems
        if (panel || panel === 0) {
           temp[panel] = 'full'
        }
        if (panel - 1 || panel - 1 === 0) {
           temp[panel - 1] = 'partial'
        }
        let len = panel - 1
        if (len > 0) {
           while (len--) {
              temp[len] = 'hidden'
           }
        }
        setPanelsSupplierItems([...temp])
    }
  
     const closePanelSupplierItems = panel => {
        const temp = panelsSupplierItems
        temp[panel] = 'hidden'
        if (panel < temp.length - 1 && panel + 1) {
           temp[panel + 1] = 'hidden'
        }
        if (panel - 1 || panel - 1 === 0) {
           temp[panel - 1] = 'full'
        }
        if (panel - 2 || panel - 2 === 0) {
           temp[panel - 2] = 'partial'
        }
        setPanelsSupplierItems([...temp])
    }

    // Accuracy
    const accuracyOptions = [
        { id : 1, title : '85-100%'},
        {id : 2, title : 'Below 85%'},
        {id : 3, title : 'don\'t weigh'}
    ]
    const quantityOptions = [
        { id : 1, title : 'gms' },
        { id : 2, title : 'lbs' },
        { id : 3, title : 'kgs' }
    ]

    const saveMode = () => {
        const index = temp.sachet.modes.findIndex(mode => mode.type === temp.mode.type);
        let newModes = temp.sachet.modes;
        let removedMode = temp.sachet.modes[index];
        newModes[index] = { ...temp.mode, priority : removedMode.priority };  
        dispatchTempAction({ type : 'SACHET', payload : { ...temp.sachet, modes : newModes } })
        dispatchTempAction({ type : 'MODE', payload : {
            type : '',
            station : {
                id : undefined,
                title : ''
            },
            supplierItems : [],
            accuracy : {
                id : undefined,
                title : ''
            },
            packaging : {
    
            },
            label : {
                active : true,
                slip : '',
                template : undefined
            }
        } })
        
        closePanelStations(1);
        closePanelStations(0);
    }

    return(
        <Style>
            <div className="info">
                <div className="content">
                    <div className="row">
                        <h3>{ data.name.title }</h3>
                    </div>
                    <div className="row">
                        <div className="stat">
                            <span className="label"> Processing cost: </span>
                            <span className="value"> { data.cost.value } { data.cost.unit } </span>
                        </div>
                        <div className="stat">
                            <span className="label"> Percentage of yield: </span>
                            <span className="value"> { data.yield }% </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="stat">
                            <span className="label"> Equipments needed: </span>
                            <span className="value"> { Object.keys(data.equipments).join() } </span>
                        </div>
                        <div className="stat">
                            <span className="label"> Bulk Density: </span>
                            <span className="value"> { data.bulkDensity } </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="stat">
                            <div className="label">
                                Standard operating procedure
                            </div>
                        </div>
                    </div>
                </div>
                <div className="img-container">
                    <img src="https://source.unsplash.com/400x400/?food"/>
                </div>
            </div>
            <div className="sachets">
                <div className="row">
                    <div className="heading">
                        Sachets({ data.sachets.length }):
                    </div>
                </div>
                {
                    data.sachets.length > 0 &&
                    <div className="list-sachets">
                        {
                            data.sachets.map(sachet => <Sachet key={ 1 } data={ sachet }/>)
                        }
                    </div>    
                }
                <div className="row">
                    <div className="new-sachet" hidden={ !isAdding }>
                        <div className="row quantity">
                            <TextAndSelect
                                label='Enter Quantity'
                                name='quantity'
                                value={ temp.sachet.quantity.value }
                                onChange={changed => dispatchTempAction({ type : 'SACHET', payload : { quantity : { value : changed.field.value, unit : changed.unit.title} } })}
                                options={ quantityOptions }
                            />
                        </div>
                        <div className="row tracking">
                            <Toggle
                                checked={ temp.sachet.tracking }
                                label='Track Inventory'
                                setChecked={ (val) => dispatchTempAction({ type : 'SACHET', payload : { tracking : val } }) }
                            />
                        </div>
                        <div className="row">
                            <table cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th> Mode of fulfillment </th>
                                        <th> Stations </th>
                                        <th> Supplier Items </th>
                                        <th> Accuracy Range </th>
                                        <th> Packaging </th>
                                        <th> Label template </th>
                                        <th> Slip name </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        temp.sachet.modes.map(mode => (
                                            <tr key={ mode.priority }>
                                                <td> <input type="checkbox" name={ mode.type } onChange={ (e) => toggleMode(e.target) } checked={ mode.active }/> { mode.type } </td>
                                                <td> { mode.station.id ?  mode.station.title : '...' } </td>
                                                <td> { mode.supplierItems.length ? mode.supplierItems.join() : '...' } </td>
                                                <td> { mode.accuracy.id ? mode.accuracy.title : '...' } </td>
                                                <td>  </td>
                                                <td>  </td>
                                                <td> { mode.label.slip.length ? mode.label.slip : '...' } </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <Tunnel>
                                <TPanel layer={1} visibility={panelsStations[0]}>
                                <TPanelHead>
                                    <TextButton type='outline' onClick={() => closePanelStations(0)}>
                                        Close
                                    </TextButton>
                                    <h3>Select station for { temp.mode.type }</h3>
                                </TPanelHead>
                                <TPanelBody>
                                    <ComboBox
                                        type='single'
                                        options={ stationOptions }
                                        selectedOption={ selectedStationHandler }
                                        placeholder="type what you're looking for..."
                                    />
                                </TPanelBody>
                                </TPanel>
                                <TPanel layer={2} visibility={panelsStations[1]} type='wide'>
                                <TPanelHead>
                                    <TextButton type='outline' onClick={() => closePanelStations(1)}>
                                        Close
                                    </TextButton>
                                    <h3>Configure station for { temp.mode.type }</h3>
                                    <TextButton type='solid' onClick={ saveMode }>
                                        Save
                                    </TextButton>
                                </TPanelHead>
                                <TPanelBody>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th> Stations </th>
                                                <th> Supplier items </th>
                                                <th> Accuracy range </th>
                                                <th> Packaging </th>
                                                <th> Add Label </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td> { temp.mode.type } </td>
                                                <td>
                                                <Select
                                                    options={ temp.mode.supplierItems }
                                                    addOption={ () => togglePanelSupplierItems(0) }
                                                    placeholder='Add Supplier items'
                                                    removeOption={ removeSupplierItem }
                                                />
                                                <Tunnel>
                                                    <TPanel layer={1} visibility={panelsSupplierItems[0]}>
                                                    <TPanelHead>
                                                        <TextButton type='outline' onClick={() => closePanelSupplierItems(0)}>
                                                            Close
                                                        </TextButton>
                                                        <h3>Select Supplier items for { temp.mode.type }</h3>
                                                        <TextButton type='solid' onClick={ saveSupplierItems }>
                                                            Save
                                                        </TextButton>
                                                    </TPanelHead>
                                                    <TPanelBody>
                                                        <ComboBox
                                                            type='multi'
                                                            options={ supplierItemsOptions }
                                                            selectedOption={ selectedSupplierItemsHandler }
                                                            placeholder="type what you're looking for..."
                                                        />
                                                    </TPanelBody>
                                                    </TPanel>
                                                </Tunnel>
                                                </td>
                                                <td>
                                                    <RadioGroup options={ accuracyOptions } onChange={ (option) => dispatchTempAction({ type : 'MODE', payload : { accuracy : option } }) }/>
                                                </td>
                                                <td>
                                                    TBD with Ananya
                                                </td>
                                                <td>
                                                    <Toggle checked={ temp.mode.label.active } setChecked={ (value) => dispatchTempAction({ type : 'MODE', payload : { label : { ...temp.mode.label, active : value } } }) }/>
                                                    <br />
                                                    <Text
                                                        label='Name the slip'
                                                        name='slip'
                                                        value={ temp.mode.label.slip }
                                                        onChange={ (e) => dispatchTempAction({ type : 'MODE', payload : { label : { ...temp.mode.label, slip : e.target.value } } }) }
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </TPanelBody>
                                </TPanel>
                            </Tunnel>
                        </div>
                        <div className="row save-sachet">
                            <TextButton type='ghost' onClick={ saveSachet }>Save Sachet</TextButton>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="add-sachet" onClick={ () => setIsAdding(true) }>
                        <i className="fas fa-plus" />
                        Add Sachet
                    </div>
                </div>
            </div>
        </Style>
    );
}

export default Processing;

const Style = styled.div`
    background: #FFFFFF;
    border: 1px dashed #F3F3F3;
    padding: 20px;
    margin-bottom: 50px;

    .info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .content {
            padding 0;

            .row {
                margin-bottom: 20px;
            }

            h3 {
                font-size: 20px;
                font-weight: 500;
                color: #555B6E;
            }

            .stat {
                font-weight: 500;
                font-size: 14px;
                color: #888D9D;
                min-width: 250px;

                .label {
                    margin-right: 10px;
                }
            }
        }

        .img-container {
            max-width: 200px;
            max-height: 200px;
            
            img {
                width: 100%;
                height: auto;
            }
        }
    }

    .sachets {

        .row {
            margin-bottom: 20px;
            width: 100%;
        }

        .heading {
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            color: #888D9D;
        }

        .add-sachet {
            text-align: center;
            padding: 20px;
            background: #FFFFFF;
            width: 100%;
            border: 1px dashed #F3F3F3;
            box-sizing: border-box;
            box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.13);
            font-size: 16px;
            line-height: 14px;
            
            color: #555B6E;
            &:hover {
                cursor: pointer;
            }
        }

        .new-sachet {
            padding: 20px;
            background: #FFFFFF;
            border: 1px dashed #F3F3F3;
            width: 100%;

            .quantity {
                max-width: 300px;
            }

            .tracking {
                font-weight: 500;
                font-size: 16px;
                line-height: 14px;
                color: #555B6E;
            }

            table {
                width: 100%;

                thead{

                    tr {
                        background: #F3F3F3;
                        
                        th {
                            text-align: left;
                            padding: 7px 5px;
                            font-weight: normal;
                            font-size: 12px;
                            line-height: 14px;
                            color: #888D9D;
                        }
                    }
                }

                tbody {

                    tr {

                        td {
                            font-weight: normal;
                            font-size: 14px;
                            line-height: 14px;
                            color: #555B6E;
                            padding: 20px 5px;
                        }
                    }
                }
            }

            .save-sachet {
                display: flex;
                justify-content: flex-end;
            }
        }
    }
`