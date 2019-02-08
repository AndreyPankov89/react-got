import React from 'react';
import CharacterPage from './characterPage';
import {shallow} from 'enzyme';

describe('Testing <CharacterPage/>', () => {
    const item = shallow(<CharacterPage/>);
    describe('testing shap & state', () =>{
        it('CharacterPage have rendered correctly', () => {
            expect(item).toMatchSnapshot();
        })
    
        it("CharacterPage state item is empty object", () =>{
            expect(item.state().selectedChar).toBeNull();
        })
        it("CharacterPage state error is false", () =>{
            expect(item.state().error).toBeFalsy();
        })
    });
    describe('Handlers tests', () => {
        it('testing onitemSelected', () => {
            item.instance().onItemSelected(1);
            expect(item.state().selectedChar).toEqual(1)
        });
        it('testing onError', () => {
            item.instance().onError({message:"2"});
            expect(item.state().error).toBeTruthy();
            expect(item.state().loading).toBeFalsy();
            expect(item.state().errorCode).toBe('2')
        });
        
    })
})