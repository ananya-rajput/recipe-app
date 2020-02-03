import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Text, 
    TextButton, 
    Select,
    Tunnel,
    TPanel,
    TPanelBody,
    TPanelFooter,
    TPanelHead,
    ComboBox
} from '@dailykit/ui';

import { Processing } from './';
import { saveTabData, updateTitle, tabClose } from '../state/actions';

const initialTempState = {
    allergens : [],
    processing : { name : { id: null, title : '' }, cost : { value : '' }, yield : '', equipments : [], bulkDensity : '', nutritionalValues : [], sachets : [] },
    nutritionalValues : { calories : { value : '', unit : '' }, fat : { value : '', unit : '' }, proteins : { value : '', unit : '' }, carbs : { value : '', unit : '' } }
};

const tempReducer = (state, action) => {
    switch(action.type) {
        case 'allergens': {
            return { ...state, allergens : action.payload }
        }
        case 'processing': {
            return { ...state, processing : { ...state.processing, ...action.payload } };
        }
        case 'nutrition' : {
            return { ...state, nutritionalValues : { ...state.nutritionalValues, ...action.payload } }
        }
        default:
            return state;
    }
}

const Ingredient = ({ data }) => {

    const dispatch = useDispatch();
    const { currentTab } = useSelector(state => state.tabs);

    const [loading, setLoading] = React.useState(false);
    const [ingredient, setIngredient] = React.useState({ 
        name : '', 
        allergens : [], 
        processings : []
    });
    const [temp, dispatchTempAction] = React.useReducer(tempReducer, initialTempState);

    // Allergens
    const [allergensPanels, setAllergensPanels] = React.useState(['hidden']);
    const [allergensOptions] = React.useState([
        { id: 1, title: 'Option1'},
        { id: 2, title: 'Option2'},
        { id: 3, title: 'Option3'},
        { id: 4, title: 'Option4'},
        { id: 5, title: 'Option5'},
        { id: 6, title: 'Option6'}
    ])
    const selectedAllerganHandler = (options) => {
        dispatchTempAction({ type : 'allergens', payload : options });
    }
    const saveAllergens = () => {
        closePanelAllergens(0);
        setIngredient({ ...ingredient, allergens : temp.allergens });
        dispatchTempAction({ type : 'allergens', payload : [] });
    }
    const removeAllergen = (option) => {
        const temp = ingredient.allergens.filter(op => op.id !== option.id);
        setIngredient({ ...ingredient, allergens : temp });
    }
    const togglePanelAllergens = panel => {
        const temp = allergensPanels
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
        setAllergensPanels([...temp])
     }

    const closePanelAllergens = panel => {
        const temp = allergensPanels
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
        setAllergensPanels([...temp])
    }


    // Processing
    const [processingPanels, setProcessingPanel] = React.useState(['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']);
    const [processingOptions] = React.useState([
        { id: 1, title: 'Boiled'},
        { id: 2, title: 'Choped'},
        { id: 3, title: 'Mashed'},
        { id: 4, title: 'Fried'}
    ])
    const [equipmentsOptions] = React.useState([
        { id: 1, title: 'Spoon'},
        { id: 2, title: 'Bottle'},
        { id: 3, title: 'Fork'},
        { id: 4, title: 'Jumpsuit'},
        { id: 5, title: 'Parachute'}
    ])
    const selectedProcessingHandler = (option) => {
        dispatchTempAction({ type : 'processing', payload : { name : option } });
        togglePanelProcessing(1);
    }
    const togglePanelProcessing = panel => {
        const temp = processingPanels
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
        setProcessingPanel([...temp])
     }
    const closePanelProcessing = panel => {
        const temp = processingPanels
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
        setProcessingPanel([...temp])
    }
    const saveProcessing = () => {
        setIngredient({ ...ingredient, processings : [...ingredient.processings, temp.processing] });
        dispatchTempAction({ type : 'processing', payload : {  name : { id: null, title : '' }, cost : { value : '' }, yield : '', equipments : [], bulkDensity : '', nutritionalValues : [], sachets : []  }});
        closePanelProcessing(1);
        closePanelProcessing(0);
    }
    const saveNutritionalValue = () => {
        dispatchTempAction({ type : 'processing', payload : { nutritionalValues : temp.nutritionalValues }});
        closePanelProcessing(2);
        dispatchTempAction({ type : 'nutrition', payload : { nutritionalValues : { calories : { value : '', unit : '' }, fat : { value : '', unit : '' }, proteins : { value : '', unit : '' }, carbs : { value : '', unit : '' } } }});
    }
    const removeNutritionalValue = (option) => {
        console.log(option);
    }


    const addSachet = (id, sachet) => {
        const index = ingredient.processings.findIndex(processing => processing.name.id === id);
        const removedProcessing = ingredient.processings[index];
        const copyProcessings = ingredient.processings;
        copyProcessings.splice(index, 1);
        removedProcessing.sachets.push(sachet);
        copyProcessings.push(removedProcessing);
        setIngredient({ ...ingredient, processings : copyProcessings });
    }

    React.useEffect(() => {
        console.log(data);
        if (data) {
            setIngredient(data.ingredient);
        }
        if (!data && currentTab.path) {
            (async() => {
                try {
                    setLoading(true);
                    const response = await fetch('/api/ingredients/file', {
                        method : 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body : JSON.stringify({ path : currentTab.path })
                    });
                    const res = await response.json();
                    console.log(res.data.ingredient);
                    setIngredient(res.data.ingredient);
                    setLoading(false);
                } catch(e) {
                    setLoading(false);
                    console.error(e);
                }
            })();
        }
    }, [data])

    React.useEffect(() => {
        dispatch(saveTabData({ currentTab, ingredient }));
    }, [ingredient])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngredient({ ...ingredient, [name] : value });
    }

    const changeTitle = async (e) => {
        try {
            const { value } = e.target;
            if (value) {
                const response = await fetch(`/api/ingredients/file-rename`, {
                                    method : 'POST',
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    },
                                    body : JSON.stringify({ oldName : currentTab.title, newName : value })
                                });
                const res = await response.json();
                if (res.success) {
                    dispatch(updateTitle({ title : value, currentTab }));
                } else {
                    throw Error(res.message);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const saveAndExit = async () => {
        if (ingredient.name.length) {
            try {
                const response = await fetch('/api/ingredients/file', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ingredient})
                })
                const res = await response.json();
                if (res.success) {
                    dispatch(tabClose());
                }
            } catch(e) {
                console.error(e);
            }
        }
    }

    return (
        <Style>
            <div className="top-bar">
                <div className="left">
                    <Text placeholder='Untitled Ingredient' name='name' value={ ingredient.name } onChange={e => handleChange(e)} onBlur={ e => changeTitle(e) }/>
                </div>
                <div className="right">
                    <span>
                        Open in editor
                    </span>
                    <span onClick={ saveAndExit }>
                        <TextButton type='ghost'>Save and Exit</TextButton>
                    </span>
                    <span>
                        <TextButton type='solid'>Publish</TextButton>
                    </span>
                </div>
            </div>
            <div className="content">
                <div className="row">
                    <div className="allergens">
                        <div className="label"> Allergans </div>
                        <div className="list-allergens">
                            <Select placeholder='Add Allergens' options={ ingredient.allergens } addOption={ () => togglePanelAllergens(0) } removeOption={ removeAllergen }/>
                            <Tunnel>
                                <TPanel layer={1} visibility={allergensPanels[0]}>
                                <TPanelHead>
                                    <TextButton type='outline' onClick={() => closePanelAllergens(0)}>
                                        Close
                                    </TextButton>
                                    <h3>Select Allergens</h3>
                                    <TextButton type='solid' onClick={ saveAllergens }>
                                        Save
                                    </TextButton>
                                </TPanelHead>
                                <TPanelBody>
                                    <ComboBox
                                        type='multi'
                                        options={ allergensOptions }
                                        selectedOption={ selectedAllerganHandler }
                                        placeholder="type what you're looking for..."
                                    />
                                </TPanelBody>
                                </TPanel>
                            </Tunnel>
                        </div>
                    </div>
                    {/* Upload component will come here */}
                </div>
                <div className="row">
                    <div className="processings">
                        {
                            ingredient.processings?.length > 0 && 
                            <div className="list-processings">
                                {
                                    ingredient.processings.map(processing => <Processing key={ processing.name.id } data={ processing } addSachetToProcessing={ (sachet) => addSachet(processing.name.id, sachet) }/>)
                                }
                            </div>
                        }
                        <div className="add-processing" onClick={ () => togglePanelProcessing(0) }>
                            <i className="fas fa-plus" />
                            Add Processing
                        </div>
                        <Tunnel>
                            <TPanel layer={1} visibility={processingPanels[0]}>
                                <TPanelHead>
                                    <TextButton type='outline' onClick={() => closePanelProcessing(0)}>
                                        Close
                                    </TextButton>
                                    <h3>Select Processing</h3>
                                </TPanelHead>
                                <TPanelBody>
                                    <ComboBox
                                        type='single'
                                        options={ processingOptions }
                                        selectedOption={ selectedProcessingHandler }
                                        searchedOption={ (text) => console.log(text) }
                                        placeholder="type what you're looking for..."
                                    />
                                </TPanelBody>
                            </TPanel>
                            <TPanel layer={2} visibility={processingPanels[1]}>
                                <TPanelHead>
                                    <TextButton type='outline' onClick={() => closePanelProcessing(0)}>
                                        Close
                                    </TextButton>
                                    <h3>Configure Processing: { temp.processing.name.title }</h3>
                                    <TextButton type='outline' onClick={ saveProcessing }>
                                        Save
                                    </TextButton>
                                </TPanelHead>
                                <TPanelBody>
                                    <div className="row">
                                        <div className="container">
                                            <Text
                                                placeholder='Processing cost'
                                                name='processing_cost'
                                                value={ temp.processing.cost.value }
                                                onChange={e => dispatchTempAction({ type : 'processing', payload : { cost : { value : e.target.value } } })}
                                            />
                                        </div>
                                        <div className="container">
                                            <Text
                                                placeholder='Percentage of yield'
                                                name='percentage_of_yield'
                                                value={ temp.processing.yield }
                                                onChange={e => dispatchTempAction({ type : 'processing', payload : { yield : e.target.value } })}
                                            /> %
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="container">
                                        <ComboBox
                                            type='multi'
                                            options={ equipmentsOptions }
                                            selectedOption={ (options) => dispatchTempAction({ type : 'processing', payload : { equipments : options } }) }
                                            searchedOption={ (text) => console.log(text) }
                                            placeholder="search equipments..."
                                        />
                                        </div>
                                        <div className="container">
                                            <Text
                                                placeholder='Bulk Density'
                                                name='bulk_density'
                                                value={ temp.processing.bulkDensity }
                                                onChange={e => dispatchTempAction({ type : 'processing', payload : { bulkDensity : e.target.value } })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <Select
                                            options={ Object.keys(temp.processing.nutritionalValues) }
                                            addOption={ () => togglePanelProcessing(2) }
                                            placeholder='Add nutritional values'
                                            removeOption={ removeNutritionalValue }
                                        />
                                    </div>
                                </TPanelBody>
                            </TPanel>
                            <TPanel layer={3} visibility={processingPanels[2]}>
                                <TPanelHead>
                                    <TextButton type='outline' onClick={() => closePanelProcessing(2)}>
                                        Close
                                    </TextButton>
                                    <h3>Add nutritional values</h3>
                                    <TextButton type="solid" onClick={ saveNutritionalValue }>
                                        Save
                                    </TextButton>
                                </TPanelHead>
                                <TPanelBody>
                                    <Text
                                        placeholder='Calories'
                                        name='calories'
                                        value={ temp.nutritionalValues.calories.value }
                                        onChange={e => dispatchTempAction({ type : 'nutrition', payload : { calories : { value : e.target.value } } })}
                                    />
                                    <Text
                                        placeholder='Fats'
                                        name='fats'
                                        value={ temp.nutritionalValues.fat.value }
                                        onChange={e =>  dispatchTempAction({ type : 'nutrition', payload : { fat : { value : e.target.value } } })}
                                    />
                                    <Text
                                        placeholder='Proteins'
                                        name='proteins'
                                        value={ temp.nutritionalValues.proteins.value }
                                        onChange={e =>  dispatchTempAction({ type : 'nutrition', payload : { proteins : { value : e.target.value } } })}
                                    />
                                    <Text
                                        placeholder='Carbs'
                                        name='carbs'
                                        value={ temp.nutritionalValues.carbs.value }
                                        onChange={e =>  dispatchTempAction({ type : 'nutrition', payload : { carbs : { value : e.target.value } } })}
                                    />
                                </TPanelBody>
                            </TPanel>
                        </Tunnel>
                    </div>
                </div>
            </div>
        </Style>
    );
}

export default Ingredient;

const Style = styled.div`
    .top-bar {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #D8D8D8;
        padding: 15px 0;

        .right {
            span:not(:last-child) {
                margin-right: 20px;
            }
        }
    }

    .content {
        padding: 50px 20px;

        .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;

            .container {
                flex: 1;
                display: flex;
                align-items: baseline;
            }

            > div:not(:last-child) {
                margin-right: 20px;
            }
        }

        .allergens {
            flex: 1;

            .label {
                color: #888D9D;
                margin-bottom: 20px;
            }
        }

        .processings {
            flex: 1;

            .add-processing {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 128px;
                background: #FFFFFF;
                border: 1px dashed #F3F3F3;
                box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.13);
                color: #555B6E;

                i {
                    font-size: 2rem;
                }

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
`