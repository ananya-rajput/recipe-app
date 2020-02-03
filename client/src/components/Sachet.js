import React from 'react';
import styled from 'styled-components';
import { Toggle, TextButton } from '@dailykit/ui';

const Sachet = ({ data }) => {
    
    const [isOpen, setIsOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);

    const updateSachet = () => {
        console.log('UPDATE')
    }

    return (
        <Style isOpen={ isOpen }>
            <div className="row">
                <div className="quantity">
                    { data.quantity.value } { data.quantity.unit }
                </div>
                <div className="actions">
                    <i className="fas fa-edit" hidden={ !isOpen } onClick={ () => setIsEditing(true) }/>
                    {
                        isOpen ?
                        <i className="fas fa-chevron-up" onClick={ () => setIsOpen(false) }/>
                        :
                        <i className="fas fa-chevron-down" onClick={ () => setIsOpen(true) }/>
                    }
                </div>
            </div>
            <div hidden={ !isOpen }>
                <div className="row tracking">
                    <Toggle
                        checked={ data.tracking }
                        label='Track Inventory'
                        setChecked={ (val) => console.log(val) }
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
                                data.modes.map(mode => (
                                    <tr key={ mode.priority } hidden={ !isEditing && !mode.station.id }>
                                        <td> <input type="checkbox" name={ mode.type } onChange={ (e) => console.log(e.target) } checked={ mode.active } hidden={ !isEditing }/> { mode.type } </td>
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
                </div>
                <div className="row update-sachet">
                    <TextButton type='ghost' onClick={ updateSachet } hidden={ !isEditing }>Update Sachet</TextButton>
                </div>
            </div>
        </Style>
    );
}

export default Sachet;

const Style = styled.div`
    background: #FFFFFF;
    border: 1px dashed #F3F3F3;
    padding: 20px;
    margin-bottom: 20px;
    
        .row {
            margin-bottom: ${ props => props.isOpen ? '20px' : '0px' };
        }

        .quantity {
            font-weight: 500;
            font-size: 20px;
            line-height: 23px;
            color: #555B6E;
        }

        .actions {

            i {
                cursor: pointer;

                &[hidden] {
                    display: none;
                }

                &:not(:last-child) {
                    margin-right: 20px;
                }
            }
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

        .update-sachet {
            display: flex;
            justify-content: flex-end!important;
        }
`