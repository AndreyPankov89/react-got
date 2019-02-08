import React from 'react';
import ItemList from './itemList';
import {mount} from 'enzyme';
import gotService from '../../services/gotService'

describe('Testing <ItemList/>', ()=>{
    const service = new gotService();
    const list = mount(<ItemList
                            getData={service.getAllHouses}
                            onItemSelected={({name})=> name} 
                            renderItem={({name}) => name}/>);

    it('click on item mudt render one instance', () => {
        list.setState({itemList: [{name:'ret', id: 1}, {name:'ret', id: 2}]});
        list.find(".list-group-item:first-child").simulate('click');
        expect(list.find('ul')).toHaveLength(1)
    })
})