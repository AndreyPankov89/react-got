import React from 'react';
import HousePage from './housePage';
import {shallow} from 'enzyme';

describe('Testing <HousePage/>', () => {
    const item = shallow(<HousePage/>);
    describe('testing shap & state', () =>{
        it('HousePage have rendered correctly', () => {
            expect(item).toMatchSnapshot();
        })
    
        it("HousePage state item is empty object", () =>{
            expect(item.state().selectedHouse).toBeNull();
        })
        it("HousePage state error is false", () =>{
            expect(item.state().error).toBeFalsy();
        })
    });
    describe('Handlers tests', () => {
        it('testing onitemSelected', () => {
            item.instance().onItemSelected(1);
            expect(item.state().selectedHouse).toEqual(1)
        });
        it('testing onError', () => {
            item.instance().onError({message:"2"});
            expect(item.state().error).toBeTruthy();
            expect(item.state().loading).toBeFalsy();
            expect(item.state().errorCode).toBe('2')
        });
        
    })
})