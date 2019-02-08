import React from 'react';
import ItemDetails from './itemDetails';
import {shallow} from 'enzyme';

describe('Testing <ItemDetails/>', () => {
    const item = shallow(<ItemDetails/>);
    describe('testing shap & state', () =>{
        it('ItemDetails have rendered correctly', () => {
            expect(item).toMatchSnapshot();
        })
    
        it("ItemDetails state item is empty object", () =>{
            expect(item.state().item).toBeNull();
        })
        it("ItemDetails state loading is true", () =>{
            expect(item.state().loading).toBeFalsy();
        })
        it("ItemDetails state error is false", () =>{
            expect(item.state().error).toBeFalsy();
        })
    });
    describe('Handlers tests', () => {
        it('testing onitemLoaded', () => {
            item.instance().onitemLoaded();
            expect(item.state().loading).toBeFalsy()
        });
        it('testing onError', () => {
            item.instance().onError({message:""});
            expect(item.state().loading).toBeFalsy()
            expect(item.state().error).toBeTruthy()
        });
        it('testing updateItem', () => {
            
            item.instance().onitemLoaded({name: 'kkk'});
            expect(item.state().item).toBeObject();
            expect(item.state().loading).toBeFalsy()
        });
        
    })
})